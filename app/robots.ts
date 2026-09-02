import type { MetadataRoute } from "next"

// TODO: ajuste para o domínio real de produção.
const SITE_URL = "https://www.bitzy.com.br"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/diagnostico", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}