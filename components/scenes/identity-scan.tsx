'use client'

import { motion } from 'motion/react'
import { PROFILE, SUBJECT } from '@/lib/experience-data'
import { Reveal } from '../scene-utils'

function Fragment({
  label,
  value,
  className = '',
  accent = false,
  delay = 0,
}: {
  label: string
  value: string
  className?: string
  accent?: boolean
  delay?: number
}) {
  return (
    <Reveal delay={delay} className={className} blur={6}>
      <div className="text-[9px] uppercase tracking-sys text-[color:var(--ink-faint)]">
        {label}
      </div>
      <div
        className={`mt-1 font-light uppercase tracking-widest ${
          accent ? 'text-[color:var(--warm)]' : 'text-[color:var(--ink)]'
        }`}
      >
        {value}
      </div>
    </Reveal>
  )
}

export function IdentityScan() {
  return (
    <section className="relative z-10 flex min-h-[150vh] w-full items-center overflow-hidden px-6 py-32 sm:px-10 md:px-16">
      {/* faint reconstruction wireframe */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 opacity-40"
        viewBox="0 0 400 400"
      >
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="rgba(120,150,255,0.14)"
          strokeDasharray="2 8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        />
        <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(120,150,255,0.08)" strokeWidth="0.5" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(120,150,255,0.08)" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
            SUBJECT PROFILE
          </div>
        </Reveal>

        <Reveal delay={0.1} y={40}>
          <h2 className="mt-4 text-4xl font-extralight uppercase leading-none text-[color:var(--ink)] sm:text-6xl md:text-7xl">
            {SUBJECT.first}
            <span className="block text-[color:var(--ink-dim)]">{SUBJECT.last}</span>
          </h2>
        </Reveal>

        {/* scattered, asymmetric fragments */}
        <div className="relative mt-20 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-4">
          <Fragment label="AGE" value={String(SUBJECT.age)} accent delay={0.1} className="translate-y-2" />
          <Fragment label="RECORDED" value={SUBJECT.born} delay={0.2} className="-translate-y-4" />
          <Fragment label="TARGET" value={SUBJECT.target} accent delay={0.15} className="translate-y-6" />
          <Fragment label="PRIMARY MODE" value={PROFILE.primaryMode} delay={0.3} />
          <Fragment label="SECONDARY MODE" value={PROFILE.secondaryMode} delay={0.35} className="translate-y-4" />
          <Fragment
            label="INTERESTS"
            value={PROFILE.interests.join(' · ')}
            delay={0.25}
            className="col-span-2 -translate-y-2"
          />
          <Fragment label="CURRENT STATUS" value={PROFILE.status} accent delay={0.4} className="translate-y-3" />
        </div>

        <Reveal delay={0.3} className="mt-24 max-w-sm">
          <p className="font-serif-el text-lg italic text-[color:var(--ink-dim)]">
            The system reconstructs a person from fragments — never quite
            complete, always still becoming.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
