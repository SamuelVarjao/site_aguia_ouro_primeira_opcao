import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ChalkDefs } from "@/components/Chalk";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SiteInteractions from "@/components/SiteInteractions";
import {
  BUSINESS,
  FACEBOOK_URL,
  GOOGLE_REVIEWS,
  INSTAGRAM,
  SITE_URL,
  TIKTOK_URL,
} from "@/lib/site";
import "./globals.css";

/* Serifa editorial nos títulos, sans limpa no texto — mesma dupla da
   referência. Fraunces é variável: o eixo SOFT arredonda as serifas e casa
   com o traço de giz dos desenhos. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const TITLE =
  "Farmácia de Manipulação em São Miguel Paulista | Águia de Ouro";
const DESCRIPTION =
  "Farmácia de manipulação em São Miguel Paulista desde 1988. Envie sua receita pelo WhatsApp e receba o orçamento. Fórmulas conferidas por farmacêutico responsável.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE_URL}/`,
    siteName: BUSINESS.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

/**
 * Pharmacy, e não LocalBusiness genérico: o tipo específico é o que sustenta a
 * elegibilidade em resultados de saúde e em respostas geradas por IA.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  foundingDate: BUSINESS.foundingDate,
  sameAs: [INSTAGRAM.url, FACEBOOK_URL, TIKTOK_URL],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Marechal Tito, 677, 1º andar, sala 23",
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  employee: {
    "@type": "Person",
    name: BUSINESS.pharmacist.name,
    jobTitle: "Farmacêutica responsável",
    identifier: BUSINESS.pharmacist.crf,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: GOOGLE_REVIEWS.ratingValue,
    reviewCount: GOOGLE_REVIEWS.reviewCount,
    bestRating: GOOGLE_REVIEWS.bestRating,
  },
};

// [PENDENTE] ID de medição do fluxo de dados web (G-XXXXXXXXXX).
// O 329327830 informado é o ID da propriedade, que o GoogleAnalytics não aceita.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fraunces.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">
        {/* Liga só a entrada do hero (.js .hero-enter), que precisa valer já
            no primeiro paint. As revelações no scroll usam outra classe,
            .reveal-on, posta pelo SiteInteractions depois de revelar o que já
            está na tela. Sem JavaScript nada fica escondido; se a hidratação
            falhar, este script se desarma em 5s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "setTimeout(function(){if(!window.__hydrated)" +
              "document.documentElement.classList.remove('js')},5000);",
          }}
        />
        <ChalkDefs />
        <Nav />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <SiteInteractions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
