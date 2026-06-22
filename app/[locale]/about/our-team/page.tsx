import { setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { TeamGrid } from '@/components/page/TeamGrid'
import { Section } from '@/components/ui/Section'
import { ourTeamContent } from '@/lib/content/pages/ourTeam'

/**
 * Our Team (/about/our-team).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero, which owns the page's only h1 ("Our Team") over the team photo.
 *  2. A short Prose intro that frames the three groups.
 *  3. TeamGrid for the three labelled groups (Leadership, Board, Ambassadors),
 *     each group label an h2 and each member name an h3.
 *
 * Heading hierarchy is strict: the hero h1, group labels h2, member names h3.
 */
export default async function OurTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, groups } = ourTeamContent

  return (
    <>
      <PageHero content={hero} />

      <Section tone="paper">
        <Prose>
          <p>{intro}</p>
        </Prose>
      </Section>

      <TeamGrid groups={groups} />
    </>
  )
}
