"use client"

import type { ReactNode } from "react"

import styles from "./three-fallback.module.css"

export type ThreeFallbackVariant =
  | "exhaust-pipe"
  | "vehicle"
  | "logo"
  | "sparks"
  | "dyno"
  | "grid"
  | "wireframe"
  | "gauges"
  | "holo-card"
  | "card-stack"

export interface ThreeFallbackProps {
  /** Determines which approximation illustration to show. */
  variant: ThreeFallbackVariant
  /** Optional copy under the loading label. */
  copy?: string
}

const VARIANT_COPY: Record<ThreeFallbackVariant, string> = {
  "exhaust-pipe": "Routing header → muffler → tip…",
  vehicle: "Loading low-poly chassis…",
  logo: "Extruding wordmark…",
  sparks: "Lighting MIG arc…",
  dyno: "Plotting torque × boost × rpm…",
  grid: "Floating part categories into place…",
  wireframe: "Calibrating scan beam…",
  gauges: "Spinning needles to idle…",
  "holo-card": "Compositing scanline shader…",
  "card-stack": "Stacking quote cards…",
}

function Illustration({ variant }: { variant: ThreeFallbackVariant }): ReactNode {
  switch (variant) {
    case "exhaust-pipe":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 64 Q40 36 78 50 T 158 60 Q190 64 220 38" strokeLinecap="round" />
          <ellipse cx="222" cy="38" rx="8" ry="6" />
          <rect x="86" y="44" width="56" height="24" rx="6" />
        </svg>
      )
    case "vehicle":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 84 L48 56 L120 50 L168 56 L216 84 Z" strokeLinejoin="round" />
          <line x1="16" y1="84" x2="216" y2="84" />
          <circle cx="62" cy="92" r="10" />
          <circle cx="178" cy="92" r="10" />
        </svg>
      )
    case "logo":
      return (
        <svg viewBox="0 0 240 120" className={styles.illustration} aria-hidden="true" fill="currentColor">
          <text
            x="120"
            y="78"
            textAnchor="middle"
            fontFamily="var(--primitive-font-display)"
            fontSize="48"
          >
            OFM
          </text>
        </svg>
      )
    case "sparks":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="120" cy="104" r="4" />
          <path d="M120 100 L96 60 M120 100 L132 56 M120 100 L150 70 M120 100 L92 78" strokeLinecap="round" />
        </svg>
      )
    case "dyno":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="32" y1="96" x2="216" y2="96" />
          <line x1="32" y1="96" x2="32" y2="16" />
          <path d="M32 88 Q72 60 116 48 T 216 24" strokeLinecap="round" />
        </svg>
      )
    case "grid":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={48 + col * 56}
                y={20 + row * 28}
                width="32"
                height="20"
                rx="4"
              />
            ))
          )}
        </svg>
      )
    case "wireframe":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 84 L52 56 L120 50 L172 56 L220 84 Z" />
          <line x1="52" y1="56" x2="52" y2="84" />
          <line x1="172" y1="56" x2="172" y2="84" />
          <line x1="120" y1="50" x2="120" y2="84" />
          <line x1="20" y1="68" x2="220" y2="68" strokeDasharray="2 4" />
        </svg>
      )
    case "gauges":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {[48, 120, 192].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="60" r="28" />
              <line x1={cx} y1="60" x2={cx + 18} y2="48" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      )
    case "holo-card":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="64" y="20" width="112" height="80" rx="6" />
          <line x1="64" y1="40" x2="176" y2="40" />
          <line x1="64" y1="60" x2="176" y2="60" strokeDasharray="3 3" />
          <line x1="64" y1="80" x2="176" y2="80" />
        </svg>
      )
    case "card-stack":
      return (
        <svg
          viewBox="0 0 240 120"
          className={styles.illustration}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="56" y="32" width="128" height="56" rx="6" opacity="0.45" />
          <rect x="64" y="40" width="128" height="56" rx="6" opacity="0.7" />
          <rect x="72" y="48" width="128" height="56" rx="6" />
        </svg>
      )
    default:
      return null
  }
}

/**
 * Polished SVG approximation of a Three.js scene. Rendered through React
 * Suspense while the canvas mounts. Includes a subtle shimmer to indicate
 * loading. Respects `prefers-reduced-motion`.
 */
export function ThreeFallback({ variant, copy }: ThreeFallbackProps) {
  return (
    <div className={styles.fallback} role="status" aria-live="polite">
      <span className={styles.shimmer} aria-hidden="true" />
      <div className={styles.body}>
        <Illustration variant={variant} />
        <span className={styles.label}>Loading scene</span>
        <p className={styles.copy}>{copy ?? VARIANT_COPY[variant]}</p>
      </div>
    </div>
  )
}

export default ThreeFallback
