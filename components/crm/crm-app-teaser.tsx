const beneficiosTutor = [
  "Recebe lembretes, dicas e análises sobre o pet.",
  "Conversa com a IA sobre dúvidas do dia a dia.",
  "Acompanha o histórico do pet.",
  "Encontra promoções da sua loja.",
]

export function CrmAppTeaser() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O sistema não funciona sozinho</h2>
          <p className="text-muted-foreground mb-6">
            Seus clientes usam o <strong>aplicativo Bitzy</strong>, gratuito, direto no celular deles. É isso que
            conecta sua loja ao dia a dia do tutor.
          </p>
          <ul className="space-y-3">
            {beneficiosTutor.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-muted flex items-center justify-center">
          {/* TODO: vídeo do app Bitzy */}
          <video controls className="w-full h-full object-cover">
            <source src="/videos/bitzy-app.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}