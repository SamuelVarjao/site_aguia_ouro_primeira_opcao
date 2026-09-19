import type { CSSProperties, ReactNode } from "react";

/**
 * Elementos decorativos em giz, desenhados em SVG.
 *
 * A textura não é imagem: um único filtro (ChalkDefs, montado uma vez no
 * layout) deforma a borda com ruído de baixa frequência e fura o traço com
 * ruído fino — é isso que dá o aspecto de giz sobre papel. Todas as formas
 * usam currentColor, então a cor vem de uma classe text-* no próprio uso.
 */
export function ChalkDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* Giz: borda irregular + granulado. */}
        <filter
          id="chalk"
          x="-15%"
          y="-40%"
          width="130%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            seed="4"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            seed="11"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4.5 0 0 0 -0.85"
            result="grainMask"
          />
          <feComposite in="rough" in2="grainMask" operator="in" />
        </filter>

        {/* Só a borda irregular, sem furos — para manchas grandes e bordas
            de seção, onde o granulado cheio vira ruído. */}
        <filter
          id="chalk-soft"
          x="-10%"
          y="-30%"
          width="120%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            seed="8"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="1"
            seed="2"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 0 0 0 -0.55"
            result="grainMask"
          />
          <feComposite in="rough" in2="grainMask" operator="in" />
        </filter>

        {/* Hachura diagonal, usada como máscara (a cor continua sendo a do
            elemento que a usa). */}
        <pattern
          id="chalk-hatch"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-38)"
        >
          <rect x="0" y="0" width="5" height="12" fill="white" />
        </pattern>
        <mask id="chalk-hatch-mask" maskContentUnits="userSpaceOnUse">
          <rect x="-2000" y="-2000" width="6000" height="6000" fill="url(#chalk-hatch)" />
        </mask>
      </defs>
    </svg>
  );
}

type Shape =
  | "blob"
  | "blob-tall"
  | "blob-wide"
  | "hatch"
  | "swash"
  | "underline"
  | "circle"
  | "rays"
  | "stars"
  | "arrow"
  | "squiggle"
  | "edge-top"
  | "edge-bottom";

type ShapeDef = {
  viewBox: string;
  /** "fill" usa o filtro suave; "stroke" o granulado. */
  kind: "fill" | "stroke";
  body: (draw: boolean) => ReactNode;
  preserve?: string;
};

const strokeProps = (width: number, draw: boolean) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...(draw ? { pathLength: 1 } : {}),
});

