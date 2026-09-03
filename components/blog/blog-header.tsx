import { Sparkles } from "lucide-react"

export function BlogHeader() {
  return (
    <section className="pt-32 pb-12 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 border-2 border-primary/20 text-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          Blog do Bitzy
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4">
          Conteúdo para tutores e pet shops
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
          Dicas de gestão, cuidados com pets e novidades do Bitzy.
        </p>
      </div>
    </section>
  )
}
