import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { inviteToSpeakContent } from '@/lib/content/pages/inviteToSpeak'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = inviteToSpeakContent
  return pageMetadata({
    locale,
    path: '/get-involved/invite-us-to-speak',
    title: hero.title,
    description: hero.lede,
    image: hero.image,
  })
}

/**
 * Invite us to speak (/get-involved/invite-us-to-speak).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero (photographic with speaking-event.jpg), which owns the only h1.
 *  2. A Prose intro: why a speaking visit matters.
 *  3. A "what to expect" section listing the topics covered.
 *  4. A CTA section pointing to /contact.
 *
 * Heading hierarchy: hero h1, section headings h2. No em dashes anywhere.
 */
export default async function InviteToSpeakPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, whatToExpectEyebrow, whatToExpectHeading, whatToExpect, cta } =
    inviteToSpeakContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: why a speaking visit matters. */}
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

      {/* What to expect from a speaking visit. */}
      <Section tone="indigo-tint">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {whatToExpectEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {whatToExpectHeading}
          </h2>
          <Prose className="mt-6">
            <ul>
              {whatToExpect.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Prose>
        </div>
      </Section>

      {/* CTA: get in touch to arrange a visit. */}
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
          <div className="mt-8">
            <Button
              as={Link}
              href="/contact"
              size="lg"
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              {cta.contactCta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
