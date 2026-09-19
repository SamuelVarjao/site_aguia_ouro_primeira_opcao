import type { Metadata } from "next";
import Chalk from "@/components/Chalk";
import ContactForm from "@/components/ContactForm";
import CtaLink from "@/components/CtaLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BUSINESS, SITE_URL, WHATSAPP_LINKS } from "@/lib/site";

const TITLE = "Contato | Farmácia Águia de Ouro";
const DESCRIPTION =
  "Fale com a Farmácia Águia de Ouro: endereço, telefone, WhatsApp, horário de atendimento e formulário de contato.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contato/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/contato/`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contato",
      item: `${SITE_URL}/contato/`,
    },
  ],
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Av. Marechal Tito, 677, São Miguel Paulista, São Paulo/SP",
  );

export default function ContatoPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Contato"
        title="Fale Conosco"
        lead="Para orçamento, envie sua receita ou solicitação pelo WhatsApp. Se preferir, você também pode falar com a gente pelo formulário abaixo."
        drawing="like"
        tone="navy"
      />

      <section className="pb-20 md:pb-28">
        <div className="container-page grid items-start gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -top-5 -left-4 h-full w-full -rotate-1 bg-pastel-gold md:-top-7 md:-left-7"
            />
            <div className="relative bg-white px-6 py-10 shadow-lg md:px-10 md:py-12">
              <p className="eyebrow">Formulário</p>
              <h2 className="t-h2 mt-3">Envie uma mensagem</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:pt-6">
            <p className="eyebrow">Outros canais</p>
            <h2 className="t-h2 mt-3">
              Venha nos{" "}
              <span className="relative inline-block">
                visitar
                <Chalk
                  shape="underline"
                  draw
                  className="absolute -bottom-3 left-0 h-4 w-full text-gold-400"
                />
              </span>
            </h2>

            <dl className="mt-10 flex flex-col gap-8">
              <div>
                <dt className="label text-[0.75rem] text-gold-600">Endereço</dt>
                <dd className="t-body mt-2 text-navy-900/85">
                  <address className="not-italic">
                    Av. Marechal Tito, 677, 1º andar, sala 23
                    <br />
                    {BUSINESS.district}, {BUSINESS.city}/{BUSINESS.region}, CEP{" "}
                    {BUSINESS.postalCode}
                  </address>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ga-event="link_institucional"
                    data-ga-origem="contato-mapa"
                    className="link-chalk mt-2 inline-block font-semibold"
                  >
                    Ver no mapa →
                  </a>
                </dd>
              </div>

              <div>
                <dt className="label text-[0.75rem] text-gold-600">
                  Telefone e e-mail
                </dt>
                <dd className="t-body mt-2 text-navy-900/85">
                  <a
                    href={`tel:${BUSINESS.phoneE164}`}
                    data-ga-event="contato_telefone"
                    data-ga-origem="contato"
                    className="link-chalk"
                  >
                    {BUSINESS.phone}
                  </a>
                  <br />
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    data-ga-event="contato_email"
                    data-ga-origem="contato"
                    className="link-chalk [overflow-wrap:anywhere]"
                  >
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="label text-[0.75rem] text-gold-600">Horário</dt>
                <dd className="t-body mt-2 text-navy-900/85">
                  {BUSINESS.hours.weekdays}
                  <br />
                  {BUSINESS.hours.saturday}
                </dd>
              </div>
            </dl>

            <div className="board mt-10 flex flex-col items-start gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="t-h3 text-white">Orçamento de receita?</p>
              <CtaLink
                href={WHATSAPP_LINKS.contato}
                event="contato_whatsapp"
                origem="contato"
                className="btn btn-gold w-full whitespace-nowrap sm:w-auto"
              >
                Falar pelo WhatsApp
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
