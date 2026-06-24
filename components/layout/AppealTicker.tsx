import * as React from 'react'

/**
 * Full-bleed appeals ticker (Tearfund's scrolling appeal strip), sitting
 * directly beneath the header. Gold band, navy text (brand-safe; no red).
 *
 * The track holds two identical phrase groups; the CSS animation translates it
 * by -50% for a seamless right-to-left loop. It pauses on hover and holds
 * static under prefers-reduced-motion (both handled in globals.css).
 */

const REPEAT = 8

function Phrase(): React.JSX.Element {
  return (
    <span className="mx-6 inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.12em]">
      <span className="italic">Restore Dignity</span>
      <span>Appeal</span>
      <span aria-hidden="true" className="px-2 text-brand-dark/40">
        &bull;
      </span>
    </span>
  )
}

function PhraseGroup({ hidden }: { hidden?: boolean }): React.JSX.Element {
  return (
    <div className="flex shrink-0" aria-hidden={hidden ? 'true' : undefined}>
      {Array.from({ length: REPEAT }).map((_, i) => (
        <Phrase key={i} />
      ))}
    </div>
  )
}

export function AppealTicker(): React.JSX.Element {
  return (
    <div
      className="overflow-hidden bg-accent text-brand-dark"
      role="marquee"
      aria-label="Current appeal: Restore Dignity Appeal"
    >
      <div className="ticker-track flex w-max py-2">
        <PhraseGroup />
        <PhraseGroup hidden />
      </div>
    </div>
  )
}

export default AppealTicker
