import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { WhereMoneyGoes } from '@/components/home/WhereMoneyGoes'
import { DONATE_HREF } from '@/lib/nav'
import { financialsContent } from '@/lib/content/pages/financials'

/**
 * Financial Accountability page (/about/financial-accountability).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit, mirroring the sibling About pages so the whole site feels
 * like one connected charity:
 *  1. PageHero, which owns the page's only h1 ("Financial Accountability"). Solid
 *     navy mode, because the source page carries no usable documentary
 *     photography (it is a wrapper around downloadable report images).
 *  2. A Prose intro on transparency and integrity in managing finances.
 *  3. The 83/17 split visual, reused directly from the homepage WhereMoneyGoes
 *     component so the same honest picture renders here unchanged. The bar is a
 *     single role="img" with a plain-language aria-label, and the figures are
 *     repeated in text so nothing depends on colour alone.
 *  4. A three-up band of transparency commitments (no donation is too small, we
 *     are transparent, maximum impact) with gold top rules.
 *  5. A third-party accountability note, closing with the legal registration line
 *     (Reg. 611.510, CIF G93524130) on quiet muted ink.
 *  6. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero owns the h1, every section heading is h2.
 */
export default async function FinancialAccountabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, money, commitments, accountability, registration, donate } =
    financialsContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: transparency and integrity in managing finances. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <Prose>
            {intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* The 83/17 split, reused from the homepage so the same honest picture
          renders here. The component carries its own eyebrow, h2, the
          role="img" split bar with a plain-language aria-label, the two labelled
          figures, the accountability note, and the gold-led Donate action. */}
      <WhereMoneyGoes content={money} />

      {/* Transparency commitments: three promises on a soft cool band, each with
          a gold top rule (gold = general, per the brand board). */}
      <Section tone="indigo-tint">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {commitments.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {commitments.heading}
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {commitments.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border-t-2 border-accent bg-paper px-7 py-8 shadow-[0_8px_24px_rgba(31,27,22,0.08)]"
            >
              <dt className="font-heading text-[1.375rem] leading-[1.3] font-semibold text-ink">
                {item.title}
              </dt>
              <dd className="mt-3 font-body text-base leading-[1.6] text-muted">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Third-party accountability, closing with the legal registration line on
          quiet muted ink. The middot separators are intentional. */}
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

          <p className="mt-10 border-t border-muted/30 pt-6 font-body text-sm leading-relaxed text-muted">
            {registration}
          </p>
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
