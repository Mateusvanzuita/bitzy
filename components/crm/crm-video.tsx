export function CrmVideo() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-muted flex items-center justify-center">
          {/* TODO: substituir pelo vídeo real (upload em /public ou embed do YouTube/Vimeo) */}
          <video controls className="w-full h-full object-cover" poster="/inicio.png">
            <source src="/videos/bitzy-crm-1min.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}