import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { ContactDetails } from '@/components/page/ContactDetails'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { contactContent } from '@/lib/content/pages/contact'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = contactContent
  return pageMetadata({
    locale,
    path: '/contact',
    title: hero.title,
    description: hero.lede,
  })
}

/**
 * Contact (/contact).
 *
 * A top-level route (not under /about), already present in the nav. An async
 * server component that composes the page from typed content and the shared page
 * toolkit, mirroring the sibling pages so the whole site feels like one
 * connected charity:
 *  1. PageHero, which owns the page's only h1 ("Contact Us"). Solid navy mode,
 *     because the source contact page carries no usable documentary photography.
 *  2. A Prose invitation to get in touch, including the "invite us to speak"
 *     mention so supporters know they can ask us to come and share the work.
 *  3. The ContactDetails block: the charity's real phone (a tel: link that also
 *     takes WhatsApp), postal address, and email (a mailto: link), with a
 *     gold-led "Email us" button and the real social profiles. There is no
 *     email-form backend yet, so this page offers working contact details rather
 *     than a form (a real form is deferred to a later plan).
 *  4. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero owns the h1 and every section heading is
 * h2. No em dashes anywhere.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, invitation, info, emailNote, phoneNote, details, social, donate } =
    contactContent

  return (
    <>
      <PageHero content={hero} />

      {/* Invitation plus the contact details, side by side on large screens so
          the warm copy and the practical actions stay together. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
              {details.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
              {details.heading}
            </h2>
            <Prose className="mt-6">
              {invitation.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Prose>
          </div>

          <ContactDetails
            info={info}
            emailNote={emailNote}
            phoneNote={phoneNote}
            socials={social.links}
          />
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
