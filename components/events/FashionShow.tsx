import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { FadeIn } from '@/components/ui/FadeIn'
import { Reveal } from '@/components/ui/Reveal'
import { FASHION_SHOW_RESERVE_HREF, SUPPORT_HREF } from '@/lib/nav'
import { SITE } from '@/lib/site'

/**
 * The Fashion Show, transcribed from the v3 upcoming state of
 * `Fashion Show.dc.html`. Date is the design's 24 September 2026. Time,
 * venue, tickets and the programme the night funds are still to be confirmed,
 * so those slots say so rather than inventing details. Reserve goes to a
 * mailto until a ticket link exists.
 */

const FACTS: { label: string; value: string; icon: React.ReactNode }[] = [
  {
    label: 'DATE',
    value: 'Thu 24 Sept 2026',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <rect x="4" y="6" width="16" height="14" rx="1.6" stroke="#8A5F16" strokeWidth="1.4" />
        <path
          d="M4 10.5h16M8.5 4v4M15.5 4v4"
          stroke="#8A5F16"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'TIME',
    value: 'To be confirmed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <circle cx="12" cy="12" r="8.6" stroke="#8A5F16" strokeWidth="1.4" />
        <path d="M12 7.6V12l3 1.9" stroke="#8A5F16" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'LOCATION',
    value: 'Venue to be confirmed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z"
          stroke="#8A5F16"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.8" r="2.6" stroke="#8A5F16" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: 'ATTENDANCE',
    value: 'To be confirmed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M4 9a2 2 0 0 0 0 6v3.4h16V15a2 2 0 0 0 0-6V5.6H4V9Z"
          stroke="#8A5F16"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M14 6v2.2M14 11v2M14 15.8V18"
          stroke="#8A5F16"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

const NIGHT_INCLUDES = [
  'Welcome drinks on arrival',
  'Further details of the evening will be announced as they are confirmed',
]

function ReserveButton({ className }: { className?: string }): React.JSX.Element {
  return (
    <a
      href={FASHION_SHOW_RESERVE_HREF}
      className={
        className ??
        'inline-flex min-h-[52px] flex-none items-center justify-center gap-3 rounded-[6px] bg-[#D9A83F] px-8 text-[13px] font-bold tracking-[1.4px] text-[#2A2415] whitespace-nowrap transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C]'
      }
    >
      RESERVE YOUR PLACE <span aria-hidden="true">→</span>
    </a>
  )
}

function Hero(): React.JSX.Element {
  return (
    <section aria-label="Event" className="relative overflow-hidden bg-[#141009]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, rgba(217,168,63,0.12) 0%, rgba(20,16,9,0) 55%)',
        }}
      />
      <FadeIn className="relative z-10 mx-auto max-w-[1320px] px-16 pt-[190px] pb-24 text-center max-[680px]:px-7">
        <div className="text-[13px] font-bold tracking-[2.4px] text-[#D9A83F]">
          THURSDAY 24 SEPTEMBER 2026
        </div>
        <h1 className="mt-[22px] font-heading text-[clamp(48px,6vw,84px)] font-normal leading-[1.08] text-[#F7F3EA] max-[680px]:text-[44px]">
          The Fashion Show
        </h1>
        <p className="mx-auto mt-6 max-w-[440px] text-[16px] leading-[1.75] text-[#F7F3EA]/85">
          An evening of fashion in support of Collective Calling&rsquo;s work in Spain and Tanzania.
        </p>
        <div className="mt-[38px] flex items-center justify-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch">
          <ReserveButton />
        </div>
      </FadeIn>
    </section>
  )
}

