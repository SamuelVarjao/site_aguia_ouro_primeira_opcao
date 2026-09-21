import type { NextConfig } from "next";
import { WORDPRESS_PATHS } from "./src/lib/routes";
import redirectMapProdutos from "./src/data/redirect-map-produtos.json";

/** Domínio público onde a LP vai rodar. */
const SITE_HOST = "farmaciaaguiadeouro.com.br";

/**
 * Origem do WordPress atual.
 *
 * Precisa ser o endereço DIRETO do servidor WordPress — não o domínio público.
 * Se apontar para farmaciaaguiadeouro.com.br, a LP passa a fazer proxy para si
 * mesma: cada acesso a /blog volta para o mesmo host, que reescreve de novo,
 * em laço, até a hospedagem cortar. É por isso que a checagem abaixo derruba o
 * build em vez de deixar passar.
 *
 * Formatos que servem, em ordem de preferência:
 *   https://wp.farmaciaaguiadeouro.com.br   (subdomínio novo apontando para o
 *                                            mesmo servidor de hoje)
 *   https://<host-de-origem-da-hospedagem>  (o "origin hostname" que a
 *                                            hospedagem fornece)
 *   http://<IP-do-servidor>                 (último recurso: quebra se o IP
 *                                            mudar e complica o certificado)
 */
const WORDPRESS_ORIGIN = process.env.WORDPRESS_ORIGIN?.replace(/\/$/, "") ?? "";

function originHost(value: string): string {
  try {
    return new URL(value).host.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

const isSelfReferencing =
  WORDPRESS_ORIGIN !== "" && originHost(WORDPRESS_ORIGIN) === SITE_HOST;

const LOOP_MESSAGE =
  `[aguia-de-ouro] WORDPRESS_ORIGIN aponta para ${SITE_HOST}, que é o próprio ` +
  `domínio da landing page. Isso faz o site reescrever para ele mesmo em laço.\n` +
  `Peça à hospedagem o endereço direto do servidor WordPress — um subdomínio ` +
  `como wp.${SITE_HOST}, o origin hostname da hospedagem, ou o IP.`;

if (isSelfReferencing) {
  if (process.env.NODE_ENV === "production") {
    // Falhar o build é melhor que publicar um laço de proxy.
    throw new Error(LOOP_MESSAGE);
  }
  console.warn(`\n${LOOP_MESSAGE}\nEm desenvolvimento, seguindo sem rewrites.\n`);
}

if (process.env.NODE_ENV === "production" && !WORDPRESS_ORIGIN) {
  console.warn(
    "\n[aguia-de-ouro] WORDPRESS_ORIGIN não definida: /blog vai retornar 404 " +
      "em produção até a migração dos posts terminar.\n",
  );
}

/**
 * /produto, /produtos e /necessidades: a farmácia descontinuou esse conteúdo
 * (virou catálogo da Vitrine Virtual). 86 URLs antigas — 57 com destino
 * específico (casado por nome contra a loja, ver README), 29 em fallback
 * para /servicos. /topico entra à parte porque a API do WordPress não expõe
 * a lista de termos — qualquer URL ali cai direto no mesmo fallback.
 *
 * Por que `trailingSlash: true` no site inteiro: toda URL antiga do
 * WordPress termina em barra (`/produto/{slug}/`). Com o padrão do Next
 * (`trailingSlash: false`), o próprio framework tira a barra ANTES de
 * consultar `redirects()` — nem `redirects()` nem Middleware conseguem
 * evitar isso, é um passo interno que roda primeiro, incondicional. O
 * resultado seria sempre 2 saltos (Next tira a barra, só depois redireciona
 * pra loja), o que a auditoria de SEO original proíbe. Com
 * `trailingSlash: true`, a barra final vira a forma canônica do site inteiro
 * — a URL antiga já chega no formato certo e resolve em 1 salto direto.
 * Contrapartida: toda página nova (Quem Somos, Serviços, blog, etc.) também
 * canoniza com barra no fim — ver `alternates.canonical` em cada página e
 * `sitemap.ts`.
 */
const PRODUTOS_FALLBACK = "/servicos";
const produtosRedirects = Object.entries(
  redirectMapProdutos as Record<string, string>,
).map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
}));

/**
 * Build estático para o GitHub Pages (`GITHUB_PAGES=true`).
 *
 * É uma PRÉVIA, não o site de produção. O Pages só entrega arquivos prontos,
 * então três coisas ficam de fora e voltam sozinhas na Vercel, onde a
 * variável não existe:
 *   - as rotas de API (formulário de contato e newsletter) não são geradas;
 *   - redirects() e rewrites() não existem em exportação estática, então os
 *     redirecionamentos do WordPress e o proxy do /blog não valem;
 *   - a otimização de imagens do Next é desligada.
 *
 * O site fica numa subpasta (github.io/<repo>/), daí o basePath. Ele é
 * repassado ao navegador em NEXT_PUBLIC_BASE_PATH: <Link> e <Image> já o
 * aplicam sozinhos, mas <a href="/..."> e fetch() precisam do helper
 * `url()` em src/lib/base-path.ts.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/site_aguia_ouro_primeira_opcao" : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isGithubPages ? { unoptimized: true } : {}),
  },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        // Com output: "export" e distDir próprio, o site pronto sai DIRETO
        // nesta pasta (não em out/) — é ela que o workflow publica. Ter pasta
        // separada evita atropelar um `npm run dev` que esteja usando a .next.
        distDir: ".next-pages",
      }
    : {
        async redirects() {
          return [
            ...produtosRedirects,
            {
              source: "/topico/:path*",
              destination: PRODUTOS_FALLBACK,
              permanent: true,
            },
          ];
        },
        async rewrites() {
          if (!WORDPRESS_ORIGIN || isSelfReferencing) return [];
          return WORDPRESS_PATHS.flatMap((path) => [
            { source: `/${path}`, destination: `${WORDPRESS_ORIGIN}/${path}` },
            {
              source: `/${path}/:path*`,
              destination: `${WORDPRESS_ORIGIN}/${path}/:path*`,
            },
          ]);
        },
      }),
};

export default nextConfig;
