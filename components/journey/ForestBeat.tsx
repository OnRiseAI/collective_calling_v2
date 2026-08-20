'use client'

import * as React from 'react'
import Image from 'next/image'
import { PATHS } from './journey.data'
import { PathGlow } from './PathGlow'

/**
 * First interstitial: the misty forest trail, full bleed and dark, with the
 * glow threading up through the pines. Auto-advances; a click or Enter moves
 * on sooner.
 */
export function ForestBeat({
  travelled,
  calibrate,
  onNext,
}: {
  travelled: number
  calibrate: boolean
  onNext: () => void
}): React.JSX.Element {
  const trace = PATHS.forest
  return (
    <section onClick={onNext} className="relative min-h-screen cursor-pointer overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={trace.src}
          alt={trace.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_100%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,11,9,0.86)_0%,rgba(12,11,9,0.64)_19%,rgba(12,11,9,0.22)_38%,rgba(12,11,9,0.06)_60%,rgba(12,11,9,0.2)_100%)]" />
        <PathGlow trace={trace} travelled={travelled} calibrate={calibrate} />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-[88px] py-24 max-[1100px]:px-[26px] max-[1100px]:pb-[76px] max-[1100px]:pt-[60px]">
        <h2 className="m-0 max-w-[480px] text-pretty font-heading text-[clamp(36px,3.9vw,54px)] leading-[1.22] text-[#F7F3EA]">
          Every answer helps illuminate the path ahead.
        </h2>
        <div className="mt-[34px] h-px w-11 bg-[rgba(247,243,234,0.5)]" />
      </div>
    </section>
  )
}

export default ForestBeat
