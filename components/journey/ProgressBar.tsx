import * as React from 'react'

/**
 * "You've travelled N%" and the 3px track pinned to the top of every screen
 * except the landing and the final one. The dark variant carries the cream
 * label and fill used over the forest and summary screens.
 */
export function ProgressBar({
  travelled,
  dark = false,
}: {
  travelled: number
  dark?: boolean
}): React.JSX.Element {
  const pct = Math.round(travelled * 100)
  return (
    <div
      data-prog="1"
      className="pointer-events-none absolute inset-x-0 top-0 z-[60] px-11 pt-[26px] max-[1100px]:px-[26px] max-[1100px]:pt-[18px]"
    >
      <div
        className={`text-[12.5px] font-medium tracking-[0.6px] ${dark ? 'text-[#F7F3EA]/72' : 'text-[#6b6357]'}`}
      >
        You&apos;ve travelled {pct}%
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Journey progress"
        className={`relative mt-[11px] h-[3px] ${dark ? 'bg-[#F7F3EA]/20' : 'bg-[#D6CFC2]'}`}
      >
        <div
          className={`absolute inset-y-0 left-0 transition-[width] duration-[800ms] ease-[cubic-bezier(.22,.61,.36,1)] ${dark ? 'bg-[#F7F3EA]' : 'bg-journey-ink'}`}
          style={{ width: `${(travelled * 100).toFixed(1)}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
