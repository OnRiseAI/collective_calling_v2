import type { Metadata } from 'next'
import { setRequestLocale } from "next-intl/server";
import { getHomeContent } from "@/lib/content/home";
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const content = await getHomeContent()
  return pageMetadata({
    locale,
    path: '/',
    // The homepage title is the hero headline; the root layout template wraps
    // it with " | Collective Calling" so the full tab title identifies the site.
    title: content.hero.headline,
    description: SITE.description,
    image: content.hero.image,
  })
}
import { Hero } from "@/components/home/Hero";
import { AppealsCards } from "@/components/home/AppealsCards";
import { MissionBlurb } from "@/components/home/MissionBlurb";
import { FaithBand } from "@/components/home/FaithBand";
import { Testimonials } from "@/components/home/Testimonials";
import { ExploreCards } from "@/components/home/ExploreCards";
import { ImpactStatBand } from "@/components/home/ImpactStatBand";
import { WhereMoneyGoes } from "@/components/home/WhereMoneyGoes";
import { ScriptureBanner } from "@/components/home/ScriptureBanner";
import { DonateWidget } from "@/components/home/DonateWidget";
import { TrustSignals } from "@/components/home/TrustSignals";
import { EmailSignup } from "@/components/home/EmailSignup";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Collective Calling homepage.
 *
 * An async server component that reads the typed homepage content once and
 * composes the brand sections in narrative order. The Hero owns the page h1;
 * every other section uses an h2. Testimonials and DonateWidget are client
 * islands rendered within this server component, so the page itself stays a
 * server component and the bulk of the page is statically rendered.
 *
 * Section order (spec section 6):
 *  1. Hero (gold-led Donate, the page h1)
 *  2. Appeals cards (Spain, Tanzania, Sponsor a child) — the single upper card row
 *  3. Mission blurb
 *  4. Testimonials (client island)
 *  5. Explore cards
 *  6. Where your money goes (the sole home for the 83% programmes figure)
 *  7. Scripture banner
 *  8. Donate widget (client island)
 *  9. Trust signals
 *
 * The standalone "Our impact" cards (Spain's first / Centre of Hope / 83%) were
 * removed: their content is already carried by the appeals cards above and the
 * "Where your money goes" donut below, so the page no longer stacks three
 * near-identical card grids near the top.
 *
 * The Plan 1 placeholder hero is gone; the Hero component is now the only hero.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getHomeContent();

  return (
    <>
      {/* Hero stays un-wrapped: it is above the fold and the LCP element, so it
          must render immediately rather than fade in. Every section below gets
          one quiet scroll-in reveal (reduced-motion safe). */}
      <Hero content={content.hero} />
      <Reveal><AppealsCards appeals={content.appeals} /></Reveal>
      <Reveal><MissionBlurb content={content.mission} /></Reveal>
      <Reveal><FaithBand /></Reveal>
      <Reveal><Testimonials testimonials={content.testimonials} /></Reveal>
      <Reveal><ExploreCards cards={content.exploreCards} /></Reveal>
      <Reveal><ImpactStatBand /></Reveal>
      <Reveal><WhereMoneyGoes content={content.money} /></Reveal>
      <Reveal><ScriptureBanner /></Reveal>
      <Reveal><DonateWidget content={content.donate} /></Reveal>
      <Reveal><TrustSignals content={content.trust} /></Reveal>
      <Reveal><EmailSignup /></Reveal>
    </>
  );
}
