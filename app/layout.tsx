import type React from "react"
import type { Metadata } from "next"
import { Poppins, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bitzy — A IA melhor amiga do seu PET",
  description: "Quem ama cuida nunca fez tanto sentido. Com o Bitzy seu PET terá muito mais qualidade de vida.",
  generator: "v0.app",
  openGraph: {
    title: "Bitzy — A IA melhor amiga do seu PET",
    description: "Quem ama cuida nunca fez tanto sentido. Com o Bitzy seu PET terá muito mais qualidade de vida.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${poppins.variable} ${fredoka.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
