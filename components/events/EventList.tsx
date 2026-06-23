import * as React from 'react'
import Image from 'next/image'
import { PlaceholderBadge } from '@/components/collections/PlaceholderBadge'
import type { EventItem } from '@/lib/content/types'

/**
 * EventList renders each EventItem from the events read layer as a card row.
 *
 * Each card shows:
 * - The event title as an h3.
 * - A date pill: the dateLabel value when present, or the literal
 *   "Date to be announced" when dateLabel is absent. No invented dates.
 * - The optional poster image.
 * - The event summary.
 * - A PlaceholderBadge when placeholder is truthy.
 *
 * This is a server component; no client interactivity is required.
 * No em dashes anywhere in this file.
 */

type EventListProps = {
  events: EventItem[]
}

export function EventList({ events }: EventListProps) {
  return (
    <ul role="list" className="space-y-10">
      {events.map((event) => (
        <li
          key={event.slug}
          className="rounded-2xl bg-paper shadow-sm ring-1 ring-ink/5 overflow-hidden sm:flex"
        >
          {/* Optional poster image */}
          {event.image ? (
            <div className="relative h-52 sm:h-auto sm:w-52 sm:flex-shrink-0">
              <Image
                src={event.image}
                alt={event.alt ?? event.title}
                fill
                sizes="(max-width: 640px) 100vw, 208px"
                className="object-cover"
              />
            </div>
          ) : null}

          {/* Card body */}
          <div className="flex flex-col justify-between gap-4 p-6 sm:p-8">
            <div className="space-y-3">
              {/* Date pill */}
              <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-0.5 font-body text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {event.dateLabel ?? 'Date to be announced'}
              </span>

              <h3 className="font-heading text-xl font-medium text-ink leading-snug">
                {event.title}
              </h3>

              <p className="font-body text-base leading-[1.6] text-muted">
                {event.summary}
              </p>
            </div>

            {event.placeholder ? (
              <div>
                <PlaceholderBadge />
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default EventList
