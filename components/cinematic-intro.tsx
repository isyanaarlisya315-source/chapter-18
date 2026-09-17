'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { atmosphere, pulse } from '@/lib/atmosphere'
import { SUBJECT } from '@/lib/experience-data'
import { SystemLine } from './cinematic-text'
import { OrbitalSystem } from './orbital-system'

type Phase =
  | 'caret'
  | 'signal'
  | 'source'
  | 'connect'
  | 'searching'
  | 'found'
  | 'subject'
  | 'name'
  | 'age'
  | 'transform'
  | 'update'
  | 'project'

const SEQUENCE: { p: Phase; d: number; intensity: number }[] = [
  { p: 'caret', d: 1500, intensity: 0.02 },
  { p: 'signal', d: 1600, intensity: 0.05 },
  { p: 'source', d: 1500, intensity: 0.08 },
  { p: 'connect', d: 1700, intensity: 0.16 },
  { p: 'searching', d: 4400, intensity: 0.32 },
  { p: 'found', d: 1700, intensity: 0.2 },
  { p: 'subject', d: 1700, intensity: 0.28 },
  { p: 'name', d: 3200, intensity: 0.36 },
  { p: 'age', d: 2900, intensity: 0.4 },
  { p: 'transform', d: 4000, intensity: 0.6 },
  { p: 'update', d: 1900, intensity: 0.4 },
  { p: 'project', d: 0, intensity: 0.32 },
]

const SCAN_NUMBERS = ['03', '17', '42', '68', '91', '100']

