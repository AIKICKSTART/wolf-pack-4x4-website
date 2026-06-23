"use client"

import * as React from "react"

import styles from "./sparkline.module.css"

export type SparklineTone = "red" | "amber" | "teal" | "green"

interface SparklineProps {
  points: number[]
  tone?: SparklineTone
  area?: boolean
  width?: number
  height?: number
  ariaLabel: string
  /** Optional value to mark with a soft dot. Defaults to the last point. */
  markerIndex?: number
}

const TONE_VAR: Record<SparklineTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

// Build a smooth path with light catmull-rom-ish curvature between samples.
function buildSmoothPath(coords: ReadonlyArray<readonly [number, number]>): string {
  if (coords.length === 0) return ""
  if (coords.length === 1) {
    const [x, y] = coords[0]
    return `M ${x.toFixed(2)} ${y.toFixed(2)}`
  }

  let d = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)}`

  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = coords[i - 1] ?? coords[i]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[i + 2] ?? p2

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }

  return d
}

export function Sparkline({
  points,
  tone = "teal",
  area = true,
  width = 160,
  height = 44,
  ariaLabel,
  markerIndex,
}: SparklineProps) {
  const gradientId = React.useId()

  if (points.length === 0) {
    return null
  }

  const padX = 2
  const padY = 4
  const innerW = width - padX * 2
  const innerH = height - padY * 2

  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = points.length > 1 ? innerW / (points.length - 1) : 0

  const coords = points.map<[number, number]>((value, index) => {
    const x = padX + index * step
    const yRatio = (value - min) / range
    const y = padY + (1 - yRatio) * innerH
    return [x, y]
  })

  const pathD = buildSmoothPath(coords)
  const lastIndex = markerIndex ?? coords.length - 1
  const marker = coords[lastIndex] ?? coords[coords.length - 1]
  const baselineY = padY + innerH
  const areaD = `${pathD} L ${coords[coords.length - 1][0].toFixed(2)} ${baselineY.toFixed(2)} L ${coords[0][0].toFixed(2)} ${baselineY.toFixed(2)} Z`
  const toneVar = TONE_VAR[tone]

  return (
    <svg
      className={styles.sparkline}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="none"
      style={{ "--spark-tone": toneVar } as React.CSSProperties}
    >
      <title>{ariaLabel}</title>
      <desc>{`Trend over ${points.length} samples ranging from ${min.toFixed(1)} to ${max.toFixed(1)}.`}</desc>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={toneVar} stopOpacity="0.32" />
          <stop offset="100%" stopColor={toneVar} stopOpacity="0" />
        </linearGradient>
      </defs>
      {area ? <path d={areaD} fill={`url(#${gradientId})`} /> : null}
      <path d={pathD} className={styles.line} fill="none" stroke={toneVar} />
      {marker ? (
        <g className={styles.markerGroup}>
          <circle cx={marker[0]} cy={marker[1]} r={3.5} className={styles.markerHalo} fill={toneVar} />
          <circle cx={marker[0]} cy={marker[1]} r={1.8} className={styles.markerCore} />
        </g>
      ) : null}
    </svg>
  )
}
