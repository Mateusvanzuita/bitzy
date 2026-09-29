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

  // Lote novo (sufixo aleatório 4343)
  "aviarioagrocosta4343", // AVIÁRIO AGROCOSTA
  "cawnpetshop4343", // CAWN PET SHOP
  "aviarioitamarati4343", // AVIÁRIO ITAMARATI
  "aviariopetumbara4343", // AVIÁRIO PET UMBARA
  "petpescaresende4343", // PET PESCA RESENDE
  "estacaodopetcwb4343", // ESTAÇÃO DO PET CWB
  "agropecuariafenix4343", // AGROPECUÁRIA FENIX
  "aviariosutil4343", // AVIÁRIO SUTIL
  "aviariosharipets4343", // AVIARIO SHARIPETS
  "aviariosharipet4343", // AVIÁRIO SHARIPET
  "agropetvilela4343", // AGROPET VILELA
  "paradapetpetshop4343", // PARADA PET- PETSHOP LTDA
  "balestrapets4343", // BALESTRA PETS
  "mirapet4343", // MIRAPET
  "aviarioplumareal4343", // AVIARIO PLUMA REAL
  "petshopmeudogcaramelo4343", // PET SHOP MEU DOG CARAMELO
] as const

export type SlugQr = (typeof SLUGS_QR)[number]

export function isSlugValido(slug: unknown): slug is SlugQr {
  return typeof slug === "string" && (SLUGS_QR as readonly string[]).includes(slug)
}