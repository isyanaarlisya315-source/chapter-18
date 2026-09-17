'use client'

import { Reveal } from '../scene-utils'

export function BeyondTheCode() {
  return (
    <section className="relative z-10 flex min-h-[130vh] w-full items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <Reveal blur={4}>
          <div className="mb-10 text-[11px] uppercase tracking-sys text-[color:var(--ink-faint)]">
            BEYOND THE CODE
          </div>
        </Reveal>

        <Reveal delay={0.2} y={20} blur={6}>
          <p className="font-serif-el text-3xl italic leading-snug text-[color:var(--ink)] sm:text-5xl">
            You are more than the things you build.
          </p>
        </Reveal>

        <Reveal delay={0.8} y={20} blur={6} className="mt-10">
          <p className="font-serif-el text-xl italic leading-relaxed text-[color:var(--ink-dim)] sm:text-2xl">
            You are the one who chooses to feel, to stay curious, to keep going
            when the idea is still ugly and unfinished.
          </p>
        </Reveal>

        <Reveal delay={1.4} className="mt-16">
          <div className="mx-auto h-16 w-px bg-gradient-to-b from-[rgba(120,150,255,0.4)] to-transparent" />
        </Reveal>
      </div>
    </section>
  )
}
