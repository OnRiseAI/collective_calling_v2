import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomeContent } from '@/lib/content/home'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { HeroSection } from '@/components/home/HeroSection'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { ExpressionsSection } from '@/components/home/ExpressionsSection'
import { ViaBand } from '@/components/home/ViaBand'
import { ImpactStats } from '@/components/home/ImpactStats'
import { StoriesSection } from '@/components/home/StoriesSection'
import { ImpactCta } from '@/components/home/ImpactCta'
import { PartnersStrip } from '@/components/home/PartnersStrip'
import { ClosingBand } from '@/components/home/ClosingBand'

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
    title: `${content.hero.heading.lead} ${content.hero.heading.accent}`,
    description: SITE.description,
    image: content.hero.image,
  })
}

/**
 * The Collective Calling homepage (v2 design): nine bands that move from why
 * the charity exists, through the three expressions of that work and what it
 * has added up to, to the invitation to join it.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const content = await getHomeContent()

  // The wrapper restates the design's own root: Figtree on cream in navy, at
  // the browser's default 16px / normal leading. The site-wide body rule sets a
  // larger, looser default for long-form inner pages; the design does not, and
  // every measurement in these sections is taken against the design's.
  return (
    <div className="bg-paper font-body text-[16px] leading-normal text-ink">
      <HeroSection content={content.hero} />
      <PhilosophySection content={content.philosophy} />
      <ExpressionsSection content={content.expressions} />
      <ViaBand content={content.via} />
      <ImpactStats content={content.impact} />
      <StoriesSection content={content.stories} />
      <ImpactCta content={content.impactCta} />
      <PartnersStrip content={content.partners} />
      <ClosingBand content={content.closing} />
    </div>
  )
}
