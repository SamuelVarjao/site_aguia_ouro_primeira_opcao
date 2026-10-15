import Chalk from "./Chalk";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { url } from "@/lib/base-path";
import {
  BLOG_URL,
  BUSINESS,
  FACEBOOK_URL,
  INSTAGRAM,
  SITE_URL,
  TIKTOK_URL,
  WHATSAPP_LINKS,
  storeUrl,
} from "@/lib/site";

/**
 * `gaEvent`/`gaOrigem` viram `data-ga-event`/`data-ga-origem` no HTML — o
 * listener delegado do SiteInteractions lê esses atributos em qualquer
 * elemento, então não é preciso um componente de cliente por link.
 */
const LINKS = [
  { label: "Quem somos", href: "/quem-somos/", gaEvent: "link_institucional" },
  { label: "Blog", href: BLOG_URL, gaEvent: "link_institucional" },
  {
    label: "Vitrine Virtual",
    href: storeUrl("rodape"),
    gaEvent: "ir_para_loja",
  },
  { label: "Instagram", href: INSTAGRAM.url, gaEvent: "instagram_click" },
  { label: "Facebook", href: FACEBOOK_URL, gaEvent: "facebook_click" },
  { label: "TikTok", href: TIKTOK_URL, gaEvent: "tiktok_click" },
  {
    label: "Política de privacidade",
    href: "/politica-de-privacidade/",
    gaEvent: "link_institucional",
  },
  {
    label: "Termos de uso",
    href: "/termos-de-uso/",
    gaEvent: "link_institucional",
  },
] as const;

/**
 * Glifo do Instagram desenhado à mão: a lucide v1 não traz mais ícones de
 * marca, e um ícone genérico não seria reconhecido como rede social.
 */
function InstagramMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative size-6 text-gold-400"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/**
 * Credenciais em texto real, nunca em imagem: para conteúdo de saúde, o
 * farmacêutico responsável visível é um dos sinais que sustentam o
 * posicionamento.
 */
export default function Footer() {
  return (
    <footer className="surface-dark board relative overflow-hidden pt-20 pb-12 text-white md:pt-24">
      <Chalk
        shape="blob-tall"
        parallax={0.12}
        className="absolute -right-24 bottom-24 w-56 rotate-[35deg] text-white/[0.06] md:w-80"
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <Logo size="footer" />
          </Reveal>

          <Reveal className="flex items-center gap-4 md:max-w-md">
            <span
              aria-hidden="true"
              className="relative grid size-14 shrink-0 place-items-center"
            >
              <Chalk
                shape="circle"
                className="absolute inset-0 size-full text-gold-400"
              />
              <InstagramMark />
            </span>
            <div>
              <p className="t-h3">Acompanhe o dia a dia da farmácia</p>
              <p className="t-small mt-1 text-white/70">
                Mostramos o laboratório por dentro e o que chega de novo por
                aqui.{" "}
                <a
                  href={INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="instagram_click"
                  data-ga-origem="rodape-topo"
                  className="font-semibold whitespace-nowrap text-gold-400 underline underline-offset-4"
                >
                  Seguir {INSTAGRAM.handle}
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid border-t border-white/15 pt-12 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.3fr_0.85fr_1fr_1.25fr]">
          <Reveal>
            <h2 className="eyebrow eyebrow-light">Contato</h2>
            <address className="t-small mt-4 text-white/75 not-italic">
              Av. Marechal Tito, 677, 1º andar, sala 23
              <br />
              {BUSINESS.district}, {BUSINESS.city}/{BUSINESS.region}, CEP{" "}
              {BUSINESS.postalCode}
              <br />
              <span className="mt-3 block">
                Telefone:{" "}
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  data-ga-event="contato_telefone"
                  data-ga-origem="rodape"
                  className="link-chalk"
                >
                  {BUSINESS.phone}
                </a>
              </span>
              <span className="block">
                WhatsApp:{" "}
                <a
                  href={WHATSAPP_LINKS.rodape}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="contato_whatsapp"
                  data-ga-origem="rodape-texto"
                  className="link-chalk"
                >
                  {BUSINESS.whatsapp}
                </a>
              </span>
              <a
                href={`mailto:${BUSINESS.email}`}
                data-ga-event="contato_email"
                data-ga-origem="rodape"
                className="link-chalk inline-block [overflow-wrap:anywhere]"
              >
                {BUSINESS.email}
              </a>
            </address>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="eyebrow eyebrow-light">Horário</h2>
            <p className="t-small mt-4 text-white/75">
              {BUSINESS.hours.weekdays}
              <br />
              {BUSINESS.hours.saturday}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <h2 className="eyebrow eyebrow-light">Links</h2>
            <ul className="t-small mt-4 flex flex-col gap-2 text-white/75">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={url(link.href)}
                    className="link-chalk"
                    data-ga-event={link.gaEvent}
                    data-ga-origem={`rodape-links:${link.label}`}
                    {...(link.href.startsWith("http") &&
                    !link.href.startsWith(SITE_URL)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={270}>
            <h2 className="eyebrow eyebrow-light">Responsabilidade técnica</h2>
            <p className="t-small mt-4 text-white/75">
              Farmacêutica responsável: {BUSINESS.pharmacist.name},{" "}
              <span className="whitespace-nowrap">
                {BUSINESS.pharmacist.crf}
              </span>
              <br />
              {BUSINESS.licenses.ae}
              <br />
              {BUSINESS.licenses.afe}
              <br />
              {BUSINESS.licenses.crfCertificate}
            </p>
          </Reveal>
        </div>

        <p className="t-small mt-14 border-t border-white/15 pt-8 text-white/60">
          {BUSINESS.legalName}, CNPJ {BUSINESS.cnpj}
        </p>
      </div>
    </footer>
  );
}
