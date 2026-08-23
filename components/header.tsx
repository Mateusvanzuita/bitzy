"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface ItemNav {
  id: string
  label: string
}

const ITENS_NAV: ItemNav[] = [
  { id: "inicio", label: "Início" },
  { id: "como-funciona", label: "Como Funciona" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const naHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function irParaSecao(e: React.MouseEvent, id: string) {
    setMobileMenuOpen(false)
    if (naHome) {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-lg shadow-lg py-3" : "bg-background/80 backdrop-blur-md py-4"
      } border-b border-border`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative w-52 h-16 group-hover:scale-105 transition-transform duration-300">
              <Image src="https://i.imgur.com/mMtHpH1.jpeg" alt="Bitzy Logo" fill className="object-contain object-left" />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {ITENS_NAV.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => irParaSecao(e, item.id)}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/crm"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              CRM para Pet Shops
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Baixar Agora
            </Button>
          </div>

          <button
            className="md:hidden transition-transform duration-300 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {ITENS_NAV.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => irParaSecao(e, item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/crm"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              CRM para Pet Shops
            </Link>
            <Button size="lg" className="rounded-full w-full mt-2">
              Baixar Agora
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}