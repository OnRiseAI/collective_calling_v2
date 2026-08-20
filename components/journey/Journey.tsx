'use client'

import * as React from 'react'
import { FLOW, QUESTIONS } from './journey.data'
import { result, travelled, type Answers } from './scoring'
import { ProgressBar } from './ProgressBar'
import { LandingScreen } from './LandingScreen'
import { QuestionScreen } from './QuestionScreen'
import { ForestBeat } from './ForestBeat'
import { QuoteBeat } from './QuoteBeat'
import { SunriseBeat } from './SunriseBeat'
import { SummaryScreen } from './SummaryScreen'
import { ResultScreen } from './ResultScreen'
import { NextScreen } from './NextScreen'

/** How long each interstitial beat holds before advancing on its own. */
const AUTO_ADVANCE_SECONDS = 4

/** How long a chosen answer rests before the journey moves on. */
const PICK_ADVANCE_MS = 420

/**
 * Find Your Path — the full-viewport interactive journey, ported from the
 * Claude Design prototype (design-export/journey/). A seventeen-frame walk:
 * landing, ten questions in four runs, three photographic beats between them,
 * then summary, result and what-happens-next.
 *
 * Keyboard: on a question, ArrowUp/Down move focus between the options and
 * Enter advances once answered; everywhere, ArrowLeft goes back and Enter or
 * ArrowRight advances on non-question screens. Enter is ignored when a button
 * or link has focus — its own activation already handles it, and letting the
 * global handler fire too would advance twice.
 */
export function Journey(): React.JSX.Element {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Answers>({})
  const [showOthers, setShowOthers] = React.useState(false)
  // ?calibrate=1 draws the magenta grid, cyan crop rect and raw glow path so
  // the trace coordinates can be tuned against the photos. Lazily read: on the
  // server it is simply false, and nothing calibrate touches is in the
  // server-rendered output (the overlays only draw after measurement).
  const [calibrate] = React.useState(
    () => typeof window !== 'undefined' && /[?&]calibrate=1/.test(window.location.search),
  )

  const pickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const frame = FLOW[step] ?? FLOW[0]
  const t = travelled(step)
  const winner = result(answers)
  const answered = frame.type === 'q' && answers[frame.i] != null

  // Handlers read the answers through a ref so next() can stay referentially
  // stable while still guarding an unanswered question.
  const answersRef = React.useRef(answers)
  React.useEffect(() => {
    answersRef.current = answers
  }, [answers])

  const clearPickTimer = React.useCallback(() => {
    if (pickTimer.current != null) {
      clearTimeout(pickTimer.current)
      pickTimer.current = null
    }
  }, [])

  const next = React.useCallback(() => {
    clearPickTimer()
    setStep((s) => {
      const f = FLOW[s] ?? FLOW[0]
      if (f.type === 'q' && answersRef.current[f.i] == null) return s
      return Math.min(FLOW.length - 1, s + 1)
    })
    setShowOthers(false)
  }, [clearPickTimer])

  const back = React.useCallback(() => {
    clearPickTimer()
    setStep((s) => Math.max(0, s - 1))
  }, [clearPickTimer])

  const pick = React.useCallback(
    (qi: number, oi: number) => {
      setAnswers((a) => ({ ...a, [qi]: oi }))
      clearPickTimer()
      pickTimer.current = setTimeout(() => next(), PICK_ADVANCE_MS)
    },
    [clearPickTimer, next],
  )

  const restart = React.useCallback(() => {
    clearPickTimer()
    setStep(0)
    setAnswers({})
    setShowOthers(false)
  }, [clearPickTimer])

  // Auto-advance the three interstitial beats.
  React.useEffect(() => {
    if (frame.type !== 'forest' && frame.type !== 'quote' && frame.type !== 'sunrise') return
    const timer = setTimeout(() => next(), AUTO_ADVANCE_SECONDS * 1000)
    return () => clearTimeout(timer)
  }, [frame.type, step, next])

  // Global keys, mirroring the prototype.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const f = FLOW[step] ?? FLOW[0]
      const target = e.target as HTMLElement | null
      const onControl = target?.closest?.('a, button') != null
      if (f.type === 'q') {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          const btns = Array.from(
            document.querySelectorAll<HTMLButtonElement>('button[data-cc-opt]'),
          )
          if (!btns.length) return
          const cur = btns.indexOf(document.activeElement as HTMLButtonElement)
          const nx =
            e.key === 'ArrowDown' ? Math.min(btns.length - 1, cur + 1) : Math.max(0, cur - 1)
          btns[nx]?.focus()
          e.preventDefault()
          return
        }
        if (e.key === 'Enter' && !onControl && answersRef.current[f.i] != null) {
          e.preventDefault()
          next()
          return
        }
      } else if ((e.key === 'Enter' && !onControl) || e.key === 'ArrowRight') {
        next()
        return
      }
      if (e.key === 'ArrowLeft') back()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [step, next, back])

  React.useEffect(() => clearPickTimer, [clearPickTimer])

  return (
    <div className="relative min-h-screen overflow-hidden bg-journey-paper font-body text-[16px] leading-normal text-journey-ink">
      {frame.type !== 'landing' && frame.type !== 'next' ? (
        <ProgressBar travelled={t} dark={frame.type === 'forest' || frame.type === 'summary'} />
      ) : null}
      {/* Keyed by step so every frame change remounts the screen and replays
          its fade-up entrance. */}
      <div key={step} className="cc-fadeup">
        {frame.type === 'landing' ? <LandingScreen onBegin={next} /> : null}
        {frame.type === 'q' ? (
          <QuestionScreen
            index={frame.i}
            question={QUESTIONS[frame.i]}
            answer={answers[frame.i]}
            travelled={t}
            calibrate={calibrate}
            onPick={(oi) => pick(frame.i, oi)}
            onBack={back}
            onNext={() => {
              if (answered) next()
            }}
          />
        ) : null}
        {frame.type === 'forest' ? (
          <ForestBeat travelled={t} calibrate={calibrate} onNext={next} />
        ) : null}
        {frame.type === 'quote' ? (
          <QuoteBeat travelled={t} calibrate={calibrate} onNext={next} />
        ) : null}
        {frame.type === 'sunrise' ? (
          <SunriseBeat travelled={t} calibrate={calibrate} onNext={next} />
        ) : null}
        {frame.type === 'summary' ? (
          <SummaryScreen winner={winner} calibrate={calibrate} onNext={next} />
        ) : null}
        {frame.type === 'result' ? (
          <ResultScreen
            winner={winner}
            showOthers={showOthers}
            onToggleOthers={() => setShowOthers((v) => !v)}
          />
        ) : null}
        {frame.type === 'next' ? <NextScreen onRestart={restart} /> : null}
      </div>
    </div>
  )
}

export default Journey
