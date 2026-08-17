import { Users, PawPrint, CalendarDays, Wallet, Boxes, Sparkles, BarChart3, MessageCircle } from "lucide-react"

const recursos = [
  { icon: Users, titulo: "Cadastro de Clientes", desc: "Tenha todas as informações dos seus clientes organizadas e acessíveis em segundos." },
  { icon: PawPrint, titulo: "Cadastro de Pets", desc: "Histórico completo de cada pet com vacinas, serviços, observações e muito mais." },
  { icon: CalendarDays, titulo: "Agenda", desc: "Organize banhos, tosas, vacinas, consultas e evite horários perdidos ou conflitos." },
  { icon: Wallet, titulo: "Financeiro", desc: "Controle receitas, despesas e acompanhe a saúde financeira da sua empresa." },
  { icon: Boxes, titulo: "Estoque", desc: "Gerencie produtos em tempo real e evite perdas por falta ou excesso de estoque." },
  { icon: Sparkles, titulo: "Inteligência Artificial", desc: "Receba sugestões inteligentes para vender mais, fidelizar clientes e economizar tempo." },
  { icon: BarChart3, titulo: "Relatórios", desc: "Visualize indicadores claros para tomar decisões com mais segurança." },
  { icon: MessageCircle, titulo: "WhatsApp Integrado", desc: "Envie mensagens para seus clientes com poucos cliques, direto pelo sistema." },
]

export function CrmSolucao() {
  return (
    <section id="crm-solucao" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">A solução: Bitzy</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Tudo que você precisa pra organizar e crescer o seu pet shop, em um só lugar.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recursos.map(({ icon: Icon, titulo, desc }) => (
            <div key={titulo} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1.5">{titulo}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}