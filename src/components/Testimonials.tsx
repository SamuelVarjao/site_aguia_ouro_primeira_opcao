import { Star } from "lucide-react";
import Chalk from "./Chalk";
import Drawing from "./Drawing";
import Reveal from "./Reveal";

/**
 * Avaliações reais do perfil da farmácia no Google Maps, conferidas
 * manualmente (nome abreviado para reduzir exposição de dado pessoal).
 * Atualizar de tempos em tempos — não há integração automática.
 */
const REVIEWS = [
  {
    name: "Fernanda P.",
    meta: "10 avaliações",
    text: "Sempre fui muito bem atendida. Um dos melhores preços da região de São Miguel Paulista. Moro em Guarulhos e mesmo assim só compro com eles. Peço tudo pelo WhatsApp e recebo em casa. Super indico.",
  },
  {
    name: "Jennifer A.",
    meta: "11 avaliações",
    text: "O atendimento é sempre atencioso e profissional, garantindo que cada necessidade seja atendida com cuidado e precisão. A qualidade dos produtos e a pontualidade na entrega fazem toda a diferença. Cliente fiel!",
  },
  {
    name: "Valderez R.",
    meta: "9 avaliações",
    text: "É uma excelente farmácia, tudo que preciso faço com eles. Me atendem muito bem pelo WhatsApp e só vou retirar. Para mim, a melhor. Sempre.",
  },
  {
    name: "Ana C.",
    meta: "6 avaliações",
    text: "Farmácia nota 10! Ótimo atendimento, produtos de qualidade, não tenho o que reclamar. Do WhatsApp ao presencial, vocês estão de parabéns.",
  },
] as const;

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-gold-400 text-gold-600" />
      ))}
    </span>
  );
}

/** Cor do monograma alterna entre os três pastéis. */
const AVATAR = ["bg-pastel-navy", "bg-pastel-gold", "bg-pastel-gray"];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-14 md:py-28">
      <div className="container-page">
        <Reveal className="text-center">
          <Drawing
            name="like"
            sizes="96px"
            className="mx-auto h-20 w-auto -rotate-6 md:h-24"
          />
          <p className="eyebrow mt-6">Avaliações no Google</p>
          <h2 className="t-h2 mx-auto mt-4 max-w-[20ch]">
            O que dizem os clientes
          </h2>
        </Reveal>

        <div className="relative mt-14 md:mt-16">
          {/* Quadrado pastel atrás da faixa de cartões. */}
          <div
            aria-hidden="true"
            data-parallax="0.06"
            className="absolute top-12 -bottom-8 left-[8%] -right-5 bg-pastel-gray md:top-16 md:-bottom-12 md:left-[18%] md:-right-[4%]"
          />
          <Chalk
            shape="squiggle"
            className="absolute -top-7 left-0 w-20 text-gold-400 md:-left-6 md:-top-6 md:w-36"
          />

          {/* Mobile: faixa rolável com encaixe. Tablet/desktop: grade. */}
          <ul className="snap-row relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 lg:gap-8">
            {REVIEWS.map((review, i) => (
              <Reveal
                as="li"
                key={review.name}
                delay={i * 80}
                className="flex w-[84%] shrink-0 snap-center flex-col border border-border-subtle bg-white p-6 sm:w-[60%] md:w-auto md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="t-h1 -mb-3 leading-none text-gold-400"
                >
                  &ldquo;
                </span>
                <p className="t-body grow text-navy-900/85">{review.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-5">
                  <span
                    aria-hidden="true"
                    className={`t-h3 grid size-11 shrink-0 place-items-center rounded-pill ${AVATAR[i % AVATAR.length]}`}
                  >
                    {review.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="label text-[0.75rem] text-navy-900">
                      {review.name}
                    </p>
                    <p className="t-small text-navy-900/60">{review.meta}</p>
                  </div>
                  <Stars className="ml-auto hidden sm:flex md:hidden lg:flex" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
