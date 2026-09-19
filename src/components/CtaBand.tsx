import type { ReactNode } from "react";
import Chalk from "./Chalk";
import CtaLink from "./CtaLink";
import Reveal from "./Reveal";

type Props = {
  title: ReactNode;
  lead: ReactNode;
  href: string;
  origem: string;
  label: string;
};

/**
 * Fechamento das páginas internas, com o CTA do WhatsApp. O card da frente é
 * dourado-creme e a lousa marinho fica atrás, como moldura (mesma inversão da
 * seção do fundador na home). Por isso o botão é navy: dourado sobre dourado
 * sumiria.
 */
export default function CtaBand({ title, lead, href, origem, label }: Props) {
  return (
    <section className="overflow-hidden py-12 md:py-24">
      <div className="container-page">
        <div className="relative">
          <div
            aria-hidden="true"
            data-parallax="0.06"
            className="board absolute -top-6 -left-3 h-full w-[70%] rotate-[-1.5deg] md:-top-8 md:-left-8"
          />
          <Reveal
            variant="scale"
            className="relative overflow-hidden bg-pastel-gold px-6 py-12 text-center shadow-lg sm:px-10 md:py-16"
          >
            <Chalk
              shape="stars"
              className="absolute top-6 left-6 w-14 text-navy-900 md:left-10 md:w-20"
            />
            <Chalk
              shape="hatch"
              className="absolute -right-20 -bottom-16 w-72 text-gold-400/50"
            />
            <h2 className="t-h2 relative mx-auto max-w-[20ch] text-navy-900">
              {title}
            </h2>
            <p className="t-lead measure relative mx-auto mt-4 text-navy-900/80">
              {lead}
            </p>
            <Chalk
              shape="squiggle"
              draw
              className="relative mx-auto mt-6 w-24 text-gold-600"
            />
            <CtaLink
              href={href}
              event="contato_whatsapp"
              origem={origem}
              className="btn btn-navy relative mt-8"
            >
              {label}
            </CtaLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