const SHAPES: Record<Shape, ShapeDef> = {
  blob: {
    viewBox: "0 0 400 300",
    kind: "fill",
    body: () => (
      <path
        fill="currentColor"
        d="M52 168c-24-60 16-130 98-142 72-11 118 24 174 18 54-5 80 40 66 94-15 58-74 92-150 98-88 7-166-10-188-68z"
      />
    ),
  },
  "blob-tall": {
    viewBox: "0 0 300 440",
    kind: "fill",
    body: () => (
      <path
        fill="currentColor"
        d="M154 20c64 10 106 74 112 156 6 90-20 174-74 218-46 38-116 26-144-26-30-56-6-116-16-180-10-62-8-120 28-150 26-20 56-22 94-18z"
      />
    ),
  },
  "blob-wide": {
    viewBox: "0 0 600 220",
    kind: "fill",
    body: () => (
      <path
        fill="currentColor"
        d="M30 120C18 64 92 22 196 30c70 5 110-14 190-12 110 3 196 36 190 92-6 58-96 88-208 86-70-1-118 16-196 12C88 204 40 170 30 120z"
      />
    ),
  },
  hatch: {
    viewBox: "0 0 400 300",
    kind: "fill",
    body: () => (
      <path
        fill="currentColor"
        mask="url(#chalk-hatch-mask)"
        d="M52 168c-24-60 16-130 98-142 72-11 118 24 174 18 54-5 80 40 66 94-15 58-74 92-150 98-88 7-166-10-188-68z"
      />
    ),
  },
  swash: {
    viewBox: "0 0 600 200",
    kind: "stroke",
    body: (draw) => (
      <>
        <path {...strokeProps(42, draw)} d="M40 150C150 70 300 40 556 54" />
        <path {...strokeProps(14, draw)} d="M96 168C220 110 360 92 520 96" />
      </>
    ),
  },
  underline: {
    viewBox: "0 0 300 36",
    kind: "stroke",
    preserve: "none",
    body: (draw) => (
      <>
        <path {...strokeProps(6, draw)} d="M6 20c44-9 96-13 146-9s98 5 142-7" />
        <path {...strokeProps(3.5, draw)} d="M34 30c62-6 140-9 236-10" />
      </>
    ),
  },
  circle: {
    viewBox: "0 0 140 140",
    kind: "stroke",
    body: (draw) => (
      <path
        {...strokeProps(6, draw)}
        d="M76 14c34 3 54 30 51 60-3 34-32 54-62 51-32-3-52-28-50-58 3-32 30-54 64-50 22 3 38 16 44 30"
      />
    ),
  },
  rays: {
    viewBox: "0 0 120 120",
    kind: "stroke",
    body: (draw) => (
      <>
        <path {...strokeProps(7, draw)} d="M22 76L6 70" />
        <path {...strokeProps(7, draw)} d="M36 44L22 26" />
        <path {...strokeProps(7, draw)} d="M66 32L70 8" />
      </>
    ),
  },
  stars: {
    viewBox: "0 0 120 120",
    kind: "stroke",
    body: (draw) => (
      <>
        <path
          {...strokeProps(4.5, draw)}
          d="M44 16c2 18 6 24 22 26-16 2-20 8-22 26-2-18-6-24-22-26 16-2 20-8 22-26z"
        />
        <path
          {...strokeProps(4, draw)}
          d="M90 70c1 10 4 13 13 14-9 1-12 4-13 14-1-10-4-13-13-14 9-1 12-4 13-14z"
        />
      </>
    ),
  },
  arrow: {
    viewBox: "0 0 200 120",
    kind: "stroke",
    body: (draw) => (
      <>
        <path {...strokeProps(5, draw)} d="M10 30c50-18 120-12 150 46" />
        <path {...strokeProps(5, draw)} d="M136 70l26 12 8-28" />
      </>
    ),
  },
  squiggle: {
    viewBox: "0 0 240 60",
    kind: "stroke",
    body: (draw) => (
      <path
        {...strokeProps(5, draw)}
        d="M8 36c20-26 36-26 50 0s32 26 50 0 34-26 50 0 32 26 50 0 18-18 24-14"
      />
    ),
  },
  "edge-top": {
    viewBox: "0 0 1440 48",
    kind: "fill",
    preserve: "none",
    body: () => (
      <path
        fill="currentColor"
        d="M-40 110V26h40c70-10 150 4 236-4s172-14 262-4 184 12 276 2 196-16 296-6 186 14 266 2c46-7 80-6 104-2h40V110z"
      />
    ),
  },
  "edge-bottom": {
    viewBox: "0 0 1440 48",
    kind: "fill",
    preserve: "none",
    body: () => (
      <path
        fill="currentColor"
        d="M-40-62V22h40c70 10 150-4 236 4s172 14 262 4 184-12 276-2 196 16 296 6 186-14 266-2c46 7 80 6 104 2h40V-62z"
      />
    ),
  },
};

type Props = {
  shape: Shape;
  className?: string;
  style?: CSSProperties;
  /** Traço se desenha quando o bloco pai (Reveal) entra na tela. */
  draw?: boolean;
  /** Velocidade de paralaxe no scroll (ex.: 0.12). Positivo sobe mais
   *  devagar que a página; negativo, mais rápido. Só para decoração. */
  parallax?: number;
};

export default function Chalk({
  shape,
  className,
  style,
  draw = false,
  parallax,
}: Props) {
  const def = SHAPES[shape];
  const filter = def.kind === "fill" ? "url(#chalk-soft)" : "url(#chalk)";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={def.viewBox}
      preserveAspectRatio={def.preserve ?? "xMidYMid meet"}
      className={`pointer-events-none ${draw ? "chalk-draw" : ""} ${className ?? ""}`}
      style={style}
      data-parallax={parallax}
    >
      <g filter={filter}>{def.body(draw)}</g>
    </svg>
  );
}
