const comparativo = [
  { recurso: "Gestão completa", outros: true, bitzy: true },
  { recurso: "Aplicativo para clientes", outros: false, bitzy: true },
  { recurso: "Inteligência Artificial", outros: false, bitzy: true },
  { recurso: "Clube de descontos", outros: false, bitzy: true },
  { recurso: "Marketplace (em breve)", outros: false, bitzy: true },
]

export function CrmDiferencial() {
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Por que o Bitzy é diferente?</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Enquanto outros sistemas apenas organizam sua loja, o Bitzy também conecta seu pet shop aos clientes por
          meio do aplicativo Bitzy, com inteligência artificial, lembretes e relacionamento.
        </p>
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <div className="grid grid-cols-3 text-sm font-semibold border-b border-border">
            <div className="p-4">Recurso</div>
            <div className="p-4 text-center text-muted-foreground">Outros sistemas</div>
            <div className="p-4 text-center text-primary">Bitzy</div>
          </div>
          {comparativo.map((item) => (
            <div key={item.recurso} className="grid grid-cols-3 text-sm border-b border-border last:border-0">
              <div className="p-4">{item.recurso}</div>
              <div className="p-4 text-center">{item.outros ? "✅" : "❌"}</div>
              <div className="p-4 text-center">{item.bitzy ? "✅" : "❌"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}