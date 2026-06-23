import type { CSSProperties } from "react"

import styles from "./social-scheduler.module.css"
import type { BestTimeCell } from "./social-scheduler-types"

interface BestTimeHeatmapProps {
  title?: string
  cells: ReadonlyArray<BestTimeCell>
  /** Day labels — defaults to Mon..Sun. */
  dayLabels?: ReadonlyArray<string>
  /** Hour stride for labels — defaults to every 4 hours. */
  hourStride?: number
}

const DEFAULT_DAYS: ReadonlyArray<string> = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
]

export function BestTimeHeatmap({
  title = "Best time to post",
  cells,
  dayLabels = DEFAULT_DAYS,
  hourStride = 4,
}: BestTimeHeatmapProps) {
  const peak = cells.reduce<BestTimeCell | null>(
    (best, cell) => (best && best.score > cell.score ? best : cell),
    null,
  )

  const peakLabel = peak
    ? `${dayLabels[peak.day] ?? `Day ${peak.day}`} ${String(peak.hour).padStart(2, "0")}:00`
    : "—"

  return (
    <section
      className={`${styles.frame} ${styles.heatmap}`}
      aria-label={`${title}, peak at ${peakLabel}`}
    >
      <header className={styles.heatmapHead}>
        <h2 className={styles.heatmapTitle}>{title}</h2>
        <span className={styles.composerEyebrow}>
          Peak window · {peakLabel} ({peak ? Math.round(peak.score * 100) : 0}%)
        </span>
      </header>

      <div
        className={styles.heatmapGrid}
        role="img"
        aria-label="Engagement intensity by day and hour"
      >
        {dayLabels.map((label, dayIdx) => {
          const dayCells = Array.from({ length: 24 }, (_, hour) => {
            const cell = cells.find((c) => c.day === dayIdx && c.hour === hour)
            const score = cell ? Math.min(1, Math.max(0, cell.score)) : 0
            return { score, hour }
          })
          return (
            <span key={`row-${label}`} style={{ display: "contents" }}>
              <span className={styles.heatmapDayLabel}>{label}</span>
              {dayCells.map(({ score, hour }) => {
                const isStrong = peak && peak.day === dayIdx && peak.hour === hour ? 1 : 0
                return (
                  <span
                    key={`${label}-${hour}`}
                    className={styles.heatmapCell}
                    data-strong={isStrong}
                    aria-label={`${label} ${String(hour).padStart(2, "0")}:00 — ${Math.round(score * 100)}%`}
                    style={{ "--score": score } as CSSProperties}
                  />
                )
              })}
            </span>
          )
        })}

        <span className={styles.heatmapHourRow} aria-hidden="true">
          <span />
          {Array.from({ length: 24 }, (_, hour) => (
            <span key={hour} className={styles.heatmapHourLabel}>
              {hour % hourStride === 0 ? `${String(hour).padStart(2, "0")}` : ""}
            </span>
          ))}
        </span>
      </div>

      <span className={styles.heatmapLegend} aria-hidden="true">
        Cold
        <span className={styles.heatmapLegendBar} />
        Hot
      </span>
    </section>
  )
}

export default BestTimeHeatmap
