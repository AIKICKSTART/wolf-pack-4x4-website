import * as React from "react"

import styles from "./bar-chart.module.css"

export type BarTone = "red" | "amber" | "teal" | "green"

export interface BarSeries {
  label: string
  values: number[]
  tone: BarTone
}

interface BarChartProps {
  series: BarSeries[]
  xLabels: string[]
  mode?: "grouped" | "stacked"
  height?: number
  ariaLabel: string
  /** Show numeric label above each bar. Defaults to true. */
  valueLabels?: boolean
  unit?: string
}

const TONE_VAR: Record<BarTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

export function BarChart({
  series,
  xLabels,
  mode = "grouped",
  height = 220,
  ariaLabel,
  valueLabels = true,
  unit = "",
}: BarChartProps) {
  const width = 640
  const padding = { top: 24, right: 18, bottom: 32, left: 40 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const sampleCount = Math.min(...series.map((s) => s.values.length), xLabels.length)

  // Compute scale max for chosen mode.
  let maxValue = 0
  if (mode === "stacked") {
    for (let i = 0; i < sampleCount; i += 1) {
      const total = series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0)
      if (total > maxValue) maxValue = total
    }
  } else {
    for (const s of series) {
      const seriesMax = Math.max(...s.values.slice(0, sampleCount))
      if (seriesMax > maxValue) maxValue = seriesMax
    }
  }
  maxValue = Math.max(1, maxValue)

  // Nice rounded max.
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))
  const niceMax = Math.ceil(maxValue / magnitude) * magnitude

  const groupWidth = sampleCount > 0 ? innerW / sampleCount : 0
  const groupPad = groupWidth * 0.18
  const barsPerGroup = mode === "grouped" ? series.length : 1
  const innerGroupW = groupWidth - groupPad * 2
  const barWidth = barsPerGroup > 0 ? innerGroupW / barsPerGroup : innerGroupW

  const gridCount = 4
  const ticks = Array.from({ length: gridCount + 1 }, (_, idx) => {
    const value = (niceMax / gridCount) * idx
    const y = padding.top + innerH - (idx / gridCount) * innerH
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
        <desc>{`${mode === "stacked" ? "Stacked" : "Grouped"} bar chart with ${series.length} series across ${sampleCount} categories.`}</desc>

        {/* Gridlines + y ticks — value 0 renders as a solid baseline anchor. */}
        <g className={styles.grid}>
          {ticks.map((tick, tickIdx) => (
            <g key={tick.y}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={tick.y}
                y2={tick.y}
                className={tickIdx === 0 ? styles.baseline : styles.gridLine}
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

        {/* Bars */}
        <g className={styles.bars}>
          {Array.from({ length: sampleCount }).map((_, groupIdx) => {
            const groupX = padding.left + groupIdx * groupWidth + groupPad
            let stackY = padding.top + innerH

            return (
              <g key={`g-${groupIdx}`} className={styles.barGroup} style={{ animationDelay: `${groupIdx * 60}ms` }}>
                {series.map((s, sIdx) => {
                  const value = s.values[groupIdx] ?? 0
                  const ratio = value / niceMax
                  const barH = ratio * innerH

                  let x: number
                  let y: number
                  if (mode === "grouped") {
                    x = groupX + sIdx * barWidth
                    y = padding.top + innerH - barH
                  } else {
                    x = groupX
                    y = stackY - barH
                    stackY = y
                  }

                  return (
                    <g key={`b-${groupIdx}-${sIdx}`}>
                      <rect
                        x={x + 1}
                        y={y}
                        width={Math.max(0, barWidth - 2)}
                        height={Math.max(0, barH)}
                        rx="2"
                        ry="2"
                        fill={TONE_VAR[s.tone]}
                        className={styles.bar}
                        style={{ color: TONE_VAR[s.tone] }}
                      />
                      {valueLabels && barH > 14 ? (
                        <text
                          x={x + barWidth / 2}
                          y={y - 6}
                          className={styles.valueLabel}
                          textAnchor="middle"
                        >
                          {value.toFixed(0)}
                          {unit}
                        </text>
                      ) : null}
                    </g>
                  )
                })}
              </g>
            )
          })}
        </g>

        {/* X-axis category labels */}
        <g className={styles.xAxis}>
          {xLabels.slice(0, sampleCount).map((label, idx) => (
            <text
              key={label + idx}
              x={padding.left + idx * groupWidth + groupWidth / 2}
              y={padding.top + innerH + 20}
              className={styles.axisLabel}
              textAnchor="middle"
            >
              {label}
            </text>
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
