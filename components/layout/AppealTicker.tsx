import * as React from 'react'

/**
 * Full-bleed current-appeal band, sitting directly beneath the header. A static
 * (non-scrolling) repeated row of the current appeal on CC's gold field with
 * navy text — brand-safe, no red. The appeal name is set in the strong humanist
 * sans; "Appeal" carries the warm handwritten accent (the CC analog of
 * Tearfund's script word). The visual repeats are centred and clipped at the
 * band edges; the accessible name is carried once by the region label.
 */

const REPEAT = 8

function Phrase(): React.JSX.Element {
  return (
    <span className="mx-5 inline-flex shrink-0 items-baseline gap-2.5 whitespace-nowrap">
      <span className="font-body text-[28px] font-extrabold tracking-tight">
        Restore Dignity
      </span>
      <span className="font-script text-[34px] leading-none">Appeal</span>
      <span aria-hidden="true" className="self-center px-3 text-3xl text-brand-dark/35">
        &bull;
      </span>
    </span>
  )
}

export function AppealTicker(): React.JSX.Element {
  return (
    <div
      className="overflow-hidden bg-accent text-brand-dark"
      role="region"
      aria-label="Current appeal: Restore Dignity Appeal"
    >
      <div className="flex flex-nowrap justify-center py-2.5" aria-hidden="true">
        {Array.from({ length: REPEAT }).map((_, i) => (
          <Phrase key={i} />
        ))}
      </div>
    </div>
  )
}

export default AppealTicker
