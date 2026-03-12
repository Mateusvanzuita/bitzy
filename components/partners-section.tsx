"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { PawPrint, Building2, Star, Share2, Users, Gift, Mail, Phone, ChevronRight, Sparkles, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"

const creatorBenefits = [
  { icon: Star, text: "Destaque no site oficial do Bitzy, com nome e perfil dos parceiros" },
  { icon: Share2, text: "Repost e divulgação de conteúdos nas redes do Bitzy" },
  { icon: Users, text: "Participação em ações e campanhas futuras do aplicativo" },
  { icon: Gift, text: "Acesso gratuito ao futuro Clube Bitzy, com vantagens e recursos exclusivos" },
]

const brandBenefits = [
  { icon: Megaphone, text: "Anúncios dentro do aplicativo" },
  { icon: Star, text: "Destaque para marcas e serviços no ecossistema Bitzy" },
  { icon: Users, text: "Participação em campanhas e conteúdos voltados para tutores de pets" },
  { icon: Building2, text: "Presença em ações e iniciativas futuras da plataforma" },
  { icon: Mail, text: "Disparo de emails para base segmentada de tutores" },
]

export function PartnersSection() {
  const [activeTab, setActiveTab] = useState<"creator" | "brand">("creator")
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)

  const isCreator = activeTab === "creator"
  const benefits = isCreator ? creatorBenefits : brandBenefits

  return (
    <section id="parceiros" className="py-24 px-4 bg-gradient-to-b from-muted/20 via-background to-muted/30">
      <div className="container mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-wiggle inline-block">🤝</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Programa de Parceiros
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty font-light leading-relaxed">
            Seja você criador de conteúdo ou empresa do setor pet, temos uma oportunidade especial esperando por você.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted/50 rounded-full p-1.5 border-2 border-border/50 gap-1">
            <button
              onClick={() => setActiveTab("creator")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                isCreator
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PawPrint className="w-4 h-4" />
              Criadores de Conteúdo
            </button>
            <button
              onClick={() => setActiveTab("brand")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                !isCreator
                  ? "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Empresas &amp; Marcas
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-border/50 shadow-2xl overflow-hidden rounded-[2.5rem]">
            <div className="grid md:grid-cols-2">

              {/* Left — description + contact */}
              <div className={`p-10 md:p-14 space-y-6 bg-gradient-to-br ${isCreator ? "from-primary/5 to-primary/10" : "from-secondary/5 to-secondary/10"}`}>
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${isCreator ? "bg-primary/10" : "bg-secondary/10"}`}>
                  {isCreator
                    ? <PawPrint className="w-8 h-8 text-primary" />
                    : <Building2 className="w-8 h-8 text-secondary" />
                  }
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    {isCreator ? "Para criadores do universo pet" : "Para empresas do setor pet"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {isCreator
                      ? "Estamos convidando criadores de conteúdo que realmente amam pets para se tornarem parceiros do Bitzy. A ideia é criar uma rede forte de criadores que querem crescer junto com a plataforma."
                      : "O Bitzy está formando uma rede de parceiros e marcas do universo pet, oferecendo oportunidades de divulgação diretamente para um público altamente interessado nesse mercado."
                    }
                  </p>
                </div>

                {/* Contact */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fale com a gente</p>
                  <a
                    href="mailto:contato@bitzy.com.br"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">contato@bitzy.com.br</span>
                  </a>
                  <a
                    href="tel:+5511971750070"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">11 97175-0070</span>
                  </a>
                </div>

                <Button
                  size="lg"
                  asChild
                  className={`rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 gap-2 ${!isCreator ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}`}
                >
                  <a href="mailto:contato@bitzy.com.br">
                    Quero ser parceiro
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              {/* Right — benefits */}
              <div className="p-10 md:p-14 space-y-6 border-t-2 md:border-t-0 md:border-l-2 border-border/50">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary">
                    {isCreator ? "Benefícios exclusivos" : "Possibilidades de parceria"}
                  </span>
                </div>

                <ul className="space-y-4">
                  {benefits.map(({ icon: Icon, text }, i) => (
                    <li
                      key={`${activeTab}-${i}`}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-default ${
                        hoveredBenefit === i
                          ? "border-primary/30 bg-primary/5 scale-[1.02] shadow-md"
                          : "border-border/30 bg-muted/20"
                      }`}
                      onMouseEnter={() => setHoveredBenefit(i)}
                      onMouseLeave={() => setHoveredBenefit(null)}
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        hoveredBenefit === i ? "bg-primary/20 rotate-12 scale-110" : "bg-primary/10"
                      }`}>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-foreground leading-relaxed pt-1">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </Card>
        </div>

        {/* Bottom callout — same pattern as HowItWorks */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-8 py-4 rounded-full border-2 border-primary/20">
            <p className="text-lg font-semibold text-foreground">
              Vamos crescer juntos no universo pet! 🐾
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}