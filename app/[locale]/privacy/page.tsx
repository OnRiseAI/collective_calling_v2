import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
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
    path: '/privacy',
    title: 'Privacy',
    description:
      'How Collective Calling collects, uses and looks after personal information on this website.',
  })
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Privacy"
      lede="How we collect, use and look after personal information when you use this website."
      updated="28 August 2026"
    >
      <h2>Who we are</h2>
      <p>
        The controller of personal data on this website is {SITE.org.legalName}, a registered
        nonprofit organisation in Spain (registration {SITE.org.registration}, CIF {SITE.org.taxId}
        ). Our address is {SITE.org.streetAddress}, {SITE.org.postalCode} {SITE.org.addressLocality}
        , {SITE.org.addressRegion}, Spain.
      </p>
      <p>
        You can reach us at{' '}
        <a href={`mailto:${SITE.org.email}`}>{SITE.org.email}</a> or{' '}
        <a href={`tel:${SITE.org.telephone}`}>{SITE.org.telephone}</a>.
      </p>

      <h2>What we collect</h2>
      <p>Depending on how you use the site, we may process:</p>
      <ul>
        <li>
          Contact details you send us by email, phone or WhatsApp, including your name, email
          address, phone number and the content of your message.
        </li>
        <li>
          Donation details processed by our giving partner Donorbox (and its payment processor
          Stripe). We do not store card numbers on this website.
        </li>
        <li>
          A first-visit cookie named <code>cc_welcomed</code>, which remembers that you have passed
          the welcome gate so you are not sent there on every return visit. It lasts 30 days.
        </li>
        <li>
          Technical logs created by our hosting provider (for example IP address, browser type and
          the pages requested) as part of running and securing the site.
        </li>
      </ul>
      <p>
        The mailing-list field on the events page does not yet submit to an email provider. Until
        that is connected, those addresses are not stored by us.
      </p>

      <h2>Why we use it</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>answer enquiries and event reservation requests</li>
        <li>process donations and send receipts through Donorbox</li>
        <li>keep the website working, secure and reasonably fast</li>
        <li>remember that you have already seen the welcome gate</li>
      </ul>
      <p>
        The legal bases we rely on are: your consent (the welcome cookie, and any optional
        mailing list once it is connected); performance of a contract or steps you ask us to take
        (a donation or an event reservation); and our legitimate interest in operating a secure
        charity website. Where we have a legal duty to keep donation or accounting records, we
        process that information to comply with Spanish law.
      </p>

      <h2>Who we share it with</h2>
      <p>We do not sell personal information. We share it only with:</p>
      <ul>
        <li>
          Donorbox and Stripe, when you give. Their privacy notices apply to the payment itself.
        </li>
        <li>
          Vercel, which hosts this website, and Sanity, which stores some of the public content
          editors publish.
        </li>
        <li>Professional advisers or authorities when the law requires it.</li>
      </ul>
      <p>
        Some of those providers may process data outside the European Economic Area. Where they
        do, they are responsible for putting in place an appropriate transfer mechanism.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry emails for as long as we need them to finish the conversation and for a
        reasonable period afterwards. Donation records are kept for the period Spanish accounting
        and charity rules require. The welcome cookie expires after 30 days. Server logs are
        rotated by our host in the ordinary course of operations.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask us for a copy of the personal data we hold about you, ask us
        to correct it, delete it, restrict it, or object to our using it, and you can ask for
        data portability where that right applies. You can withdraw consent at any time, without
        affecting processing that already happened.
      </p>
      <p>
        Write to us at <a href={`mailto:${SITE.org.email}`}>{SITE.org.email}</a>. You also have
        the right to complain to the Agencia Española de Protección de Datos (AEPD).
      </p>

      <h2>Cookies</h2>
      <p>
        The only first-party cookie this site sets today is <code>cc_welcomed</code>, used to skip
        the welcome screen on later visits. It is not used for advertising. You can delete it in
        your browser at any time. Third-party embeds (for example the Donorbox giving form) may
        set their own cookies. Those are governed by Donorbox.
      </p>

      <h2>Children</h2>
      <p>
        This website is aimed at adults who want to support or learn about the work. We do not
        knowingly collect personal data from children through the site. Stories about children in
        our programmes are published with the charity&rsquo;s care for their dignity and safety.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page when the way we handle information changes. The date at the top
        is the latest version.
      </p>
    </LegalPage>
  )
}
