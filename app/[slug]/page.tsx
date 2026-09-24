import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { QrLanding } from "@/components/qr/qr-landing"
import { SLUGS_QR, isSlugValido } from "@/lib/parceiros-qr"

// Qualquer caminho fora da lista cai no 404.
export const dynamicParams = false

export function generateStaticParams() {
  return SLUGS_QR.map((slug) => ({ slug }))
}

// Página de campanha: fora do Google.
export const metadata: Metadata = {
  title: "Conheça o Bitzy",
  robots: { index: false, follow: false },
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isSlugValido(slug)) notFound()
  return <QrLanding slug={slug} />
}