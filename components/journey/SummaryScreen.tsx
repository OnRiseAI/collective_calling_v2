'use client'

import * as React from 'react'
import { SummaryMap } from './SummaryMap'
import type { PathKey } from './journey.data'

/**
 * The journey summary: near-black field, the framing copy on the left and the
 * pre-rendered glowing map on the right with the four path names pinned to its
 * baked-in nodes.
 */
export function SummaryScreen({
  winner,
  calibrate,
  onNext,
}: {
  winner: PathKey
  calibrate: boolean
  onNext: () => void
}): React.JSX.Element {
  return (
    <section className="relative grid h-screen grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] overflow-hidden bg-journey-dark max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:grid-cols-1 max-[1100px]:overflow-visible max-[1100px]:pt-[58px]">
      <div className="relative z-10 flex flex-col justify-center overflow-y-auto px-[72px] py-[120px] max-[1100px]:overflow-visible max-[1100px]:px-[26px] max-[1100px]:pb-[76px] max-[1100px]:pt-[60px]">
        <div className="text-[11.5px] tracking-[2.4px] text-[#9a9184]">YOUR JOURNEY SUMMARY</div>
        <h2 className="m-0 mt-7 max-w-[450px] text-pretty font-heading text-[clamp(31px,3.2vw,43px)] leading-[1.26] text-[#F7F3EA]">
          Based on your responses, this is the path that appears to be your strongest starting
          point.
        </h2>
        <p className="m-0 mt-[34px] max-w-[280px] text-[14.5px] font-medium leading-[1.8] text-[#a09788]">
          Of course, your journey can evolve and grow over time. There are many ways to make an
          impact.
        </p>
        <button
          type="button"
          onClick={onNext}
          className="mt-11 inline-flex w-fit cursor-pointer items-center gap-[18px] rounded-full border border-[rgba(247,243,234,0.35)] bg-transparent px-9 py-[18px] font-body text-[14.5px] font-medium text-[#F7F3EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-journey-glow hover:text-journey-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-journey-glow"
        >
          See your path <span className="text-[15px]">→</span>
        </button>
      </div>
      <div className="relative min-h-[520px] overflow-hidden bg-journey-dark max-[1100px]:order-first max-[1100px]:h-[62vh] max-[1100px]:min-h-0">
        <SummaryMap winner={winner} calibrate={calibrate} />
      </div>
    </section>
  )
}

export default SummaryScreen
