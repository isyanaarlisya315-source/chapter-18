'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '../scene-utils'
import { pulse } from '@/lib/atmosphere'
import { whisper } from '@/lib/eggs'

const COUNT = 18

export function BirthdayRitual() {
  const [out, setOut] = useState<Set<number>>(new Set())
  const allOut = out.size >= COUNT

  const blow = (i: number) => {
    if (out.has(i)) return
    const next = new Set(out)
    next.add(i)
    setOut(next)
    pulse(0.3)
    if (next.size >= COUNT) {
      whisper('WISH RECEIVED')
    }
  }

  const blowAll = () => {
    setOut(new Set(Array.from({ length: COUNT }, (_, i) => i)))
    pulse(1)
    whisper('WISH RECEIVED')
  }

  return (
    <section className="relative z-10 flex min-h-[130vh] w-full flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
          THE RITUAL
        </div>
      </Reveal>
      <Reveal delay={0.15} className="mt-4">
        <p className="font-serif-el text-2xl italic text-[color:var(--ink)] sm:text-3xl">
          {allOut ? 'Now make it count.' : 'Eighteen flames. One breath. Make a wish.'}
        </p>
      </Reveal>

      {/* candles */}
      <div className="mt-16 flex max-w-2xl flex-wrap items-end justify-center gap-3">
        {Array.from({ length: COUNT }).map((_, i) => {
          const isOut = out.has(i)
          return (
            <button
              key={i}
              type="button"
              data-interactive
              onMouseEnter={() => blow(i)}
              onClick={() => blow(i)}
              className="group flex flex-col items-center"
              aria-label={`Candle ${i + 1}`}
            >
              <div className="relative flex h-10 items-end justify-center">
                <AnimatePresence>
                  {!isOut && (
                    <motion.div
                      exit={{ opacity: 0, y: -12, scale: 0 }}
                      className="absolute bottom-4"
                    >
                      <motion.div
                        className="h-4 w-2 rounded-full bg-[radial-gradient(circle,rgba(255,230,180,1),rgba(255,150,60,0.8)_60%,transparent)]"
                        animate={{ scaleY: [1, 1.25, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                        transition={{ duration: 0.6 + (i % 4) * 0.1, repeat: Infinity }}
                        style={{ transformOrigin: 'bottom' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {isOut && (
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 1.2 }}
                    className="absolute bottom-4 h-3 w-[3px] rounded-full bg-[rgba(180,190,210,0.5)]"
                  />
                )}
              </div>
              <div className="h-8 w-2 rounded-sm bg-gradient-to-b from-[rgba(200,210,255,0.5)] to-[rgba(120,150,255,0.15)]" />
            </button>
          )
        })}
      </div>

      <div className="mt-14 h-10">
        <AnimatePresence mode="wait">
          {allOut ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif-el text-xl italic text-[color:var(--warm)]"
            >
              Wish received. Now go build it.
            </motion.p>
          ) : (
            <motion.button
              key="blow"
              type="button"
              data-interactive
              onClick={blowAll}
              exit={{ opacity: 0 }}
              className="text-[10px] uppercase tracking-sys-sm text-[color:var(--ink-faint)] transition-colors hover:text-[color:var(--ink)]"
            >
              — or make one big breath —
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
