"use client"

import { Download, UserPlus, Sparkles } from "lucide-react"
import { useState } from "react"

export function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    {
      icon: Download,
      title: "Baixe o app",
      description: "Disponível na App Store e Google Play",
      color: "primary",
      emoji: "📱",
    },
    {
      icon: UserPlus,
      title: "Crie sua conta",
      description: "Leva menos de 1 minuto",
      color: "secondary",
      emoji: "👤",
    },
    {
      icon: Sparkles,
      title: "Use no dia a dia",
      description: "E veja o benefício acontecer",
      color: "accent",
      emoji: "✨",
    },
  ]

  return (
    <section id="como-funciona" className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-bounce inline-block">🚀</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Como Funciona</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty font-light leading-relaxed">
            Três passos simples para começar a cuidar melhor do seu PET
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`text-center space-y-6 transition-all duration-500 ${
                  hoveredStep === index ? "scale-105" : ""
                }`}
              >
                <div className="relative inline-block">
                  <div
                    className={`w-24 h-24 rounded-3xl bg-${step.color}/10 flex items-center justify-center mx-auto transition-all duration-500 border-2 border-${step.color}/20 ${
                      hoveredStep === index ? "rotate-12 scale-110 shadow-2xl" : "shadow-lg"
                    }`}
                  >
                    <step.icon className={`w-12 h-12 text-${step.color}`} />
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 text-3xl transition-all duration-500 ${
                      hoveredStep === index ? "scale-125 animate-bounce" : ""
                    }`}
                  >
                    {step.emoji}
                  </div>
                </div>

                <div className="space-y-3">
                  <div
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      hoveredStep === index
                        ? `bg-${step.color} text-${step.color}-foreground`
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    Passo {index + 1}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-border via-primary/30 to-border rounded-full">
                  <div
                    className={`h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ${
                      hoveredStep === index ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-8 py-4 rounded-full border-2 border-primary/20">
            <p className="text-lg font-semibold text-foreground">Comece agora e transforme o cuidado com seu PET! 🎉</p>
          </div>
        </div>
      </div>
    </section>
  )
}
