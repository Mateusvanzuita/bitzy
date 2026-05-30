"use client"

import { Button } from "@/components/ui/button"
import { Apple, Play, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="inicio" className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="inline-block animate-pulse-glow">
              <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 text-foreground px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-primary/30 backdrop-blur-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-wiggle" />
                Tecnologia de IA para seu PET
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
              Bitzy - a IA melhor amiga do seu PET 🐾
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty font-light">
              Quem ama cuida nunca fez tanto sentido. Com o Bitzy seu PET terá muito mais qualidade de vida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://apps.apple.com/br/app/id6756659048"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-lg px-8 py-7 gap-2 border-2 border-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 shadow-md font-semibold min-w-[220px]"
                >
                  <Apple className="w-5 h-5" />
                  App Store
                </Button>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.mateusdev13.bitzy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-lg px-8 py-7 gap-2 border-2 border-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 shadow-md font-semibold min-w-[220px]"
                >
                  <Play className="w-5 h-5" />
                  Google Play
                </Button>
              </a>
            </div>

            <p className="text-sm text-muted-foreground font-medium">* O Bitzy não substitui consultas veterinárias</p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-2xl">🏪</span>
              <p className="text-sm text-muted-foreground">
                Você tem um pet shop?{" "}
                <a
                  href="#clube-bitzy"
                  className="text-secondary font-semibold hover:underline underline-offset-4 transition-all duration-300"
                >
                  Conheça o Clube Bitzy e fidelize seus clientes →
                </a>
              </p>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-[3rem] blur-3xl animate-pulse-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-primary/20 to-secondary/20 rounded-[3rem] blur-2xl animate-pulse-glow animation-delay-1000"></div>

              <div className="relative bg-card rounded-[3rem] p-8 shadow-2xl border-2 border-border/50 animate-float backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[3rem]"></div>
                <img
                  src="/happy-dog-and-cat-with-smartphone-showing-health-a.jpg"
                  alt="Bitzy App Preview"
                  className="relative w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse animation-delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}