'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ARTIFACTS } from '@/lib/experience-data'
import { Reveal } from '../scene-utils'
import { pulse } from '@/lib/atmosphere'

function ArtifactGlyph({ kind, active }: { kind: string; active: boolean }) {
  if (kind === 'core') {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <defs>
          <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,214,160,0.9)" />
            <stop offset="60%" stopColor="rgba(79,124,255,0.4)" />
            <stop offset="100%" stopColor="rgba(79,124,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r={active ? 26 : 20} fill="url(#coreG)" />
        {Array.from({ length: 40 }).map((_, i) => {
          const a = (i / 40) * Math.PI * 2
          const r = 30 + (i % 5) * 8 + (active ? 6 : 0)
          return (
            <circle
              key={i}
              cx={80 + Math.cos(a) * r}
              cy={80 + Math.sin(a) * r}
              r={0.8 + (i % 3) * 0.4}
              fill="rgba(180,200,255,0.8)"
            />
          )
        })}
        <g style={{ transformOrigin: '80px 80px', animation: 'drift-slow 30s linear infinite' }}>
          <ellipse cx="80" cy="80" rx="60" ry="22" fill="none" stroke="rgba(120,150,255,0.3)" strokeWidth="0.5" />
        </g>
      </svg>
    )
  }
  if (kind === 'watch') {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <rect x="52" y="40" width="56" height="80" rx="18" fill="none" stroke="rgba(150,180,255,0.5)" strokeWidth="1" />
        <rect x="58" y="30" width="44" height="14" rx="6" fill="rgba(120,150,255,0.15)" />
        <rect x="58" y="116" width="44" height="14" rx="6" fill="rgba(120,150,255,0.15)" />
        {active && (
          <>
            <line x1="62" y1="60" x2="98" y2="60" stroke="rgba(255,214,160,0.7)" strokeWidth="1" />
            <line x1="62" y1="72" x2="86" y2="72" stroke="rgba(150,180,255,0.6)" strokeWidth="1" />
            <circle cx="80" cy="94" r="10" fill="none" stroke="rgba(255,214,160,0.8)" strokeWidth="1" />
          </>
        )}
      </svg>
    )
  }
  if (kind === 'lens') {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <circle cx="58" cy="80" r={active ? 30 : 26} fill="none" stroke="rgba(150,180,255,0.5)" strokeWidth="1" />
        <circle cx="104" cy="80" r={active ? 30 : 26} fill="none" stroke="rgba(150,180,255,0.5)" strokeWidth="1" />
        <line x1="82" y1="80" x2="80" y2="80" stroke="rgba(150,180,255,0.5)" strokeWidth="1" />
        {active && (
          <>
            <circle cx="58" cy="80" r="12" fill="rgba(79,124,255,0.15)" />
            <circle cx="104" cy="80" r="12" fill="rgba(255,214,160,0.12)" />
          </>
        )}
      </svg>
    )
  }
  // browser — self-assembling
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <rect x="30" y="40" width="100" height="80" rx="6" fill="none" stroke="rgba(150,180,255,0.5)" strokeWidth="1" />
      <line x1="30" y1="54" x2="130" y2="54" stroke="rgba(150,180,255,0.35)" strokeWidth="1" />
      <circle cx="38" cy="47" r="1.6" fill="rgba(255,214,160,0.7)" />
      {active &&
        [0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={40}
            y={64 + i * 12}
            height="5"
            rx="2"
            fill="rgba(150,180,255,0.4)"
            initial={{ width: 0 }}
            animate={{ width: 30 + i * 15 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          />
        ))}
    </svg>
  )
}

const POS = [
  'left-[6%] top-[12%]',
  'right-[8%] top-[20%]',
  'left-[16%] bottom-[16%]',
  'right-[14%] bottom-[10%]',
]

export function BuilderLab() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative z-10 min-h-[160vh] w-full overflow-hidden px-6 py-32 sm:px-10 md:px-16">
      <Reveal className="relative z-10 max-w-md">
        <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
          THE LAB
        </div>
        <p className="mt-3 font-serif-el text-xl italic text-[color:var(--ink-dim)] sm:text-2xl">
          Four artifacts, suspended in the dark. Approach one to wake it.
        </p>
      </Reveal>

      <div className="relative mt-10 h-[110vh] w-full">
        {ARTIFACTS.map((a, i) => {
          const on = active === a.id
          return (
            <motion.button
              key={a.id}
              type="button"
              data-interactive
              onMouseEnter={() => {
                setActive(a.id)
                pulse(0.4)
              }}
              onFocus={() => setActive(a.id)}
              className={`absolute ${POS[i]} flex flex-col items-center`}
              animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className={`h-40 w-40 transition-all duration-500 sm:h-52 sm:w-52 ${on ? 'scale-105 opacity-100' : 'opacity-70'}`}>
                <ArtifactGlyph kind={a.kind} active={on} />
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-sys" style={{ color: on ? 'var(--warm)' : 'var(--ink-dim)' }}>
                {a.id} · {a.name}
              </div>
              <motion.p
                initial={false}
                animate={{ opacity: on ? 1 : 0, y: on ? 0 : 6 }}
                className="mt-2 max-w-[16rem] text-center font-serif-el text-sm italic text-[color:var(--ink)]"
              >
                &ldquo;{a.line}&rdquo;
              </motion.p>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
