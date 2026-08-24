import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { CrmHero } from "@/components/crm/crm-hero"
import { CrmVideo } from "@/components/crm/crm-video"
import { CrmProblema } from "@/components/crm/crm-problema"
import { CrmSolucao } from "@/components/crm/crm-solucao"
import { CrmComoFunciona } from "@/components/crm/crm-como-funciona"
import { CrmAppTeaser } from "@/components/crm/crm-app-teaser"
import { CrmDiferencial } from "@/components/crm/crm-diferencial"
import { CrmPreco } from "@/components/crm/crm-preco"
import { CrmCtaFinal } from "@/components/crm/crm-cta-final"

// Página só acessível por quem tem o link direto — não aparece em nenhum
// menu do site e não deve ser indexada por buscadores.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CrmParceirosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CrmHero slug="bitzy-parceiros" />
      <CrmVideo />
      <CrmProblema />
      <CrmSolucao />
      <CrmComoFunciona />
      <CrmAppTeaser />
      <CrmDiferencial />
      <CrmPreco slug="bitzy-parceiros" precoOriginal="49,90" publicoAlvo="fornecedores e parceiros" />
      <FAQSection defaultTab="pet-shops" />
      <CrmCtaFinal slug="bitzy-parceiros" />
      <Footer />
    </main>
  )
}