"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Store, Smartphone, TrendingUp, RefreshCw, CheckCircle2, Sparkles, Tag } from "lucide-react"
import { useState } from "react"

const WHATSAPP_URL = "https://wa.me/5511971750070?text=Ol%C3%A1%2C+vim+pelo+site+e+quero+saber+mais+sobre+o+Clube+Bitzy!"

const steps = [
  {
    emoji: "🐾",
    text: "Seu pet shop cria ofertas exclusivas para clientes.",
  },
  {
    emoji: "🐾",
    text: "Os clientes acessam os cupons pelo aplicativo Bitzy.",
  },
  {
    emoji: "🐾",
    text: "Cada benefício gera novas visitas e aumenta a chance de recompra.",
  },
  {
    emoji: "🐾",
    text: "Você fortalece o relacionamento com seus clientes sem depender apenas de redes sociais.",
  },
]

const benefits = [
  { icon: TrendingUp, text: "Aumente a frequência de visitas" },
  { icon: RefreshCw, text: "Incentive novas compras" },
  { icon: Sparkles, text: "Divulgue promoções e produtos em destaque" },
  { icon: CheckCircle2, text: "Fidelize clientes com benefícios exclusivos" },
  { icon: Store, text: "Destaque seu pet shop para milhares de usuários do Bitzy" },
  { icon: Tag, text: "Sem contratos de longo prazo" },
]

const cupons = [
  "10% de desconto em Banho e Tosa",
  "Corte de unha gratuito",
  "Desconto em rações selecionadas",
  "Promoções de vacinas e vermífugos",
  "Combos especiais do mês",
]

