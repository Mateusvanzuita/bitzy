// Slugs dos QR codes distribuídos nos panfletos (bitzy.com.br/<slug>).
// Para adicionar um novo pet shop, basta incluir o slug aqui.
export const SLUGS_QR = [
  "paradaanimal1122",
  "armazen1122",
  "pitica1122",
  "reino1122",
  "mediato1122",
  "apego1122",
  "caximba1122",
  "out1122",
  "amordi1122",
  "mangabinha1122",
  "casa1122",
  "nutro1122",
  "rino1122",
  "fofurice1122",
  "trilha1122",
  "mimados1122",
  "avinack1122",
  "lully1122",
  "asa1122",
  "puppys1122",
  "nutribem1122",
  "mundoanimal1122",
  "mrpet1122",
  "parana1122",
  "cardeal1122",

  // QR code genérico, não associado a um pet shop específico.
  "petshops10",
] as const

export type SlugQr = (typeof SLUGS_QR)[number]

export function isSlugValido(slug: unknown): slug is SlugQr {
  return typeof slug === "string" && (SLUGS_QR as readonly string[]).includes(slug)
}