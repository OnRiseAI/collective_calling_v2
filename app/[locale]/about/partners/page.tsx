import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { PartnerList } from '@/components/page/PartnerList'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { partnersContent } from '@/lib/content/pages/partners'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = partnersContent
  return pageMetadata({
    locale,
    path: '/about/partners',
    title: hero.title,
    description: hero.lede,
  })
}

/**
 * Our Partners (/about/partners).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit, mirroring the sibling About pages so the whole site feels
 * like one connected charity:
 *  1. PageHero, which owns the page's only h1 ("Our Partners"). Solid navy mode,
 *     because the source partner page carries no usable documentary photography.
 *  2. A Prose intro framing the partner network and shared commitment.
 *  3. The PartnerList grid, introduced by a gold eyebrow and an h2. Each partner
 *     card shows a harvested logo (or a name plate when none) and the partner
 *     name as an h3.
 *  4. A separate accountability note (h2) on the bodies that hold the charity to
 *     account: the Rotary Club Guadalmina Marbella and the Ayuntamiento de
 *     Marbella.
 *  5. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero owns the h1, every section heading is h2,
 * and partner names are h3.
 */
export default async function OurPartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, grid, partners, accountability, donate } = partnersContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: the partner network and shared commitment. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <Prose>
            {intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* The partner grid on a soft cool band, with a gold eyebrow and an h2. */}
      <Section tone="indigo-tint">
        <div className="mb-10 max-w-2xl lg:mb-12">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {grid.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {grid.heading}
          </h2>
        </div>

        <PartnerList partners={partners} />
      </Section>

      {/* Accountability: the bodies that hold the charity to account, kept
          separate from the sponsoring partners. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
            {accountability.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {accountability.heading}
          </h2>
          <Prose className="mt-6">
            {accountability.body.map((paragraph, index) => (
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
