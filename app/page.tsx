'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ParticleField } from '@/components/particle-field'
import { CustomCursor } from '@/components/custom-cursor'
import { CinematicIntro } from '@/components/cinematic-intro'
import { SystemLayer } from '@/components/system-layer'
import { atmosphere } from '@/lib/atmosphere'

import { ChapterEntry } from '@/components/scenes/chapter-entry'
import { Constellation } from '@/components/scenes/constellation'
import { IdentityScan } from '@/components/scenes/identity-scan'
import { BuilderLab } from '@/components/scenes/builder-lab'
import { WhatIf } from '@/components/scenes/what-if'
import { BeyondTheCode } from '@/components/scenes/beyond-the-code'
import { JournalArchive } from '@/components/scenes/journal-archive'
import { SmallThings } from '@/components/scenes/small-things'
import { MemoryCore } from '@/components/scenes/memory-core'
import { ItbDestination } from '@/components/scenes/itb-destination'
import { FutureSimulation } from '@/components/scenes/future-simulation'
import { BirthdayRitual } from '@/components/scenes/birthday-ritual'
import { FinalScene } from '@/components/scenes/final-scene'
import { SecretSignal } from '@/components/scenes/secret-signal'

export default function Page() {
  const [entered, setEntered] = useState(false)
  const [secret, setSecret] = useState(false)

  // Lock scroll during the intro
  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  // Drive atmosphere intensity from overall scroll progress once inside the world
  useEffect(() => {
    if (!entered) return
    let raf = 0
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      atmosphere.intensity = 0.22 + p * 0.72
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [entered])

  const enter = useCallback(() => {
    setEntered(true)
    window.scrollTo(0, 0)
  }, [])

  const openSecret = useCallback(() => setSecret(true), [])
  const closeSecret = useCallback(() => setSecret(false), [])

  return (
    <>
      <ParticleField />
      <CustomCursor />

      <AnimatePresence>
        {!entered && <CinematicIntro onEnter={enter} />}
      </AnimatePresence>

      {entered && (
        <>
          <SystemLayer onSecret={openSecret} />
          <main className="relative w-full">
            <ChapterEntry />
            <Constellation />
            <IdentityScan />
            <BuilderLab />
            <WhatIf />
            <BeyondTheCode />
            <JournalArchive />
            <SmallThings />
            <MemoryCore />
            <ItbDestination />
            <FutureSimulation />
            <BirthdayRitual />
            <FinalScene onSecret={openSecret} />
          </main>
        </>
      )}

      <AnimatePresence>
        {secret && <SecretSignal onClose={closeSecret} />}
      </AnimatePresence>
    </>
  )
}
