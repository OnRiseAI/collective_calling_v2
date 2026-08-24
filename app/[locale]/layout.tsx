import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Figtree, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, isIndexable } from "@/lib/site";
import { organizationJsonLd } from "@/lib/jsonld";
import "../globals.css";

// Body and UI face. Figtree is a geometric sans with a tall x-height. Running
// copy sits at 400 (the Aug 24 design revision lifted it from 300, which is no
// longer loaded); 700 carries the editorial pages' bold labels and wordmark.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display face. Instrument Serif is high contrast with a single regular weight,
// drawn to be set very large; the italic carries every gold accent phrase.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// viewportFit "cover" lets the page use the full screen on a notched phone and
// is what makes env(safe-area-inset-*) report anything but 0; the header, hero
// copy, footer and mobile panel each pad themselves back off the cutouts.
// The page is left zoomable — capping user-scalable fails WCAG 1.4.4.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    images: [SITE.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: isIndexable,
    follow: isIndexable,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

// Pre-render the locale segment for every supported locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Reject any locale that is not configured (keeps the [locale] segment honest).
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering for this request before reading any locale data.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${figtree.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Entrance motion is server-rendered at its start state (opacity 0),
            so without JavaScript every revealed band would stay invisible.
            !important beats framer-motion's inline style. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationJsonLd()} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
