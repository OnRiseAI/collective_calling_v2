'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * One quiet entrance: a short fade with a small upward drift as the element
 * scrolls into view, once. This is the only scroll motion on the page, kept
 * calm on purpose — the design itself animates nothing but the impact figures,
 * so anything louder would read as decoration rather than intent.
 *
 * `delay` staggers siblings; keep the steps small (0.07s) so a row of cards
 * reads as one gesture rather than a queue.
 *
 * Accessibility: for a reader who asks for reduced motion the element renders
 * at its resting state with no transform and no transition — but it is still
 * the same div carrying the same className, so nothing about the layout
 * depends on whether motion is allowed.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}): React.JSX.Element {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    // The resting styles are set explicitly rather than simply omitted. The
    // start state (opacity 0) is server-rendered, and framer-motion writes its
    // styles straight to the DOM node rather than through React — so a plain
    // <div> here would inherit that node and keep the band invisible for
    // exactly the readers who asked for less motion, not more.
    return (
      <div className={className} style={{ opacity: 1, transform: 'none' }}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      // data-reveal is what the no-JS stylesheet in the layout targets: the
      // initial styles are server-rendered, so without this the whole band
      // would ship invisible to a reader whose JavaScript never runs.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
