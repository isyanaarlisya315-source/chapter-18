'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  CONSTELLATION_LINKS,
  CONSTELLATION_NODES,
} from '@/lib/experience-data'
import { pulse } from '@/lib/atmosphere'
import { Reveal } from '../scene-utils'

type NodeState = {
  id: string
  label: string
  line: string
  bx: number
  by: number
  ox: number
  oy: number
  phase: number
  px: number
  py: number
}

export function Constellation() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const nodesRef = useRef<NodeState[]>(
    CONSTELLATION_NODES.map((n) => ({
      id: n.id,
      label: n.label,
      line: n.line,
      bx: n.x,
      by: n.y,
      ox: 0,
      oy: 0,
      phase: Math.random() * Math.PI * 2,
      px: 0,
      py: 0,
    })),
  )
  const activeRef = useRef<Set<string>>(new Set())
  const mouse = useRef({ x: -9999, y: -9999 })
  const [active, setActive] = useState<string | null>(null)
  const [activated, setActivated] = useState<Set<string>>(new Set())

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = wrap.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      mouse.current.x = e.clientX - r.left
      mouse.current.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    const byId = (id: string) => nodesRef.current.find((n) => n.id === id)!

    let raf = 0
    let t = 0
    const loop = () => {
      t += 0.006
      ctx.clearRect(0, 0, w, h)

      // update positions
      for (const n of nodesRef.current) {
        n.ox = Math.sin(t + n.phase) * 0.012
        n.oy = Math.cos(t * 0.8 + n.phase) * 0.012
        let px = (n.bx + n.ox) * w
        let py = (n.by + n.oy) * h
        // mouse repulsion ripple
        const dx = px - mouse.current.x
        const dy = py - mouse.current.y
        const d = Math.hypot(dx, dy)
        if (d < 140 && d > 0.001) {
          const f = (1 - d / 140) * 22
          px += (dx / d) * f
          py += (dy / d) * f
        }
        n.px = px
        n.py = py
      }

      // links
      for (const [a, b] of CONSTELLATION_LINKS) {
        const na = byId(a)
        const nb = byId(b)
        const lit = activeRef.current.has(a) || activeRef.current.has(b)
        ctx.strokeStyle = lit
          ? 'rgba(255,214,160,0.5)'
          : 'rgba(120,150,255,0.18)'
        ctx.lineWidth = lit ? 1.1 : 0.6
        ctx.beginPath()
        ctx.moveTo(na.px, na.py)
        ctx.lineTo(nb.px, nb.py)
        ctx.stroke()
      }

      // nodes
      for (const n of nodesRef.current) {
        const on = activeRef.current.has(n.id)
        const glow = on ? 16 : 8
        const gr = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, glow)
        gr.addColorStop(0, on ? 'rgba(255,214,160,0.9)' : 'rgba(150,180,255,0.7)')
        gr.addColorStop(1, 'rgba(120,150,255,0)')
        ctx.fillStyle = gr
        ctx.beginPath()
        ctx.arc(n.px, n.py, glow, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = on ? 'rgba(255,224,180,1)' : 'rgba(210,224,255,0.95)'
        ctx.beginPath()
        ctx.arc(n.px, n.py, on ? 3 : 2, 0, Math.PI * 2)
        ctx.fill()

        // move overlay button
        const btn = btnRefs.current[n.id]
        if (btn) {
          btn.style.transform = `translate3d(${n.px}px, ${n.py}px, 0) translate(-50%, -50%)`
        }
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const activate = (id: string) => {
    activeRef.current.add(id)
    setActivated(new Set(activeRef.current))
    setActive(id)
    pulse(0.5)
  }

  const activeNode = CONSTELLATION_NODES.find((n) => n.id === active)

  return (
    <section className="relative z-10 min-h-[130vh] w-full px-6 py-24 sm:px-10 md:px-16">
      <Reveal>
        <div className="mb-2 text-[11px] uppercase tracking-sys text-[color:var(--electric-soft)]">
          IDENTITY MAP
        </div>
        <p className="max-w-md font-serif-el text-xl italic text-[color:var(--ink-dim)] sm:text-2xl">
          A cluster of tendencies, drifting. Touch one to let it burn brighter.
        </p>
      </Reveal>

      <div
        ref={wrapRef}
        className="relative mt-10 h-[80vh] w-full"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        {nodesRef.current.map((n) => (
          <button
            key={n.id}
            ref={(el) => {
              btnRefs.current[n.id] = el
            }}
            type="button"
            data-interactive
            onClick={() => activate(n.id)}
            className="absolute left-0 top-0 whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-sys-sm transition-colors"
            style={{ color: activated.has(n.id) ? 'var(--warm)' : 'var(--ink-dim)' }}
          >
            <span className="pointer-events-none translate-y-4 pl-4">{n.label}</span>
          </button>
        ))}

        {/* revealed line */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute bottom-0 left-0 max-w-md"
            >
              <div className="text-[10px] uppercase tracking-sys text-[color:var(--warm)]">
                {activeNode.label}
              </div>
              <p className="mt-2 font-serif-el text-2xl italic text-[color:var(--ink)] sm:text-3xl">
                &ldquo;{activeNode.line}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
