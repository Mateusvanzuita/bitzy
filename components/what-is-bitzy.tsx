"use client"

import { Card } from "@/components/ui/card"
import { Heart, Sparkles, Shield } from "lucide-react"
import { useState } from "react"

export function WhatIsBitzy() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: Heart,
      title: "Cuidado Inteligente",
      description:
        "Análises de saúde e dicas personalizadas baseadas no tipo, raça, idade e características do seu PET.",
      color: "primary",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Sparkles,
      title: "IA Personalizada",
      description: "Dicas de escovação, passeio, alimentação e muito mais, tudo gerado com inteligência artificial.",
      color: "secondary",
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Shield,
      title: "Lembretes Importantes",
      description: "Nunca mais esqueça vacinações, vermífugos e outros cuidados essenciais para seu PET.",
      color: "accent",
      gradient: "from-accent/10 to-accent/5",
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 via-background to-background">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-primary text-6xl animate-wiggle inline-block">🐶</span>
            <span className="text-secondary text-6xl animate-wiggle inline-block animation-delay-200">🐱</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">O que é o Bitzy?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty font-light leading-relaxed">
            Um aplicativo de IA criado para simplificar o dia a dia dos tutores de PETs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-10 space-y-6 transition-all duration-500 cursor-pointer border-2 ${
                hoveredCard === index
                  ? "shadow-2xl scale-105 border-primary/50 bg-gradient-to-br " + feature.gradient
                  : "shadow-lg hover:shadow-xl border-border/50"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`w-16 h-16 rounded-3xl bg-${feature.color}/10 flex items-center justify-center transition-all duration-500 ${
                  hoveredCard === index ? "rotate-12 scale-110" : ""
                }`}
              >
                <feature.icon className={`w-8 h-8 text-${feature.color}`} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-[2.5rem] p-10 md:p-16 border-2 border-border/50 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-5xl">✨</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">Mais do que um app</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                O Bitzy representa uma nova forma de interação digital entre IA, tutores e PETs. Tecnologia prática e
                design intuitivo para quem realmente ama seus animais.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-lg">Interface intuitiva e fácil de usar</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-secondary text-xl">✓</span>
                  <span className="text-lg">Recomendações baseadas em IA avançada</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-lg">Atualizações constantes com novos recursos</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-video group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <img
                src="/smartphone-app-interface-showing-pet-health-dashbo.jpg"
                alt="Bitzy Interface"
                className="relative w-full h-full object-cover rounded-3xl shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
