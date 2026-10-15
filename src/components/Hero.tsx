import Chalk from "./Chalk";
import CtaLink from "./CtaLink";
import Drawing from "./Drawing";
import { WHATSAPP_LINKS, storeUrl } from "@/lib/site";

/**
 * Abertura centralizada, como a referência: título curto em serifa, CTAs e,
 * logo abaixo, uma "mesa" de desenhos em giz sobre dois quadrados pastel.
 * O frasco é o elemento de LCP (priority).
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--nav-height)+3rem)] md:pt-[calc(var(--nav-height)+4.5rem)]">
      {/* Mancha de giz marinho saindo pela borda esquerda. No celular ela é
          menor e mais baixa: do tamanho do desktop, passava por cima do
          frasco. */}
      <Chalk
        shape="blob-tall"
        parallax={0.18}
        className="absolute -bottom-4 -left-20 -z-10 w-28 rotate-[28deg] text-navy-900 md:-left-20 md:bottom-10 md:w-64"
      />
      <Chalk
        shape="hatch"
        parallax={-0.12}
        className="absolute -right-16 top-[34%] -z-10 hidden w-72 text-gold-400/70 md:block"
      />

      <div className="container-page text-center">
        {/* Eyebrow dentro do h1: a página tem um único h1 e ele precisa
            conter "farmácia de manipulação" — é por esse termo, somado ao
            local, que o site é posicionado. */}
        <h1 className="hero-enter text-navy-900">
          <span className="eyebrow block">
            Farmácia de manipulação · desde 1988
          </span>
          <span className="t-display mx-auto mt-5 block max-w-[16ch]">
            Sua fórmula será manipulada com{" "}
            <span className="relative inline-block whitespace-nowrap">
              carinho e dedicação.
              <Chalk
                shape="underline"
                className="absolute -bottom-3 left-0 h-4 w-full text-gold-400 md:-bottom-4 md:h-5"
              />
            </span>
          </span>
        </h1>

        <p
          className="t-lead hero-enter mx-auto mt-8 max-w-[46ch] text-navy-900/80"
          style={{ animationDelay: "120ms" }}
        >
          Somos uma das farmácias mais tradicionais de São Paulo.
        </p>

        <div
          className="hero-enter mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <CtaLink
            href={WHATSAPP_LINKS.hero}
            event="contato_whatsapp"
            origem="hero"
            className="btn btn-gold"
          >
            Enviar receita pelo WhatsApp
          </CtaLink>
          <CtaLink
            href={storeUrl("hero")}
            event="ir_para_loja"
            origem="hero"
            className="btn btn-ghost-navy"
          >
            Acessar Vitrine Online
          </CtaLink>
        </div>

        <p
          className="t-small hero-enter mt-6 text-navy-900/65"
          style={{ animationDelay: "340ms" }}
        >
          Av. Marechal Tito, 677 · Seg a sex, 8h30 às 17h30 · Sáb, 9h às 13h
        </p>
      </div>

      {/* Mesa de desenhos */}
      <div
        className="hero-enter relative mx-auto mt-8 h-[260px] w-full max-w-[860px] sm:h-[380px] md:mt-14 md:h-[460px]"
        style={{ animationDelay: "200ms" }}
      >
        <div
          data-parallax="0.07"
          className="absolute top-[10%] left-[22%] aspect-square w-[40%] -rotate-3 bg-pastel-navy md:left-[24%] md:w-[38%]"
        />
        <div
          data-parallax="-0.06"
          className="absolute top-[36%] right-[8%] aspect-square w-[28%] rotate-[4deg] bg-pastel-gold md:right-[16%] md:w-[26%]"
        />
        <div
          data-parallax="0.1"
          className="absolute bottom-[4%] left-[8%] aspect-square w-[18%] rotate-[-7deg] bg-pastel-gray md:left-[12%] md:w-[16%]"
        />

        <Drawing
          name="frasco"
          priority
          sizes="(min-width: 768px) 420px, 54vw"
          className="float-slow absolute bottom-0 left-1/2 w-[54%] -translate-x-1/2 md:w-[48%]"
        />
        <div
          className="float-slower absolute bottom-[6%] left-[2%] w-[18%] md:left-[8%] md:w-[17%]"
          style={{ "--r": "-12deg" } as React.CSSProperties}
        >
          <Drawing name="pote_capsula" sizes="(min-width: 768px) 150px, 18vw" />
        </div>
        <div
          className="float-slower absolute top-[12%] right-[2%] w-[21%] md:right-[10%] md:w-[19%]"
          style={{ "--r": "8deg" } as React.CSSProperties}
        >
          <Drawing
            name="selo_qualidade"
            sizes="(min-width: 768px) 170px, 21vw"
          />
        </div>

        <Chalk
          shape="stars"
          className="absolute top-[2%] left-[8%] w-12 text-gold-400 md:left-[14%] md:w-20"
        />
      </div>
    </section>
  );
}
