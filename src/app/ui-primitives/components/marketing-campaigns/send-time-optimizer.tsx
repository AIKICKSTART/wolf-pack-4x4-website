"use client"

import { Clock4 } from "lucide-react"
import { useState } from "react"

import { HeatmapCalendar } from "../charts/heatmap-calendar"
import type { HeatCell } from "../charts/heatmap-calendar"
import { Chip } from "../primitives/chip"

import styles from "./send-time-optimizer.module.css"

export interface SendTimeRecommendation {
  /** Window label, e.g. "Tue · 6pm-8pm". */
  label: string
  /** Estimated lift vs average. */
  lift: string
}

interface SendTimeOptimizerProps {
  /** 7-day x 24-hr open-rate samples (heatmap-calendar accepts 12-week, we use a 7×12 = 84 sample slice). */
  cells: ReadonlyArray<HeatCell>
  recommended: SendTimeRecommendation
  /** Available override hours (HH:00). */
  hours?: ReadonlyArray<string>
  defaultOverride?: string
  className?: string
}

const DEFAULT_HOURS: ReadonlyArray<string> = [
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "19:00",
  "20:00",
]

export function SendTimeOptimizer({
  cells,
  recommended,
  hours = DEFAULT_HOURS,
  defaultOverride,
  className,
}: SendTimeOptimizerProps) {
  const [override, setOverride] = useState<string | null>(defaultOverride ?? null)
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Send time optimizer"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Clock4 size={13} strokeWidth={2.4} aria-hidden="true" />
          Send-time optimizer
        </span>
        <Chip
          label={`Recommended · ${recommended.label}`}
          tone="green"
          selected
        />
      </header>

      <div className={styles.heatmapWrap}>
        <HeatmapCalendar
          cells={[...cells]}
          tone="green"
          ariaLabel="Historical open rate by hour of week"
          weeks={12}
        />
      </div>

      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Open-rate lift</span>
        <strong className={styles.summaryValue}>{recommended.lift}</strong>
      </div>

      <div className={styles.overrideRow}>
        <span className={styles.fieldLabel}>Override hour</span>
        <div className={styles.hours}>
          {hours.map((hour) => (
            <Chip
              key={hour}
              label={hour}
              tone={hour === override ? "teal" : "neutral"}
              selected={hour === override}
              onSelect={() =>
                setOverride((prev) => (prev === hour ? null : hour))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SendTimeOptimizer
