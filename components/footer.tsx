"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <footer id="contato" className="py-16 px-4 border-t border-border bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center group">
              <div className="relative w-44 h-14 group-hover:scale-105 transition-transform duration-300">
                <Image src="https://i.imgur.com/mMtHpH1.jpeg" alt="Bitzy Logo" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              A IA melhor amiga do seu PET. Cuidado inteligente e personalizado para quem você ama.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Feito com amor</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#inicio"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  → Início
                </Link>
              </li>
              <li>
                <Link
                  href="/#como-funciona"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  → Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/#depoimentos"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  → Depoimentos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacidade"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  → Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  → Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contato</h3>
            <div className="space-y-4">
              <a
                href="mailto:contato@bitzy.com.br"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>contato@bitzy.com.br</span>
              </a>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/bitzy.pet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                    hoveredSocial === "instagram" ? "scale-125 rotate-12" : ""
                  }`}
                  onMouseEnter={() => setHoveredSocial("instagram")}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 ${
                    hoveredSocial === "linkedin" ? "scale-125 rotate-12" : ""
                  }`}
                  onMouseEnter={() => setHoveredSocial("linkedin")}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 ${
                    hoveredSocial === "twitter" ? "scale-125 rotate-12" : ""
                  }`}
                  onMouseEnter={() => setHoveredSocial("twitter")}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>© Bitzy 2026 – Todos os direitos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> para PETs
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}