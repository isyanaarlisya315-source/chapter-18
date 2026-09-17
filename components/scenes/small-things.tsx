'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { SMALL_THINGS } from '@/lib/experience-data'
import { Reveal } from '../scene-utils'

export function SmallThings() {
  const [active, setActive] = useState<string | null>(null)
  const activeItem = SMALL_THINGS.find((s) => s.id === active)

  return (
    <section className="relative z-10 min-h-[150vh] w-full overflow-hidden px-6 py-32 sm:px-10 md:px-16">
      <Reveal className="relative z-10 max-w-md">
        <div className="text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
          SMALL THINGS
        </div>
        <p className="mt-3 font-serif-el text-xl italic text-[color:var(--ink-dim)] sm:text-2xl">
          The little constellations that quietly make up a person.
        </p>
      </Reveal>

      <div className="relative mt-8 h-[95vh] w-full">
        {SMALL_THINGS.map((s, i) => {
          const on = active === s.id
          return (
            <motion.button
              key={s.id}
              type="button"
              data-interactive
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
              onClick={() => setActive(s.id)}
              className="absolute flex items-center justify-center rounded-full"
              style={{
                left: `${s.x * 100}%`,
                top: `${s.y * 100}%`,
                width: s.r * 2,
                height: s.r * 2,
                translate: '-50% -50%',
              }}
              animate={{ y: [0, i % 2 ? -16 : 16, 0], x: [0, i % 3 ? 10 : -10, 0] }}
              transition={{ duration: 9 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                className="absolute inset-0 rounded-full border transition-all duration-500"
                style={{
                  borderColor: on ? 'rgba(255,214,160,0.6)' : 'rgba(120,150,255,0.25)',
                  boxShadow: on
                    ? '0 0 40px rgba(255,214,160,0.25), inset 0 0 30px rgba(255,214,160,0.1)'
                    : 'inset 0 0 24px rgba(79,124,255,0.08)',
                }}
              />
              <span
                className="relative text-[9px] uppercase tracking-sys-sm transition-colors sm:text-[10px]"
                style={{ color: on ? 'var(--warm)' : 'var(--ink-dim)' }}
              >
                {s.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="pointer-events-none relative z-10 mx-auto -mt-16 h-16 max-w-md text-center">
        <motion.p
          key={activeItem?.id ?? 'none'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: activeItem ? 1 : 0, y: 0 }}
          className="font-serif-el text-lg italic text-[color:var(--ink)] sm:text-xl"
        >
          {activeItem ? `\u201C${activeItem.line}\u201D` : ''}
        </motion.p>
      </div>
    </section>
  )
}
