import * as React from 'react'
import type { PathKey } from './journey.data'

/**
 * The journey's small inline SVG set, drawn stroke for stroke from the
 * prototype. No icon library — these are the design's own marks.
 */

/** The Collective Calling emblem: a circle carrying an open C. */
export function EmblemIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 38 38" fill="none" className="h-[30px] w-[30px] flex-none" aria-hidden="true">
      <circle cx="19" cy="19" r="17.2" stroke="#1E1B17" strokeWidth="1.4" />
      <path d="M25.5 12.4A9 9 0 1 0 25.5 25.6" stroke="#1E1B17" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** The "takes around 3 minutes" clock on the landing screen. */
export function ClockIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[14px] w-[14px]" aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" stroke="#8b8377" strokeWidth="1.3" />
      <path d="M12 7.6V12l3 1.9" stroke="#8b8377" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

const RESULT_ICON_PATHS: Record<PathKey, string[]> = {
  values: [
    'M8 20.4c0-2.6 2.4-4.3 5.2-4.3s5.2 1.7 5.2 4.3',
    'M17.6 15.9c2.5.3 4.3 1.9 4.3 4',
    'M6.4 15.9c-2.5.3-4.3 1.9-4.3 4',
    'M13.2 13.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z',
  ],
  volunteer: [
    'M12 13.2 9.3 10.6c-1.1-1.1-.4-2.9 1.1-2.9.7 0 1.3.4 1.6 1 .3-.6.9-1 1.6-1 1.5 0 2.2 1.8 1.1 2.9L12 13.2Z',
    'M4.8 15.2c2 3 4.4 4.5 7.2 4.5s5.2-1.5 7.2-4.5',
  ],
  partner: ['M5 19.6V9.2l5.4-3.2 5.4 3.2v10.4', 'M2.6 19.6h18.8', 'M9.2 19.6v-4.4h3.6v4.4'],
  founding: ['M12 3.6 14.6 9l5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.6 9.8 9.4 9 12 3.6Z'],
}

/** The recommended path's mark beside the result heading. */
export function ResultIcon({ path }: { path: PathKey }): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 flex-none" aria-hidden="true">
      {RESULT_ICON_PATHS[path].map((d) => (
        <path
          key={d}
          d={d}
          stroke="#1E1B17"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

/** The three "what happens next" glyphs: a compass, an arrow, a gathering. */
export function ExploreGlyph(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
      <circle cx="12" cy="12" r="8.4" stroke="#F7F3EA" strokeWidth="1.1" />
      <path d="M15.4 8.6 10.7 10.7 8.6 15.4l4.7-2.1 2.1-4.7Z" stroke="#F7F3EA" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

export function ConnectGlyph(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
      <path d="M5 12h13M13.4 7.2 18.4 12l-5 4.8" stroke="#F7F3EA" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ImpactGlyph(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
      <circle cx="9" cy="9.6" r="2.3" stroke="#F7F3EA" strokeWidth="1.1" />
      <circle cx="15.4" cy="10.6" r="1.9" stroke="#F7F3EA" strokeWidth="1.1" />
      <path d="M4.6 17.4c0-2.2 2-3.7 4.4-3.7s4.4 1.5 4.4 3.7M14.2 14.1c2.1.2 3.6 1.6 3.6 3.3" stroke="#F7F3EA" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}
