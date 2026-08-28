import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { JOURNEY_HREF } from '@/lib/nav'

/**
 * Stories hub, transcribed from the v3 `Stories.dc.html`. Chrome via
 * SiteHeader / SiteFooter. Copy is static. Individual story cards are visual
 * until real slugs exist; the journey CTA is live.
 */

const PATHS: {
  title: string
  body: string
  label: string
  icon: React.ReactNode
}[] = [
  {
    title: 'People',
    body: 'Stories of individuals whose lives have been touched and transformed.',
    label: 'EXPLORE PEOPLE STORIES',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[34px] w-[34px] flex-none" aria-hidden="true">
        <circle cx="20" cy="14.5" r="4.6" stroke="#C89A3C" strokeWidth="1.7" />
        <path
          d="M11 30.5c0-5 4-8.1 9-8.1s9 3.1 9 8.1"
          stroke="#C89A3C"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Places',
    body: 'From Tanzania to Spain and beyond. The places where we work and grow.',
    label: 'EXPLORE PLACES STORIES',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[34px] w-[34px] flex-none" aria-hidden="true">
        <path
          d="M20 32s-9-7.2-9-14a9 9 0 0 1 18 0c0 6.8-9 14-9 14Z"
          stroke="#C89A3C"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="17.5" r="3.4" stroke="#C89A3C" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: 'Purpose',
    body: 'Why we do what we do and the impact we create together.',
    label: 'EXPLORE PURPOSE STORIES',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[34px] w-[34px] flex-none" aria-hidden="true">
        <path
          d="M20 31s-10-6-10-12.6a5.6 5.6 0 0 1 10-3.5 5.6 5.6 0 0 1 10 3.5C30 25 20 31 20 31Z"
          stroke="#C89A3C"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const CARDS: { image: string; alt: string; kicker: string; title: string; body: string }[] = [
  {
    image: '/images/stories/st-card1.png',
    alt: 'A young boy looking solemnly at the camera',
    kicker: 'PEOPLE',
    title: 'From Fear to Freedom',
    body: "Joseph's journey from survival to hope.",
  },
  {
    image: '/images/stories/st-card2.png',
    alt: 'Workers laying a roof on a new building',
    kicker: 'PLACES',
    title: 'Building More Than Walls',
    body: 'Creating safe spaces for children to call home.',
  },
  {
    image: '/images/stories/st-card3.png',
    alt: 'A mobile shower unit surrounded by volunteers under palm trees',
    kicker: 'PURPOSE',
    title: 'Dignity on Wheels',
    body: 'How a simple shower can restore dignity and hope.',
  },
  {
    image: '/images/stories/st-card4.png',
    alt: 'A young man overlooking golden hills at dusk',
    kicker: 'PEOPLE',
    title: 'A New Chapter Begins',
    body: "Emmanuel's dreams are bigger than his past.",
  },
]

function Hero(): React.JSX.Element {
  return (
    <section aria-label="Stories" className="relative overflow-hidden bg-[#141009]">
      <div
        className="absolute top-0 right-0 bottom-0 w-[53%] max-lg:relative max-lg:h-[300px] max-lg:w-full"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 26%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 26%)',
        }}
      >
        <Image
          src="/images/stories/st-hero.png"
          alt="A boy smiling and looking up, lit by warm light"
          fill
          priority
          sizes="(min-width: 1024px) 53vw, 100vw"
          className="object-cover object-[50%_25%] max-lg:[-webkit-mask-image:linear-gradient(to_top,black_60%,transparent_100%)] max-lg:[mask-image:linear-gradient(to_top,black_60%,transparent_100%)]"
        />
      </div>
      <div
        className="absolute inset-0 max-lg:hidden"
        style={{
          background:
            'linear-gradient(to right, #100C06 0%, #100C06 38%, rgba(16,12,6,0.66) 50%, rgba(16,12,6,0.14) 64%, rgba(16,12,6,0) 80%)',
        }}
      />
      <div className="relative z-10 max-w-[760px] px-16 pt-[150px] pb-[88px] max-[680px]:px-7">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">STORIES</span>
          <span className="h-px w-10 bg-[#C89A3C]" />
        </div>
        <h1 className="mt-[26px] font-heading text-[72px] font-normal leading-[1.1] text-[#F7F3EA] max-[680px]:text-[46px]">
          Lives.
          <br />
          Journeys.
          <br />
          Transformation.
        </h1>
        <p className="mt-7 max-w-[320px] text-[17px] leading-[1.7] text-[#F7F3EA]/95">
          Real stories from the field. Real people. Real impact.
        </p>
      </div>
    </section>
  )
}

