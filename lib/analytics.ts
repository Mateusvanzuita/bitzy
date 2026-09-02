// Helper central de tracking. Empurra eventos para o dataLayer do GTM, que
// pode então espelhar cada evento para GA4, Meta Pixel (fbq) e Google Ads
// Conversion sem precisar tocar neste arquivo de novo.

export type EventoDiagnostico =
  | "diagnostico_inicio" // clicou "Calcular meu potencial" no hero
  | "diagnostico_lead_parcial" // preencheu whatsapp na pré-captura (antes do quiz)
  | "diagnostico_pergunta" // respondeu/avançou uma etapa do quiz
  | "diagnostico_resultado" // chegou na tela de resultado
  | "diagnostico_quer_falar" // clicou "Quero falar com o Bitzy"
  | "diagnostico_lead_completo" // enviou o formulário final (nome/email/cidade)
  | "diagnostico_whatsapp_click" // clicou no link que abre o WhatsApp de fato

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvento(evento: EventoDiagnostico, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: evento, ...params })
  } catch {
    // tracking nunca deve quebrar a experiência do usuário
  }
}