import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { partnerContent } from '@/lib/content/pages/partner'

/**
 * Partner (/get-involved/partner).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero, which owns the page's only h1.
 *  2. A Prose intro: what institutional partnership looks like.
 *  3. The three partner types as h3 headings in Prose (churches, businesses, civic).
 *  4. A short existing-partners paragraph linking to /about/partners.
 *  5. A dark CTA section pointing to /contact and /about/partners.
 *
 * Heading hierarchy: hero h1, section headings h2, partner type headings h3.
 * No em dashes anywhere.
 */
export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const {
    hero,
    intro,
    partnerTypesEyebrow,
    partnerTypesHeading,
    partnerTypes,
    existingEyebrow,
    existingHeading,
    existingBody,
    cta,
  } = partnerContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: what a partnership is and why it matters. */}
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

      {/* The three kinds of partnership as Prose h3 sections. */}
      <Section tone="indigo-tint">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {partnerTypesEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {partnerTypesHeading}
          </h2>
          <Prose className="mt-6">
            {partnerTypes.map((partnerType) => (
              <div key={partnerType.title}>
                <h3>{partnerType.title}</h3>
                <p>{partnerType.body}</p>
              </div>
            ))}
          </Prose>
        </div>
      </Section>

      {/* Existing partners mention with link to /about/partners. */}
      <Section tone="paper">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {existingEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {existingHeading}
          </h2>
          <Prose className="mt-6">
            {existingBody.map((paragraph, index) => (
              <p key={index}>
                {index === existingBody.length - 1 ? (
                  <>
                    You can read more about all of our partners on the{' '}
                    <Link href="/about/partners">Partners page</Link>.
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* CTA: get in touch to explore a partnership. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {cta.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
            {cta.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              as={Link}
              href="/contact"
              size="lg"
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              {cta.contactCta}
            </Button>
            <Button
              as={Link}
              href="/about/partners"
              size="lg"
              variant="secondary"
              className="border-paper/40! text-paper! hover:border-paper/70!"
            >
              {cta.partnersCta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
