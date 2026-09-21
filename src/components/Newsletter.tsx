"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useRef, useState } from "react";
import Chalk from "./Chalk";
import Drawing from "./Drawing";
import Reveal from "./Reveal";
import { url } from "@/lib/base-path";
import { BUSINESS } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Segundo (e último) componente de cliente do site, ao lado do ContactForm —
 * mesma justificativa: precisa de estado real de formulário, então não cabe
 * na delegação do SiteInteractions.
 *
 * Mesmas duas defesas contra spam do ContactForm: honeypot e tempo mínimo
 * entre o formulário aparecer e ser enviado.
 */
export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const loadedAt = useRef(Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: data.get("email"),
      site: data.get("site"), // honeypot
      tempoDecorrido: Date.now() - loadedAt.current,
    };

    try {
      const res = await fetch(url("/api/newsletter/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Não foi possível cadastrar. Tente novamente.");
        return;
      }

      setStatus("success");
      form.reset();
      sendGAEvent("event", "newsletter_cadastro", { origem: "home-newsletter" });
    } catch {
      setStatus("error");
      setErrorMsg("Sem conexão no momento. Tente novamente em instantes.");
    }
  }

  return (
    <section className="overlap-footer relative z-10 pt-16 md:pt-24">
      <div className="container-page">
        <Reveal className="relative mx-auto max-w-4xl">
          <Chalk
            shape="blob"
            parallax={0.14}
            className="absolute -top-10 -left-40 hidden w-72 -rotate-12 text-navy-900 lg:block"
          />
          <Chalk
            shape="swash"
            parallax={-0.1}
            className="absolute top-1/3 -right-44 hidden w-80 -rotate-[60deg] text-gold-400 lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-4 h-full w-full rotate-[-1.5deg] bg-pastel-gold md:-top-6 md:-left-6"
          />
          <div className="relative grid items-center gap-8 bg-pastel-navy px-6 py-10 shadow-lg sm:px-10 md:grid-cols-[auto_1fr] md:gap-10 md:px-12 md:py-12">
            <Drawing
              name="blog"
              sizes="(min-width: 768px) 170px, 130px"
              className="w-32 -rotate-6 md:w-40"
            />

            <div>
              <h2 className="t-h2 max-w-[22ch]">
                Cuidados e novidades direto no seu e-mail
              </h2>
              <p className="t-body measure mt-3 text-navy-900/75">
                De vez em quando, mandamos dicas de saúde, cuidados com a pele
                e novidades da farmácia. Sem spam, e você cancela quando
                quiser.
              </p>

              {status === "success" ? (
                <p
                  role="status"
                  className="t-body mt-6 border-l-4 border-gold-400 bg-paper px-5 py-4"
                >
                  Cadastro feito! Em breve você recebe nosso primeiro e-mail.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="newsletter-email" className="sr-only">
                      E-mail
                    </label>
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      placeholder="seu@email.com"
                      className="field"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-navy shrink-0 disabled:opacity-60"
                    >
                      {status === "sending" ? "Enviando..." : "Quero receber"}
                    </button>
                  </div>

                  {/* Honeypot — invisível pra quem usa mouse, teclado ou
                      leitor de tela; um robô que preenche todo campo do HTML
                      cai aqui. */}
                  <div
                    aria-hidden="true"
                    className="absolute top-auto -left-[9999px]"
                  >
                    <label htmlFor="newsletter-site">Site</label>
                    <input
                      id="newsletter-site"
                      name="site"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="t-small text-red-700">
                      {errorMsg}
                    </p>
                  )}

                  <p className="t-small text-navy-900/65">
                    Ao se cadastrar, você concorda em receber e-mails da{" "}
                    {BUSINESS.name}. Veja nossa{" "}
                    <a
                      href={url("/politica-de-privacidade/")}
                      className="underline underline-offset-4"
                    >
                      política de privacidade
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Metade da caixa avança sobre o rodapé marinho. */}
      <div aria-hidden="true" className="-mb-28 md:-mb-36" />
    </section>
  );
}
