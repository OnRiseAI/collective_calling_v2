'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * RevealLines renders a short sequence of standalone lines that appear one
 * after another as the block scrolls into view (~120ms apart), once. It is the
 * homepage's rhythm device for the credo and "moments" sequences.
 *
 * Reduced motion: render the lines plainly, fully visible, no animation.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
}): React.JSX.Element {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <p key={line} className={lineClassName}>
            {line}
          </p>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {lines.map((line) => (
        <motion.p
          key={line}
          className={lineClassName}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  )
}

export default RevealLines
