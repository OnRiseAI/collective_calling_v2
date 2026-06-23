import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { fundraiseContent } from '@/lib/content/pages/fundraise'

/**
 * Fundraise (/get-involved/fundraise).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero, which owns the page's only h1.
 *  2. A Prose intro: why fundraising for CC matters (83% programmes stat).
 *  3. An inline card grid (h3 titles) for fundraising ideas, inside a Section with eyebrow and heading above it.
 *  4. Prose with the three-step how-it-works guide.
 *  5. A dark Donate section with CTA to /contact and DONATE_HREF.
 *
 * Heading hierarchy: hero h1, section headings h2, ValueCards h3. No em dashes.
 */
export default async function FundraisePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const {
    hero,
    intro,
    ideasEyebrow,
    ideasHeading,
    ideas,
    howItWorksEyebrow,
    howItWorksHeading,
    steps,
    donate,
  } = fundraiseContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: why fundraising matters and the 83% stat. */}
      <Section tone="paper">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {intro.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {intro.heading}
          </h2>
          <Prose className="mt-6">
            {intro.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* Eyebrow + heading for the ideas grid, then inline card grid matching ValueCards markup, inside an explicit Section so the eyebrow/heading sit above it. */}
      <Section tone="indigo-tint">
        <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
          {ideasEyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
          {ideasHeading}
        </h2>
        <div className="mt-10">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {ideas.map((item) => (
              <li
                key={item.title}
                className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)] hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)] transition-shadow duration-200 ease-out"
              >
                <span aria-hidden className="h-1 w-full shrink-0 bg-accent" />
                <div className="flex flex-1 flex-col gap-3 p-7 lg:p-8">
                  <h3 className="font-heading text-[1.75rem] leading-[1.2] font-semibold text-balance text-ink">
                    {item.title}
                  </h3>
                  <p className="font-body text-base leading-[1.65] text-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* How it works: three steps in Prose. */}
      <Section tone="paper">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {howItWorksEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {howItWorksHeading}
          </h2>
          <Prose className="mt-6">
            {steps.map((step, index) => (
              <div key={step.title}>
                <h3>{`${index + 1}. ${step.title}`}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </Prose>
        </div>
      </Section>

      {/* Donate / register: gold leads. */}
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
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              {donate.cta}
            </Button>
            <Button
              as={Link}
              href="/contact"
              size="lg"
              variant="secondary"
              className="border-paper/40! text-paper! hover:border-paper/70!"
            >
              Register a fundraiser
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
