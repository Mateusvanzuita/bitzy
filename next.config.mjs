/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Otimização ligada: WebP/AVIF automático, resize por breakpoint,
    // lazy-load nativo. Impacta diretamente o LCP e, por consequência, o
    // Quality Score de Google Ads e a taxa de conversão da landing page.
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    // Se alguma imagem vier de domínio externo (CDN, CMS), declare aqui:
    remotePatterns: [{ protocol: "https", hostname: "i.imgur.com" }],
  },
}

export default nextConfig