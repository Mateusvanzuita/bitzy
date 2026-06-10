"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Store, Smartphone, TrendingUp, RefreshCw, CheckCircle2, Sparkles, Tag, Crown, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const steps = [
  { emoji: "🐾", text: "Seu pet shop cria ofertas exclusivas para clientes." },
  { emoji: "🐾", text: "Os clientes acessam os cupons pelo aplicativo Bitzy." },
  { emoji: "🐾", text: "Cada benefício gera novas visitas e aumenta a chance de recompra." },
  { emoji: "🐾", text: "Você fortalece o relacionamento com seus clientes sem depender apenas de redes sociais." },
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

const planos = [
  { label: "Mensal", preco: "R$99/mês", descricao: "Flexibilidade total", destaque: false, badge: null },
  { label: "Trimestral", preco: "R$79/mês", descricao: "Fechando 3 meses", destaque: false, badge: null },
  { label: "Semestral", preco: "R$69/mês", descricao: "Fechando 6 meses", destaque: true, badge: "Mais popular" },
  { label: "Fundadores", preco: "R$49,99/mês", descricao: "Por 6 meses · Apenas com cupom · Limite 20/região", destaque: false, badge: "Convite exclusivo", fundador: true },
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

        {/* Planos — preview visual */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="border-2 border-border/50 shadow-xl rounded-[2.5rem] p-10 bg-gradient-to-br from-primary/5 to-background">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Planos disponíveis</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {planos.map((plano, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl border-2 p-5 space-y-2 transition-all ${
                    plano.destaque
                      ? "border-primary/60 bg-primary/5 ring-2 ring-primary/20"
                      : plano.fundador
                      ? "border-amber-400/50 bg-amber-50/30 dark:bg-amber-900/10"
                      : "border-border/40 bg-muted/20"
                  }`}
                >
                  {plano.badge && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                      plano.fundador
                        ? "bg-amber-100 text-amber-700 border border-amber-300"
                        : "bg-primary text-primary-foreground"
                    }`}>
                      {plano.badge}
                    </span>
                  )}
                  {plano.fundador && (
                    <Crown className="w-5 h-5 text-amber-500 mb-1" />
                  )}
                  <p className="font-bold text-foreground">{plano.label}</p>
                  <p className="text-2xl font-bold text-foreground">{plano.preco}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{plano.descricao}</p>
                </div>
              ))}
            </div>

            {/* CTA principal */}
            <div className="text-center space-y-3">
              <Link href="/cadastro-clube">
                <Button
                  size="lg"
                  className="rounded-full text-lg px-10 py-7 gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Quero cadastrar meu Pet Shop
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Sem taxa de adesão · Cancele quando quiser</p>
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
            <Link href="/cadastro-clube">
              <Button
                size="lg"
                className="rounded-full text-lg px-10 py-7 gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 font-semibold mt-2"
              >
                Cadastrar meu Pet Shop agora 🚀
              </Button>
            </Link>
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