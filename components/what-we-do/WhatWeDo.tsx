import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { EditorialHeader } from '@/components/layout/EditorialHeader'

/**
 * What We Do — transcribed from `What We Do.dc.html` (Aug 24 design export).
 * Chrome-free like Who We Are: its own EditorialHeader, no site footer, and
 * it closes on the "What do you carry?" journey band. All copy is static.
 *
 * The design's breakpoints are mirrored: rows stack below 1024px with the
 * photo first (`order: -1`), the hero photo drops its mask and becomes a
 * banner, and paddings/heading sizes step down below 680px.
 */

const GOLD = '#C89A3C'
const GOLD_DEEP = '#AD7E1E'

function Rule({ className }: { className?: string }): React.JSX.Element {
  return <div className={`h-[2px] w-10 bg-[#C89A3C] ${className ?? ''}`} />
}

function SectionIndex({ children }: { children: string }): React.JSX.Element {
  return <div className="font-heading text-[32px] text-[#AD7E1E]">{children}</div>
}

function RowLink({
  href,
  label,
  sub,
}: {
  href: string
  label: string
  sub: React.ReactNode
}): React.JSX.Element {
  return (
    <div>
      <Link
        href={href}
        className="text-[14px] font-bold tracking-[1.4px] text-[#AD7E1E] transition-colors hover:text-[#C89A3C]"
      >
        {label} <span aria-hidden="true">→</span>
      </Link>
      <p className="mt-2 text-[14.5px] font-medium leading-[1.6] text-[#1E1B17]">{sub}</p>
    </div>
  )
}

function Hero(): React.JSX.Element {
  return (
    <section aria-label="What we do" className="relative overflow-hidden bg-[#F4F0E8]">
      <EditorialHeader tone="light" current="/what-we-do" />
      <div className="grid grid-cols-[48fr_52fr] items-stretch max-lg:grid-cols-1">
        <div className="py-16 pb-[84px] pl-[90px] pr-10 max-[680px]:px-7">
          <div className="text-[14px] font-bold tracking-[2.4px] text-[#AD7E1E]">WHAT WE DO</div>
          <h1 className="mt-6 max-w-[520px] font-heading text-[62px] font-normal leading-[1.14] max-[680px]:text-[40px]">
            Where something
            <br />
            different can <em className="italic text-[#C89A3C]">begin.</em>
          </h1>
          <Rule className="mt-7" />
          <p className="mt-[30px] max-w-[360px] text-[16.5px] leading-[1.8] text-[#26211B]">
            Different lives need different environments. So our work doesn&rsquo;t take one form.
            It meets people where they are and creates space for what could come next.
          </p>
        </div>
        <div className="relative overflow-hidden max-lg:min-h-[380px]">
          <Image
            src="/images/what-we-do/hero.png"
            alt="A smiling boy on a village road at golden hour"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-[55%_30%] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_24%)] [mask-image:linear-gradient(to_right,transparent_0%,black_24%)] max-lg:[-webkit-mask-image:none] max-lg:[mask-image:none]"
          />
        </div>
      </div>
    </section>
  )
}

