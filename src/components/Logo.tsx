import Image from "next/image";
import { url } from "@/lib/base-path";

type Props = {
  /** "nav" na barra clara; "footer" dentro de um selo de papel sobre o navy. */
  size?: "nav" | "footer";
};

/**
 * Logo completo (águia + faixa com o nome). A arte foi desenhada para fundo
 * claro — as folhas e a faixa são navy —, por isso no rodapé ele vai dentro de
 * um cartão cor de papel em vez de direto sobre o marinho.
 */
export default function Logo({ size = "nav" }: Props) {
  const nav = size === "nav";

  const img = (
    <Image
      src={url("/img/logo-marca.png")}
      alt="Farmácia Águia de Ouro, farmácia de manipulação"
      width={900}
      height={649}
      priority={nav}
      sizes={nav ? "96px" : "160px"}
      className={nav ? "h-[52px] w-auto md:h-[62px]" : "h-24 w-auto"}
    />
  );

  if (nav) return img;

  return (
    <span className="inline-flex -rotate-2 rounded-[4px] bg-paper px-5 py-4 shadow-lg">
      {img}
    </span>
  );
}
