import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { CrmCheckoutDialog } from "./crm-checkout-dialog"
import { linkWhatsapp } from "@/lib/whatsapp"

export function CrmCtaFinal() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-[3rem] p-12 md:p-20 text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-primary-foreground text-balance">
            Experimente o Bitzy e transforme a gestão do seu pet shop.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CrmCheckoutDialog>
              <Button size="lg" variant="secondary" className="rounded-full text-lg px-10 py-7 shadow-xl hover:scale-105 transition-transform">
                Assinar agora
              </Button>
            </CrmCheckoutDialog>
            <a href={linkWhatsapp("Olá! Quero assinar o Bitzy CRM.")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full text-lg px-10 py-7 gap-2 bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}