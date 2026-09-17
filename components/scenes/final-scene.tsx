'use client'

import { motion } from 'motion/react'
import { Reveal } from '../scene-utils'
import { SUBJECT } from '@/lib/experience-data'

export function FinalScene({ onSecret }: { onSecret: () => void }) {
  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-40 text-center">
      <Reveal blur={8} duration={1.6}>
        <p className="font-serif-el text-3xl italic leading-snug text-[color:var(--ink)] sm:text-5xl md:text-6xl">
          This is the version of you
          <br />
          <span className="text-[color:var(--warm)]">that begins today.</span>
        </p>
      </Reveal>

      <Reveal delay={0.8} className="mt-20">
        <div className="text-[10px] uppercase tracking-sys text-[color:var(--ink-faint)]">
          PROJECT: 18 — MEMORY CORE
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-sys-sm text-[color:var(--ink-faint)]">
          SUBJECT · {SUBJECT.full}
        </div>
      </Reveal>

      <Reveal delay={1.4} className="mt-16">
        <div className="text-[9px] uppercase tracking-sys-sm text-[color:var(--ink-faint)]/60">
          the signal never really ends. it just goes quiet.
        </div>
      </Reveal>

      {/* the accidental discovery — a faint, easily-missed pulse */}
      <motion.button
        type="button"
        data-interactive
        aria-label="A faint signal"
        onClick={onSecret}
        className="mt-24 h-2 w-2 rounded-full bg-[color:var(--warm)]"
        animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        title=""
      />
    </section>
  )
}
