import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/page/PageHero'
import { Section } from '@/components/ui/Section'
import { EventList } from '@/components/events/EventList'
import { getEvents } from '@/lib/content/events'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/events',
    title: 'Events',
    description:
      'Each year Collective Calling holds three recurring events: the Annual Gala, Spring Fair, and Lunch with Santa. Dates are announced closer to the time.',
  })
}

/**
 * Events hub (/events).
 *
 * An async server component listing Collective Calling's recurring community
 * and fundraising events: the Annual Gala, Spring Fair, and Lunch with Santa.
 * Dates are announced closer to the time, so none of the seed entries carry
 * a dateLabel -- EventList shows "Date to be announced" for each.
 *
 * Heading hierarchy is strict: one h1 from PageHero, h2 for section headings
 * (if added in future), h3 inside each EventList card. No em dashes.
 */
export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const events = await getEvents()

  return (
    <>
      <PageHero
        content={{
          eyebrow: 'Get involved',
          title: 'Events',
          lede:
            'Each year Collective Calling holds three recurring events: the Annual Gala, Spring Fair, and Lunch with Santa. Dates are announced closer to the time, so check back or join our mailing list to be the first to know.',
        }}
      />

      <Section tone="paper">
        <EventList events={events} />
      </Section>
    </>
  )
}
