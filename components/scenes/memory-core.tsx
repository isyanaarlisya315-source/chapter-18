'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MEMORY_FRAGMENTS, SUBJECT } from '@/lib/experience-data'
import { OrbitalSystem } from '../orbital-system'
import { Reveal } from '../scene-utils'

export function MemoryCore() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const coreScale = useTransform(scrollYProgress, [0, 0.85, 1], [0.5, 1.1, 2.4])
  const coreGlow = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const coreOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0])

  return (
    <section ref={ref} className="relative z-10 w-full">
      {/* intro */}
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <Reveal>
            <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
              MEMORY CORE · ASSEMBLING
            </div>
          </Reveal>
          <Reveal delay={0.2} y={20}>
            <p className="mt-6 max-w-xl font-serif-el text-2xl italic text-[color:var(--ink-dim)] sm:text-3xl">
              Eighteen fragments, pulled from the dark and set to orbit.
            </p>
          </Reveal>
        </div>
      </div>

      {/* sticky core with fragments scrolling past */}
      <div className="relative">
        <motion.div
          style={{ opacity: coreOpacity }}
          className="pointer-events-none sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        >
          <motion.div style={{ scale: coreScale }} className="relative flex items-center justify-center">
            <OrbitalSystem className="h-[120vmin] w-[120vmin] opacity-60" rings={5} seed={7} />
            <motion.div
              style={{ opacity: coreGlow }}
              className="absolute h-40 w-40 rounded-full"
            >
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,214,160,0.8),rgba(79,124,255,0.3)_55%,transparent_75%)] blur-[2px]" />
            </motion.div>
            <motion.div
              className="absolute h-56 w-56 rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                boxShadow: '0 0 120px 30px rgba(79,124,255,0.25)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* fragments layered over the sticky core */}
        <div className="relative z-10 -mt-[100vh]">
          {MEMORY_FRAGMENTS.map((f, i) => (
            <div
              key={i}
              className={`flex min-h-[42vh] items-center px-6 sm:px-10 md:px-20 ${
                i % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <Reveal
                once={false}
                x={i % 2 === 0 ? -30 : 30}
                blur={6}
                className="max-w-sm"
              >
                <span className="mr-3 font-mono text-[10px] text-[color:var(--electric-soft)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-serif-el text-xl italic text-[color:var(--ink)] sm:text-2xl md:text-3xl">
                  {f}
                </span>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* ignition */}
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <Reveal blur={10} y={40} duration={1.6}>
          <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
            CORE COMPLETE
          </div>
          <h2 className="mt-6 text-5xl font-extralight uppercase leading-[0.95] text-[color:var(--ink)] sm:text-7xl md:text-8xl">
            Happy 18<span className="align-super text-3xl sm:text-5xl">th</span>
            <span className="block font-serif-el text-4xl italic text-[color:var(--warm)] sm:text-6xl md:text-7xl">
              Birthday, {SUBJECT.first}
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  )
}
