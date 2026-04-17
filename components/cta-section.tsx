"use client"

import { Button } from "@/components/ui/button"
import { Apple, Play, Sparkles } from "lucide-react"
import { useState } from "react"

export function CTASection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-float"></div>

          <div className="relative inline-block mb-6">
            <div className="text-7xl animate-bounce">🎉</div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground text-balance leading-tight">
              Pronto para simplificar sua rotina?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/95 mb-10 max-w-3xl mx-auto text-pretty font-light leading-relaxed">
              Junte-se a milhares de tutores que já estão usando o Bitzy para cuidar melhor de seus PETs
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://apps.apple.com/br/app/id6756659048"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full text-lg px-10 py-7 gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 font-semibold"
                  onMouseEnter={() => setHoveredButton("apple")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Apple
                    className={`w-6 h-6 transition-transform duration-300 ${
                      hoveredButton === "apple" ? "scale-125" : ""
                    }`}
                  />
                  Baixar na App Store
                </Button>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.mateusdev13.bitzy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full text-lg px-10 py-7 gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 font-semibold"
                  onMouseEnter={() => setHoveredButton("play")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Play
                    className={`w-6 h-6 transition-transform duration-300 ${
                      hoveredButton === "play" ? "scale-125" : ""
                    }`}
                  />
                  Baixar no Google Play
                </Button>
              </a>
            </div>

            <div className="mt-10 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">Grátis para baixar • Sem anúncios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
