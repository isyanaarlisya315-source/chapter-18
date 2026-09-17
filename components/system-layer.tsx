'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { onWhisper, whisper } from '@/lib/eggs'

export function SystemLayer({ onSecret }: { onSecret: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [status, setStatus] = useState('STABLE')
  const [statusClicks, setStatusClicks] = useState(0)
  const [jarvis, setJarvis] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // whisper toasts
  useEffect(() => {
    return onWhisper((msg) => {
      setToast(msg)
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(null), 3200)
    })
  }, [])

  // fast scroll detection
  useEffect(() => {
    let lastY = window.scrollY
    let lastT = performance.now()
    let cooldown = 0
    const onScroll = () => {
      const now = performance.now()
      const dy = Math.abs(window.scrollY - lastY)
      const dt = now - lastT
      const v = dy / Math.max(1, dt)
      if (v > 4 && now > cooldown) {
        whisper('HEY. SLOW DOWN.')
        cooldown = now + 6000
      }
      lastY = window.scrollY
      lastT = now
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // idle detection
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>
    let follow: ReturnType<typeof setTimeout>
    const reset = () => {
      clearTimeout(idle)
      clearTimeout(follow)
      idle = setTimeout(() => {
        whisper('Are you thinking?')
        follow = setTimeout(() => whisper('Good.'), 3600)
      }, 22000)
    }
    const evts = ['pointermove', 'scroll', 'keydown', 'pointerdown']
    evts.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()
    return () => {
      clearTimeout(idle)
      clearTimeout(follow)
      evts.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [])

  // Jarvis terminal (press J) + secret sequence "ham"
  useEffect(() => {
    let seq = ''
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (e.key.toLowerCase() === 'j') {
        setJarvis((v) => !v)
      }
      seq = (seq + e.key.toLowerCase()).slice(-3)
      if (seq === 'ham') {
        onSecret()
        seq = ''
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSecret])

  const clickStatus = () => {
    const n = statusClicks + 1
    setStatusClicks(n)
    if (n >= 3 && status === 'STABLE') setStatus('NOT REALLY.')
  }

  return (
    <>
      {/* whisper toast */}
      <div className="pointer-events-none fixed inset-x-0 top-10 z-[80] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.6 }}
              className="rounded-full border border-[rgba(120,150,255,0.2)] bg-[rgba(4,6,15,0.6)] px-5 py-2 text-[10px] uppercase tracking-sys-sm text-[color:var(--ink-dim)] backdrop-blur-sm"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* status readout */}
      <button
        type="button"
        data-interactive
        onClick={clickStatus}
        className="fixed bottom-5 left-5 z-[80] hidden font-mono text-[9px] uppercase tracking-widest text-[color:var(--ink-faint)] transition-colors hover:text-[color:var(--ink-dim)] md:block"
      >
        SYSTEM: <span className={status === 'STABLE' ? 'text-[color:var(--electric-soft)]' : 'text-[color:var(--warm)]'}>{status}</span>
      </button>

      {/* scroll hint / press J */}
      <div className="fixed bottom-5 right-5 z-[80] hidden font-mono text-[9px] uppercase tracking-widest text-[color:var(--ink-faint)] md:block">
        PRESS J
      </div>

      {/* Jarvis terminal */}
      <AnimatePresence>
        {jarvis && <JarvisTerminal onClose={() => setJarvis(false)} />}
      </AnimatePresence>
    </>
  )
}

function JarvisTerminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [input, setInput] = useState('')
  const boot = [
    'JARVIS INTERFACE v18.0',
    'initializing...',
    'memory core: linked',
    'subject: ILHAM SOBAR WIBAWA',
    'status: BECOMING',
    'type a command, or "help".',
  ]

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setLines(boot.slice(0, i))
      if (i >= boot.length) clearInterval(id)
    }, 260)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = () => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return
    let res = ''
    if (cmd === 'help') res = 'commands: whoami · target · wish · clear · exit'
    else if (cmd === 'whoami') res = 'you are the subject. and the reason.'
    else if (cmd === 'target') res = 'ITB — distance: unknown. bearing: forward.'
    else if (cmd === 'wish') res = 'one wish granted. spend it building.'
    else if (cmd === 'clear') {
      setLines([])
      setInput('')
      return
    } else if (cmd === 'exit') {
      onClose()
      return
    } else res = `unknown command: ${cmd}`
    setLines((l) => [...l, `> ${cmd}`, res])
    setInput('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,3,10,0.7)] p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-lg border border-[rgba(120,150,255,0.25)] bg-[rgba(4,6,15,0.9)] p-5 font-mono text-xs text-[color:var(--electric-soft)] shadow-[0_0_80px_rgba(79,124,255,0.15)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-sys text-[color:var(--ink-faint)]">
            J.A.R.V.I.S
          </span>
          <button type="button" data-interactive onClick={onClose} className="text-[color:var(--ink-faint)] hover:text-[color:var(--warm)]">
            [esc]
          </button>
        </div>
        <div className="max-h-64 space-y-1 overflow-y-auto">
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith('>') ? 'text-[color:var(--ink)]' : ''}>
              {l}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-[rgba(120,150,255,0.15)] pt-3">
          <span className="text-[color:var(--warm)]">{'>'}</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) submit()
              if (e.key === 'Escape') onClose()
            }}
            className="flex-1 bg-transparent text-[color:var(--ink)] outline-none placeholder:text-[color:var(--ink-faint)]"
            placeholder="command..."
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
