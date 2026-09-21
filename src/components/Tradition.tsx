import Chalk from "./Chalk";
import Drawing from "./Drawing";
import Reveal from "./Reveal";
import { url } from "@/lib/base-path";

/**
 * História do fundador. Na home, só ilustração: a foto de 1988 fica na página
 * Quem Somos. O desenho tem traço branco, então vive sobre a lousa; o logo
 * antigo entra como um carimbo de papel colado no canto.
 */
export default function Tradition() {
  return (
    <section className="relative overflow-hidden py-12 md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal
            variant="left"
            className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px]"
          >
            {/* O desenho vai no card cinza: ele tem áreas transparentes, e
                sobre o marinho o fundo escuro vazava pelo balcão. A lousa
                fica atrás, só como moldura. */}
            <div
              aria-hidden="true"
              data-parallax="0.08"
              className="board absolute -top-8 -left-6 h-[78%] w-[82%] -rotate-2 md:-top-10 md:-left-12"
            />
            <div className="relative aspect-square overflow-hidden bg-pastel-gray sm:aspect-[4/5]">
              <Drawing
                name="fundador"
                alt="Ilustração em giz de Antônio Cesar, fundador da farmácia, sorrindo apoiado no balcão"
                sizes="(min-width: 1024px) 380px, 80vw"
                className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-[86%] -translate-x-1/2 object-contain object-bottom"
              />
              <Chalk
                shape="stars"
                className="absolute top-6 right-6 w-16 text-navy-900"
              />
            </div>

            {/* No celular o carimbo fica centralizado embaixo: encostado na
                direita, metade dele saía da tela. */}
            <div className="absolute -bottom-10 left-1/2 w-[64%] -translate-x-1/2 rotate-[-5deg] bg-paper px-4 py-3 shadow-lg sm:left-auto sm:-right-8 sm:w-[58%] sm:translate-x-0">
              <Drawing
                name="logo_antiga"
                alt="Logo antigo da farmácia: Águia de Ouro, desde 1988"
                sizes="260px"
                className="w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Desde fevereiro de 1988</p>
            <h2 className="t-h2 measure mt-4">
              Cuidado que atravessa{" "}
              <span className="relative inline-block">
                gerações
                <Chalk
                  shape="underline"
                  draw
                  className="absolute -bottom-3 left-0 h-4 w-full text-gold-400"
                />
              </span>
            </h2>

            <p className="t-lead measure mt-8">
              A Farmácia Águia de Ouro foi fundada em fevereiro de 1988, em São
              Miguel Paulista, por Antônio Cesar, paranaense que trabalhava em
              farmácia desde a adolescência e chegou a São Paulo já com
              experiência de balcão. Abriu a farmácia aos 29 anos, com um
              farmacêutico como único colaborador, para fazer as coisas do seu
              próprio jeito, com qualidade e autenticidade.
            </p>

            <p className="t-body measure mt-5 text-navy-900/80">
              Passados trinta e oito anos, a farmácia segue com o mesmo sonho:
              manipular com excelência. Boa parte de quem chega hoje veio
              porque a mãe ou a avó já confiava em nós.
            </p>

            <a
              href={url("/quem-somos/")}
              data-ga-event="link_institucional"
              data-ga-origem="tradicao-historia"
              className="btn btn-ghost-navy mt-9"
            >
              Ler história completa
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
