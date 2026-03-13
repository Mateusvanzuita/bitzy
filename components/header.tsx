"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            <Link
              href="#inicio"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Início
            </Link>
            <Link
              href="#como-funciona"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Como Funciona
            </Link>
            <Link
              href="#depoimentos"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Depoimentos
            </Link>
            <Link
              href="#contato"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Contato
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
            <Link
              href="#inicio"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="#como-funciona"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#depoimentos"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <Link
              href="#contato"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
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