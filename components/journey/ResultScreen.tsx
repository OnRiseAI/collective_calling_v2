'use client'

import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { PATH_INFO, type PathKey } from './journey.data'
import { ResultIcon } from './icons'

/**
 * The recommended path: its mark and name, the design's description, a real
 * link out to the path's page, and the fold-out list of the other three ways
 * in — each also a real link.
 */
export function ResultScreen({
  winner,
  showOthers,
  onToggleOthers,
}: {
  winner: PathKey
  showOthers: boolean
  onToggleOthers: () => void
}): React.JSX.Element {
  const info = PATH_INFO[winner]
  const others = (['values', 'volunteer', 'partner', 'founding'] as PathKey[]).filter(
    (k) => k !== winner,
  )

  return (
    <section className="relative grid h-screen grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] overflow-hidden bg-journey-paper max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:grid-cols-1 max-[1100px]:overflow-visible max-[1100px]:pt-[58px]">
      <div className="relative z-10 flex flex-col justify-center overflow-y-auto px-[72px] py-[120px] max-[1100px]:overflow-visible max-[1100px]:px-[26px] max-[1100px]:pb-[76px] max-[1100px]:pt-[60px]">
        <div className="text-[11.5px] tracking-[2.4px] text-[#7d7568]">YOUR RECOMMENDED PATH</div>
        <div className="mt-[22px] flex items-center gap-5">
          <ResultIcon path={winner} />
          <h2 className="m-0 font-heading text-[clamp(34px,3.6vw,48px)] leading-[1.12]">
            {info.name}
          </h2>
        </div>
        <p className="m-0 mt-[34px] max-w-[440px] text-pretty text-[16.5px] font-medium leading-[1.85] text-[#4e483e]">
          {info.desc}
        </p>
        <Link
          href={info.href}
          className="mt-[42px] inline-flex w-fit cursor-pointer items-center gap-11 rounded-full bg-journey-ink px-10 py-[22px] font-body text-[16.5px] font-semibold text-journey-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#342f27] hover:text-journey-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-journey-ink"
        >
          Explore this path <span className="text-[15px]">→</span>
        </Link>
        <button
          type="button"
          onClick={onToggleOthers}
          aria-expanded={showOthers}
          className="mt-[30px] w-fit cursor-pointer border-0 border-b border-solid border-[rgba(107,99,87,0.45)] bg-transparent p-0 pb-1 font-body text-[14.5px] text-[#6b6357] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(30,27,23,0.4)]"
        >
          See other ways to get involved
        </button>
        {showOthers ? (
          <div className="mt-[30px] flex max-w-[400px] flex-col gap-0.5 border-t border-[#D6CFC2]">
            {others.map((k) => (
              <Link
                key={k}
                href={PATH_INFO[k].href}
                className="flex items-baseline justify-between gap-5 border-b border-[#D6CFC2] py-4 text-journey-ink transition-all duration-200 hover:pl-2 hover:text-journey-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(30,27,23,0.4)]"
              >
                <span className="font-heading text-[23px]">{PATH_INFO[k].name}</span>
                <span className="max-w-[230px] text-right text-[13px] leading-[1.6] text-[#7d7568]">
                  {PATH_INFO[k].short}
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <div className="relative overflow-hidden max-[1100px]:order-first max-[1100px]:h-[62vh] max-[1100px]:min-h-0">
        <Image
          src="/images/journey/journey-08-result.jpg"
          alt="People in conversation around a table in warm daylight"
          fill
          sizes="(max-width: 1100px) 100vw, 53vw"
          className="object-cover object-[72%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,240,232,0.92)_0%,rgba(244,240,232,0.2)_13%,rgba(244,240,232,0)_26%)]" />
      </div>
    </section>
  )
}

export default ResultScreen
