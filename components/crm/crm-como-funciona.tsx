const passos = [
  { numero: "1", titulo: "Cadastre seu pet shop", desc: "Leva menos de 2 minutos pra criar sua conta." },
  { numero: "2", titulo: "Cadastre seus clientes", desc: "Manualmente ou importando a planilha que você já usa hoje." },
  { numero: "3", titulo: "Comece a usar imediatamente", desc: "Sem instalação, sem complicação — direto do navegador." },
]

export function CrmComoFunciona() {
  return (
    <section id="crm-como-funciona" className="py-20 px-4 bg-muted/40">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passos.map((p) => (
            <div key={p.numero} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {p.numero}
              </div>
              <h3 className="font-semibold text-lg mb-2">{p.titulo}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}