export function CinematicIntro({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<Phase>('caret')
  const [collapsing, setCollapsing] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    let acc = 0
    SEQUENCE.forEach(({ p, d, intensity }, i) => {
      const at = acc
      const t = setTimeout(() => {
        setPhase(p)
        atmosphere.intensity = intensity
        if (p === 'found' || p === 'transform') pulse(1)
      }, at)
      timers.current.push(t)
      acc += d || 0
      void i
    })
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const handleAccess = () => {
    if (collapsing) return
    pulse(1)
    setCollapsing(true)
    const t = setTimeout(onEnter, 950)
    timers.current.push(t)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      animate={
        collapsing
          ? { scale: 7, opacity: 0, filter: 'blur(14px)' }
          : { scale: 1, opacity: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.95, ease: [0.7, 0, 0.84, 0] }}
    >
      <AnimatePresence mode="wait">
        {/* CARET */}
        {phase === 'caret' && (
          <motion.div
            key="caret"
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 font-mono text-sm text-[color:var(--ink)]"
          >
            <span className="caret inline-block h-4 w-[7px] bg-[color:var(--ink)]" />
          </motion.div>
        )}

        {phase === 'signal' && (
          <motion.div key="signal" exit={{ opacity: 0, filter: 'blur(6px)' }}>
            <SystemLine className="text-[color:var(--electric-soft)]">
              SIGNAL DETECTED
            </SystemLine>
          </motion.div>
        )}

        {phase === 'source' && (
          <motion.div key="source" exit={{ opacity: 0, filter: 'blur(6px)' }}>
            <SystemLine>UNKNOWN SOURCE</SystemLine>
          </motion.div>
        )}

        {phase === 'connect' && (
          <motion.div key="connect" exit={{ opacity: 0, filter: 'blur(6px)' }}>
            <SystemLine className="text-[color:var(--electric-soft)]">
              CONNECTION ESTABLISHED
            </SystemLine>
          </motion.div>
        )}

        {/* SEARCHING — giant circular scan */}
        {phase === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center"
          >
            <ScanField />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <SystemLine>SEARCHING MEMORY CORE...</SystemLine>
            </div>
          </motion.div>
        )}

        {phase === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div
              className="text-lg font-light uppercase tracking-sys text-[color:var(--ink)] sm:text-2xl"
              style={{ animation: 'glitch-x 0.5s steps(2) 2' }}
            >
              MEMORY CORE FOUND
            </div>
          </motion.div>
        )}

        {phase === 'subject' && (
          <motion.div key="subject" exit={{ opacity: 0, filter: 'blur(6px)' }}>
            <SystemLine className="text-[color:var(--warm)]">
              SUBJECT IDENTIFIED
            </SystemLine>
          </motion.div>
        )}

        {/* NAME */}
        {phase === 'name' && (
          <motion.div key="name" exit={{ opacity: 0, filter: 'blur(8px)' }} className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.12em' }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-extralight uppercase text-[color:var(--ink)] sm:text-8xl md:text-9xl"
            >
              {SUBJECT.first}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.1 }}
              className="mt-3 text-sm font-light uppercase tracking-sys text-[color:var(--ink-dim)] sm:text-lg"
            >
              {SUBJECT.last}
            </motion.div>
          </motion.div>
        )}

        {/* AGE */}
        {phase === 'age' && (
          <motion.div key="age" exit={{ opacity: 0, filter: 'blur(8px)' }} className="relative text-center">
            <SystemLine className="mb-4">AGE VERIFICATION</SystemLine>
            <div className="relative inline-block overflow-hidden">
              <div className="text-7xl font-thin text-[color:var(--ink)] sm:text-9xl">17</div>
              <div className="mt-1 text-[10px] uppercase tracking-sys text-[color:var(--ink-faint)]">
                YEARS
              </div>
              <motion.div
                initial={{ y: '-120%' }}
                animate={{ y: '120%' }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[rgba(120,150,255,0.5)] to-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* TRANSFORM 17 -> 18 */}
        {phase === 'transform' && (
          <motion.div
            key="transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.4, filter: 'blur(20px)' }}
            className="relative flex items-center justify-center"
          >
            <OrbitalSystem className="absolute h-[140vmin] w-[140vmin] opacity-70" rings={4} />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.15, 1], opacity: 1 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative text-[42vmin] font-thin leading-none text-[color:var(--ink)]">
                18
                {/* constellation forming inside the number */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-[3px] w-[3px] rounded-full bg-[color:var(--warm)]"
                    style={{
                      left: `${15 + ((i * 53) % 70)}%`,
                      top: `${18 + ((i * 71) % 64)}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.4], scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.09, duration: 1.4, repeat: Infinity, repeatType: 'reverse' }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'update' && (
          <motion.div key="update" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SystemLine className="text-[color:var(--electric-soft)]">UPDATE COMPLETE</SystemLine>
          </motion.div>
        )}

        {/* PROJECT + ACCESS */}
        {phase === 'project' && (
          <motion.div
            key="project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-sys text-[color:var(--ink-faint)]">
                PROJECT
              </div>
              <div className="text-7xl font-thin text-[color:var(--ink)] sm:text-8xl">18</div>
              <div className="text-xs uppercase tracking-sys text-[color:var(--ink-dim)]">
                MEMORY CORE
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleAccess}
              data-interactive
              className="group relative mt-16 flex h-28 w-28 items-center justify-center rounded-full"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Access the Memory Core"
            >
              <span className="absolute inset-0 rounded-full border border-[rgba(120,150,255,0.4)]" />
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    '0 0 60px 8px rgba(79,124,255,0.4), inset 0 0 40px rgba(79,124,255,0.25)',
                }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="absolute -inset-6 rounded-full border border-[rgba(120,150,255,0.12)]" style={{ animation: 'drift-slow 40s linear infinite' }} />
              <span className="relative text-[11px] uppercase tracking-sys-sm text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--warm)]">
                ACCESS
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ScanField() {
  return (
    <div className="relative h-[68vmin] w-[68vmin]">
      {/* static outer ring */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(120,150,255,0.14)" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(120,150,255,0.08)" strokeWidth="0.5" />
        {/* rotating scan arc */}
        <g style={{ transformOrigin: '200px 200px', animation: 'drift-slow 4s linear infinite' }}>
          <path d="M200 20 A180 180 0 0 1 380 200" fill="none" stroke="rgba(120,150,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="380" cy="200" r="3" fill="rgba(255,214,160,0.9)" />
        </g>
        {/* rotating ticks */}
        <g style={{ transformOrigin: '200px 200px', animation: 'drift-slow 22s linear infinite reverse' }}>
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2
            const r1 = 158
            const r2 = i % 5 === 0 ? 168 : 163
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * r1}
                y1={200 + Math.sin(a) * r1}
                x2={200 + Math.cos(a) * r2}
                y2={200 + Math.sin(a) * r2}
                stroke="rgba(150,180,255,0.3)"
                strokeWidth="0.75"
              />
            )
          })}
        </g>
      </svg>

      {/* numbers around circumference */}
      {SCAN_NUMBERS.map((n, i) => {
        const a = (i / SCAN_NUMBERS.length) * Math.PI * 2 - Math.PI / 2
        const left = 50 + Math.cos(a) * 44
        const top = 50 + Math.sin(a) * 44
        return (
          <span
            key={n}
            className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-[color:var(--ink-dim)]"
            style={{ left: `${left}%`, top: `${top}%`, animation: `breathe ${2 + i * 0.3}s ease-in-out infinite` }}
          >
            {n}
          </span>
        )
      })}

      {/* center flicker fragments */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-2 w-2 rounded-full bg-[color:var(--electric)]"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}
