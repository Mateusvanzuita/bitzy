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

export default function CrmPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CrmHero />
      <CrmVideo />
      <CrmProblema />
      <CrmSolucao />
      <CrmComoFunciona />
      <CrmAppTeaser />
      <CrmDiferencial />
      <CrmPreco />
      <FAQSection defaultTab="pet-shops" />
      <CrmCtaFinal />
      <Footer />
    </main>
  )
}