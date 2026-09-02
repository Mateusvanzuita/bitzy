/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Mantido em produção: um erro de lint não deve chegar até o site que
    // recebe tráfego pago sem que ninguém perceba.
    ignoreDuringBuilds: false,
  },
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
    // remotePatterns: [{ protocol: "https", hostname: "seu-cdn.com" }],
  },
}

export default nextConfig
