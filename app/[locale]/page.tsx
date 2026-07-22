import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomeContent } from '@/lib/content/home'
import { getStories } from '@/lib/content/stories'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { HeroChapter } from '@/components/home/HeroChapter'
import { PhilosophyChapter } from '@/components/home/PhilosophyChapter'
import { ExpressionsChapter } from '@/components/home/ExpressionsChapter'
import { PossibleChapter } from '@/components/home/PossibleChapter'
import { ImpactChapter } from '@/components/home/ImpactChapter'
import { InvitationChapter } from '@/components/home/InvitationChapter'
import { JourneyRail } from '@/components/home/JourneyRail'

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

/**
 * The experience-led homepage (spec 2026-07-22): six chapters walking the
 * journey Understanding -> Connection -> Possibility -> Participation, with a
 * fixed journey rail on large screens. The hero owns the page h1 and renders
 * without a reveal (LCP); every other chapter manages its own motion.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [content, stories] = await Promise.all([getHomeContent(), getStories()])

  return (
    <>
      <JourneyRail />
      <HeroChapter content={content.hero} id="understanding" stage="understanding" />
      <PhilosophyChapter content={content.philosophy} id="philosophy" stage="understanding" />
      <ExpressionsChapter content={content.expressions} id="connection" stage="connection" />
      <PossibleChapter
        content={content.possible}
        stories={stories}
        id="possibility"
        stage="possibility"
      />
      <ImpactChapter content={content.impact} id="impact" stage="possibility" />
      <InvitationChapter content={content.invitation} id="participation" stage="participation" />
    </>
  )
}
