import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { SubNavCards } from '@/components/page/SubNavCards'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { getInvolvedContent } from '@/lib/content/pages/getInvolved'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = getInvolvedContent
  return pageMetadata({
    locale,
    path: '/get-involved',
    title: hero.title,
    description: hero.lede,
  })
}

/**
 * Get Involved hub (/get-involved).
 *
 * The front door to every supporter action beyond donating. An async server
 * component that composes the page from typed content and the shared page
 * toolkit:
 *  1. PageHero, which owns the page's only h1 ("Get involved").
 *  2. A brief prose intro: why involvement matters and what is on offer.
 *  3. SubNavCards: the six ways to get involved (Sponsor a child, Fundraise,
 *     Events, Invite us to speak, Pray, Partner with us). Each card title is h3.
 *  4. A dark Donate section where gold leads.
 *
 * Heading hierarchy is strict: hero owns the h1, section headings are h2, and
 * SubNavCards titles are h3. No em dashes anywhere.
 */
export default async function GetInvolvedPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, subNav } = getInvolvedContent

  return (
    <>
      <PageHero content={hero} />

      {/* Brief intro: why involvement matters. */}
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

      {/* The six ways to get involved. */}
      <Section tone="indigo-tint">
        <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
          {subNav.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
          {subNav.heading}
        </h2>
        <div className="mt-10">
          <SubNavCards cards={subNav.cards} />
        </div>
      </Section>

      {/* Donate: gold leads. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            Stand with us
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
            No donation is too small
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            Give today and help us meet people with dignity in Spain and walk
            children home to their families in Tanzania.
          </p>
          <div className="mt-8">
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              Donate
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
