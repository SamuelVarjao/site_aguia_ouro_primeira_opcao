import type { ReactNode } from "react";
import Chalk from "./Chalk";
import Drawing, { type DrawingName } from "./Drawing";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Sem desenho, o cabeçalho fica em coluna única (páginas legais). */
  drawing?: DrawingName;
  /** Cor do quadrado pastel atrás do desenho. */
  tone?: "navy" | "gold" | "gray";
};

const TONE = {
  navy: "bg-pastel-navy",
  gold: "bg-pastel-gold",
  gray: "bg-pastel-gray",
} as const;

/** Abertura das páginas internas: texto à esquerda, desenho sobre um quadrado pastel. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  drawing,
  tone = "gold",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--nav-height)+3rem)] pb-16 md:pt-[calc(var(--nav-height)+4.5rem)] md:pb-24">
      {/* No celular a mancha desce para o rodapé da seção: na altura do texto
          ela brigava com o título. */}
      <Chalk
        shape="blob-tall"
        parallax={0.16}
        className="absolute -bottom-6 -left-20 -z-10 w-28 rotate-[24deg] text-navy-900 md:top-40 md:bottom-auto md:-left-24 md:w-52"
      />

      <div
        className={`container-page grid items-center gap-10 ${drawing ? "md:grid-cols-[1.25fr_1fr] md:gap-16" : ""}`}
      >
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="t-h1 measure mt-5 max-w-[20ch] text-navy-900">
            {title}
          </h1>
          {lead ? (
            <p className="t-lead measure mt-6 text-navy-900/80">{lead}</p>
          ) : null}
          <Chalk
            shape="squiggle"
            draw
            className="mt-8 w-28 text-gold-400"
          />
        </Reveal>

        {drawing ? (
          <Reveal
            variant="scale"
            delay={120}
            className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[380px]"
          >
            <div
              aria-hidden="true"
              className={`absolute inset-[8%] rotate-[-4deg] ${TONE[tone]}`}
            />
            <Chalk
              shape="stars"
              className="absolute top-0 right-2 w-12 text-gold-400 sm:w-16"
            />
            <Drawing
              name={drawing}
              priority
              sizes="(min-width: 768px) 340px, 80vw"
              className="float-slow relative mx-auto h-full w-auto object-contain p-[6%]"
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
