"use client"

import * as React from "react"

import styles from "./area-chart.module.css"

export type AreaTone = "red" | "amber" | "teal" | "green"

export interface AreaSeries {
  label: string
  values: number[]
  tone: AreaTone
}

interface AreaChartProps {
  series: AreaSeries[]
  xLabels: string[]
  height?: number
  ariaLabel: string
  /** Number of horizontal gridlines (including 0 and max). Defaults to 4. */
  gridlines?: number
  /** Units suffix on y axis ticks. */
  unit?: string
}

const TONE_VAR: Record<AreaTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

function smoothPath(coords: ReadonlyArray<readonly [number, number]>): string {
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

export function AreaChart({
  series,
  xLabels,
  height = 220,
  ariaLabel,
  gridlines = 4,
  unit = "",
}: AreaChartProps) {
  const reactId = React.useId()
  const width = 640

  // Layout — generous bottom + left for ticks.
  const padding = { top: 18, right: 18, bottom: 32, left: 40 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  // Compute stacked totals per x index to derive the y scale.
  const sampleCount = Math.min(...series.map((s) => s.values.length), xLabels.length)
  const stackedTotals = Array.from({ length: sampleCount }, (_, idx) =>
    series.reduce((sum, s) => sum + (s.values[idx] ?? 0), 0)
  )
  const maxValue = Math.max(1, ...stackedTotals)
  const niceMax = Math.ceil(maxValue / Math.pow(10, Math.floor(Math.log10(maxValue)))) * Math.pow(10, Math.floor(Math.log10(maxValue)))

  const stepX = sampleCount > 1 ? innerW / (sampleCount - 1) : 0

  // Build cumulative y per series so we can stack.
  const cumulative = Array.from({ length: sampleCount }, () => 0)
  const seriesGeometry = series.map((s) => {
    const upper = Array.from({ length: sampleCount }, (_, idx) => {
      const next = cumulative[idx] + (s.values[idx] ?? 0)
      const yUpper = padding.top + innerH - (next / niceMax) * innerH
      const yLower = padding.top + innerH - (cumulative[idx] / niceMax) * innerH
      cumulative[idx] = next
      return { x: padding.left + idx * stepX, yUpper, yLower }
    })

    const upperCoords = upper.map<[number, number]>(({ x, yUpper }) => [x, yUpper])
    const lowerCoords = upper
      .map<[number, number]>(({ x, yLower }) => [x, yLower])
      .reverse()

    const linePath = smoothPath(upperCoords)
    const areaPath = `${linePath} L ${upper[upper.length - 1].x.toFixed(2)} ${upper[upper.length - 1].yLower.toFixed(2)}`
      .concat(
        lowerCoords
          .slice(1)
          .map(([x, y]) => ` L ${x.toFixed(2)} ${y.toFixed(2)}`)
          .join("")
      )
      .concat(" Z")

    return { series: s, linePath, areaPath }
  })

  const ticks = Array.from({ length: gridlines + 1 }, (_, idx) => {
    const value = (niceMax / gridlines) * idx
    const y = padding.top + innerH - (idx / gridlines) * innerH
    return { value, y }
  })

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
      >
        <title>{ariaLabel}</title>
        <desc>{`Stacked area chart over ${sampleCount} steps. ${series.length} series.`}</desc>

        <defs>
          {series.map((s, idx) => (
            <linearGradient key={s.label} id={`${reactId}-${idx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={TONE_VAR[s.tone]} stopOpacity="0.5" />
              <stop offset="100%" stopColor={TONE_VAR[s.tone]} stopOpacity="0.04" />
            </linearGradient>
          ))}
        </defs>

        {/* Gridlines + y-axis labels — value 0 renders as a solid baseline anchor. */}
        <g className={styles.grid}>
          {ticks.map((tick, idx) => (
            <g key={tick.y}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={tick.y}
                y2={tick.y}
                className={idx === 0 ? styles.baseline : styles.gridLine}
              />
              <text
                x={padding.left - 10}
                y={tick.y + 4}
                className={styles.axisLabel}
                textAnchor="end"
              >
                {tick.value.toFixed(0)}
                {unit}
              </text>
            </g>
          ))}
        </g>

        {/* X-axis labels */}
        <g className={styles.xAxis}>
          {xLabels.slice(0, sampleCount).map((label, idx) => (
            <text
              key={label + idx}
              x={padding.left + idx * stepX}
              y={padding.top + innerH + 20}
              className={styles.axisLabel}
              textAnchor="middle"
            >
              {label}
            </text>
          ))}
        </g>

        {/* Stacked areas */}
        <g className={styles.areas}>
          {seriesGeometry.map((geom, idx) => (
            <g key={geom.series.label} className={styles.areaGroup} style={{ animationDelay: `${idx * 120}ms` }}>
              <path d={geom.areaPath} fill={`url(#${reactId}-${idx})`} />
              <path
                d={geom.linePath}
                fill="none"
                stroke={TONE_VAR[geom.series.tone]}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
        </g>
      </svg>

      <figcaption className={styles.legend} aria-hidden="true">
        {series.map((s) => (
          <span
            key={s.label}
            className={styles.legendItem}
            style={{ "--swatch": TONE_VAR[s.tone] } as React.CSSProperties}
          >
            <span className={styles.legendSwatch} aria-hidden="true" />
            {s.label}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
