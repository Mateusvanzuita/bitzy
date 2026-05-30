import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatIsBitzy } from "@/components/what-is-bitzy"
import { HowItWorks } from "@/components/how-it-works"
import { PartnersSection } from "@/components/partners-section"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ClubeBitzy } from "@/components/clube-bitzy"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhatIsBitzy />
      <HowItWorks />
      <Testimonials />
      <PartnersSection />
      <ClubeBitzy /> 
      <CTASection />
      <Footer />
    </main>
  )
}
