/**
 * Prefixo de subpasta, preenchido só no build do GitHub Pages
 * (NEXT_PUBLIC_BASE_PATH, definido em next.config.ts). Na Vercel fica vazio e
 * tudo continua na raiz do domínio.
 *
 * <Link> e <Image> do Next já aplicam o basePath sozinhos. Este helper é para
 * o que o Next não toca: <a href="/..."> escrito à mão e chamadas de fetch().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Caminho interno pronto para href/fetch. Endereços externos passam intactos. */
export function url(path: string): string {
  return path.startsWith("http") ? path : `${BASE_PATH}${path}`;
}
