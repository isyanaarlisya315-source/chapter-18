'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SECRET_LINES } from '@/lib/experience-data'
import { atmosphere } from '@/lib/atmosphere'

export function SecretSignal({ onClose }: { onClose: () => void }) {
  const [shown, setShown] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prev = atmosphere.intensity
    atmosphere.intensity = 0.7
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= SECRET_LINES.length) {
        clearInterval(id)
        setTimeout(() => setDone(true), 1200)
      }
    }, 1700)
    return () => {
      clearInterval(id)
      atmosphere.intensity = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(2,3,10,0.92)] px-6 backdrop-blur-xl"
    >
      <div className="max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 text-[10px] uppercase tracking-sys text-[color:var(--electric-soft)]"
        >
          HIDDEN SIGNAL · PRIVATE CHANNEL
        </motion.div>

        <div className="space-y-5">
          {SECRET_LINES.slice(0, shown).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              className={`font-serif-el italic leading-snug ${
                i === 0
                  ? 'text-2xl text-[color:var(--warm)] sm:text-3xl'
                  : 'text-lg text-[color:var(--ink)] sm:text-xl'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <AnimatePresence>
          {done && (
            <motion.button
              type="button"
              data-interactive
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onClose}
              className="mt-16 text-[10px] uppercase tracking-sys-sm text-[color:var(--ink-faint)] transition-colors hover:text-[color:var(--ink)]"
            >
              — close the channel —
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
