'use client'

import * as React from 'react'
import Image from 'next/image'
import { MAP, PATH_INFO, type PathKey } from './journey.data'
import { cropBox, useElementSize, useReducedMotion, calibrateChildren } from './PathGlow'

/**
 * The summary screen's map panel. journey-07-map.jpg ships with its glow
 * already rendered, so this only letterboxes the photo (object-fit: contain)
 * and pins the four path names to the baked-in nodes in source coordinates.
 *
 * Spot 0 is the node the baked-in glow actually reaches, so the winning path
 * always goes there; the other three take the baked icon that suits them best
 * (the PREF map) and fall through to whatever spot is still free.
 */
export function SummaryMap({
  winner,
  calibrate = false,
}: {
  winner: PathKey
  calibrate?: boolean
}): React.JSX.Element {
  const { ref, size } = useElementSize()
  const reduced = useReducedMotion()
  const box = cropBox(MAP, size.cw, size.ch)

  const PREF: Partial<Record<PathKey, number>> = { volunteer: 1, founding: 2, partner: 3, values: 1 }
  const items: Array<PathKey | null> = [winner, null, null, null]
  const taken: Record<number, boolean> = { 0: true }
  const others = (['values', 'volunteer', 'partner', 'founding'] as PathKey[]).filter(
    (k) => k !== winner,
  )
  for (const k of others) {
    let i = PREF[k]
    if (i == null || taken[i]) i = [1, 2, 3].find((n) => !taken[n])
    if (i == null) continue
    taken[i] = true
    items[i] = k
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src={MAP.src}
        alt=""
        fill
        sizes="(max-width: 1100px) 100vw, 57vw"
        className="object-contain object-center"
      />
      {box ? (
        <svg
          viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 z-[5] h-full w-full overflow-visible"
        >
          {calibrate ? calibrateChildren(MAP, box) : null}
          {items.map((k, i) => {
            if (k == null) return null
            const s = MAP.spots[i]
            // font sizes are in source units, so they render at a constant
            // on-screen size; x is clamped into the visible crop so long names
            // can never be cut off
            const pad = 18 / box.scale
            const cx = Math.min(Math.max(s.x, box.x + pad), box.x + box.w - pad)
            return (
              <text
                key={k}
                x={cx}
                y={s.y}
                textAnchor={s.anchor ?? 'middle'}
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: (s.matched ? 13 : 11.5) / box.scale,
                  fontWeight: s.matched ? 500 : 400,
                  fill: s.matched ? 'var(--color-journey-glow-bright)' : 'rgba(230,222,206,0.5)',
                  filter: s.matched ? 'drop-shadow(0 0 12px rgba(248,227,176,0.8))' : 'none',
                  // Under reduced motion the label must simply be there — the
                  // prototype leaves opacity 0 with the animation removed,
                  // which would hide it for exactly the readers who asked for
                  // less motion.
                  opacity: reduced ? 1 : 0,
                  animation: reduced
                    ? 'none'
                    : `cc-fadeup 700ms cubic-bezier(.22,.61,.36,1) ${420 + i * 190}ms both`,
                }}
              >
                {PATH_INFO[k].name}
              </text>
            )
          })}
        </svg>
      ) : null}
    </div>
  )
}

export default SummaryMap
