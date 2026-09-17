'use client'

import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/** A full-viewport-tall scene container that anchors composition. */
export function Scene({
  children,
  className = '',
  id,
  tall = false,
}: {
  children: ReactNode
  className?: string
  id?: string
  tall?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative z-10 flex w-full items-center px-6 sm:px-10 md:px-16 ${
        tall ? 'min-h-[180vh]' : 'min-h-screen'
      } ${className}`}
    >
      {children}
    </section>
  )
}

/** Fades / drifts content in when scrolled into view. Non-uniform by design. */
export function Reveal({
  children,
  className = '',
  y = 30,
  x = 0,
  blur = 8,
  delay = 0,
  duration = 1.2,
  once = true,
}: {
  children: ReactNode
  className?: string
  y?: number
  x?: number
  blur?: number
  delay?: number
  duration?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, x, filter: `blur(${blur}px)` }
      }
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