export function ClubeBitzy() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section id="clube-bitzy" className="py-24 px-4 scroll-mt-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-wiggle inline-block">🏪</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Transforme seus clientes em clientes recorrentes
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty font-light leading-relaxed">
            Está cansado de perder clientes para o Petz? O Clube Bitzy ajuda seu pet shop a fidelizar clientes através de cupons exclusivos, promoções sazonais e benefícios que incentivam novas visitas e aumentam as vendas.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">

          {/* Como Funciona */}
          <Card className="border-2 border-border/50 shadow-xl rounded-[2.5rem] p-10 space-y-6 bg-gradient-to-br from-primary/5 to-background">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Como Funciona</h3>
            </div>
            <ul className="space-y-4">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-default ${
                    hoveredStep === i
                      ? "border-primary/30 bg-primary/5 scale-[1.02] shadow-md"
                      : "border-border/30 bg-muted/20"
                  }`}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <span className={`text-2xl transition-all duration-300 ${hoveredStep === i ? "scale-125 inline-block" : ""}`}>
                    {step.emoji}
                  </span>
                  <span className="text-foreground leading-relaxed pt-0.5">{step.text}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Benefícios */}
          <Card className="border-2 border-border/50 shadow-xl rounded-[2.5rem] p-10 space-y-6 bg-gradient-to-br from-secondary/5 to-background">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold">Benefícios para seu Pet Shop</h3>
            </div>
            <ul className="space-y-3">
              {benefits.map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-default ${
                    hoveredBenefit === i
                      ? "border-secondary/30 bg-secondary/5 scale-[1.02] shadow-md"
                      : "border-border/30 bg-muted/20"
                  }`}
                  onMouseEnter={() => setHoveredBenefit(i)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    hoveredBenefit === i ? "bg-secondary/20 rotate-12 scale-110" : "bg-secondary/10"
                  }`}>
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-foreground leading-relaxed font-medium">✅ {text}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Cupons */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="border-2 border-border/50 shadow-xl rounded-[2.5rem] p-10 space-y-6 bg-gradient-to-br from-accent/5 to-background">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold">Exemplos de Cupons</h3>
            </div>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {cupons.map((cupom, i) => (
                <li key={i} className="flex items-center gap-3 bg-muted/30 border border-border/40 rounded-2xl px-4 py-3 text-muted-foreground">
                  <span className="text-primary text-xl font-bold">🏷️</span>
                  <span>{cupom}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Pricing card comparativo */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="border-2 border-border/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="grid md:grid-cols-2">

              {/* Lado esquerdo — o que o pet shop ganha */}
              <div className="p-10 md:p-14 space-y-6 bg-gradient-to-br from-primary/5 to-background border-b-2 md:border-b-0 md:border-r-2 border-border/50">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">O que você recebe</p>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">Valor real para o seu negócio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada cliente que volta vale muito mais do que R$99. Veja o que está incluso:
                  </p>
                </div>

                <ul className="space-y-3">
                  {[
                    { emoji: "📲", label: "Perfil do seu pet shop no app Bitzy", valor: "visibilidade" },
                    { emoji: "🎟️", label: "Cupons e promoções exclusivas para seus clientes", valor: "fidelização" },
                    { emoji: "📣", label: "Divulgação para milhares de tutores ativos", valor: "alcance" },
                    { emoji: "🔁", label: "Clientes que voltam mais vezes ao mês", valor: "recorrência" },
                    { emoji: "📊", label: "Sem depender de redes sociais para converter", valor: "independência" },
                    { emoji: "🤖", label: "Seus clientes com a melhor IA pet do mercado", valor: "diferencial" },
                  ].map(({ emoji, label, valor }, i) => (
                    <li key={i} className="flex items-center gap-4 p-3 rounded-2xl border border-border/30 bg-muted/20 group hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                      <span className="text-foreground flex-1 leading-snug">{label}</span>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">{valor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lado direito — preço */}
              <div className="relative p-10 md:p-14 flex flex-col justify-center items-center text-center space-y-8 overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
                <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 space-y-6 w-full">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
                    <span className="text-primary-foreground font-bold text-sm uppercase tracking-wider">Clube Bitzy</span>
                  </div>

                  <div>
                    <p className="text-primary-foreground/70 text-sm font-medium mb-1">por apenas</p>
                    <div className="text-primary-foreground">
                      <span className="text-7xl md:text-8xl font-bold leading-none">R$99</span>
                      <span className="text-2xl font-light">/mês</span>
                    </div>
                    <p className="text-primary-foreground/70 text-sm mt-2">≈ R$3,30 por dia</p>
                  </div>

                  {/* Comparativo visual */}
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 space-y-3 text-left">
                    <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-wider text-center mb-3">Comparativo</p>
                    {[
                      { label: "1 impulsionamento no Instagram", valor: "R$50–300", destaque: false },
                      { label: "1 banner em jornal local", valor: "R$200+", destaque: false },
                      { label: "Clube Bitzy — mês inteiro", valor: "R$99", destaque: true },
                    ].map(({ label, valor, destaque }, i) => (
                      <div key={i} className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition-all ${destaque ? "bg-white/25 border border-white/40" : "opacity-70"}`}>
                        <span className={`text-sm ${destaque ? "text-primary-foreground font-bold" : "text-primary-foreground/80"}`}>{label}</span>
                        <span className={`text-sm font-bold whitespace-nowrap ${destaque ? "text-primary-foreground" : "text-primary-foreground/80"}`}>{valor}</span>
                        {destaque && <span className="text-xs bg-white/30 text-primary-foreground px-2 py-0.5 rounded-full font-bold">✓ melhor</span>}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-primary-foreground/80 text-sm">Sem taxa de adesão · Sem fidelidade</p>
                    <p className="text-primary-foreground/80 text-sm">Cancele quando quiser</p>
                  </div>

                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full rounded-full text-lg px-8 py-7 gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Começar por R$99/mês 🚀
                    </Button>
                  </a>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* CTA final */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-card via-card to-primary/5 rounded-[2.5rem] p-10 md:p-16 border-2 border-border/50 shadow-2xl text-center space-y-6">
            <div className="inline-block">
              <span className="text-5xl animate-bounce inline-block">🚀</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
              Seus concorrentes também querem fidelizar clientes.
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Entre agora para o Clube Bitzy e transforme descontos inteligentes em mais vendas para seu pet shop.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              E de brinde, seus clientes têm acesso à melhor IA para tutores de pet do mercado. Que somos nós, o Bitzy 🐾
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="rounded-full text-lg px-10 py-7 gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 font-semibold mt-2"
              >
                <MessageCircle className="w-6 h-6" />
                Começar por R$99/mês 🚀
              </Button>
            </a>
            <p className="text-sm text-muted-foreground">Sem taxa de adesão · Cancele quando quiser</p>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-8 py-4 rounded-full border-2 border-primary/20">
            <p className="text-lg font-semibold text-foreground">
              Mais de R$99 em valor para o seu pet shop todo mês 🐾
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}