import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { EventsSignup } from '@/components/events/EventsSignup'
import { FASHION_SHOW_HREF } from '@/lib/nav'

/**
 * Events & Experiences, transcribed from the v3 `Events and Experiences.dc.html`.
 * Lists the Fashion Show as the current upcoming evening, then the mailing
 * form (no backend yet). Uses shared SiteHeader / SiteFooter.
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

function Upcoming(): React.JSX.Element {
  return (
    <section aria-label="Upcoming events" className="px-16 py-[120px] max-[680px]:px-7">
      <div className="mx-auto max-w-[760px]">
        <Link
          href={FASHION_SHOW_HREF}
          className="block rounded-[14px] border border-[#D6CFC2] bg-[#FAF7F1] px-10 py-12 transition-all duration-[250ms] hover:-translate-y-1 hover:border-[#C89A3C] max-[680px]:px-7"
        >
          <div className="text-[13px] font-bold tracking-[2.4px] text-[#8A5F16]">
            THURSDAY 24 SEPTEMBER 2026
          </div>
          <h2 className="mt-4 font-heading text-[38px] font-normal leading-[1.2] text-[#1E1B17]">
            The Fashion Show
          </h2>
          <p className="mt-4 max-w-[440px] text-[16.5px] leading-[1.8] text-[#4A443B]">
            An evening of fashion in support of Collective Calling&rsquo;s work in Spain and
            Tanzania.
          </p>
          <p className="mt-8 inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[1.5px] text-[#8A5F16]">
            VIEW THE EVENING <span aria-hidden="true">→</span>
          </p>
        </Link>
        <div className="mt-16 text-center">
          <p className="mx-auto max-w-[420px] text-[16.5px] leading-[1.8] text-[#4A443B]">
            New events and experiences are announced here first. Join the mailing list and
            we&apos;ll let you know the moment something else is planned.
          </p>
          <EventsSignup />
          <p className="mt-4 text-[12.5px] text-[#5F594E]">
            No spam. Just the occasional invitation worth opening.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Events(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader active="what" tone="dark" />
      <Hero />
      <Upcoming />
      <SiteFooter />
    </div>
  )
}

export default Events
