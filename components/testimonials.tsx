"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useState } from "react"

export function Testimonials() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const testimonials = [
    {
      name: "Maria Silva",
      location: "São Paulo, SP",
      text: "O Bitzy mudou completamente a forma como cuido do meu cachorro. As dicas personalizadas são incríveis!",
      rating: 5,
      avatar: "/woman-with-dog-smiling.jpg",
      petEmoji: "🐕",
    },
    {
      name: "João Santos",
      location: "Rio de Janeiro, RJ",
      text: "Nunca mais esqueci de vacinar meu gato graças aos lembretes do Bitzy. Aplicativo essencial!",
      rating: 5,
      avatar: "/man-with-cat-happy.jpg",
      petEmoji: "🐈",
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte, MG",
      text: "A análise de saúde me ajudou a identificar um problema cedo. Levei ao veterinário a tempo!",
      rating: 5,
      avatar: "/woman-with-pet-smiling.jpg",
      petEmoji: "🐶",
    },
  ]

  return (
    <section id="depoimentos" className="py-24 px-4 bg-gradient-to-b from-muted/30 via-background to-background">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-5xl">⭐</span>
            <span className="text-5xl mx-2">💜</span>
            <span className="text-5xl">⭐</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Quem já usa o Bitzy aprova</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty font-light leading-relaxed">
            Milhares de tutores já estão cuidando melhor de seus PETs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`p-8 space-y-6 transition-all duration-500 cursor-pointer border-2 ${
                hoveredCard === index
                  ? "shadow-2xl scale-105 border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5"
                  : "shadow-lg hover:shadow-xl border-border/50"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 fill-secondary text-secondary transition-all duration-300 ${
                      hoveredCard === index ? "scale-110" : ""
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              <div className="relative">
                <span className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif">"</span>
                <p className="text-lg leading-relaxed text-pretty pl-4">{testimonial.text}</p>
                <span className="absolute -bottom-4 -right-2 text-4xl text-primary/20 font-serif">"</span>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="relative">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className={`w-14 h-14 rounded-full object-cover border-2 border-primary/20 transition-all duration-300 ${
                      hoveredCard === index ? "scale-110 border-primary/50" : ""
                    }`}
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 text-2xl transition-all duration-300 ${
                      hoveredCard === index ? "scale-125 animate-bounce" : ""
                    }`}
                  >
                    {testimonial.petEmoji}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">10k+</div>
            <div className="text-muted-foreground font-medium">Usuários Ativos</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-secondary">4.9</div>
            <div className="text-muted-foreground font-medium">Avaliação Média</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-accent">15k+</div>
            <div className="text-muted-foreground font-medium">PETs Cadastrados</div>
          </div>
        </div>
      </div>
    </section>
  )
}
