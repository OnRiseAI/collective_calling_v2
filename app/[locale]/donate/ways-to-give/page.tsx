import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { waysToGiveContent } from '@/lib/content/pages/waysToGive'

/**
 * Ways to Give (/donate/ways-to-give).
 *
 * An informational page of the real ways to support Collective Calling. An
 * async server component that composes from typed content and the shared
 * toolkit, mirroring the sibling Donate hub so the whole site feels connected:
 *  1. PageHero owns the page's only h1 ("Ways to give"), gold eyebrow, solid
 *     navy band.
 *  2. A short Prose intro frames the page.
 *  3. The ways render as a responsive grid of brand cards. Each card carries a
 *     thin programme top rule (gold, indigo, or clay), an h3 title, a short
 *     body, and one call to action. Internal CTAs use the locale-aware Link via
 *     the Button `as` prop; the mailto CTA is a plain anchor (external).
 *  4. A closing gold-led Donate band on deep navy, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero owns the h1; the grid section heading is
 * h2; each card title is an h3. No em dashes anywhere.
 *
 * Note on routes: the Fundraise CTA (/get-involved/fundraise) belongs to a later
 * plan and may 404 for now, the same as other not-yet-built routes. That is
 * acceptable.
 */

// Thin top-rule colour per programme theme, matching the shared Card spec.
const themeRule: Record<NonNullable<(typeof waysToGiveContent.ways.items)[number]['theme']>, string> = {
  general: 'bg-accent',
  spain: 'bg-brand',
  tanzania: 'bg-clay',
}

export default async function WaysToGivePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, ways, closing } = waysToGiveContent

  return (
    <>
      <PageHero content={hero} />

      {/* A short intro frames the page above the grid. */}
      <Section tone="paper">
        <Prose>
          <p>{intro}</p>
        </Prose>

        {/* The ways to give: a responsive card grid. Each card is a self-contained
            unit with a programme top rule, an h3 title, a short body, and one CTA.
            One column on small screens, two from sm, three from lg. */}
        <div className="mt-12">
          <Eyebrow>{ways.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
            {ways.heading}
          </h2>

          <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {ways.items.map((way, index) => (
              <li key={`${way.title}-${index}`} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-muted/20 bg-white shadow-[0_8px_24px_rgba(31,27,22,0.08)] transition-shadow duration-200 ease-out hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)]">
                  {/* Thin programme rule flush across the very top of the card. */}
                  <span
                    aria-hidden="true"
                    className={`h-1 w-full shrink-0 ${themeRule[way.theme ?? 'general']}`}
                  />

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-heading text-[1.375rem] leading-[1.3] font-semibold text-ink">
                      {way.title}
                    </h3>
                    <p className="font-body text-base leading-[1.6] text-muted">
                      {way.body}
                    </p>

                    {/* CTA pinned to the foot so the cards line up across the row. */}
                    <div className="mt-auto pt-4">
                      {way.external ? (
                        <Button href={way.ctaHref} variant="secondary" size="md">
                          {way.ctaLabel}
                        </Button>
                      ) : (
                        <Button as={Link} href={way.ctaHref} variant="secondary" size="md">
                          {way.ctaLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Closing Donate moment: deep navy band where gold reads as warm light, so
          the most invited action on the page is also the warmest. The one place
          gold leads, per the brand board button spec. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {closing.eyebrow}
          </p>
          <h2 className="mt-3 text-balance font-heading text-[2.25rem] font-medium leading-[1.15] text-paper">
            {closing.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            {closing.body}
          </p>

          <div className="mt-8">
            <Button
              as={Link}
              href={closing.ctaHref}
              size="lg"
              className="bg-accent text-brand-dark hover:bg-accent/90"
            >
              {closing.ctaLabel}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
