'use client'

import * as React from 'react'
import Image from 'next/image'
import { PATHS } from './journey.data'
import { PathGlow } from './PathGlow'

/**
 * Third interstitial: sunrise over the hills, cream wash from the left, the
 * glow nearly at the summit. Auto-advances; a click or Enter moves on sooner.
 */
export function SunriseBeat({
  travelled,
  calibrate,
  onNext,
}: {
  travelled: number
  calibrate: boolean
  onNext: () => void
}): React.JSX.Element {
  const trace = PATHS.sunrise
  return (
    <section onClick={onNext} className="relative min-h-screen cursor-pointer overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={trace.src}
          alt={trace.alt}
          fill
          sizes="100vw"
          className="object-cover object-[60%_100%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(244,240,232,0.95)_0%,rgba(244,240,232,0.7)_24%,rgba(244,240,232,0.12)_46%,rgba(244,240,232,0)_60%)]" />
        <PathGlow trace={trace} travelled={travelled} calibrate={calibrate} />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-[88px] py-24 max-[1100px]:px-[26px] max-[1100px]:pb-[76px] max-[1100px]:pt-[60px]">
        <h2 className="m-0 max-w-[470px] text-pretty font-heading text-[clamp(36px,3.9vw,54px)] leading-[1.22]">
          You&apos;re almost there. Your path is becoming clearer.
        </h2>
        <div className="mt-8 h-px w-11 bg-[rgba(30,27,23,0.35)]" />
        <p className="m-0 mt-[30px] max-w-[210px] text-[14.5px] font-medium leading-[1.75] text-[#544d43]">
          Just a few more questions to go.
        </p>
      </div>
    </section>
  )
}

export default SunriseBeat