function Featured(): React.JSX.Element {
  return (
    <section aria-label="Featured story" className="px-16 pt-[84px] pb-[72px] max-[680px]:px-7">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[1.28fr_1fr] items-center gap-16 max-lg:grid-cols-1">
        <div className="relative aspect-video w-full overflow-hidden rounded-[14px]">
          <Image
            src="/images/stories/st-featured.png"
            alt="A girl with braided hair gazing across green hills"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">FEATURED STORY</div>
          <h2 className="mt-5 font-heading text-[46px] font-normal leading-[1.16] max-[680px]:text-[32px]">
            A Future
            <br />
            Restored
          </h2>
          <div className="mt-6 h-0.5 w-10 bg-[#C89A3C]" />
          <p className="mt-[26px] max-w-[420px] text-[16.5px] leading-[1.8] text-[#4A443B]">
            After losing her parents, Neema arrived at our children&rsquo;s home with nothing but
            uncertainty. Today, she is thriving, confident, and dreaming of becoming a nurse.
          </p>
          <p className="mt-[30px] inline-flex items-center gap-2.5 border-b-2 border-[#C89A3C] pb-1.5 text-[13px] font-bold tracking-[1.6px] text-[#1E1B17]">
            READ NEEMA&rsquo;S STORY <span aria-hidden="true" className="text-[15px]">→</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function Paths(): React.JSX.Element {
  return (
    <section
      aria-label="Stories of transformation"
      className="px-16 pt-14 pb-16 text-center max-[680px]:px-7"
    >
      <h2 className="m-0 font-heading text-[44px] font-normal leading-[1.18] max-[680px]:text-[32px]">
        Stories of transformation
      </h2>
      <p className="mt-4 text-[16px] leading-[1.8] text-[#4A443B]">Different paths. One purpose.</p>
      <div className="mx-auto mt-14 grid max-w-[1320px] grid-cols-[1fr_auto_1fr_auto_1fr] text-left max-lg:grid-cols-1 max-lg:gap-10">
        {PATHS.map((path, index) => (
          <React.Fragment key={path.title}>
            {index > 0 && <div className="w-px bg-[#D6CFC2] max-lg:hidden" />}
            <div className="flex gap-[18px] px-9 max-lg:px-0">
              {path.icon}
              <div>
                <h3 className="m-0 font-heading text-[26px] font-normal">{path.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-[#4A443B]">{path.body}</p>
                <p className="mt-4 inline-flex items-center gap-2.5 border-b-2 border-[#C89A3C] pb-[5px] text-[12.5px] font-bold tracking-[1.5px] text-[#1E1B17]">
                  {path.label} <span aria-hidden="true">→</span>
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

function Cards(): React.JSX.Element {
  return (
    <section aria-label="Story collection" className="px-16 pt-6 pb-[88px] max-[680px]:px-7">
      <div className="mx-auto grid max-w-[1320px] grid-cols-4 gap-7 max-lg:grid-cols-2 max-[680px]:grid-cols-1">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className="flex flex-col overflow-hidden rounded-[10px] border border-[#2A2520]/14 bg-[#FFFDF9] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,23,0.12)]"
          >
            <div className="relative aspect-[3/2] w-full">
              <Image src={card.image} alt={card.alt} fill sizes="25vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col px-6 pt-[22px] pb-[26px]">
              <div className="text-[12px] font-bold tracking-[1.5px] text-[#8A5F16]">{card.kicker}</div>
              <h3 className="mt-2.5 font-heading text-[25px] font-normal leading-[1.2]">{card.title}</h3>
              <p className="mt-2.5 mb-[18px] flex-1 text-[14px] leading-[1.7] text-[#4A443B]">
                {card.body}
              </p>
              <p className="inline-flex items-center gap-2.5 text-[12.5px] font-bold tracking-[1.5px] text-[#1E1B17]">
                READ STORY <span aria-hidden="true">→</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Closing(): React.JSX.Element {
  return (
    <section aria-label="Become part of the story" className="px-16 pb-24 max-[680px]:px-7">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[10px] bg-[#141009]">
        <div
          className="absolute top-0 right-0 bottom-0 w-[46%]"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          }}
        >
          <Image
            src="/images/stories/st-cta.png"
            alt="Two people walking through the hills at dusk"
            fill
            sizes="46vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(16,12,6,0.6) 0%, rgba(16,12,6,0.25) 45%, rgba(16,12,6,0.05) 70%, rgba(16,12,6,0.3) 100%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between gap-12 px-16 py-16 max-lg:flex-col max-lg:items-start max-[680px]:px-7">
          <h2 className="m-0 max-w-[520px] font-heading text-[42px] font-normal leading-[1.2] text-[#F7F3EA] max-[680px]:text-[32px]">
            Some stories are read.
            <br />
            Others you become part of.
          </h2>
          <Link
            href={JOURNEY_HREF}
            className="inline-flex flex-none items-center gap-3 rounded-[6px] bg-[#D9A83F] px-8 py-[17px] text-[13px] font-semibold tracking-[1.4px] text-[#2A2415] whitespace-nowrap transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C] hover:text-[#1E1B17]"
          >
            START YOUR JOURNEY <span aria-hidden="true" className="text-[15px]">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Stories(): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader active="stories" tone="dark" />
      <Hero />
      <Featured />
      <Paths />
      <Cards />
      <Closing />
      <SiteFooter />
    </div>
  )
}

export default Stories