function Facts(): React.JSX.Element {
  return (
    <section aria-label="Key facts" className="border-b border-[#D6CFC2] bg-[#FAF7F1]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-4 max-lg:grid-cols-2 max-[680px]:grid-cols-1">
        {FACTS.map((fact, index) => (
          <Reveal
            key={fact.label}
            delay={index * 0.07}
            className={
              index === 0
                ? 'px-7 py-[34px] text-center'
                : 'border-l border-[#D6CFC2] px-7 py-[34px] text-center max-lg:border-t max-lg:border-l-0'
            }
          >
            {fact.icon}
            <div className="mt-2.5 text-[12px] font-bold tracking-[1.5px] text-[#5F594E]">
              {fact.label}
            </div>
            <div className="mt-1.5 text-[15px] font-semibold text-[#1E1B17]">{fact.value}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Evening(): React.JSX.Element {
  return (
    <section aria-label="The evening" className="px-16 py-[120px] max-[680px]:px-7">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[1.1fr_1fr] items-start gap-20 max-lg:grid-cols-1 max-lg:gap-11">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">THE EVENING</span>
            <span className="h-px w-10 bg-[#C89A3C]" />
          </div>
          <p className="mt-7 font-heading text-[30px] leading-[1.45] text-[#1E1B17]">
            A night that gathers people around one purpose: using what we have, including style,
            hospitality and a room full of friends, to strengthen the work Collective Calling
            already does.
          </p>
        </Reveal>
        <Reveal delay={0.07} className="pt-[52px] max-lg:pt-0">
          <div className="text-[12px] font-bold tracking-[1.5px] text-[#5F594E]">THE NIGHT INCLUDES</div>
          <ul className="mt-5 flex flex-col gap-3.5">
            {NIGHT_INCLUDES.map((item) => (
              <li key={item} className="flex items-baseline gap-3.5 text-[15.5px] leading-[1.6] text-[#4A443B]">
                <span className="mt-[-2px] h-[7px] w-[7px] flex-none rounded-full bg-[#D9A83F]" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Funds(): React.JSX.Element {
  return (
    <section aria-label="What it funds" className="px-16 pt-6 pb-[120px] max-[680px]:px-7">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <div className="mx-auto h-0.5 w-10 bg-[#C89A3C]" />
        <h2 className="mt-7 font-heading text-[40px] font-normal leading-[1.2]">Where the money goes</h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-[1.8] text-[#4A443B]">
          Every euro raised on the night goes to Collective Calling&rsquo;s programmes in Spain and
          Tanzania.
        </p>
        <p className="mx-auto mt-11 max-w-[380px] font-heading text-[28px] leading-[1.3] text-[#1E1B17]">
          The specific allocation will be announced with the rest of the evening.
        </p>
        <Link
          href="/what-we-do"
          className="mt-7 inline-flex min-h-11 items-center gap-2.5 text-[12.5px] font-bold tracking-[1.5px] text-[#8A5F16]"
        >
          SEE THE PROGRAMME THIS FUNDS <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  )
}

function Sponsors(): React.JSX.Element {
  return (
    <section
      aria-label="Sponsors"
      className="border-y border-[#D6CFC2] bg-[#FAF7F1]"
    >
      <Reveal className="mx-auto max-w-[1320px] px-16 py-[88px] text-center max-[680px]:px-7">
        <div className="text-[13px] font-bold tracking-[2.4px] text-[#8A5F16]">WITH THANKS TO</div>
        <div className="mt-9 flex items-center justify-center">
          <div className="flex h-[88px] w-[280px] items-center justify-center rounded-[10px] border border-dashed border-[#C6BDAC] bg-[#F4F0E8] text-[13px] text-[#5F594E]">
            Headline sponsor to be confirmed
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex h-14 w-[150px] items-center justify-center rounded-[10px] border border-dashed border-[#C6BDAC] bg-[#F4F0E8] text-[12px] text-[#5F594E]"
            >
              Sponsor
            </div>
          ))}
        </div>
        <p className="mx-auto mt-11 max-w-[440px] text-[15px] leading-[1.8] text-[#4A443B]">
          Businesses can put their values to work behind the evening. For the sponsorship pack,
          write to{' '}
          <a
            href={`mailto:${SITE.org.email}`}
            className="font-semibold text-[#8A5F16]"
          >
            {SITE.org.email}
          </a>
          .
        </p>
      </Reveal>
    </section>
  )
}

function Closing(): React.JSX.Element {
  return (
    <>
      <section aria-label="Reserve" className="bg-[#141009]">
        <Reveal className="mx-auto flex max-w-[1320px] items-center justify-between gap-12 px-16 py-[88px] max-lg:flex-col max-lg:items-start max-[680px]:px-7">
          <div>
            <div className="text-[13px] font-bold tracking-[2.4px] text-[#D9A83F]">
              THURSDAY 24 SEPTEMBER 2026
            </div>
            <h2 className="mt-4 font-heading text-[42px] font-normal leading-[1.18] text-[#F7F3EA] max-[680px]:text-[32px]">
              The Fashion Show
            </h2>
            <p className="mt-3.5 max-w-[400px] text-[15px] leading-[1.7] text-[#F7F3EA]/85">
              One evening. One room. A different story for the people Collective Calling walks
              alongside.
            </p>
          </div>
          <ReserveButton />
        </Reveal>
      </section>
      <section aria-label="Give instead" className="px-16 pt-11 pb-24 max-[680px]:px-7">
        <Reveal>
        <p className="mx-auto max-w-[440px] text-center text-[14.5px] leading-[1.8] text-[#4A443B]">
          Can&rsquo;t make it on the night? You can still be part of it.{' '}
          <Link href={SUPPORT_HREF} className="font-semibold text-[#8A5F16]">
            Give to the work here
          </Link>
          .
        </p>
        </Reveal>
      </section>
    </>
  )
}

export function FashionShow(): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader active="what" tone="dark" />
      <Hero />
      <Facts />
      <Evening />
      <Funds />
      <Sponsors />
      <Closing />
      <SiteFooter />
    </div>
  )
}

export default FashionShow
