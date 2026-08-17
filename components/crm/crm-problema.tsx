const dores = [
  "Clientes esquecem a vacina do pet.",
  "Agenda bagunçada, com horários perdidos ou conflitos.",
  "Você não sabe quais clientes sumiram.",
  "Tudo anotado no WhatsApp, sem organização.",
  "Falta controle financeiro do negócio.",
]

export function CrmProblema() {
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Isso te parece familiar?</h2>
        <div className="grid gap-4 text-left">
          {dores.map((dor) => (
            <div key={dor} className="flex items-start gap-3 bg-card rounded-2xl p-5 border border-border">
              <span className="text-2xl">❌</span>
              <p className="text-foreground font-medium">{dor}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}