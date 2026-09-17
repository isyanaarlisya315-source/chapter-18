'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '../scene-utils'

const FUTURES = [
  'A FUTURE WHERE THE AI ACTUALLY LISTENS.',
  'A FUTURE WITH A NAME ON A RESEARCH PAPER.',
  'A FUTURE WHERE THE NOVEL GETS FINISHED.',
  'A FUTURE BUILT FROM A HUNDRED SMALL EXPERIMENTS.',
  'A FUTURE WHERE THE HARD PROBLEM FINALLY BREAKS.',
  'A FUTURE THAT DOESN\u2019T EXIST YET \u2014 SO YOU BUILD IT.',
]

export function FutureSimulation() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % FUTURES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative z-10 flex min-h-[130vh] w-full items-center justify-center overflow-hidden px-6">
      {/* branching probability lines */}
      <svg aria-hidden="true" viewBox="0 0 800 800" className="pointer-events-none absolute inset-0 h-full w-full opacity-30">
        {Array.from({ length: 9 }).map((_, k) => {
          const a = (k / 9) * Math.PI - Math.PI / 2
          const x = 400 + Math.cos(a) * 420
          const y = 400 + Math.sin(a) * 420
          return (
            <motion.line
              key={k}
              x1="400"
              y1="400"
              x2={x}
              y2={y}
              stroke="rgba(120,150,255,0.3)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: [0, 0.6, 0.2] }}
              viewport={{ once: false }}
              transition={{ duration: 3, delay: k * 0.2, repeat: Infinity, repeatDelay: 2 }}
            />
          )
        })}
      </svg>

      <div className="relative z-10 max-w-2xl text-center">
        <Reveal>
          <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
            SIMULATING POSSIBLE FUTURES
          </div>
        </Reveal>

        <div className="mt-10 flex h-28 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
              transition={{ duration: 0.9 }}
              className="text-xl font-light uppercase tracking-wide text-[color:var(--ink)] sm:text-3xl"
            >
              {FUTURES[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        <Reveal delay={0.3} className="mt-10">
          <p className="font-serif-el text-lg italic text-[color:var(--ink-dim)] sm:text-xl">
            Every one of them is still unwritten. That is the best part.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
