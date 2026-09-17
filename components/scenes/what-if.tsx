'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { WHAT_IFS } from '@/lib/experience-data'
import { Reveal } from '../scene-utils'

const LAYOUT = [
  { className: 'left-[8%] top-[30%]', rot: -6, size: 'text-xl sm:text-3xl' },
  { className: 'right-[10%] top-[22%]', rot: 5, size: 'text-lg sm:text-2xl' },
  { className: 'left-[20%] top-[58%]', rot: -3, size: 'text-2xl sm:text-4xl' },
  { className: 'right-[16%] top-[64%]', rot: 8, size: 'text-lg sm:text-2xl' },
  { className: 'left-[38%] top-[44%]', rot: -2, size: 'text-xl sm:text-3xl' },
]

export function WhatIf() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bigScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.6])
  const bigOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[170vh] w-full items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{ scale: bigScale, opacity: bigOpacity }}
        className="pointer-events-none absolute select-none text-center text-[26vw] font-thin leading-none text-[color:var(--ink)]/10"
      >
        WHAT IF?
      </motion.div>

      {WHAT_IFS.map((q, i) => {
        const L = LAYOUT[i]
        return (
          <motion.p
            key={q}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: [0, 1, 1, 0.4], filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-20%' }}
            transition={{ duration: 3, delay: i * 0.25, ease: 'easeInOut' }}
            className={`absolute ${L.className} max-w-[14rem] font-light uppercase tracking-wide text-[color:var(--electric-soft)] ${L.size}`}
            style={{ rotate: `${L.rot}deg` }}
          >
            {q}
          </motion.p>
        )
      })}

      {/* the resolving question + system response */}
      <div className="absolute bottom-[8%] left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center">
        <Reveal blur={6}>
          <p className="font-serif-el text-2xl italic text-[color:var(--warm)] sm:text-4xl">
            What if Chapter 18 becomes something amazing?
          </p>
        </Reveal>
        <Reveal delay={0.6} className="mt-8">
          <div className="text-[10px] uppercase tracking-sys text-[color:var(--ink-faint)]">
            SYSTEM RESPONSE
          </div>
          <div className="mt-2 text-lg font-light uppercase tracking-sys text-[color:var(--ink)] sm:text-2xl">
            LET&apos;S FIND OUT.
          </div>
        </Reveal>
      </div>
    </section>
  )
}
