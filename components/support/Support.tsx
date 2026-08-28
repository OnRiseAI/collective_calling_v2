import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { DonateCard } from '@/components/support/DonateCard'
import { FadeIn } from '@/components/ui/FadeIn'
import { Reveal } from '@/components/ui/Reveal'
import { JOURNEY_HREF } from '@/lib/nav'

const IMPACT: {
  image: string
  alt: string
  title: string
  body: string
  icon: React.ReactNode
}[] = [
  {
    image: '/images/support/sp-card1.png',
    alt: 'A boy smiling in a forest clearing',
    title: 'Care for children',
    body: 'Safe spaces, education, food, medical care and a future filled with hope.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M12 19s-7-4.2-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 4.8-7 9-7 9Z"
          stroke="#C89A3C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    image: '/images/support/sp-card2.png',
    alt: 'A mobile shower unit among palm trees',
    title: 'Dignity in action',
    body: 'Mobile showers, hygiene kits and essential support for those living on the margins.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M12 4.5S6.5 10.6 6.5 14a5.5 5.5 0 0 0 11 0c0-3.4-5.5-9.5-5.5-9.5Z"
          stroke="#C89A3C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    image: '/images/support/sp-card3.png',
    alt: 'A group of local leaders standing together in the mountains',
    title: 'Stronger communities',
    body: 'Working alongside local leaders to build capacity, resilience and lasting change.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <circle cx="9" cy="9.5" r="2.4" stroke="#C89A3C" strokeWidth="1.4" />
        <circle cx="15.4" cy="10.4" r="2" stroke="#C89A3C" strokeWidth="1.4" />
        <path
          d="M4.8 17.6c0-2.3 2-3.8 4.2-3.8s4.2 1.5 4.2 3.8M14.6 14.3c2 .2 3.6 1.5 3.6 3.3"
          stroke="#C89A3C"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    image: '/images/support/sp-card4.png',
    alt: 'A hiker with a backpack walking a coastal trail',
    title: "Where it's needed most",
    body: 'Flexible support allows us to respond to real needs, wherever they arise.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="#C89A3C" strokeWidth="1.4" />
        <path
          d="M3.5 12h17M12 3.5c-2.6 2.4-3.9 5.3-3.9 8.5s1.3 6.1 3.9 8.5c2.6-2.4 3.9-5.3 3.9-8.5S14.6 5.9 12 3.5Z"
          stroke="#C89A3C"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
]

function Hero(): React.JSX.Element {
  return (
    <section aria-label="Support our work" className="relative overflow-hidden bg-[#141009]">
      <div
        className="absolute top-0 right-0 bottom-0 w-[67%] max-lg:relative max-lg:h-[300px] max-lg:w-full"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 26%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 26%)',
        }}
      >
        <Image
          src="/images/support/sp-hero.png"
          alt="A smiling boy at golden hour, children playing behind him"
          fill
          priority
          sizes="(min-width: 1024px) 67vw, 100vw"
          className="object-cover object-[40%_30%]"
        />
      </div>
      <div
        className="absolute inset-0 max-lg:hidden"
        style={{
          background:
            'linear-gradient(to right, #100C06 0%, #100C06 30%, rgba(16,12,6,0.66) 44%, rgba(16,12,6,0.12) 60%, rgba(16,12,6,0) 76%)',
        }}
      />
      <div className="relative z-10 max-w-[720px] px-16 pt-[150px] pb-[88px] max-[680px]:px-7">
        <FadeIn>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">SUPPORT</span>
          <span className="h-px w-10 bg-[#C89A3C]" />
        </div>
        <h1 className="mt-[26px] font-heading text-[72px] font-normal leading-[1.1] text-[#F7F3EA] max-[680px]:text-[46px]">
          Support
          <br />
          our work.
        </h1>
        <p className="mt-7 max-w-[340px] text-[17px] leading-[1.75] text-[#F7F3EA]/95">
          Your generosity helps create environments where children and adults can experience
          healing, dignity and hope.
        </p>
        </FadeIn>
      </div>
    </section>
  )
}

