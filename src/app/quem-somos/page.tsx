import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import Chalk from "@/components/Chalk";
import CtaBand from "@/components/CtaBand";
import Drawing from "@/components/Drawing";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { BUSINESS, SITE_URL, WHATSAPP_LINKS } from "@/lib/site";

const TITLE = "Quem Somos | Farmácia Águia de Ouro";
const DESCRIPTION =
  "Farmácia de manipulação em São Miguel Paulista desde 1988. A história da farmácia, as farmacêuticas responsáveis e o laboratório onde as fórmulas são preparadas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/quem-somos/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/quem-somos/`,
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
      name: "Quem somos",
      item: `${SITE_URL}/quem-somos/`,
    },
  ],
};

const PILARES = [
  {
    title: "Missão",
    text: "Promover a saúde para que nossos clientes tenham qualidade de vida.",
  },
  {
    title: "Visão",
    text: "Buscar constante evolução tecnológica nos processos de manipulação, para atender às demandas do crescimento científico e tecnológico do nosso tempo.",
  },
  {
    title: "Política da qualidade",
    text: "Compromisso com medicamentos manipulados confiáveis, eficazes e seguros, do recebimento da matéria-prima até a entrega da fórmula pronta.",
  },
] as const;

/**
 * `photo`: caminho em /public/img quando a foto chegar (ex.:
 * "/img/farmaceutica-midia.jpg", retrato 4:5). Enquanto for null, o cartão
 * mostra o espaço reservado.
 */
const FARMACEUTICAS: ReadonlyArray<{
  name: string;
  crf: string;
  photo: string | null;
  formacao: readonly string[];
}> = [
  {
    name: "Dra. Midiã Varjão",
    photo: null,
    crf: "CRF-SP 44084",
    formacao: [
      "Farmácia Clínica, Universidade Mogi das Cruzes (concluído em novembro de 2017)",
      "Manipulação Magistral Alopática, Instituto Racine (concluído em novembro de 2010)",
      "Farmácia Industrial, Universidade Brás Cubas, Mogi das Cruzes (concluído em julho de 2007)",
    ],
  },
  {
    name: "Dra. Juliana Araujo",
    photo: null,
    crf: "CRF-SP 48533",
    formacao: [
      "Graduação em Farmácia (2009)",
      "Pós-graduação em Farmacologia Clínica e Farmacoterapia (2014)",
      "Pós-graduação em Medicina Funcional Integrativa (2026)",
    ],
  },
];

const PILAR_TONE = ["bg-pastel-navy", "bg-pastel-gold", "bg-pastel-gray"];

