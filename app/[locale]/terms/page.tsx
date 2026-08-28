import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { LegalPage } from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/terms',
    title: 'Terms',
    description: 'Terms of use for the Collective Calling website.',
  })
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms"
      lede="The terms that apply when you use this website, give, or enquire about an event."
      updated="28 August 2026"
    >
      <h2>Using this website</h2>
      <p>
        This website is operated by {SITE.org.legalName}, a registered nonprofit organisation in
        Spain (registration {SITE.org.registration}, CIF {SITE.org.taxId}), of{' '}
        {SITE.org.streetAddress}, {SITE.org.postalCode} {SITE.org.addressLocality},{' '}
        {SITE.org.addressRegion}, Spain.
      </p>
      <p>
        By using the site you agree to these terms and to our{' '}
        <Link href="/privacy">Privacy</Link> page. If you do not agree, please do not use the site.
      </p>

      <h2>What the site is for</h2>
      <p>
        The site is here to explain Collective Calling&rsquo;s work, invite people to get involved,
        and receive gifts toward that work. Content is published in good faith. It is not
        professional advice, and programme details, figures and event information can change.
      </p>

      <h2>Donations</h2>
      <p>
        Gifts made through this website are processed by Donorbox and its payment partners. The
        amount you confirm on their form is the amount charged. Donations are made to Collective
        Calling. Where a designation is offered (for example Spain, Tanzania, or sponsor a child),
        we honour it as far as we reasonably can. If a designated need is already met, we may
        apply the gift to the area of greatest need.
      </p>
      <p>
        We do not store card details on this website. Receipts and payment questions are handled
        through Donorbox unless you write to us at{' '}
        <a href={`mailto:${SITE.org.email}`}>{SITE.org.email}</a>.
      </p>

      <h2>Events</h2>
      <p>
        Event pages (including The Fashion Show) may list dates, times, venues and ticket
        arrangements that are still being confirmed. A reservation request sent by email is not
        a confirmed ticket until we reply to say so. We may change, postpone or cancel an event
        if we have to. If we cancel, we will tell people who have reserved a place using the
        contact details they gave us.
      </p>

      <h2>Content and trademarks</h2>
      <p>
        Unless we say otherwise, the words, photographs, design and Collective Calling name on
        this site belong to us or to people who have licensed them to us. You may share links to
        public pages. You may not copy the site, scrape it at scale, or use our name or marks in
        a way that suggests we endorse you, without written permission.
      </p>
      <p>
        Photographs of people in our programmes are used with care. Please do not reuse them
        without asking.
      </p>

      <h2>Links and third parties</h2>
      <p>
        The site links to third parties, including Donorbox, social networks and partner
        organisations. Their sites have their own terms. We are not responsible for their
        content or practices.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep the site available, but we do not warrant that it will be uninterrupted,
        error-free or free of harmful code. We may change or withdraw pages at any time.
      </p>

      <h2>Liability</h2>
      <p>
        To the fullest extent Spanish law allows, Collective Calling is not liable for loss that
        arises from using, or being unable to use, this website, except where that loss is
        caused by our fraud, wilful misconduct, or a duty we cannot legally exclude. Nothing in
        these terms limits liability for death or personal injury caused by negligence.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Spain. The Spanish courts have jurisdiction,
        without affecting any rights you have as a consumer in your country of residence.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SITE.org.email}`}>{SITE.org.email}</a> or{' '}
        <a href={`tel:${SITE.org.telephone}`}>{SITE.org.telephone}</a>.
      </p>
    </LegalPage>
  )
}
