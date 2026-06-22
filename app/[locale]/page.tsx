import { setRequestLocale } from "next-intl/server";
import { getHomeContent } from "@/lib/content/home";
import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { AppealsCards } from "@/components/home/AppealsCards";
import { MissionBlurb } from "@/components/home/MissionBlurb";
import { Testimonials } from "@/components/home/Testimonials";
import { ExploreCards } from "@/components/home/ExploreCards";
import { WhereMoneyGoes } from "@/components/home/WhereMoneyGoes";
import { ScriptureBanner } from "@/components/home/ScriptureBanner";
import { DonateWidget } from "@/components/home/DonateWidget";
import { TrustSignals } from "@/components/home/TrustSignals";

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
 *  2. Impact stats
 *  3. Appeals cards (Spain, Tanzania, Sponsor a child)
 *  4. Mission blurb
 *  5. Testimonials (client island)
 *  6. Explore cards
 *  7. Where your money goes
 *  8. Scripture banner
 *  9. Donate widget (client island)
 * 10. Trust signals
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
      <Hero content={content.hero} />
      <ImpactStats stats={content.impactStats} />
      <AppealsCards appeals={content.appeals} />
      <MissionBlurb content={content.mission} />
      <Testimonials testimonials={content.testimonials} />
      <ExploreCards cards={content.exploreCards} />
      <WhereMoneyGoes content={content.money} />
      <ScriptureBanner content={content.scripture} />
      <DonateWidget content={content.donate} />
      <TrustSignals content={content.trust} />
    </>
  );
}
