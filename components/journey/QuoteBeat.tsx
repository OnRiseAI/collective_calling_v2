'use client'

import * as React from 'react'
import Image from 'next/image'
import { PATHS } from './journey.data'
import { PathGlow } from './PathGlow'

/**
 * Second interstitial: the centred quotation over cream beside the misted
 * hillside path. Auto-advances; a click or Enter moves on sooner.
 */
export function QuoteBeat({
  travelled,
  calibrate,
  onNext,
}: {
  travelled: number
  calibrate: boolean
  onNext: () => void
}): React.JSX.Element {
  const trace = PATHS.quote
  return (
    <section
      onClick={onNext}
      className="relative grid h-screen cursor-pointer grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] overflow-hidden bg-journey-paper max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:grid-cols-1 max-[1100px]:overflow-visible max-[1100px]:pt-[58px]"
    >
      <div className="relative z-10 flex flex-col items-center justify-center overflow-y-auto px-[72px] py-[120px] text-center max-[1100px]:overflow-visible max-[1100px]:px-[26px] max-[1100px]:pb-[76px] max-[1100px]:pt-[60px]">
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-journey-ink pt-3.5 font-heading text-[26px] text-journey-paper">
          &ldquo;
        </span>
        <p className="m-0 mt-[38px] max-w-[450px] text-pretty font-heading text-[clamp(29px,3.1vw,42px)] leading-[1.28]">
          Every meaningful journey begins long before we know where it will lead.
        </p>
        <div className="mb-[26px] mt-[38px] h-px w-10 bg-[#D6CFC2]" />
        <div className="text-[14.5px] font-medium text-[#6f675c]">
          Take a breath. You&apos;re on the right path.
        </div>
      </div>
      <div className="relative overflow-hidden max-[1100px]:order-first max-[1100px]:h-[62vh] max-[1100px]:min-h-0">
        <Image
          src={trace.src}
          alt={trace.alt}
          fill
          sizes="(max-width: 1100px) 100vw, 53vw"
          className="object-cover object-[100%_100%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,240,232,0.94)_0%,rgba(244,240,232,0.24)_14%,rgba(244,240,232,0)_28%)]" />
        <PathGlow trace={trace} travelled={travelled} calibrate={calibrate} />
      </div>
    </section>
  )
}

export default QuoteBeat
