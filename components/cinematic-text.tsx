'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function SystemLine({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, letterSpacing: '0.6em', filter: 'blur(4px)' }}
      animate={{ opacity: 1, letterSpacing: '0.28em', filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      className={`text-[11px] font-light uppercase text-[color:var(--ink-dim)] sm:text-xs ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Reveal text letter by letter with a soft fade */
export function TypeReveal({
  text,
  className = '',
  speed = 0.045,
  startDelay = 0,
}: {
  text: string
  className?: string
  speed?: number
  startDelay?: number
}) {
  const chars = text.split('')
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: startDelay + i * speed }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  )
}
