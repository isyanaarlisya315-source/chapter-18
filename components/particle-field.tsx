'use client'

import { useEffect, useRef } from 'react'
import { atmosphere, prefersReducedMotion } from '@/lib/atmosphere'

type Star = {
  x: number
  y: number
  z: number // depth 0.15..1  (1 = near)
  r: number
  base: number // base brightness
  tw: number // twinkle phase
  tws: number // twinkle speed
  hue: number // 0 cool .. 1 warm-ish
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reduced = prefersReducedMotion()
    let w = 0
    let h = 0
    let dpr = 1
    let stars: Star[] = []

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = Math.min(1, w / 1400)
      const count = Math.floor((w < 720 ? 90 : 240) * (0.6 + density * 0.6))
      stars = Array.from({ length: count }, () => {
        const z = Math.pow(Math.random(), 1.6) * 0.85 + 0.15
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: (0.3 + Math.random() * 1.6) * z,
          base: 0.15 + Math.random() * 0.7,
          tw: Math.random() * Math.PI * 2,
          tws: 0.2 + Math.random() * 0.9,
          hue: Math.random() < 0.08 ? 1 : Math.random() < 0.4 ? 0.5 : 0,
        }
      })
    }
    build()

    let raf = 0
    let t = 0
    let last = performance.now()

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt

      const intensity = atmosphere.intensity
      atmosphere.pulse *= 0.9
      const flash = atmosphere.pulse

      // background — deep space vertical gradient with a faint nebula core
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#02030a')
      g.addColorStop(0.5, '#04050f')
      g.addColorStop(1, '#020209')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // drifting violet/blue nebula glows (parallax with pointer)
      const cx = w * 0.5 + atmosphere.px * 60
      const cy = h * 0.55 + atmosphere.py * 60
      const nebA = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6)
      const a1 = (0.05 + intensity * 0.13 + flash * 0.15).toFixed(3)
      nebA.addColorStop(0, `rgba(40,30,90,${a1})`)
      nebA.addColorStop(0.5, `rgba(20,25,70,${(Number(a1) * 0.5).toFixed(3)})`)
      nebA.addColorStop(1, 'rgba(2,3,10,0)')
      ctx.fillStyle = nebA
      ctx.fillRect(0, 0, w, h)

      const nbx = w * (0.78 + atmosphere.px * 0.05)
      const nby = h * (0.25 + atmosphere.py * 0.05)
      const nebB = ctx.createRadialGradient(nbx, nby, 0, nbx, nby, w * 0.35)
      nebB.addColorStop(0, `rgba(30,50,130,${(0.04 + intensity * 0.1).toFixed(3)})`)
      nebB.addColorStop(1, 'rgba(2,3,10,0)')
      ctx.fillStyle = nebB
      ctx.fillRect(0, 0, w, h)

      // stars
      ctx.save()
      for (const s of stars) {
        // slow drift + pointer parallax scaled by depth
        if (!reduced) {
          s.x += (0.06 + s.z * 0.12) * (s.hue === 1 ? 0.5 : 1) * 0.4
          s.tw += s.tws * dt
        }
        if (s.x > w + 4) s.x = -4
        const parX = atmosphere.px * 40 * s.z
        const parY = atmosphere.py * 40 * s.z

        const twinkle = reduced ? 0.7 : 0.55 + Math.sin(s.tw) * 0.45
        let alpha = s.base * twinkle * (0.4 + intensity * 0.9)
        alpha = Math.min(1, alpha + flash * 0.4 * s.z)

        const px = s.x + parX
        const py = s.y + parY

        if (s.hue === 1) {
          ctx.fillStyle = `rgba(255,214,160,${alpha})`
        } else if (s.hue === 0.5) {
          ctx.fillStyle = `rgba(150,180,255,${alpha})`
        } else {
          ctx.fillStyle = `rgba(220,228,255,${alpha})`
        }
        ctx.beginPath()
        ctx.arc(px, py, s.r * (0.8 + intensity * 0.5), 0, Math.PI * 2)
        ctx.fill()

        // glow for near/bright stars
        if (s.z > 0.7 && alpha > 0.4) {
          ctx.beginPath()
          const gr = ctx.createRadialGradient(px, py, 0, px, py, s.r * 6)
          gr.addColorStop(0, `rgba(120,150,255,${alpha * 0.25})`)
          gr.addColorStop(1, 'rgba(120,150,255,0)')
          ctx.fillStyle = gr
          ctx.arc(px, py, s.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.restore()

      // faint connective lines near pointer — "the system noticing you"
      if (!reduced && atmosphere.mx > -1000 && intensity > 0.2) {
        const near = stars.filter((s) => {
          const dx = s.x + atmosphere.px * 40 * s.z - atmosphere.mx
          const dy = s.y + atmosphere.py * 40 * s.z - atmosphere.my
          return dx * dx + dy * dy < 150 * 150 && s.z > 0.5
        })
        ctx.strokeStyle = `rgba(90,130,255,${0.12 * intensity})`
        ctx.lineWidth = 0.5
        for (const s of near) {
          const px = s.x + atmosphere.px * 40 * s.z
          const py = s.y + atmosphere.py * 40 * s.z
          ctx.beginPath()
          ctx.moveTo(atmosphere.mx, atmosphere.my)
          ctx.lineTo(px, py)
          ctx.stroke()
        }
      }

      // global flash overlay on pulse
      if (flash > 0.01) {
        ctx.fillStyle = `rgba(120,150,255,${flash * 0.12})`
        ctx.fillRect(0, 0, w, h)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => build()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
