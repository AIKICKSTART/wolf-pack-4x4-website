import * as React from "react"

import styles from "./heatmap-calendar.module.css"

export type HeatTone = "red" | "amber" | "teal" | "green"

export interface HeatCell {
  /** ISO date string (YYYY-MM-DD). */
  date: string
  value: number
}

interface HeatmapCalendarProps {
  cells: HeatCell[]
  tone?: HeatTone
  ariaLabel: string
  /** Number of weeks (columns). Defaults to 12. */
  weeks?: number
  /** Optional month labels rendered along top. Provide one per week column with empty strings to skip. */
  monthLabels?: string[]
}

const TONE_VAR: Record<HeatTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""]

export function HeatmapCalendar({
  cells,
  tone = "green",
  ariaLabel,
  weeks = 12,
  monthLabels,
}: HeatmapCalendarProps) {
  const cell = 12
  const gap = 3
  const padTop = 18
  const padLeft = 28

  // Compute step buckets so 0 maps to muted track and max maps to full tone.
  const max = cells.reduce((m, c) => (c.value > m ? c.value : m), 0) || 1
  const buckets = 5

  const cellByCol: Record<number, HeatCell[]> = {}
  cells.forEach((c) => {
    const idx = cells.indexOf(c)
    const col = Math.floor(idx / 7)
    if (!cellByCol[col]) cellByCol[col] = []
    cellByCol[col].push(c)
  })

  const width = padLeft + weeks * (cell + gap) + 4
  const height = padTop + 7 * (cell + gap)

  const toneVar = TONE_VAR[tone]

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        style={{ "--heat-tone": toneVar } as React.CSSProperties}
      >
        <title>{ariaLabel}</title>
        <desc>{`Heatmap of ${cells.length} days across ${weeks} weeks. Max value ${max}.`}</desc>

        {/* Month labels */}
        {monthLabels ? (
          <g className={styles.monthLabels}>
            {monthLabels.slice(0, weeks).map((label, idx) => (
              label ? (
                <text
                  key={`m-${idx}`}
                  x={padLeft + idx * (cell + gap)}
                  y={padTop - 6}
                  className={styles.axisLabel}
                >
                  {label}
                </text>
              ) : null
            ))}
          </g>
        ) : null}

        {/* Day-of-week labels */}
        <g className={styles.dayLabels}>
          {DAY_LABELS.map((label, idx) => (
            label ? (
              <text
                key={`d-${idx}`}
                x={padLeft - 6}
                y={padTop + idx * (cell + gap) + cell - 2}
                className={styles.axisLabel}
                textAnchor="end"
              >
                {label}
              </text>
            ) : null
          ))}
        </g>

        {/* Cells */}
        <g className={styles.cells}>
          {cells.slice(0, weeks * 7).map((c, idx) => {
            const col = Math.floor(idx / 7)
            const row = idx % 7
            const ratio = c.value / max
            const bucket = c.value === 0 ? 0 : Math.max(1, Math.ceil(ratio * buckets))
            return (
              <rect
                key={`c-${idx}`}
                x={padLeft + col * (cell + gap)}
                y={padTop + row * (cell + gap)}
                width={cell}
                height={cell}
                rx={2}
                ry={2}
                className={styles.cell}
                data-bucket={bucket}
                style={{ animationDelay: `${idx * 4}ms` }}
              >
                <title>{`${c.date}: ${c.value}`}</title>
              </rect>
            )
          })}
        </g>
      </svg>

      <figcaption className={styles.legend}>
        <span className={styles.legendLabel}>Less</span>
        {[0, 1, 2, 3, 4, 5].map((bucket) => (
          <span
            key={bucket}
            className={styles.legendSwatch}
            data-bucket={bucket}
            aria-hidden="true"
            style={{ "--heat-tone": toneVar } as React.CSSProperties}
          />
        ))}
        <span className={styles.legendLabel}>More</span>
      </figcaption>
    </figure>
  )
}
