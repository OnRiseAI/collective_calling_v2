import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { SubNavCards } from '@/components/page/SubNavCards'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { aboutContent } from '@/lib/content/pages/about'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = aboutContent
  return pageMetadata({
    locale,
    path: '/about',
    title: hero.title,
    description: hero.lede,
    image: hero.image,
  })
}

/**
 * About hub (/about).
 *
 * The front door to the About cluster. An async server component that composes
 * the page from typed content and the shared page toolkit, mirroring the sibling
 * pages so the whole site feels like one connected charity:
 *  1. PageHero, which owns the page's only h1 ("About Collective Calling") over
 *     the team photo.
 *  2. A Prose overview: the mission and vision, and the 2017 founding, with calm
 *     links onward to the Spain and Tanzania programmes.
 *  3. SubNavCards: the in-page navigation grid into every page in the cluster
 *     (Who We Are, What We Do, Our Impact, Our Team, Financial Accountability,
 *     Partners, Contact). Each card title is an h3.
 *  4. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero owns the h1, section headings are h2, and
 * the SubNavCards titles are h3. No em dashes anywhere.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, overview, subNav, donate } = aboutContent

  return (
    <>
      <PageHero content={hero} />

      {/* Overview: the mission and vision, the 2017 founding, and the way into
          the two programmes. */}
      <Section tone="paper">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {overview.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
            {overview.heading}
          </h2>
          <Prose className="mt-6">
            {overview.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>
              See the work up close in{' '}
              <Link href="/spain">Spain</Link> and{' '}
              <Link href="/tanzania">Tanzania</Link>.
            </p>
          </Prose>
        </div>
      </Section>

      {/* In-page navigation into the rest of the About cluster. */}
      <Section tone="indigo-tint">
        <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
          {subNav.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
          {subNav.heading}
        </h2>
        <div className="mt-10">
          <SubNavCards cards={subNav.cards} />
        </div>
      </Section>

      {/* Donate: the one place gold leads (brand board sections 6 and 7). */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {donate.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-paper">
            {donate.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            {donate.body}
          </p>
          <div className="mt-8">
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              // Donate is the one place gold leads (brand board section 6). The
              // important modifiers ensure the gold fill wins over the primary
              // variant's brand background regardless of CSS source order.
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              {donate.cta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
