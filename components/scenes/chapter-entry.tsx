'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { OrbitalSystem } from '../orbital-system'
import { Reveal } from '../scene-utils'
import { pulse } from '@/lib/atmosphere'
import { whisper } from '@/lib/eggs'

export function ChapterEntry() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bigY = useTransform(scrollYProgress, [0, 1], ['12%', '-28%'])
  const bigScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.85])
  const bigX = useTransform(scrollYProgress, [0, 1], ['18%', '-6%'])
  const orbitRot = useTransform(scrollYProgress, [0, 1], [0, 40])

  const [clicks, setClicks] = useState(0)
  const [burst, setBurst] = useState(false)

  const handle18 = () => {
    const n = clicks + 1
    setClicks(n)
    pulse(0.6)
    if (n === 3) {
      setBurst(true)
      whisper('ORBITAL EVENT TRIGGERED')
      setTimeout(() => setBurst(false), 2600)
      setTimeout(() => setClicks(0), 400)
    }
  }

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[160vh] w-full items-center overflow-hidden px-6 sm:px-10 md:px-16"
    >
      {/* Giant offset 18 living in the environment */}
      <motion.div
        style={{ y: bigY, x: bigX, scale: bigScale }}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none"
      >
        <motion.div style={{ rotate: orbitRot }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <OrbitalSystem className="h-[130vmin] w-[130vmin] opacity-60" rings={4} seed={2} />
        </motion.div>
        <button
          type="button"
          onClick={handle18}
          data-interactive
          aria-label="Chapter eighteen"
          className="pointer-events-auto relative font-thin leading-none text-[color:var(--ink)]"
          style={{ fontSize: 'clamp(16rem, 46vw, 52rem)' }}
        >
          18
          {burst &&
            Array.from({ length: 26 }).map((_, i) => {
              const a = (i / 26) * Math.PI * 2
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[color:var(--warm)]"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(a) * 420,
                    y: Math.sin(a) * 420,
                    opacity: 0,
                  }}
                  transition={{ duration: 2.4, ease: 'easeOut' }}
                />
              )
            })}
        </button>
      </motion.div>

      {/* Layered typography at different depths */}
      <div className="relative z-10 max-w-2xl">
        <Reveal x={-24} y={0}>
          <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
            CHAPTER 18
          </div>
        </Reveal>
        <Reveal delay={0.15} y={40}>
          <h2 className="mt-4 text-5xl font-extralight uppercase leading-[0.95] text-[color:var(--ink)] sm:text-7xl md:text-8xl">
            The Next
            <br />
            <span className="text-[color:var(--ink-dim)]">Build</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-3">
          <Reveal delay={0.2} blur={4}>
            <p className="font-serif-el text-2xl italic text-[color:var(--ink)] sm:text-3xl">
              Some people wait for the future.
            </p>
          </Reveal>
          <Reveal delay={0.5} blur={4} x={30}>
            <p className="font-serif-el text-2xl italic text-[color:var(--warm)] sm:text-3xl">
              Some people build it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
