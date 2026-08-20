import { QUESTIONS, type PathKey, FLOW } from './journey.data'

/** Answers keyed by question index; the value is the chosen option index. */
export type Answers = Partial<Record<number, number>>

/**
 * Scores the journey, ported verbatim in behaviour from the prototype: sum
 * each chosen option's weights per path, and the highest total wins. Ties are
 * broken in favour of whichever tied path first reached the winning score
 * (the earliest question at which its running total hit the max). An all-zero
 * board (nothing answered, or only zero-weight picks) falls back to volunteer.
 */
export function result(answers: Answers): PathKey {
  const totals: Record<PathKey, number> = { values: 0, volunteer: 0, partner: 0, founding: 0 }
  const reached: Partial<Record<PathKey, Array<{ score: number; at: number }>>> = {}

  QUESTIONS.forEach((q, qi) => {
    const oi = answers[qi]
    if (oi == null) return
    const w = q.o[oi][1]
    for (const k of Object.keys(w) as PathKey[]) {
      totals[k] += w[k] ?? 0
      const trail = (reached[k] = reached[k] ?? [])
      trail.push({ score: totals[k], at: qi })
    }
  })

  const keys = Object.keys(totals) as PathKey[]
  const max = Math.max(...keys.map((k) => totals[k]))
  if (max === 0) return 'volunteer'

  const tied = keys.filter((k) => totals[k] === max)
  if (tied.length === 1) return tied[0]

  let best = tied[0]
  let bestAt = Infinity
  for (const k of tied) {
    const hit = (reached[k] ?? []).find((r) => r.score >= max)
    const at = hit ? hit.at : Infinity
    if (at < bestAt) {
      bestAt = at
      best = k
    }
  }
  return best
}

/**
 * How far along the road the traveller is, 0..1, from the prototype: nothing
 * on the landing, everything from the summary on, and between those the last
 * question passed out of the ten (+1 for having begun) over eleven steps.
 */
export function travelled(step: number): number {
  const f = FLOW[step] ?? FLOW[0]
  if (f.type === 'landing') return 0
  if (f.type === 'summary' || f.type === 'result' || f.type === 'next') return 1
  let lastQ = -1
  for (let i = 0; i <= step && i < FLOW.length; i++) {
    const frame = FLOW[i]
    if (frame.type === 'q') lastQ = frame.i
  }
  return (lastQ + 2) / 11
}
