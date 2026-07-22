import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomeContent } from '@/lib/content/home'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { HeroSection } from '@/components/home/HeroSection'
import { WaysSection } from '@/components/home/WaysSection'
import { ViaBand } from '@/components/home/ViaBand'
import { StoriesSection } from '@/components/home/StoriesSection'
import { SnapshotBand } from '@/components/home/SnapshotBand'
import { PartnersSection } from '@/components/home/PartnersSection'
import { InvolveBand } from '@/components/home/InvolveBand'

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
    title: `${content.hero.headlineLead} ${content.hero.headlineAccent}`,
    description: SITE.description,
    image: content.hero.image,
  })
}

/**
 * The Collective Calling homepage (design-theme mockup, spec v2): seven bands
 * mirroring the client's mockup — hero, three ways, Values In Action, stories,
 * impact snapshot, partners, and the get-involved / charity-shops closer.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const content = await getHomeContent()

  return (
    <>
      <HeroSection content={content.hero} />
      <WaysSection content={content.ways} />
      <ViaBand content={content.via} />
      <StoriesSection content={content.storiesIntro} />
      <SnapshotBand content={content.snapshot} />
      <PartnersSection content={content.partners} />
      <InvolveBand content={content.involve} />
    </>
  )
}
