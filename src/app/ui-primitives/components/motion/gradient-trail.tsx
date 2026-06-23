"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"

import { durations } from "./motion-tokens"
import styles from "./gradient-trail.module.css"

export interface GradientTrailProps {
  /** SVG path commands (the `d` attribute). */
  d: string
  /** SVG viewBox — defaults to a 200x40 strip. */
  viewBox?: string
  /** Stops for the trail gradient, in order. */
  stops?: ReadonlyArray<{ offset: string; color: string }>
  /** Stroke thickness in user units. */
  thickness?: number
  /** Cycle duration in ms. */
  durationMs?: number
  /** Optional resting-track stroke colour. */
  trackColor?: string
  className?: string
}

const DEFAULT_STOPS: ReadonlyArray<{ offset: string; color: string }> = [
  { offset: "0%", color: "var(--primitive-red)" },
  { offset: "50%", color: "var(--primitive-amber)" },
  { offset: "100%", color: "var(--primitive-teal)" },
]

/**
 * Animated gradient stroke that traces along an SVG path. The path is
 * passed in via the `d` prop so consumers can describe any shape — a line,
 * an arc, a closed loop, an icon outline.
 */
export function GradientTrail({
  d,
  viewBox = "0 0 200 40",
  stops = DEFAULT_STOPS,
  thickness = 2,
  durationMs = durations.hero * 3,
  trackColor,
  className,
}: GradientTrailProps) {
  const gradientId = useId().replace(/[:]/g, "")
  const pathRef = useRef<SVGPathElement | null>(null)
  const [length, setLength] = useState<number>(0)

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength())
    }
  }, [d])

  const cssVars: CSSProperties = {
    "--gradient-trail-length": String(length || 200),
    "--gradient-trail-thickness": String(thickness),
    "--gradient-trail-duration": `${durationMs}ms`,
    // When no explicit track colour is supplied, leave the var unset so the
    // stylesheet falls back to the shared `--primitive-line-muted` token.
    ...(trackColor ? { "--gradient-trail-track": trackColor } : {}),
  } as CSSProperties

  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <svg
      className={classes}
      viewBox={viewBox}
      preserveAspectRatio="none"
      style={cssVars}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          {stops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <path className={styles.track} d={d} />
      <path
        ref={pathRef}
        className={styles.trail}
        d={d}
        stroke={`url(#${gradientId})`}
      />
    </svg>
  )
}

export default GradientTrail
