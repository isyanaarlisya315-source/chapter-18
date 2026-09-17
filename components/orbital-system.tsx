'use client'

/**
 * Abstract orbital rings + drifting satellites rendered as SVG.
 * Purely decorative atmosphere behind large typography.
 */
export function OrbitalSystem({
  className = '',
  rings = 3,
  seed = 0,
}: {
  className?: string
  rings?: number
  seed?: number
}) {
  const ringDefs = Array.from({ length: rings }, (_, i) => {
    const rx = 120 + i * 70
    const ry = (120 + i * 70) * (0.34 + (i % 2) * 0.12)
    const rot = (seed * 37 + i * 41) % 180
    const dur = 60 + i * 26
    const dir = i % 2 === 0 ? 1 : -1
    return { rx, ry, rot, dur, dir, i }
  })

  return (
    <svg
      aria-hidden="true"
      viewBox="-400 -400 800 800"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(120,150,255,0.25)" />
          <stop offset="100%" stopColor="rgba(120,150,255,0)" />
        </radialGradient>
      </defs>
      {ringDefs.map(({ rx, ry, rot, dur, dir, i }) => (
        <g key={i} transform={`rotate(${rot})`}>
          <ellipse
            cx="0"
            cy="0"
            rx={rx}
            ry={ry}
            fill="none"
            stroke="rgba(120,150,255,0.16)"
            strokeWidth="0.75"
          />
          <g style={{ animation: `drift-slow ${dur}s linear infinite`, animationDirection: dir === 1 ? 'normal' : 'reverse', transformOrigin: 'center' }}>
            <circle cx={rx} cy="0" r={2.4 + (i % 2)} fill={i % 2 === 0 ? 'rgba(255,214,160,0.9)' : 'rgba(160,190,255,0.9)'} />
            <circle cx={-rx * 0.6} cy={ry * 0.7} r="1.6" fill="rgba(200,215,255,0.7)" />
          </g>
        </g>
      ))}
    </svg>
  )
}
