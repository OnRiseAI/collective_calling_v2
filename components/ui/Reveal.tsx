'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reveal wraps a homepage section and gives it one quiet entrance gesture: a
 * short fade with a small upward drift as it scrolls into view, once. This is
 * the only entrance motion on the page, kept calm to suit the brand's reverent
 * register (no staggered swarms, no continuous motion).
 *
 * Accessibility: when the reader asks for reduced motion we render the children
 * plainly with no wrapper and no transform, so the content is fully visible and
 * never animates. The wrapper is a transparent block, so full-bleed sections
 * inside keep spanning the viewport.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): React.JSX.Element {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
