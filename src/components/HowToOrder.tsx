import Chalk from "./Chalk";
import CtaLink from "./CtaLink";
import Drawing from "./Drawing";
import Reveal from "./Reveal";
import { WHATSAPP_LINKS } from "@/lib/site";

const STEPS = [
  {
    title: "Fotografe a receita",
    text: "Uma foto legível já resolve, não precisa de scanner. Se a prescrição tiver mais de uma página, envie todas.",
  },
  {
    title: "Envie pelo WhatsApp",
    text: "A conversa é direta com a equipe do balcão, de segunda a sábado, no horário da farmácia.",
  },
  {
    title: "Receba o orçamento",
    text: "Informamos o valor, o prazo de preparo e as formas de pagamento antes de qualquer coisa ir para o laboratório.",
  },
  {
    title: "Retire ou receba em casa",
    text: "Entregamos em São Paulo. Você acompanha o preparo pela mesma conversa.",
  },
];

/** Leve inclinação alternada nas lousinhas, como fichas sobre a mesa. */
const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

/**
 * Faixa pastel de largura total, como a seção lilás da referência. Única
 * seção com numeração: aqui é de fato uma sequência que o cliente executa.
 */
export default function HowToOrder() {
  return (
    <section className="relative mt-16 md:mt-24">
      <Chalk
        shape="edge-top"
        className="block h-6 w-full text-pastel-navy md:h-10"
      />

      <div className="bg-pastel-navy pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="container-page">
          <Reveal className="text-center">
            <Drawing
              name="pote_capsula"
              sizes="96px"
              className="mx-auto h-20 w-auto -rotate-12 md:h-24"
            />
            <p className="eyebrow mt-6">Passo a passo</p>
            <h2 className="t-h2 mx-auto mt-4 max-w-[20ch]">
              Como enviar sua receita
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:gap-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 110}
                className="step grid grid-cols-[88px_1fr] items-start gap-5 sm:block"
              >
                <div
                  className={`step-board board grid aspect-square place-items-center sm:aspect-[5/4] ${TILT[i]}`}
                >
                  <span className="relative grid size-16 place-items-center sm:size-24">
                    <Chalk
                      shape="circle"
                      draw
                      className="absolute inset-0 size-full text-gold-400"
                    />
                    <span className="t-numeral text-[2.25rem] text-white sm:text-[3.5rem]">
                      {i + 1}
                    </span>
                  </span>
                </div>
                <div>
                  <h3 className="t-h3 sm:mt-6">{step.title}</h3>
                  <p className="t-small mt-2 text-navy-900/80">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14 flex justify-center">
            <CtaLink
              href={WHATSAPP_LINKS.passos}
              event="contato_whatsapp"
              origem="como-pedir"
              className="btn btn-gold w-full sm:w-auto"
            >
              Enviar minha receita
            </CtaLink>
          </Reveal>
        </div>
      </div>

      <Chalk
        shape="edge-bottom"
        className="block h-6 w-full text-pastel-navy md:h-10"
      />
    </section>
  );
}
