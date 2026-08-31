import type { Metadata } from "next"
import { DiagnosticoApp } from "@/components/diagnostico/diagnostico-app"

// Página feita para receber tráfego pago (Meta/Google Ads) e não faz parte da
// navegação do site. Não deve ser indexada nem seguida por buscadores.
export const metadata: Metadata = {
  title: "Diagnóstico gratuito | Bitzy",
  description:
    "Descubra em menos de 2 minutos quanto seu pet shop pode faturar a mais organizando clientes, agenda e vendas com o Bitzy.",
  robots: { index: false, follow: false },
}

export default function DiagnosticoPage() {
  return <DiagnosticoApp />
}