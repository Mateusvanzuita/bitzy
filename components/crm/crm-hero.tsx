import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { CrmCheckoutDialog } from "./crm-checkout-dialog"
import { linkWhatsapp } from "@/lib/whatsapp"

export function CrmHero() {
  return (
    <section id="crm-inicio" className="pt-32 pb-20 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
          O sistema completo para pet shops que economiza horas do seu dia e aumenta suas vendas.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
          Agenda organizada, cadastro de clientes e pets, financeiro, inteligência artificial e integração exclusiva
          com o aplicativo Bitzy. Organize sua loja, fortaleça o relacionamento com seus clientes e faça seu negócio
          crescer. CRM inteligente que te ajuda a não perder nenhum cliente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CrmCheckoutDialog>
            <Button size="lg" className="rounded-full text-lg px-10 py-7 shadow-lg hover:scale-105 transition-transform">
              Assinar agora
            </Button>
          </CrmCheckoutDialog>
          <a href={linkWhatsapp("Olá! Quero saber mais sobre o Bitzy CRM.")} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="rounded-full text-lg px-10 py-7 gap-2">
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}