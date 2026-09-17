/**
 * Imperative shared state read by the canvas render loop every frame,
 * so scroll + pointer updates never trigger React re-renders.
 */
export const atmosphere = {
  // pointer in normalized viewport coords (-0.5 .. 0.5), 0,0 = center
  px: 0,
  py: 0,
  // raw pointer in pixels
  mx: -9999,
  my: -9999,
  down: false,
  // 0 (quiet) .. 1 (fully alive) — driven by scroll progress
  intensity: 0.12,
  // brief flash pulse (0..1) set on key events, decays in loop
  pulse: 0,
}

export function pulse(value = 1) {
  atmosphere.pulse = Math.max(atmosphere.pulse, value)
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
