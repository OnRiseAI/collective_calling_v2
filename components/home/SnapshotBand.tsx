import * as React from 'react'
import { noOrphan } from '@/lib/text'
import type { HomeContent, SnapshotStat } from '@/lib/content/home.types'

/**
 * "Our Impact Snapshot" (mockup section 5): dark charcoal band, heading left,
 * five stats in a row with gold line icons, hairline dividers between them.
 * The numbers are the client's own from the design mockup.
 */

const ICONS: Record<SnapshotStat['icon'], React.JSX.Element> = {
  people: (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M15.5 14.6c2.6.3 4.5 1.9 4.5 4.4" />
    </svg>
  ),
  education: (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H12v15H6.5A2.5 2.5 0 0 0 4 21.5Z" />
      <path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H12v15h5.5a2.5 2.5 0 0 1 2.5 2.5Z" />
    </svg>
  ),
  projects: (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C7 17 3.5 13.6 3.5 9.9 3.5 7.2 5.6 5 8.3 5c1.5 0 2.9.7 3.7 1.8C12.8 5.7 14.2 5 15.7 5c2.7 0 4.8 2.2 4.8 4.9 0 3.7-3.5 7.1-8.5 11.1Z" />
    </svg>
  ),
  shop: (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M5 9.5h14V20H5Z" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  ),
  partners: (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12 10.5 8.5a2 2 0 0 1 2.8 0l.7.7a2 2 0 0 0 2.8 0L18 8" />
      <path d="M3 8.5 7 6l4 1.5L15 6l4 2.5V15l-4 3-4-1.5L7 18l-4-2.5Z" />
    </svg>
  ),
}

export function SnapshotBand({ content }: { content: HomeContent['snapshot'] }): React.JSX.Element {
  return (
    <section className="bg-brand-dark py-12 text-paper sm:py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <h2 className="max-w-[10rem] shrink-0 text-balance font-heading text-2xl leading-snug sm:text-[1.7rem]">
            {noOrphan(content.heading)}
          </h2>
          {/* Vertical hairline dividers between stats (mockup) at lg. */}
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-paper/10">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2.5 text-center lg:px-4"
              >
                <span className="text-accent">{ICONS[stat.icon]}</span>
                <dd className="font-heading text-2xl text-paper sm:text-[1.6rem]">{stat.value}</dd>
                <dt className="font-body text-[11px] uppercase tracking-wider text-paper/60">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default SnapshotBand
