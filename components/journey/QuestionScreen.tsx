'use client'

import * as React from 'react'
import Image from 'next/image'
import { PATHS, questionPhoto, type Question } from './journey.data'
import { PathGlow } from './PathGlow'

/**
 * One question: eyebrow and serif prompt over the option list on the left, the
 * road photograph with the drawn glow on the right (on top when stacked).
 *
 * The question eyebrow and h2 come from the handoff version of the design —
 * the latest file accidentally dropped them — as does the visible focus ring
 * on the options, which the latest file had removed.
 */
export function QuestionScreen({
  index,
  question,
  answer,
  travelled,
  calibrate,
  onPick,
  onBack,
  onNext,
}: {
  index: number
  question: Question
  answer: number | undefined
  travelled: number
  calibrate: boolean
  onPick: (optionIndex: number) => void
  onBack: () => void
  onNext: () => void
}): React.JSX.Element {
  const trace = PATHS[questionPhoto(index)]
  const answered = answer != null

  return (
    <section className="relative grid h-screen grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] overflow-hidden bg-journey-paper max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:grid-cols-1 max-[1100px]:overflow-visible max-[1100px]:pt-[58px]">
      <div className="relative z-10 flex flex-col justify-center overflow-y-auto px-16 pb-24 pt-[120px] max-[1100px]:overflow-visible max-[1100px]:px-[26px] max-[1100px]:pb-[76px] max-[1100px]:pt-[60px]">
        <div className="text-[12.5px] tracking-[0.6px] text-[#7d7568]">
          Question {index + 1} of 10
        </div>
        <h2 className="m-0 mt-6 max-w-[460px] text-pretty font-heading text-[clamp(33px,3.4vw,47px)] leading-[1.22] tracking-[-0.7px]">
          {question.q}
        </h2>
        <div className="mt-10 flex max-w-[440px] flex-col gap-1">
          {question.o.map(([label], oi) => {
            const selected = answer === oi
            return (
              <button
                key={label}
                type="button"
                data-cc-opt="1"
                aria-pressed={selected}
                onClick={() => onPick(oi)}
                className="flex cursor-pointer items-center gap-[15px] rounded-[3px] border-none bg-transparent py-3.5 text-left font-body text-[16px] leading-[1.5] text-[#332e24] transition-colors duration-200 hover:text-journey-ink focus-visible:text-journey-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(30,27,23,0.5)]"
              >
                <span className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-[1.5px] border-[#9c9384]">
                  {selected ? <span className="block h-[11px] w-[11px] rounded-full bg-journey-ink" /> : null}
                </span>
                {label}
              </button>
            )
          })}
        </div>
        <div className="mt-[46px] flex items-center gap-[18px]">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer border-none bg-transparent py-2 font-body text-[14px] tracking-[0.4px] text-[#7d7568] transition-colors duration-200 hover:text-journey-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(30,27,23,0.4)]"
          >
            ← Back
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden max-[1100px]:order-first max-[1100px]:h-[62vh] max-[1100px]:min-h-0">
        <Image
          src={trace.src}
          alt={trace.alt}
          fill
          sizes="(max-width: 1100px) 100vw, 59vw"
          className="object-cover object-[72%_100%]"
        />
        <PathGlow trace={trace} travelled={travelled} calibrate={calibrate} />
        <button
          type="button"
          onClick={onNext}
          aria-label="Continue"
          disabled={!answered}
          className="absolute bottom-12 right-12 z-20 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[rgba(30,27,23,0.22)] bg-[rgba(244,240,232,0.94)] text-[20px] text-journey-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-journey-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-journey-ink disabled:cursor-default"
          style={{ opacity: answered ? 1 : 0.3 }}
        >
          →
        </button>
      </div>
    </section>
  )
}

export default QuestionScreen
