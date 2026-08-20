'use client'

import * as React from 'react'
import Image from 'next/image'
import { ExploreGlyph, ConnectGlyph, ImpactGlyph } from './icons'

const STEPS = [
  {
    key: 'explore',
    title: 'Explore',
    body: 'Discover more about the path that fits you best.',
    Glyph: ExploreGlyph,
  },
  {
    key: 'connect',
    title: 'Connect',
    body: "We'll help you take the first step.",
    Glyph: ConnectGlyph,
  },
  {
    key: 'impact',
    title: 'Create Impact',
    body: 'Together, we turn values into lasting change.',
    Glyph: ImpactGlyph,
  },
]

/**
 * The closing frame: what happens next in three beats over the darkened
 * evening photograph, a thank-you, and the way back to the start.
 */
export function NextScreen({ onRestart }: { onRestart: () => void }): React.JSX.Element {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/journey/journey-09-next.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(20,18,15,0.55)]" />
      <div className="relative z-10 max-w-[900px] px-16 py-[120px] text-center max-[1100px]:px-[26px]">
        <h2 className="m-0 font-heading text-[clamp(36px,3.8vw,52px)] leading-[1.16] text-[#F7F3EA]">
          What happens next?
        </h2>
        <div className="mt-16 grid grid-cols-3 gap-2 max-[1100px]:grid-cols-1 max-[1100px]:gap-[46px]">
          {STEPS.map(({ key, title, body, Glyph }, i) => (
            <div
              key={key}
              className={`flex flex-col items-center px-[22px] max-[1100px]:border-r-0 max-[1100px]:p-0 ${
                i < STEPS.length - 1 ? 'border-r border-[rgba(247,243,234,0.14)]' : ''
              }`}
            >
              <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[rgba(247,243,234,0.5)]">
                <Glyph />
              </span>
              <div className="mt-6 font-heading text-[25px] text-[#F7F3EA]">{title}</div>
              <p className="m-0 mt-3.5 max-w-[185px] text-[13.5px] font-medium leading-[1.7] text-[#b3aa9d]">
                {body}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mb-0 mt-[66px] max-w-[350px] text-[14.5px] font-medium leading-[1.85] text-[#b3aa9d]">
          Thank you for taking the time to start your journey. We&apos;re glad you&apos;re here.
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-[34px] cursor-pointer border-none bg-transparent p-2 font-body text-[12px] tracking-[1.8px] text-[#7d7568] transition-colors duration-200 hover:text-journey-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-journey-glow"
        >
          START AGAIN
        </button>
      </div>
    </section>
  )
}

export default NextScreen
