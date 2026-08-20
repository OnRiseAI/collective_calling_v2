'use client'

import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { EmblemIcon, ClockIcon } from './icons'

/**
 * The journey's opening frame: full-viewport dawn photograph washed to cream
 * on the left, the invitation copy over it, and the two ways out — begin, or
 * skip back to the homepage.
 */
export function LandingScreen({ onBegin }: { onBegin: () => void }): React.JSX.Element {
  return (
    <section
      data-hero="1"
      className="relative grid min-h-screen grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] max-[1100px]:grid-cols-1"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/journey/journey-01-landing.jpg"
          alt="A walker looking out over misty mountains at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_100%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,240,232,0.98)_0%,rgba(244,240,232,0.95)_30%,rgba(244,240,232,0.42)_42%,rgba(244,240,232,0)_54%)] max-[1100px]:bg-[linear-gradient(to_bottom,rgba(244,240,232,0.97)_0%,rgba(244,240,232,0.89)_44%,rgba(244,240,232,0.32)_74%,rgba(244,240,232,0.1)_100%)]"
        />
      </div>
      <div className="relative z-10 flex flex-col justify-center px-[72px] py-20 max-[1100px]:px-[26px] max-[1100px]:pb-[72px] max-[1100px]:pt-[124px]">
        <div className="absolute left-[72px] top-11 flex items-center gap-[13px] max-[1100px]:left-[26px]">
          <EmblemIcon />
          <div className="leading-[1.2]">
            <div className="text-[11.5px] font-semibold tracking-[2.4px]">COLLECTIVE</div>
            <div className="text-[11.5px] font-semibold tracking-[2.4px]">CALLING</div>
          </div>
        </div>
        <h1 className="m-0 max-w-[520px] font-heading text-[clamp(40px,5.8vw,84px)] leading-[1.1] tracking-[-1.6px]">
          Every journey begins with a single question.
        </h1>
        <p className="mt-10 max-w-[420px] text-pretty text-[17px] font-medium leading-[1.75] text-[#544d43]">
          This short interactive journey helps you discover how your unique strengths, values and
          opportunities could be part of a bigger story.
        </p>
        <div className="mt-8 flex items-center gap-2.5 text-[14.5px] font-medium text-[#6f675c]">
          <ClockIcon />
          Takes around 3 minutes
        </div>
        <button
          type="button"
          onClick={onBegin}
          className="mt-11 inline-flex w-fit cursor-pointer items-center gap-[52px] rounded-full border-none bg-journey-ink px-[42px] py-[23px] font-body text-[16.5px] font-semibold tracking-[0.2px] text-journey-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#342f27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-journey-ink"
        >
          Begin Your Journey <span className="text-[15px]">→</span>
        </button>
        <Link
          href="/"
          className="mt-[30px] w-fit border-b border-[rgba(107,99,87,0.45)] pb-1 text-[14.5px] text-[#6b6357] hover:text-[#6b6357] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(30,27,23,0.4)]"
        >
          Skip this experience
        </Link>
      </div>
      <div />
    </section>
  )
}

export default LandingScreen