export default function QuemSomosPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Quem somos"
        title="Uma farmácia que ainda acredita na dedicação."
        lead="Desde 1988, sempre com o mesmo princípio de manipular com excelência."
        drawing="logo_antiga"
        tone="gray"
      />

      {/* História — aqui fica a foto real de 1988. */}
      <section className="overflow-hidden py-12 md:py-24">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal
              variant="left"
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -top-6 -left-5 h-full w-[88%] -rotate-2 bg-pastel-gold md:-top-8 md:-left-8"
              />
              <div className="relative rotate-1 bg-white p-3 pb-12 shadow-lg md:p-4 md:pb-14">
                <Photo
                  src="/img/fundador-1988.jpg"
                  alt="Antônio Cesar no laboratório da farmácia, nos primeiros anos"
                  hint="Foto histórica, 16:9, sem filtro"
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 512px, 92vw"
                  className="aspect-16/9 w-full rounded-none shadow-none"
                />
                <p className="t-quote absolute right-5 bottom-3 left-5 text-center text-[1.125rem] text-navy-900/70">
                  Antônio Cesar, nos primeiros anos
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="eyebrow">Desde fevereiro de 1988</p>
              <h2 className="t-h2 measure mt-4">
                Como{" "}
                <span className="relative inline-block">
                  começou
                  <Chalk
                    shape="underline"
                    draw
                    className="absolute -bottom-3 left-0 h-4 w-full text-gold-400"
                  />
                </span>
              </h2>
              <p className="t-body measure mt-8 text-navy-900/80">
                A Farmácia Águia de Ouro foi fundada em fevereiro de 1988, em
                São Miguel Paulista, por Antônio Cesar. Paranaense, ele começou
                a trabalhar em farmácia ainda adolescente e chegou a São Paulo
                já com experiência de balcão. Abriu a farmácia aos 29 anos, com
                um farmacêutico como único colaborador, para fazer as coisas do
                seu jeito, com qualidade e autenticidade.
              </p>
              <p className="t-body measure mt-4 text-navy-900/80">
                Passados trinta e oito anos, a farmácia segue com o mesmo sonho:
                manipular com excelência. Boa parte de quem chega hoje veio
                porque a mãe ou a avó já confiava em nós.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Laboratório — fotos reais, que antes ficavam na home. */}
      <section className="overflow-hidden py-12 md:py-24">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Nosso laboratório</p>
              <h2 className="t-h2 measure mt-4">
                Onde a sua fórmula é preparada
              </h2>
              <p className="t-body measure mt-6 text-navy-900/80">
                A receita passa pela farmacêutica responsável antes de qualquer
                coisa ser pesada. É ela quem decide se a fórmula vai para a
                bancada do jeito que foi pedida ou se vale uma ligação para o
                consultório antes.
              </p>
            </Reveal>

            <Reveal variant="scale" className="relative">
              <div
                aria-hidden="true"
                className="absolute top-10 -right-5 bottom-10 left-[20%] bg-pastel-navy md:-right-10"
              />
              <div className="relative grid gap-4 lg:gap-5">
                <Photo
                  src="/img/lab-manipulacao.jpg"
                  alt="Farmacêutica preparando cápsulas na encapsuladora do laboratório"
                  hint="Foto do laboratório, 3:2"
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className="aspect-3/2"
                />
                <div className="grid grid-cols-2 gap-4 lg:gap-5">
                  <Photo
                    src="/img/lab-balanca.jpg"
                    alt="Balança de precisão e gral de porcelana na bancada de pesagem"
                    hint="Foto do laboratório, 4:3"
                    sizes="(min-width: 1024px) 25vw, 45vw"
                    className="aspect-4/3"
                  />
                  <Photo
                    src="/img/lab-paramentacao.jpg"
                    alt="Entrada da área de paramentação e do laboratório de antibióticos"
                    hint="Foto do laboratório, 4:3"
                    sizes="(min-width: 1024px) 25vw, 45vw"
                    className="aspect-4/3"
                    imgClassName="object-top"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Missão, visão e valores */}
      <section className="py-12 md:py-24">
        <div className="container-page">
          <Reveal className="text-center">
            <p className="eyebrow">O que nos guia</p>
            <h2 className="t-h2 mx-auto mt-4 max-w-[20ch]">
              Missão, visão e valores
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {PILARES.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 90}
                className={`p-7 md:p-9 ${PILAR_TONE[i]}`}
              >
                <h3 className="t-h3">{item.title}</h3>
                <Chalk shape="squiggle" className="mt-3 w-20 text-gold-600" />
                <p className="t-body mt-4 text-navy-900/80">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Farmacêuticas */}
      <section className="py-12 md:py-24">
        <div className="container-page">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <Reveal>
              <p className="eyebrow">Responsabilidade técnica</p>
              <h2 className="t-h2 measure mt-4">Nossas farmacêuticas</h2>
              <p className="t-lead measure mt-4 text-navy-900/80">
                Toda fórmula que sai daqui tem a assinatura de uma farmacêutica
                registrada no CRF-SP.
              </p>
            </Reveal>
            <Drawing
              name="estetoscopio"
              sizes="220px"
              className="hidden w-52 rotate-6 md:block"
            />
          </div>

          <ul className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {FARMACEUTICAS.map((item, i) => (
              <Reveal
                as="li"
                key={item.name}
                delay={i * 90}
                className="lift border border-border-subtle bg-white p-6 md:p-9"
              >
                <div className="flex items-center gap-5 sm:gap-6">
                  <Photo
                    src={item.photo}
                    alt={`Foto de ${item.name}`}
                    hint="Foto em breve"
                    sizes="(min-width: 640px) 144px, 112px"
                    className="aspect-4/5 w-28 shrink-0 rounded-none shadow-none sm:w-36"
                  />
                  <div className="min-w-0">
                    <h3 className="t-h2 text-[1.625rem] md:text-[1.75rem]">
                      {item.name}
                    </h3>
                    <p className="t-small mt-1 text-navy-900/60">{item.crf}</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-6">
                  {item.formacao.map((linha) => (
                    <li key={linha} className="flex gap-3">
                      <GraduationCap
                        className="mt-0.5 h-5 w-5 shrink-0 text-gold-600"
                        aria-hidden="true"
                      />
                      <span className="t-small text-navy-900/80">{linha}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-12 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Balcão</p>
            <h2 className="t-h2 measure mt-4">Equipe</h2>
            <p className="t-lead measure mt-4 text-navy-900/80">
              No balcão e no WhatsApp, quem atende é a equipe da farmácia. São
              elas que avisam quando a sua fórmula fica pronta.
            </p>
          </Reveal>

          {/* PENDENTE: fotos e bios da equipe, a caminho do cliente. */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={n * 80}>
                <Photo
                  src={null}
                  alt=""
                  hint="Foto em breve"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="aspect-4/5 w-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Regularidade */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <Reveal className="flex flex-col items-start gap-6 border-y border-border-subtle py-10 sm:flex-row sm:items-center sm:gap-10">
            <Drawing
              name="selo_qualidade"
              sizes="112px"
              className="w-24 shrink-0 -rotate-6 md:w-28"
            />
            <div>
              <h2 className="t-h3">Regularidade e autorizações</h2>
              <p className="t-body mt-3 text-navy-900/80">
                {BUSINESS.licenses.ae}
                <span aria-hidden="true" className="mx-2 text-gold-600">
                  ·
                </span>
                {BUSINESS.licenses.afe}
                <br className="sm:hidden" />
                <span
                  aria-hidden="true"
                  className="mx-2 hidden text-gold-600 sm:inline"
                >
                  ·
                </span>
                {BUSINESS.licenses.crfCertificate}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Quer conhecer de perto?"
        lead="Mande a sua receita pelo WhatsApp ou apareça no balcão, na Marechal Tito."
        href={WHATSAPP_LINKS.quemSomos}
        origem="quem-somos"
        label="Enviar receita pelo WhatsApp"
      />
    </main>
  );
}
