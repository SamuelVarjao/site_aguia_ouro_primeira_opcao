import Link from "next/link";
import CtaLink from "./CtaLink";
import Logo from "./Logo";
import { url } from "@/lib/base-path";
import { BLOG_URL, WHATSAPP_LINKS, storeUrl } from "@/lib/site";

const LINKS = [
  { label: "Serviços", href: "/servicos/" },
  { label: "Quem somos", href: "/quem-somos/" },
  { label: "Blog", href: BLOG_URL },
  { label: "Contato", href: "/contato/" },
] as const;

/**
 * Barra clara, como papel. No mobile ficam logo, Vitrine Online e o CTA: os
 * links institucionais (Blog entre eles) aparecem só do tablet para cima, em
 * caixa alta espaçada.
 *
 * O data-nav é o gancho do SiteInteractions, que marca data-scrolled quando a
 * página sai do topo.
 */
export default function Nav() {
  return (
    <header
      data-nav
      data-scrolled="false"
      className="nav-bar fixed inset-x-0 top-0 z-50 h-[var(--nav-height)]"
    >
      <div className="container-page flex h-full items-center justify-between gap-3 sm:gap-4">
        <Link href="/" aria-label="Página inicial" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="label flex items-center gap-8 text-[0.75rem] text-navy-900">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={url(link.href)}
                  data-ga-event="link_institucional"
                  data-ga-origem={`navegacao:${link.label}`}
                  className="link-chalk"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <CtaLink
            href={storeUrl("nav")}
            event="ir_para_loja"
            origem="navegacao"
            className="btn btn-nav btn-ghost-navy"
          >
            Vitrine Online
          </CtaLink>
          <CtaLink
            href={WHATSAPP_LINKS.nav}
            event="contato_whatsapp"
            origem="navegacao"
            className="btn btn-nav btn-navy"
          >
            Enviar receita
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
