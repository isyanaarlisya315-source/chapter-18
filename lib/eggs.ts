type Listener = (msg: string) => void

const listeners = new Set<Listener>()

/** Show a subtle system whisper (easter egg feedback). */
export function whisper(msg: string) {
  listeners.forEach((l) => l(msg))
}

export function onWhisper(l: Listener) {
  listeners.add(l)
  return () => listeners.delete(l)
}
