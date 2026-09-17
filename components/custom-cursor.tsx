'use client'

import { useEffect, useRef } from 'react'
import { atmosphere } from '@/lib/atmosphere'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    document.documentElement.classList.add('cursor-hidden')

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let tx = rx
    let ty = ry
    let hovering = false
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      atmosphere.mx = e.clientX
      atmosphere.my = e.clientY
      atmosphere.px = e.clientX / window.innerWidth - 0.5
      atmosphere.py = e.clientY / window.innerHeight - 0.5

      const el = e.target as HTMLElement | null
      hovering = !!el?.closest(
        'button, a, [role="button"], [data-interactive], input, textarea',
      )
    }
    const onDown = () => (atmosphere.down = true)
    const onUp = () => (atmosphere.down = false)

    const loop = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        const s = hovering ? 2.1 : atmosphere.down ? 0.7 : 1
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${s})`
        ringRef.current.style.borderColor = hovering
          ? 'rgba(255,214,160,0.9)'
          : 'rgba(120,150,255,0.6)'
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.classList.remove('cursor-hidden')
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border transition-[border-color] duration-300"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#e7ecff]"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
