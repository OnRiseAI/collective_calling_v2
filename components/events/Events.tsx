import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { EventsSignup } from '@/components/events/EventsSignup'

/**
 * Events & Experiences, transcribed from the v3 `Events and Experiences.dc.html`.
 * Empty state: nothing is scheduled. The mailing form has no backend. Uses
 * shared SiteHeader / SiteFooter. Paddings step down below 680px. All copy
 * is static; nothing here reads Sanity.
 */

function Hero(): React.JSX.Element {
  return (
    <section
      aria-label="Events and experiences"
      className="bg-[#141009] px-16 pb-[88px] pt-[170px] max-[680px]:px-7"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">
            WHAT WE DO
          </span>
          <span className="h-px w-10 bg-[#C89A3C]" />
        </div>
        <h1 className="mt-[22px] font-heading text-[64px] font-normal leading-[1.12] text-[#F7F3EA] max-[680px]:text-[42px]">
          Events & Experiences
        </h1>
        <p className="mt-6 max-w-[460px] text-[17px] leading-[1.75] text-[#F7F3EA]/95">
          Gatherings, experiences and moments that bring people together around one purpose.
        </p>
      </div>
    </section>
  )
}

function EmptyState(): React.JSX.Element {
  return (
    <section aria-label="Upcoming events" className="px-16 py-[120px] max-[680px]:px-7">
      <div className="mx-auto max-w-[760px] text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#D6CFC2] bg-[#FAF7F1]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-[26px] w-[26px]"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="6"
              width="16"
              height="14"
              rx="1.6"
              stroke="#8A5F16"
              strokeWidth="1.4"
            />
            <path
              d="M4 10.5h16M8.5 4v4M15.5 4v4"
              stroke="#8A5F16"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <h2 className="mt-7 font-heading text-[38px] font-normal leading-[1.2]">
          Nothing scheduled right now.
        </h2>
        <p className="mx-auto mt-[18px] max-w-[420px] text-[16.5px] leading-[1.8] text-[#4A443B]">
          New events and experiences are announced here first. Join the mailing list and
          we&apos;ll let you know the moment something is planned.
        </p>
        <EventsSignup />
        <p className="mt-4 text-[12.5px] text-[#5F594E]">
          No spam. Just the occasional invitation worth opening.
        </p>
        <div className="mx-auto mt-14 h-px w-10 bg-[#D6CFC2]" />
        <p className="mx-auto mt-8 max-w-[420px] text-[15px] leading-[1.8] text-[#4A443B]">
          In the meantime, there are other ways in:{' '}
          <Link
            href="/what-we-do"
            className="font-semibold text-[#8A5F16] transition-colors hover:text-[#C89A3C]"
          >
            see what we do
          </Link>{' '}
          or{' '}
          <Link
            href="/stories"
            className="font-semibold text-[#8A5F16] transition-colors hover:text-[#C89A3C]"
          >
            read the stories
          </Link>{' '}
          behind the work.
        </p>
      </div>
    </section>
  )
}

export function Events(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader active="what" tone="dark" />
      <Hero />
      <EmptyState />
      <SiteFooter />
    </div>
  )
}

export default Events
