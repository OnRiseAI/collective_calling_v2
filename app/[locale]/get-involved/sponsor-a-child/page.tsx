import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DonorboxEmbed } from '@/components/donate/DonorboxEmbed'
import { sponsorChildContent } from '@/lib/content/pages/sponsorChild'

/**
 * Sponsor a Child (/get-involved/sponsor-a-child).
 *
 * The charity's Tanzania child-sponsorship offer: 58 euros a month to walk
 * alongside one child at the Centre of Hope in Kasulu. An async server
 * component that composes from typed content and the shared toolkit, in the
 * clay-warm Tanzania key per the brand board:
 *  1. PageHero owns the page's only h1, over a Centre of Hope photograph with the
 *     navy gradient for legibility.
 *  2. A Prose story tells the sponsorship narrative (the streets of Kasulu, the
 *     Centre of Hope, rescue / restore / reintegrate, what 58 euros a month does).
 *  3. A "what your sponsorship provides" cluster on a soft clay band, each
 *     provision an h3 card with a clay top rule.
 *  4. The DonorboxEmbed, preset to 58 euros monthly, with the designation note
 *     alongside so donors choose the "Sponsor a Child" designation on the form.
 *  5. A closing gold-led give moment on deep navy.
 *
 * Heading hierarchy is strict: the hero owns the h1; section headings are h2;
 * each provision card title is an h3. No em dashes anywhere.
 */

export default async function SponsorChildPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, story, provides, form, closing } = sponsorChildContent

  return (
    <>
      <PageHero content={hero} />

      {/* The sponsorship story, held to a comfortable reading measure. The first
          block is the lede paragraph; the rest carry their own h2 sub-headings. */}
      <Section tone="paper">
        <Prose>
          {story.map((block, index) => (
            <div key={`story-${index}`}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              <p>{block.body}</p>
            </div>
          ))}
        </Prose>
      </Section>

      {/* What your sponsorship provides: a soft clay band (Tanzania key) with a
          responsive grid of provision cards, each flagged with a clay top rule. */}
      <Section tone="clay-tint">
        <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-clay">
          <span aria-hidden="true" className="h-px w-8 bg-clay" />
          {provides.eyebrow}
        </p>
        <h2 className="mt-5 max-w-2xl text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          {provides.heading}
        </h2>
        <p className="mt-6 max-w-prose font-body text-lg leading-[1.65] text-ink">
          {provides.intro}
        </p>

        <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {provides.items.map((item, index) => (
            <li key={`${item.title}-${index}`} className="flex">
              <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-muted/20 bg-white shadow-[0_8px_24px_rgba(31,27,22,0.08)] transition-shadow duration-200 ease-out hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)]">
                <span aria-hidden="true" className="h-1 w-full shrink-0 bg-clay" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-heading text-[1.375rem] font-semibold leading-[1.3] text-ink">
                    {item.title}
                  </h3>
                  <p className="font-body text-base leading-[1.6] text-muted">
                    {item.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* Begin sponsoring: the embedded Donorbox form preset to 58 euros monthly,
          with the designation note beside it so the gift is routed correctly. The
          iframe title carries "Sponsor" so it is clearly labelled in context. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,33rem)] lg:items-start lg:gap-16">
          <div className="max-w-prose">
            <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {form.eyebrow}
            </p>
            <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
              {form.heading}
            </h2>
            <p className="mt-6 font-body text-lg leading-[1.65] text-ink">
              {form.body}
            </p>

            {/* Designation note: a calm clay-tinted call-out so donors pick the
                "Sponsor a Child" designation on the Donorbox form. */}
            <div className="mt-8 rounded-xl border border-clay/25 bg-clay-tint p-5">
              <p className="font-body text-base leading-[1.6] text-ink">
                {form.designationNote}
              </p>
            </div>
          </div>

          <DonorboxEmbed
            title="Sponsor a Child donation form"
            query={{ amount: 58, recurring: true, default_interval: 'm' }}
            className="lg:mx-0"
          />
        </div>
      </Section>

      {/* Closing give moment: deep navy band where gold reads as warm light, the
          one place gold leads per the brand board button spec. */}
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
