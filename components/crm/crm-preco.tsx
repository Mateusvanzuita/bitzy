"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CrmCheckoutDialog } from "./crm-checkout-dialog"
import { buscarPlanoPorSlugCRM, type PlanoCRM } from "@/lib/crm-api"

const inclusos = [
  "Todos os módulos do sistema",
  "Aplicativo Bitzy para seus clientes",
  "Inteligência Artificial",
  "Suporte via WhatsApp",
]

interface CrmPrecoProps {
  /** Slug do plano a buscar — cada página de checkout usa um plano diferente. */
  slug?: string
  /** Preço "de" riscado, exibido acima do preço atual (ex: "59,90"). */
  precoOriginal?: string
  /** Texto do selo de promoção (ex: "novos clientes" / "fornecedores e parceiros"). */
  publicoAlvo?: string
}

export function CrmPreco({ slug = "bitzy", precoOriginal, publicoAlvo }: CrmPrecoProps) {
  const [plano, setPlano] = useState<PlanoCRM | null>(null)

  useEffect(() => {
    buscarPlanoPorSlugCRM(slug)
      .then(setPlano)
      .catch(() => setPlano(null))
  }, [slug])

  return (
    <section id="crm-preco" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <div className="rounded-3xl border-2 border-primary bg-card p-10 text-center shadow-xl">
          {publicoAlvo && (
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 mb-3">
              Promoção exclusiva para {publicoAlvo}
            </p>
          )}
          <p className="text-sm font-semibold text-primary mb-2">Plano único</p>
          {precoOriginal && (
            <p className="text-lg text-muted-foreground line-through mb-1">De R${precoOriginal}</p>
          )}
          <p className="text-5xl font-bold mb-1">
            {plano ? `R$${Number(plano.precoMensal).toFixed(2).replace(".", ",")}` : "—"}
            <span className="text-lg font-normal text-muted-foreground">/mês</span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Sem taxa de instalação · Sem fidelidade · Valores sujeitos a alteração
          </p>
          <ul className="space-y-3 text-left mb-8">
            {inclusos.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0" /> {i}
              </li>
            ))}
          </ul>
          <CrmCheckoutDialog slug={slug}>
            <Button size="lg" className="w-full rounded-full text-lg py-7 bg-green-600 hover:bg-green-700 text-white">
              Começar agora
            </Button>
          </CrmCheckoutDialog>
        </div>
      </div>
    </section>
  )
}