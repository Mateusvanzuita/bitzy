import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatIsBitzy } from "@/components/what-is-bitzy"
import { HowItWorks } from "@/components/how-it-works"
import { PartnersSection } from "@/components/partners-section"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { HashScroll } from "@/components/hash-scroll"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HashScroll />
      <Header />
      <HeroSection />
      <WhatIsBitzy />
      <HowItWorks />
      <Testimonials />
      <PartnersSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}