function BelongRow(): React.JSX.Element {
  return (
    <section
      aria-label="A place to belong"
      className="grid grid-cols-[48fr_52fr] bg-[#FAF7F1] max-lg:grid-cols-1"
    >
      <div className="relative min-h-[480px] overflow-hidden max-lg:order-first max-lg:min-h-[340px]">
        <Image
          src="/images/what-we-do/belong.png"
          alt="A line of smiling schoolboys with arms around each other"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center py-[72px] pl-[72px] pr-[90px] max-[680px]:px-7">
        <SectionIndex>01</SectionIndex>
        <h2 className="mt-2.5 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[30px]">
          A place to belong.
        </h2>
        <Rule className="mt-5" />
        <p className="mt-6 max-w-[480px] text-[16.5px] leading-[1.8] text-[#26211B]">
          For a child whose circumstances have shaped what they believe is possible, safety can be
          the beginning of something entirely different.
        </p>
        <div className="mt-9 flex gap-11 max-lg:flex-wrap">
          <div className="flex items-start gap-[15px]">
            <svg viewBox="0 0 40 40" fill="none" className="h-[34px] w-[34px] flex-none" aria-hidden="true">
              <circle cx="15" cy="14" r="4" stroke={GOLD_DEEP} strokeWidth="1.9" />
              <circle cx="24.5" cy="15.5" r="3.2" stroke={GOLD_DEEP} strokeWidth="1.9" />
              <path
                d="M8 29c0-4 3.1-6.6 7-6.6 2.3 0 4.3.9 5.6 2.4"
                stroke={GOLD_DEEP}
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <path
                d="M26.5 23.4c1.7.6 3.3 2 3.9 3.9M25 27.2l2.2 2.2 3.6-3.9"
                stroke={GOLD_DEEP}
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <RowLink href="/tanzania" label="CHILDREN & FAMILIES" sub="Enter this story." />
          </div>
          <div className="w-px bg-[#D6CFC2]" />
          <div className="flex items-start gap-[15px]">
            <svg viewBox="0 0 40 40" fill="none" className="h-[34px] w-[34px] flex-none" aria-hidden="true">
              <path
                d="M20 26s-8-4.8-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 28 16c0 5.2-8 10-8 10Z"
                stroke={GOLD_DEEP}
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
              <path
                d="M11 30.5c2.8 1.8 6 2.7 9 2.7s6.2-.9 9-2.7"
                stroke={GOLD_DEEP}
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            </svg>
            <RowLink
              href="/get-involved/sponsor-a-child"
              label="SPONSOR A CHILD"
              sub={
                <>
                  Become part of a<br />
                  child&rsquo;s journey.
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function SeenRow(): React.JSX.Element {
  return (
    <section
      aria-label="A place to be seen"
      className="grid grid-cols-[48fr_52fr] bg-[#F4F0E8] max-lg:grid-cols-1"
    >
      <div className="flex flex-col justify-center py-[72px] pl-[90px] pr-[72px] max-[680px]:px-7">
        <SectionIndex>02</SectionIndex>
        <h2 className="mt-2.5 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[30px]">
          A place to be seen.
        </h2>
        <Rule className="mt-5" />
        <p className="mt-6 max-w-[460px] text-[16.5px] leading-[1.8] text-[#26211B]">
          Sometimes restoration begins with something as simple as being seen. We meet immediate
          needs with dignity and create the consistency and relationships through which trust, and
          pathways forward, can begin.
        </p>
        <div className="mt-8">
          <RowLink href="/spain" label="HOMELESSNESS & RESTORATION" sub="Step inside." />
        </div>
      </div>
      <div className="relative min-h-[480px] overflow-hidden max-lg:order-first max-lg:min-h-[340px]">
        <Image
          src="/images/what-we-do/seen.png"
          alt="A volunteer talking with a man wrapped in a blanket beside a mobile shower unit"
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

const CONTRIBUTE_LINKS: {
  href: string
  label: string
  sub: string
  icon: React.JSX.Element
}[] = [
  {
    href: '/get-involved',
    label: 'COMMUNITY & VOLUNTEERING',
    sub: 'Offer your time.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[30px] w-[30px]" aria-hidden="true">
        <circle cx="14.5" cy="14" r="3.6" stroke={GOLD_DEEP} strokeWidth="1.9" />
        <circle cx="25" cy="15" r="3" stroke={GOLD_DEEP} strokeWidth="1.9" />
        <path
          d="M8 28c0-3.8 2.9-6.2 6.5-6.2S21 24.2 21 28M22.5 22.3c2.9.3 5.5 2.3 5.5 5.7"
          stroke={GOLD_DEEP}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: '/events',
    label: 'EVENTS & EXPERIENCES',
    sub: 'Join or create.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[30px] w-[30px]" aria-hidden="true">
        <rect x="9" y="11" width="22" height="20" rx="2" stroke={GOLD_DEEP} strokeWidth="1.9" />
        <path
          d="M9 17h22M15 8v5M25 8v5M14 22h3M19 22h3M24 22h3M14 26h3M19 26h3"
          stroke={GOLD_DEEP}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: '/charity-shops',
    label: 'CHARITY SHOPS',
    sub: 'Shop with purpose.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[30px] w-[30px]" aria-hidden="true">
        <path
          d="M11 14h18l-1.5 17h-15L11 14Z"
          stroke={GOLD_DEEP}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 17v-4a4.5 4.5 0 0 1 9 0v4"
          stroke={GOLD_DEEP}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M20 27s-3.4-2-3.4-4.3a1.9 1.9 0 0 1 3.4-1.2 1.9 1.9 0 0 1 3.4 1.2C23.4 25 20 27 20 27Z"
          stroke={GOLD_DEEP}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: '/get-involved/fundraise',
    label: 'FUNDRAISE / CREATE',
    sub: 'Use what you have.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[30px] w-[30px]" aria-hidden="true">
        <path
          d="M8 27c3-2.6 6-2.6 9-1l4 2c1.8.9 3.8.6 5.6-.6l5-3.4c-1.4-1.6-3.2-2-5-1l-3.2 1.6"
          stroke={GOLD_DEEP}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.5 17s-4.4-2.7-4.4-5.6a2.4 2.4 0 0 1 4.4-1.5 2.4 2.4 0 0 1 4.4 1.5c0 2.9-4.4 5.6-4.4 5.6Z"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

function ContributeRow(): React.JSX.Element {
  return (
    <section
      aria-label="A place to contribute"
      className="grid grid-cols-[48fr_52fr] bg-[#FAF7F1] max-lg:grid-cols-1"
    >
      <div className="relative min-h-[480px] overflow-hidden max-lg:order-first max-lg:min-h-[340px]">
        <Image
          src="/images/what-we-do/contribute.png"
          alt="An outdoor evening event with a stage, string lights and a seated crowd by the water"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center py-[72px] pl-[72px] pr-[90px] max-[680px]:px-7">
        <SectionIndex>03</SectionIndex>
        <h2 className="mt-2.5 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[30px]">
          A place to contribute.
        </h2>
        <Rule className="mt-5" />
        <p className="mt-6 max-w-[500px] text-[16.5px] leading-[1.8] text-[#26211B]">
          Change doesn&rsquo;t only belong to organisations. Sometimes it begins when somebody
          decides to show up, giving their time, sharing an ability, joining an experience or
          bringing people together around one.
        </p>
        <div className="mt-9 flex max-lg:flex-wrap">
          {CONTRIBUTE_LINKS.map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && <div className="w-px bg-[#D6CFC2]" />}
              <div
                className={
                  i === 0
                    ? 'flex-1 pr-[22px]'
                    : i === CONTRIBUTE_LINKS.length - 1
                      ? 'flex-1 pl-[22px]'
                      : 'flex-1 px-[22px]'
                }
              >
                {item.icon}
                <div className="mt-3 flex min-h-12 items-start">
                  <Link
                    href={item.href}
                    className="text-[13px] font-bold leading-[1.7] tracking-[1.2px] text-[#AD7E1E] transition-colors hover:text-[#C89A3C]"
                  >
                    {item.label} <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <p className="mt-2 text-[14px] font-medium leading-[1.6] text-[#1E1B17]">
                  {item.sub}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValuesRow(): React.JSX.Element {
  return (
    <section
      aria-label="A place for values to travel"
      className="grid grid-cols-[48fr_52fr] bg-[#F4F0E8] max-lg:grid-cols-1"
    >
      <div className="flex flex-col justify-center py-[72px] pl-[90px] pr-[72px] max-[680px]:px-7">
        <SectionIndex>04</SectionIndex>
        <h2 className="mt-2.5 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[30px]">
          A place for
          <br />
          values to travel.
        </h2>
        <Rule className="mt-5" />
        <p className="mt-6 max-w-[460px] text-[16.5px] leading-[1.8] text-[#26211B]">
          What if the values inside a business didn&rsquo;t stop at its walls? We help
          organisations recognise what they already hold, and create opportunities for those
          values to strengthen communities.
        </p>
        <div className="mt-8">
          <RowLink
            href="/get-involved/partner"
            label="VALUES IN ACTION"
            sub="See values in action."
          />
        </div>
      </div>
      <div className="relative min-h-[440px] overflow-hidden max-lg:order-first max-lg:min-h-[340px]">
        <Image
          src="/images/what-we-do/values.jpg"
          alt="A team in warm conversation around a wooden meeting table"
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

function ExpressionsClose(): React.JSX.Element {
  return (
    <section aria-label="Different expressions" className="px-[90px] py-24 text-center max-[680px]:px-7">
      <h2 className="m-0 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[30px]">
        Different expressions. <em className="italic text-[#AD7E1E]">The same root.</em>
      </h2>
      <Rule className="mx-auto mt-7" />
      <p className="mt-7 text-[17px] leading-[1.9] text-[#2A2520]">Every life carries worth.</p>
      <p className="mt-1 text-[17px] leading-[1.9] text-[#2A2520]">
        The right environment can change what becomes possible.
      </p>
      <p className="mt-1 text-[17px] leading-[1.9] text-[#2A2520]">
        What one person receives can eventually travel into{' '}
        <strong className="font-bold text-[#1E1B17]">the life of another.</strong>
      </p>
    </section>
  )
}

const CARRY_ITEMS: { label: string; icon: React.JSX.Element }[] = [
  {
    label: 'TIME',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.6" stroke={GOLD} strokeWidth="1.6" />
        <path d="M12 7.6V12l3 1.9" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'EXPERIENCE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none" aria-hidden="true">
        <path
          d="M12 3.6 14.3 9l5.5.5-4.2 3.7 1.3 5.4L12 15.7l-4.9 2.9 1.3-5.4L4.2 9.5 9.7 9 12 3.6Z"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'ABILITY',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none" aria-hidden="true">
        <path
          d="M6 18 18 6M8.5 6H18v9.5"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'INFLUENCE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.6" stroke={GOLD} strokeWidth="1.6" />
        <path
          d="M12 4.4v2.2M12 17.4v2.2M4.4 12h2.2M17.4 12h2.2M6.6 6.6l1.6 1.6M15.8 15.8l1.6 1.6M6.6 17.4l1.6-1.6M15.8 8.2l1.6-1.6"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'OPPORTUNITY.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none" aria-hidden="true">
        <path
          d="M4 17c2.5-4.5 5.5-6.8 8-6.8S17.5 12.5 20 17"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="6.8" r="2.4" stroke={GOLD} strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'RESOURCES',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none" aria-hidden="true">
        <rect x="5" y="10" width="14" height="9" rx="1.4" stroke={GOLD} strokeWidth="1.6" />
        <path
          d="M8.5 10V7.6A3.5 3.5 0 0 1 12 4.2a3.5 3.5 0 0 1 3.5 3.4V10"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

function CarryBand(): React.JSX.Element {
  return (
    <section aria-label="Start your journey" className="relative overflow-hidden bg-[#141009]">
      <Image
        src="/images/what-we-do/what-do-you-carry.jpg"
        alt="A person walking a stone path towards the sunset between hills"
        fill
        sizes="100vw"
        className="object-cover object-[50%_40%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(16,12,6,0.92) 0%, rgba(16,12,6,0.62) 30%, rgba(16,12,6,0.18) 52%, rgba(16,12,6,0.5) 78%, rgba(16,12,6,0.78) 100%)',
        }}
      />
      <div className="relative z-10 grid grid-cols-[1.15fr_0.85fr] items-center gap-16 px-[90px] py-[84px] max-lg:grid-cols-1 max-lg:gap-11 max-[680px]:px-7">
        <div>
          <div className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">
            WHAT DO YOU CARRY?
          </div>
          <h2 className="mt-[18px] font-heading text-[54px] font-normal leading-[1.14] text-[#F7F3EA] max-[680px]:text-[30px]">
            Start your <em className="italic">journey.</em>
          </h2>
          <p className="mt-[22px] max-w-[440px] text-[16px] leading-[1.8] text-[#F7F3EA]/95">
            There are many ways to bring what you hold, your time, abilities, experience,
            resources or influence, into the life of another.
          </p>
          <Link
            href="/journey"
            className="mt-8 inline-flex items-center gap-3 rounded-[6px] bg-[#D9A83F] px-[30px] py-4 text-[13px] font-semibold tracking-[1.4px] text-[#2A2415] transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C] hover:text-[#1E1B17]"
          >
            START YOUR JOURNEY{' '}
            <span aria-hidden="true" className="text-[15px]">
              →
            </span>
          </Link>
        </div>
        <ul className="m-0 flex list-none flex-col gap-5 border-l border-[#F7F3EA]/20 p-0 pl-11 max-lg:border-l-0 max-lg:pl-0">
          {CARRY_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-4">
              {item.icon}
              <span className="text-[14.5px] font-bold tracking-[2px] text-[#F7F3EA]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function WhatWeDo(): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <Hero />
      <BelongRow />
      <SeenRow />
      <ContributeRow />
      <ValuesRow />
      <ExpressionsClose />
      <CarryBand />
    </div>
  )
}

export default WhatWeDo
