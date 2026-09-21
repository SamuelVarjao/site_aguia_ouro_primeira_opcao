import Image from "next/image";
import { url } from "@/lib/base-path";

/**
 * Ilustrações em giz da farmácia.
 *
 * Geradas a partir dos SVGs do Canva (desenho_*.svg), que eram um PNG colorido
 * e outro de máscara embrulhados em SVG, de 0,7 a 8 MB cada — 38 MB no total.
 * Aqui a máscara já virou transparência, o desenho foi recortado e salvo em
 * WebP: 1,3 MB os nove juntos. Os originais saíram de /public.
 *
 * "fundador" e "manipulacao" têm traço BRANCO — só funcionam sobre lousa.
 */
const DRAWINGS = {
  blog: [1200, 1113],
  estetoscopio: [1200, 955],
  frasco: [1200, 1200],
  fundador: [749, 1200],
  like: [973, 1200],
  logo_antiga: [1200, 527],
  manipulacao: [1200, 720],
  pote_capsula: [732, 1200],
  selo_qualidade: [1200, 1093],
} as const;

export type DrawingName = keyof typeof DRAWINGS;

type Props = {
  name: DrawingName;
  /** Vazio quando o desenho é decorativo (o padrão). */
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function Drawing({
  name,
  alt = "",
  sizes,
  className,
  priority = false,
}: Props) {
  const [width, height] = DRAWINGS[name];

  return (
    <Image
      src={url(`/img/desenhos/${name}.webp`)}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={`drawing select-none ${className ?? ""}`}
    />
  );
}
