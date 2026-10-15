import {
  ClipboardCheck,
  FileCheck2,
  Scale,
  type LucideIcon,
} from "lucide-react";
import Chalk from "./Chalk";
import CtaLink from "./CtaLink";
import Drawing from "./Drawing";
import Reveal from "./Reveal";
import { url } from "@/lib/base-path";
import { WHATSAPP_LINKS } from "@/lib/site";

const POINTS: Array<{ Icon: LucideIcon; title: string; text: string }> = [
  {
    Icon: ClipboardCheck,
    title: "Conferência farmacêutica",
    text: "Nenhuma fórmula é manipulada sem passar pela análise de uma farmacêutica. É como fazemos há 38 anos.",
  },
  {
    Icon: FileCheck2,
    title: "Matéria-prima com laudo",
    text: "Trabalhamos apenas com fornecedores competentes que enviam laudo de análise por lote. Ativos com selo de autenticidade, como o Verisol, chegam lacrados e são conferidos na entrada.",
  },
  {
    Icon: Scale,
    title: "Registro de cada etapa",
    text: "Pesagem em balança calibrada e tudo anotado na ordem de manipulação. Se precisar conferir uma fórmula daqui a dois anos, o registro está guardado.",
  },
];

/**
 * Dois blocos, como a referência: o grande dourado pastel ("We created
 * Pebble…") com os três pilares, e em seguida uma lousa com o desenho da
 * manipulação.
 */
export default function Authority() {
  return (
    <section className="relative overflow-hidden py-14 md:py-28">
      <div className="container-page">
        {/* Bloco dourado */}
        <Reveal className="relative md:ml-[5%]">
          <div className="relative bg-pastel-gold px-6 pt-24 pb-10 sm:px-10 md:px-14 md:pt-16 md:pb-16">
            <Drawing
              name="estetoscopio"
              sizes="(min-width: 768px) 300px, 150px"
              className="absolute -top-10 right-2 w-[150px] rotate-[8deg] md:-top-16 md:right-6 md:w-[220px] lg:-top-20 lg:right-10 lg:w-[300px]"
            />

            <p className="eyebrow">Por dentro da farmácia</p>
            <h2 className="t-h2 mt-4 max-w-[18ch] md:max-w-[15ch] lg:max-w-[18ch]">
              O que acontece depois que a receita chega
            </h2>

            {/* Sem numeração: não é uma sequência, são características
                simultâneas do trabalho. */}
            <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
              {POINTS.map(({ Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 110}>
                  <span className="relative grid size-16 place-items-center">
                    <Chalk
                      shape="circle"
                      className="absolute inset-0 size-full text-navy-900"
                    />
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.4}
                      className="size-7 text-navy-900"
                    />
                  </span>
                  <h3 className="label mt-5 text-navy-900">{title}</h3>
                  <p className="t-small mt-3 text-navy-900/80">{text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Lousa */}
        <div className="relative mt-16 md:mt-32">
          <div
            aria-hidden="true"
            data-parallax="0.08"
            className="absolute -top-6 right-0 h-[70%] w-[62%] bg-pastel-gray md:-top-10 md:right-[2%] md:w-[46%]"
          />

          {/* Duas colunas só a partir de 1024px: a 768 a coluna de texto
              ficava com menos de 40 caracteres por linha. O desenho ganha a
              coluna maior e, no celular, vai de borda a borda da lousa. */}
          <Reveal className="board relative grid items-center gap-8 overflow-hidden px-6 py-10 sm:px-10 md:px-14 md:py-16 lg:mr-[4%] lg:grid-cols-[0.8fr_1.3fr] lg:gap-6 lg:pr-6">
            <div>
              <p className="eyebrow eyebrow-light">No laboratório</p>
              <p className="t-h2 mt-4 max-w-[14ch] text-white">
                É um processo{" "}
                <span className="relative inline-block">
                  cuidadoso.
                  <Chalk
                    shape="underline"
                    draw
                    className="absolute -bottom-3 left-0 h-4 w-full text-gold-400"
                  />
                </span>
              </p>
              <p className="t-body measure mt-8 text-white/80">
                Antes que qualquer matéria seja pesada, a prescrição é
                conferida. Doses, formas farmacêuticas, compatibilidade entre
                ativos são especialidades das farmacêuticas que nem sempre o
                médico tem na ponta da língua. Só depois a ordem de manipulação
                vai para o laboratório.
              </p>
              <a
                href={url("/quem-somos/")}
                data-ga-event="link_institucional"
                data-ga-origem="autoridade-saber-mais"
                className="btn btn-ghost-light mt-9"
              >
                Saber mais
              </a>
            </div>

            <div className="relative -mx-6 sm:-mx-10 md:-mx-14 lg:mx-0">
              <Chalk
                shape="rays"
                className="absolute -top-6 left-6 z-10 w-16 text-gold-400 md:w-20 lg:left-2"
              />
              <Drawing
                name="manipulacao"
                sizes="(min-width: 1024px) 680px, 100vw"
                className="w-full lg:scale-[1.12]"
              />
            </div>
          </Reveal>
        </div>

        {/* Quem leu como a fórmula é feita já está pronto para mandar a
            receita: o CTA fica aqui, sem esperar o passo a passo. */}
        <Reveal className="mt-12 flex justify-center md:mt-16">
          <CtaLink
            href={WHATSAPP_LINKS.autoridade}
            event="contato_whatsapp"
            origem="por-dentro-da-farmacia"
            className="btn btn-gold w-full sm:w-auto"
          >
            Enviar minha receita
          </CtaLink>
        </Reveal>
      </div>
    </section>
  );
}
