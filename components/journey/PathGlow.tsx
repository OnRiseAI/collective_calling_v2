'use client'

import * as React from 'react'
import type { PhotoTrace } from './journey.data'

/**
 * The glowing road overlay, ported from the prototype's overlaySvg/glowFor.
 *
 * The photo panel is object-fit:cover, so only part of the source image is on
 * screen. The overlay measures the panel and uses the exact visible source
 * rect as its SVG viewBox — that is what keeps the glow and its nodes locked
 * to the road at any panel shape. Coordinates in the trace are SOURCE pixels;
 * nothing here ever converts them.
 */

export type CropBox = {
  x: number
  y: number
  w: number
  h: number
  scale: number
  contain?: boolean
}

/** The visible source rect for a cover crop (or the whole source for contain). */
export function cropBox(
  cfg: { w: number; h: number; px: number; py: number; fit?: 'contain' },
  cw: number,
  ch: number,
): CropBox | null {
  if (!cw || !ch) return null
  if (cfg.fit === 'contain') {
    // whole source always in frame, letterboxed
    return { x: 0, y: 0, w: cfg.w, h: cfg.h, contain: true, scale: Math.min(cw / cfg.w, ch / cfg.h) }
  }
  const scale = Math.max(cw / cfg.w, ch / cfg.h)
  const vw = cw / scale
  const vh = ch / scale
  return {
    x: (cfg.w - vw) * cfg.px,
    y: (cfg.h - vh) * cfg.py,
    w: vw,
    h: vh,
    scale,
  }
}

/** Tracks an element's size via ResizeObserver plus window resize. */
export function useElementSize(): {
  ref: (el: HTMLElement | null) => void
  size: { cw: number; ch: number }
} {
  const [size, setSize] = React.useState({ cw: 0, ch: 0 })
  const elRef = React.useRef<HTMLElement | null>(null)
  const roRef = React.useRef<ResizeObserver | null>(null)

  const measure = React.useCallback(() => {
    const el = elRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cw = Math.round(r.width)
    const ch = Math.round(r.height)
    if (cw > 0 && ch > 0) {
      setSize((s) => (s.cw === cw && s.ch === ch ? s : { cw, ch }))
    }
  }, [])

  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      if (el === elRef.current) return
      roRef.current?.disconnect()
      roRef.current = null
      elRef.current = el
      if (!el) return
      measure()
      if (typeof ResizeObserver === 'function') {
        roRef.current = new ResizeObserver(measure)
        roRef.current.observe(el)
      }
    },
    [measure],
  )

  React.useEffect(() => {
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      roRef.current?.disconnect()
    }
  }, [measure])

  return { ref, size }
}

/** Live prefers-reduced-motion, so transitions and ignites can switch off. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

/** The magenta grid, cyan crop rect and raw path behind ?calibrate=1. */
export function calibrateChildren(
  cfg: { w: number; h: number; d?: string },
  box: CropBox,
): React.ReactNode[] {
  const kids: React.ReactNode[] = []
  const step = cfg.w / 12
  for (let gx = 0; gx <= cfg.w; gx += step) {
    kids.push(
      <line key={`gx${gx}`} x1={gx} y1={0} x2={gx} y2={cfg.h} stroke="rgba(255,0,255,0.3)" strokeWidth={box.w / 600} />,
    )
  }
  for (let gy = 0; gy <= cfg.h; gy += step) {
    kids.push(
      <line key={`gy${gy}`} x1={0} y1={gy} x2={cfg.w} y2={gy} stroke="rgba(255,0,255,0.3)" strokeWidth={box.w / 600} />,
    )
  }
  kids.push(
    <rect key="crop" x={box.x} y={box.y} width={box.w} height={box.h} fill="none" stroke="#00FFFF" strokeWidth={box.w / 200} />,
  )
  if (cfg.d) {
    kids.push(<path key="cal" d={cfg.d} fill="none" stroke="#FF00FF" strokeWidth={box.w / 180} />)
  }
  return kids
}

export function PathGlow({
  trace,
  travelled,
  calibrate = false,
}: {
  trace: PhotoTrace
  travelled: number
  calibrate?: boolean
}): React.JSX.Element {
  const { ref, size } = useElementSize()
  const reduced = useReducedMotion()
  const box = cropBox(trace, size.cw, size.ch)

  const drawn = Math.max(0.1, Math.min(1, travelled))
  const dash: React.CSSProperties = {
    strokeDasharray: 1,
    strokeDashoffset: 1 - drawn,
    transition: reduced ? 'none' : 'stroke-dashoffset 1200ms cubic-bezier(.22,.61,.36,1)',
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
      {box ? (
        <svg
          viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {calibrate ? calibrateChildren(trace, box) : null}
          <path
            d={trace.d}
            pathLength={1}
            fill="none"
            strokeWidth={18}
            strokeLinecap="round"
            opacity={0.3}
            style={{ stroke: 'var(--color-journey-glow)', filter: 'blur(12px)', ...dash }}
          />
          <path
            d={trace.d}
            pathLength={1}
            fill="none"
            strokeWidth={8}
            strokeLinecap="round"
            opacity={0.5}
            style={{ stroke: 'var(--color-journey-glow)', filter: 'blur(4px)', ...dash }}
          />
          <path
            d={trace.d}
            pathLength={1}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            style={{
              stroke: 'var(--color-journey-glow-bright)',
              filter: 'drop-shadow(0 0 5px rgba(248,227,176,.95))',
              ...dash,
            }}
          />
          {trace.nodes.map((n, i) => {
            const lit = drawn >= n.t
            return (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={lit ? 8 : 4.5}
                fill={lit ? '#FFFBF0' : 'rgba(248,227,176,0.3)'}
                style={{
                  filter: lit
                    ? 'drop-shadow(0 0 9px rgba(255,246,220,1)) drop-shadow(0 0 22px rgba(248,227,176,.7))'
                    : 'none',
                  transformOrigin: `${n.x}px ${n.y}px`,
                  transition: reduced ? 'none' : 'r 600ms ease, fill 600ms ease',
                  animation: lit && !reduced ? 'cc-ignite 700ms ease' : 'none',
                }}
              />
            )
          })}
        </svg>
      ) : null}
    </div>
  )
}

export default PathGlow
