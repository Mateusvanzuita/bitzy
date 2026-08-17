"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CrmCheckoutDialog } from "./crm-checkout-dialog"
import { listarPlanosCRM, type PlanoCRM } from "@/lib/crm-api"

const inclusos = [
  "Todos os módulos do sistema",
  "Aplicativo Bitzy para seus clientes",
  "Inteligência Artificial",
  "Suporte via WhatsApp",
]

export function CrmPreco() {
  const [plano, setPlano] = useState<PlanoCRM | null>(null)

  useEffect(() => {
    listarPlanosCRM().then((planos) => setPlano(planos[0] ?? null)).catch(() => setPlano(null))
  }, [])

  return (
    <section id="crm-preco" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <div className="rounded-3xl border-2 border-primary bg-card p-10 text-center shadow-xl">
          <p className="text-sm font-semibold text-primary mb-2">Plano único</p>
          <p className="text-5xl font-bold mb-1">
            {plano ? `R$${Number(plano.precoMensal).toFixed(0)}` : "—"}
            <span className="text-lg font-normal text-muted-foreground">/mês</span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">Sem taxa de instalação · Sem fidelidade</p>
          <ul className="space-y-3 text-left mb-8">
            {inclusos.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0" /> {i}
              </li>
            ))}
          </ul>
          <CrmCheckoutDialog>
            <Button size="lg" className="w-full rounded-full text-lg py-7">
              Começar agora
            </Button>
          </CrmCheckoutDialog>
        </div>
      </div>
    </section>
  )
}