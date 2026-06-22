import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { ValueCards } from '@/components/page/ValueCards'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { whatWeDoContent } from '@/lib/content/pages/whatWeDo'

/**
 * What We Do (/about/what-we-do).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero, which owns the page's only h1 ("What We Do") over the field photo.
 *  2. A Prose overview of the two-country model. The closing line carries
 *     locale-aware links out to the Spain and Tanzania programme hubs.
 *  3. ValueCards for the four principles behind every programme, each an h3.
 *  4. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero h1, section headings h2, principle
 * cards h3.
 */
export default async function WhatWeDoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, overview, principlesEyebrow, principlesHeading, principles, donate } =
    whatWeDoContent

  return (
    <>
      <PageHero content={hero} />

      {/* Overview of the two-country model, with links to the programme hubs. */}
      <Section tone="paper">
        <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
          Two countries, one calling
        </h2>
        <Prose className="mt-6">
          {overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Explore the work in{' '}
            <Link href="/spain">Spain</Link> and in{' '}
            <Link href="/tanzania">Tanzania</Link>.
          </p>
        </Prose>
      </Section>

      {/* The four principles behind every programme. The eyebrow and heading sit
          on the same soft indigo band as the cards, so the lead-in and the grid
          read as one continuous section. The intro band drops its bottom padding
          so it sits flush above ValueCards (which owns its own Section), and
          ValueCards' own top padding gives a calm gap before the grid. */}
      <Section tone="indigo-tint" className="pb-0!">
        <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
          {principlesEyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
          {principlesHeading}
        </h2>
      </Section>
      <ValueCards items={principles} tone="indigo-tint" />

      {/* Donate: the one place gold leads (brand board sections 6 and 7). */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {donate.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
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
