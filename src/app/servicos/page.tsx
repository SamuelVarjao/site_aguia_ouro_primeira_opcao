import type { Metadata } from "next";
import { ClipboardCheck, Stethoscope, Truck } from "lucide-react";
import Chalk from "@/components/Chalk";
import CtaBand from "@/components/CtaBand";
import CtaLink from "@/components/CtaLink";
import Drawing from "@/components/Drawing";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE_URL, WHATSAPP_LINKS } from "@/lib/site";

const TITLE = "Serviços | Farmácia Águia de Ouro";
const DESCRIPTION =
  "Manipulação dermatológica, hormonal, capilar, pediátrica, ortomolecular, fitoterápica, para emagrecimento, suplementação e desempenho físico. Atendimento farmacêutico e entrega em São Paulo.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/servicos/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/servicos/`,
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
      name: "Serviços",
      item: `${SITE_URL}/servicos/`,
    },
  ],
};

const ESPECIALIDADES = [
  {
    title: "Dermatológica",
    text: "Cremes, séruns e loções com a concentração de ativos que a sua pele precisa, seguindo o que está na receita.",
  },
  {
    title: "Hormonal e ginecológica",
    text: "Reposição hormonal e fórmulas ginecológicas manipuladas conforme a prescrição, na forma indicada pelo médico.",
  },
  {
    title: "Emagrecimento",
    text: "Fórmulas para acompanhar o emagrecimento. Essa linha só é manipulada com receita.",
  },
  {
    title: "Ortomolecular",
    text: "Vitaminas, minerais e antioxidantes nas doses e combinações definidas pelo seu médico ou nutricionista.",
  },
  {
    title: "Capilar",
    text: "Loções e tônicos para tratamento capilar feitos sob medida, como o minoxidil na concentração que foi prescrita.",
  },
  {
    title: "Pediátrica",
    text: "Doses e sabores pensados para crianças, sempre a partir da receita do pediatra.",
  },
  {
    title: "Suplementação",
    text: "Suplementos em cápsula, sachê ou pó, montados com os ativos e as quantidades da sua prescrição.",
  },
  {
    title: "Fitoterápicos",
    text: "Extratos de plantas medicinais padronizados, em cápsulas, tinturas ou cremes, com a dosagem receitada.",
  },
  {
    title: "Desempenho físico",
    text: "Fórmulas para quem treina, com ativos para energia, recuperação e ganho de massa, conforme a orientação do profissional que acompanha você.",
  },
] as const;

/** Fichas levemente inclinadas, alternando os três pastéis. */
const CARD = [
  { bg: "bg-pastel-navy", r: "-1deg" },
  { bg: "bg-pastel-gold", r: "0.8deg" },
  { bg: "bg-pastel-gray", r: "-0.6deg" },
];

const ATENDIMENTO = [
  {
    Icon: Stethoscope,
    title: "Atendimento farmacêutico",
    text: "Toda receita é conferida por uma farmacêutica antes de ir para o laboratório. Ela confere a dose, a forma farmacêutica e se os ativos combinam entre si.",
  },
  {
    Icon: Truck,
    title: "Entrega em São Paulo",
    text: "Entregamos na cidade de São Paulo. Você acompanha o preparo pela mesma conversa de WhatsApp em que mandou a receita.",
  },
  {
    Icon: ClipboardCheck,
    title: "Atendimento particular",
    text: "Não atendemos por convênio ou plano de saúde. O orçamento é passado antes de começarmos a manipular.",
  },
] as const;

export default function ServicosPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Serviços"
        title="Cada fórmula manipulada é única!"
        lead="Trabalhamos com diversas especialidades de manipulação."
        drawing="pote_capsula"
        tone="gold"
      />

      <section className="py-12 md:py-24">
        <div className="container-page">
          <Reveal className="text-center">
            <p className="eyebrow">Com prescrição</p>
            <h2 className="t-h2 mx-auto mt-4 max-w-[20ch]">
              Especialidades de manipulação
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-8">
            {ESPECIALIDADES.map((item, i) => {
              const card = CARD[i % CARD.length];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(i % 3) * 90}
                  variant={i % 2 ? "right" : "left"}
                >
                  <div
                    className={`lift h-full p-7 md:p-9 ${card.bg}`}
                    style={
                      { rotate: card.r, "--r": card.r } as React.CSSProperties
                    }
                  >
                    <span className="t-numeral text-[2.25rem] text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="t-h3 mt-4">{item.title}</h3>
                    <p className="t-body mt-3 text-navy-900/80">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}

            {/* "Entre outras": ocupa a linha inteira e convida a consultar,
                em vez de fingir que a lista acima é completa. */}
            <Reveal
              as="li"
              variant="scale"
              className="sm:col-span-2 lg:col-span-3"
            >
              <div className="board relative flex flex-col items-start gap-6 overflow-hidden p-7 sm:flex-row sm:items-center sm:justify-between md:p-10">
                <Chalk
                  shape="stars"
                  className="absolute top-4 right-4 w-12 text-gold-400 md:w-16"
                />
                <div>
                  <span className="t-numeral text-[2.25rem] text-gold-400">
                    +
                  </span>
                  <h3 className="t-h3 mt-3 text-white">Entre outras</h3>
                  <p className="t-body measure mt-3 text-white/80">
                    Não encontrou a sua receita nessas descrições? Fale com a
                    gente antes de desistir. Manipulamos muitas outras fórmulas,
                    e respondemos rapidinho se a sua pode ser feita aqui.
                  </p>
                </div>
                <CtaLink
                  href={WHATSAPP_LINKS.servicos}
                  event="contato_whatsapp"
                  origem="servicos-entre-outras"
                  className="btn btn-gold w-full shrink-0 sm:w-auto"
                >
                  Consultar pelo WhatsApp
                </CtaLink>
              </div>
            </Reveal>
          </ul>

          {/* Dizer o que não fazemos evita receita recusada só na hora da
              entrega. */}
          <Reveal className="mx-auto mt-14 flex max-w-3xl flex-col items-start gap-5 border-l-4 border-gold-400 bg-white px-6 py-6 sm:flex-row sm:items-center md:px-8">
            <Drawing
              name="frasco"
              sizes="72px"
              className="w-16 shrink-0 -rotate-6"
            />
            <p className="t-small text-navy-900/80">
              Não manipulamos fórmulas injetáveis, homeopáticas, de uso ocular
              ou de baixo índice terapêutico. Se estiver em dúvida, mande uma
              foto da receita pelo WhatsApp e a gente confirma, sem compromisso.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-page">
          <div className="board relative overflow-hidden px-6 py-12 sm:px-10 md:px-14 md:py-16">
            <Chalk
              shape="blob"
              className="absolute -top-20 -right-24 w-80 text-white/[0.05]"
            />
            <ul className="relative grid gap-12 md:grid-cols-3 md:gap-10">
              {ATENDIMENTO.map(({ Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 110}>
                  <span className="relative grid size-16 place-items-center">
                    <Chalk
                      shape="circle"
                      draw
                      className="absolute inset-0 size-full text-gold-400"
                    />
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.4}
                      className="size-7 text-white"
                    />
                  </span>
                  <h3 className="t-h3 mt-5 text-white">{title}</h3>
                  <p className="t-body mt-2 text-white/75">{text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Tem uma receita em mãos?"
        lead="Mande uma foto pelo WhatsApp e receba o orçamento antes de começarmos a manipular."
        href={WHATSAPP_LINKS.servicos}
        origem="servicos"
        label="Enviar receita pelo WhatsApp"
      />
    </main>
  );
}
