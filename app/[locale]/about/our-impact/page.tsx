import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { ourImpactContent } from '@/lib/content/pages/ourImpact'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = ourImpactContent
  return pageMetadata({
    locale,
    path: '/about/our-impact',
    title: hero.title,
    description: hero.lede,
  })
}

/**
 * Our Impact page (/about/our-impact).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit, mirroring the Spain and Tanzania pages so the whole site
 * feels like one connected charity:
 *  1. PageHero, which owns the page's only h1 ("Our Impact"). Solid navy mode,
 *     because the source impact page carries no usable documentary photography
 *     (it is a wrapper around a downloadable PDF report).
 *  2. A Prose intro framing a year of compassion, resilience, and impact.
 *  3. A small row of REAL figures only (18 children, the Centre of Hope opening
 *     year, Spain's first mobile shower unit). No fabricated numbers.
 *  4. Two programme summaries (Spain and Tanzania), each linking to its
 *     locale-aware programme page.
 *  5. A stewardship section on where support goes, framed qualitatively.
 *  6. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero h1, section headings h2.
 */
export default async function OurImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, figures, spain, tanzania, stewardship, donate } =
    ourImpactContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: a year of compassion, resilience, and impact. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <Prose>
            {intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* A small row of REAL figures only, on a soft cool band so the gold values
          read as warm light against indigo. Every value is an established
          programme fact; no fabricated numbers. */}
      <Section tone="indigo-tint">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {figures.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {figures.heading}
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {figures.items.map((figure, index) => (
            <div
              key={index}
              className="rounded-xl border-t-2 border-accent bg-paper px-7 py-8 shadow-[0_8px_24px_rgba(31,27,22,0.08)]"
            >
              <dt className="font-heading text-5xl leading-none font-medium text-brand">
                {figure.value}
              </dt>
              <dd className="mt-4 font-body text-base leading-[1.6] text-muted">
                {figure.label}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Two programmes, side by side, each linking to its own page. Spain reads
          indigo, Tanzania reads clay, matching the rest of the site. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <article className="border-t-2 border-brand pt-8">
            <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
              {spain.heading}
            </h2>
            <Prose className="mt-6">
              <p>{spain.body}</p>
            </Prose>
            <div className="mt-8">
              <Button as={Link} href="/spain" variant="secondary">
                See our work in Spain
              </Button>
            </div>
          </article>

          <article className="border-t-2 border-clay pt-8">
            <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
              {tanzania.heading}
            </h2>
            <Prose className="mt-6">
              <p>{tanzania.body}</p>
            </Prose>
            <div className="mt-8">
              <Button as={Link} href="/tanzania" variant="secondary">
                See our work in Tanzania
              </Button>
            </div>
          </article>
        </div>
      </Section>

      {/* Stewardship: where support goes, framed qualitatively (no fabricated
          percentage), on a soft clay band. */}
      <Section tone="clay-tint">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
            {stewardship.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {stewardship.heading}
          </h2>
          <Prose className="mt-6">
            {stewardship.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

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
