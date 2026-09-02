import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import { HashScroll } from "@/components/hash-scroll"
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

// TODO: ajuste para o domínio real de produção.
const SITE_URL = "https://www.bitzy.com.br"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // ajuste para a cor de marca do Bitzy
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bitzy",
    template: "%s | Bitzy",
  },
  description:
    "Quem ama cuida nunca fez tanto sentido. Com o Bitzy seu PET terá muito mais qualidade de vida.",
  keywords: [
    "pet shop",
    "saúde pet",
    "diagnóstico pet shop",
    "CRM pet shop",
    "clube de assinatura pet",
    "sistema para pet shop",
  ],
  openGraph: {
    title: "Bitzy",
    description:
      "Quem ama cuida nunca fez tanto sentido. Com o Bitzy seu PET terá muito mais qualidade de vida.",
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Bitzy",
    images: [
      {
        url: "/og-image.jpg", // TODO: criar imagem 1200x630px
        width: 1200,
        height: 630,
        alt: "Bitzy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitzy",
    description:
      "Quem ama cuida nunca fez tanto sentido. Com o Bitzy seu PET terá muito mais qualidade de vida.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Após verificar a propriedade no Google Search Console, cole o código aqui:
  // verification: { google: "codigo-de-verificacao" },
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      {GTM_ID ? (
        <head>
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        </head>
      ) : null}
      <body className={`font-sans ${poppins.variable} ${fredoka.variable}`}>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <Suspense fallback={null}>
          <HashScroll />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}