"use client"

import { useEffect, useState } from "react"
import { Apple, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type Evento = "view" | "click_ios" | "click_android"
type Plataforma = "ios" | "android" | null

const APP_STORE_URL = "https://apps.apple.com/br/app/id6756659048"
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.mateusdev13.bitzy"

function enviarEvento(slug: string, evento: Evento) {
  const payload = JSON.stringify({ slug, evento })
  try {
    // sendBeacon sobrevive à troca de página quando o usuário abre a loja.
    const blob = new Blob([payload], { type: "application/json" })
    if (navigator.sendBeacon?.("/api/qr/track", blob)) return
    fetch("/api/qr/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Rastreio nunca deve quebrar a página.
  }
}

export function QrLanding({ slug }: { slug: string }) {
  const [plataforma, setPlataforma] = useState<Plataforma>(null)

  useEffect(() => {
    const ua = navigator.userAgent
    if (/iPhone|iPad|iPod/i.test(ua)) setPlataforma("ios")
    else if (/Android/i.test(ua)) setPlataforma("android")

    // Conta 1 acesso por sessão (evita duplicar em refresh e no Strict Mode).
    const chave = `qr-view-${slug}`
    try {
      if (sessionStorage.getItem(chave)) return
      sessionStorage.setItem(chave, "1")
    } catch {}
    enviarEvento(slug, "view")
  }, [slug])

  // Play Store recebe o slug como referrer: aparece no Play Console.
  const playUrl = `${PLAY_STORE_URL}&referrer=${encodeURIComponent(`utm_source=qr&utm_campaign=${slug}`)}`

  return (
    <main className="min-h-dvh px-4 pt-8 pb-10 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 px-4 py-2 rounded-full text-sm font-semibold border-2 border-primary/30 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Tecnologia de IA para seu PET
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">
            Bitzy, a IA melhor amiga do seu PET 🐾
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            Quem ama cuida nunca fez tanto sentido. Veja como o Bitzy melhora a qualidade de vida do seu PET.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-2xl" />
          <video
            className="relative w-full rounded-3xl border-2 border-border/50 shadow-2xl bg-card"
            src="/videos/bitzy-app.mp4"
            poster="/inicio.png"
            controls
            playsInline
            preload="metadata"
          />
        </div>

        <div className="space-y-3">
          <p className="text-center font-semibold">Baixe o app grátis</p>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => enviarEvento(slug, "click_ios")}
            className="block"
          >
            <Button
              size="lg"
              variant={plataforma === "android" ? "outline" : "default"}
              className="w-full h-14 rounded-full text-lg gap-2 font-semibold"
            >
              <Apple className="w-5 h-5" />
              Baixar na App Store
            </Button>
          </a>

          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => enviarEvento(slug, "click_android")}
            className="block"
          >
            <Button
              size="lg"
              variant={plataforma === "ios" ? "outline" : "default"}
              className="w-full h-14 rounded-full text-lg gap-2 font-semibold"
            >
              <Play className="w-5 h-5" />
              Baixar no Google Play
            </Button>
          </a>
        </div>

        <p className="text-center text-xs text-muted-foreground">* O Bitzy não substitui consultas veterinárias</p>
      </div>
    </main>
  )
}