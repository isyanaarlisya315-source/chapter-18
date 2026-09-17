'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { JOURNAL_ENTRIES } from '@/lib/experience-data'
import { Reveal } from '../scene-utils'
import { pulse } from '@/lib/atmosphere'

const SCATTER = [
  'left-[4%] top-[6%] rotate-[-5deg]',
  'right-[8%] top-[2%] rotate-[4deg]',
  'left-[24%] top-[40%] rotate-[2deg]',
  'right-[18%] top-[46%] rotate-[-3deg]',
  'left-[10%] bottom-[6%] rotate-[6deg]',
]

export function JournalArchive() {
  const [open, setOpen] = useState<string | null>(null)
  const openEntry = JOURNAL_ENTRIES.find((e) => e.id === open)

  return (
    <section className="relative z-10 min-h-[150vh] w-full overflow-hidden px-6 py-32 sm:px-10 md:px-16">
      <Reveal className="relative z-10 max-w-md">
        <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
          THE ARCHIVE
        </div>
        <p className="mt-3 font-serif-el text-xl italic text-[color:var(--ink-dim)] sm:text-2xl">
          Pages that drifted loose from a private notebook. Open one, gently.
        </p>
      </Reveal>

      <div className="relative mt-12 h-[100vh] w-full">
        {JOURNAL_ENTRIES.map((e, i) => (
          <motion.button
            key={e.id}
            type="button"
            data-interactive
            onClick={() => {
              setOpen(e.id)
              pulse(0.4)
            }}
            className={`absolute ${SCATTER[i]} w-56 rounded-sm border border-[rgba(120,150,255,0.18)] bg-[rgba(8,10,22,0.5)] p-5 text-left backdrop-blur-sm sm:w-64`}
            animate={{ y: [0, i % 2 ? 14 : -14, 0] }}
            transition={{ duration: 8 + i * 1.3, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(255,214,160,0.5)' }}
          >
            <div className="text-[9px] uppercase tracking-sys text-[color:var(--ink-faint)]">
              ENTRY {e.id}
            </div>
            <div className="mt-3 font-serif-el text-lg italic leading-tight text-[color:var(--ink)]">
              {e.title}
            </div>
            <div className="mt-4 text-[9px] uppercase tracking-sys-sm text-[color:var(--electric-soft)]">
              open →
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-[rgba(2,3,10,0.75)] p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, filter: 'blur(8px)' }}
              animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(ev) => ev.stopPropagation()}
              className="max-w-lg rounded border border-[rgba(120,150,255,0.25)] bg-[rgba(6,8,18,0.95)] p-10"
            >
              <div className="text-[9px] uppercase tracking-sys text-[color:var(--ink-faint)]">
                ENTRY {openEntry.id}
              </div>
              <h3 className="mt-4 font-serif-el text-2xl italic text-[color:var(--warm)] sm:text-3xl">
                {openEntry.title}
              </h3>
              <p className="mt-6 font-serif-el text-lg italic leading-relaxed text-[color:var(--ink-dim)]">
                {openEntry.body}
              </p>
              <button
                type="button"
                data-interactive
                onClick={() => setOpen(null)}
                className="mt-8 text-[10px] uppercase tracking-sys-sm text-[color:var(--ink-faint)] transition-colors hover:text-[color:var(--ink)]"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
