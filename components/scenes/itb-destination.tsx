'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '../scene-utils'

export function ItbDestination() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // approach the distant point as you scroll
  const starScale = useTransform(scrollYProgress, [0, 1], [0.6, 2.2])
  const starGlow = useTransform(scrollYProgress, [0, 1], [0.4, 1])
  const horizonY = useTransform(scrollYProgress, [0, 1], ['4%', '-8%'])

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[160vh] w-full items-center justify-center overflow-hidden px-6"
    >
      {/* perspective grid receding to the horizon */}
      <motion.svg
        aria-hidden="true"
        style={{ y: horizonY }}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const x = (i / 13) * 1000
          return (
            <line key={`v${i}`} x1={x} y1="600" x2="500" y2="300" stroke="rgba(120,150,255,0.14)" strokeWidth="0.5" />
          )
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 8
          const y = 300 + Math.pow(t, 2) * 300
          return (
            <line key={`h${i}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(120,150,255,0.08)" strokeWidth="0.5" />
          )
        })}
      </motion.svg>

      {/* distant destination star */}
      <motion.div
        style={{ scale: starScale, opacity: starGlow }}
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,214,160,0.9),rgba(79,124,255,0.35)_50%,transparent_72%)]" />
      </motion.div>

      <div className="relative z-10 text-center">
        <Reveal>
          <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
            DESTINATION LOCKED
          </div>
        </Reveal>
        <Reveal delay={0.2} y={20}>
          <div className="mt-4 text-7xl font-thin tracking-[0.2em] text-[color:var(--ink)] sm:text-9xl">
            ITB
          </div>
        </Reveal>
        <Reveal delay={0.4} className="mx-auto mt-6 max-w-sm">
          <p className="font-serif-el text-xl italic text-[color:var(--ink-dim)] sm:text-2xl">
            The road is long and the light is far. But the bearing is set, and
            you are already moving.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
