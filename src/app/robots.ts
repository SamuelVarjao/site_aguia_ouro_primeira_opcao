import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Gerado no build. Necessário para a exportação estática do GitHub Pages,
 *  e inofensivo na Vercel: o arquivo já era estático. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Nunca bloquear CSS/JS (_next/static) — impede o Googlebot de renderizar
    // a página. /api/ é o único disallow: rota técnica, não conteúdo — e o
    // endpoint em si já responde X-Robots-Tag: noindex e 405 a GET.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
