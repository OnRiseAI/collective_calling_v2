'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * The page-load entrance, used once: the hero copy lifts in over the
 * photograph as the page settles. Everything below the fold uses Reveal
 * instead, which waits for the scroll.
 *
 * Takes className and style verbatim so it can stand in for the element it
 * replaces without changing the DOM — the hero copy is absolutely positioned
 * and carries safe-area padding, and both have to survive.
 *
 * Under reduced motion it is a plain div in its resting state.
 */
export function FadeIn({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}): React.JSX.Element {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    // See Reveal: the resting styles are explicit because the start state is
    // server-rendered and framer-motion writes to the node outside React.
    return (
      <div className={className} style={{ ...style, opacity: 1, transform: 'none' }}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      // See Reveal: the initial styles are server-rendered, so the no-JS
      // stylesheet in the layout needs a hook to put them back.
      data-reveal=""
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