function GiveSection(): React.JSX.Element {
  return (
    <section aria-label="Make a donation" className="px-16 py-[88px] max-[680px]:px-7">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[1fr_1.05fr] items-center gap-20 max-lg:grid-cols-1 max-lg:gap-12">
        <Reveal>
          <h2 className="m-0 max-w-[460px] font-heading text-[46px] font-normal leading-[1.2] max-[680px]:text-[32px]">
            We exist to create environments where transformation happens.
          </h2>
          <div className="mt-[26px] h-0.5 w-10 bg-[#C89A3C]" />
          <p className="mt-7 max-w-[440px] text-[16.5px] leading-[1.85] text-[#4A443B]">
            From Tanzania to Spain and everywhere in between, we come alongside communities with
            practical help, relational care and long-term commitment.
            <br />
            Every contribution fuels this mission.
          </p>
          <p className="mt-[34px] font-hand text-[29px] text-[#8A5F16]">
            Thank you for being part of the journey.
          </p>
        </Reveal>
        <Reveal delay={0.07}>
          <DonateCard />
        </Reveal>
      </div>
    </section>
  )
}

function ImpactSection(): React.JSX.Element {
  return (
    <section aria-label="Your support creates real change" className="bg-[#EDE8DD] py-[84px]">
      <Reveal className="px-16 text-center max-[680px]:px-7">
        <h2 className="m-0 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[32px]">
          Your support creates real change
        </h2>
        <div className="mx-auto mt-6 h-0.5 w-10 bg-[#C89A3C]" />
        <p className="mx-auto mt-6 max-w-[420px] text-[16px] leading-[1.8] text-[#4A443B]">
          Every donation, big or small, helps us show up, serve well and stay for the long haul.
        </p>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-[1320px] grid-cols-4 gap-7 px-16 max-lg:grid-cols-2 max-[680px]:grid-cols-1 max-[680px]:px-7">
        {IMPACT.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.07}>
          <article
            className="overflow-hidden rounded-[10px] border border-[#2A2520]/14 bg-[#FFFDF9] pb-[30px] text-center"
          >
            <div className="relative">
              <div className="relative aspect-[3/2] w-full">
                <Image src={card.image} alt={card.alt} fill sizes="25vw" className="object-cover" />
              </div>
              <span className="absolute bottom-[-26px] left-1/2 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-[#C89A3C] bg-[#1E1B17]">
                {card.icon}
              </span>
            </div>
            <h3 className="mt-11 font-heading text-[25px] font-normal">{card.title}</h3>
            <p className="mx-[22px] mt-3 text-[14px] leading-[1.7] text-[#4A443B]">{card.body}</p>
          </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-[52px] text-center">
        <Link
          href="/what-we-do"
          className="inline-flex items-center gap-3 rounded-lg border border-[#1E1B17]/40 px-[30px] py-4 text-[13px] font-bold tracking-[1.6px] text-[#1E1B17] transition-all duration-[250ms] hover:border-[#C89A3C] hover:text-[#8A5F16]"
        >
          SEE MORE OF OUR WORK <span aria-hidden="true" className="text-[15px]">→</span>
        </Link>
      </Reveal>
    </section>
  )
}

function Closing(): React.JSX.Element {
  return (
    <section aria-label="Stand with us" className="px-16 pt-[88px] pb-24 max-[680px]:px-7">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[10px] bg-[#141009]">
        <div
          className="absolute top-0 right-0 bottom-0 w-[52%]"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 32%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 32%)',
          }}
        >
          <Image
            src="/images/support/sp-cta.png"
            alt="Two hands clasped together"
            fill
            sizes="52vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(16,12,6,0.55) 0%, rgba(16,12,6,0.2) 50%, rgba(16,12,6,0.35) 100%)',
          }}
        />
        <Reveal className="relative z-10 flex items-center justify-between gap-12 px-16 py-[70px] max-lg:flex-col max-lg:items-start max-[680px]:px-7">
          <div>
            <h2 className="m-0 font-heading text-[42px] font-normal leading-[1.2] text-[#F7F3EA] max-[680px]:text-[32px]">
              Stand with us.
              <br />
              Change lives.
            </h2>
            <p className="mt-[18px] max-w-[320px] text-[15px] leading-[1.75] text-[#F7F3EA]/95">
              Together, we can create environments where transformation happens.
            </p>
          </div>
          <div className="flex-none text-center">
            <Link
              href={JOURNEY_HREF}
              className="inline-flex items-center gap-3 rounded-[6px] bg-[#D9A83F] px-8 py-[17px] text-[13px] font-semibold tracking-[1.4px] text-[#2A2415] whitespace-nowrap transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C] hover:text-[#1E1B17]"
            >
              START YOUR JOURNEY <span aria-hidden="true" className="text-[15px]">→</span>
            </Link>
            <p className="mt-3.5 text-[13px] text-[#F7F3EA]/85">There are many ways to get involved.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Support(): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader tone="dark" />
      <Hero />
      <GiveSection />
      <ImpactSection />
      <Closing />
      <SiteFooter />
    </div>
  )
}

export default Support
