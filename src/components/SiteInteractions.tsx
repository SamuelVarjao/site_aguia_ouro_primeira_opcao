"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const FAB_MESSAGES = ["Peça seu orçamento", "Tire suas dúvidas"] as const;
const FAB_INTERVAL_MS = 5000;

/**
 * Único componente de cliente da página.
 *
 * Tudo o que precisa de JavaScript vive aqui — revelação no scroll, estado da
 * barra fixa, rotação da bolha do WhatsApp e os
 * eventos do GA4. A alternativa óbvia (um componente cliente por elemento
 * animado) custava caro: com vinte "use client" espalhados, o TBT no mobile
 * passou de 200 ms para 500 ms. Concentrando em um só, a árvore inteira
 * continua sendo renderizada no servidor.
 */
export default function SiteInteractions() {
  useEffect(() => {
    (window as unknown as { __hydrated?: boolean }).__hydrated = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: Array<() => void> = [];

    // ---- eventos do GA4, por delegação -----------------------------------
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("[data-ga-event]");
      if (!link) return;

      sendGAEvent("event", link.getAttribute("data-ga-event") as string, {
        origem: link.getAttribute("data-ga-origem") ?? "desconhecida",
      });
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    // ---- barra fixa ganha profundidade ao sair do topo --------------------
    const header = document.querySelector<HTMLElement>("[data-nav]");
    let navFrame = 0;
    const onNavScroll = () => {
      if (navFrame) return;
      navFrame = requestAnimationFrame(() => {
        navFrame = 0;
        header?.setAttribute("data-scrolled", String(window.scrollY > 40));
      });
    };
    if (header) {
      onNavScroll();
      window.addEventListener("scroll", onNavScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onNavScroll);
        if (navFrame) cancelAnimationFrame(navFrame);
      });
    }

    // ---- revelação no scroll ---------------------------------------------
    // Dois cuidados que evitam a página em branco:
    //  1. O CSS só esconde blocos depois da classe .reveal-on, e ela só entra
    //     DEPOIS da primeira varredura síncrona abaixo. O que já está na tela
    //     (inclusive quando o navegador recarrega no meio da página) é marcado
    //     como revelado antes de qualquer coisa sumir.
    //  2. A varredura consulta o DOM a cada vez e nunca para de escutar, e um
    //     MutationObserver avisa quando entra conteúdo novo. Sem isso, uma
    //     navegação interna do Next (o logo usa <Link>) trazia blocos que
    //     ninguém mais observava, e eles ficavam invisíveis.
    const root = document.documentElement;
    const HIDDEN = '[data-reveal]:not([data-revealed="true"])';

    const revealVisible = () => {
      // 0,86: o bloco anima já dentro da tela, onde dá para ver o movimento.
      const limit = window.innerHeight * 0.86;
      for (const el of document.querySelectorAll<HTMLElement>(HIDDEN)) {
        if (reduced.matches || el.getBoundingClientRect().top < limit) {
          el.setAttribute("data-revealed", "true");
        }
      }
    };

    revealVisible();
    root.classList.add("reveal-on");

    let revealFrame = 0;
    const scheduleReveal = () => {
      if (!revealFrame)
        revealFrame = requestAnimationFrame(() => {
          revealFrame = 0;
          revealVisible();
        });
    };

    // Varredura por posição em vez de IntersectionObserver: com IO, um salto
    // instantâneo até o rodapé faz os blocos do meio nunca cruzarem o
    // limiar, e eles ficariam invisíveis até a pessoa rolar de volta.
    // "load" e "pageshow" cobrem a restauração de rolagem do navegador ao
    // recarregar e a volta pelo botão "voltar".
    const revealEvents = ["scroll", "resize", "load", "pageshow"] as const;
    for (const type of revealEvents)
      window.addEventListener(type, scheduleReveal, { passive: true });

    // ---- paralaxe das decorações -----------------------------------------
    // Manchas de giz e quadrados pastel andam numa velocidade diferente da
    // página. A posição é medida no PAI (que não se move): medir o próprio
    // elemento incluiria o deslocamento já aplicado e o cálculo tremeria.
    // Só mexe em transform, então não causa reflow. A lista é relida quando o
    // conteúdo muda (navegação interna). Desligado com movimento reduzido.
    type Layer = {
      el: HTMLElement | SVGElement;
      speed: number;
      anchor: Element;
    };
    let layers: Layer[] = [];
    const collectLayers = () => {
      layers = [
        ...document.querySelectorAll<HTMLElement | SVGElement>(
          "[data-parallax]",
        ),
      ]
        .map((el) => ({
          el,
          speed: Number(el.getAttribute("data-parallax")) || 0,
          anchor: el.parentElement as Element,
        }))
        .filter((l) => l.speed && l.anchor);
    };

    let parallaxFrame = 0;
    const applyParallax = () => {
      parallaxFrame = 0;
      if (reduced.matches) return;
      const mid = window.innerHeight / 2;
      for (const { el, speed, anchor } of layers) {
        const r = anchor.getBoundingClientRect();
        // Fora da tela (com folga) não precisa recalcular.
        if (r.bottom < -400 || r.top > window.innerHeight + 400) continue;
        const offset = (r.top + r.height / 2 - mid) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const scheduleParallax = () => {
      if (!parallaxFrame) parallaxFrame = requestAnimationFrame(applyParallax);
    };

    collectLayers();
    applyParallax();
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax, { passive: true });

    // Conteúdo novo (navegação interna, streaming): revela e recalcula.
    // A revelação aqui é síncrona (o callback já roda depois do commit do
    // React): esperar um quadro de animação deixaria a página nova em branco
    // enquanto a aba estivesse em segundo plano.
    const observer = new MutationObserver(() => {
      collectLayers();
      revealVisible();
      scheduleParallax();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    cleanups.push(() => {
      observer.disconnect();
      for (const type of revealEvents)
        window.removeEventListener(type, scheduleReveal);
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      if (revealFrame) cancelAnimationFrame(revealFrame);
      if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
    });

    // ---- bolha do WhatsApp, alternando a cada 5s -------------------------
    const bubble = document.querySelector<HTMLElement>("[data-fab-message]");
    if (bubble && !reduced.matches) {
      let index = 0;
      const timer = window.setInterval(() => {
        index = (index + 1) % FAB_MESSAGES.length;
        bubble.textContent = FAB_MESSAGES[index];
        bubble.classList.remove("fab-bubble-text");
        void bubble.offsetWidth; // força o reinício da animação
        bubble.classList.add("fab-bubble-text");
      }, FAB_INTERVAL_MS);
      cleanups.push(() => window.clearInterval(timer));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
