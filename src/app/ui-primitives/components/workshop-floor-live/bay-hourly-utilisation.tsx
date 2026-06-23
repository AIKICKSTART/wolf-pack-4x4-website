import type { CSSProperties } from "react"

import { buildHourLabels } from "../calendar/date-utils"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import styles from "./bay-hourly-utilisation.module.css"

export type UtilisationTone = "idle" | "light" | "moderate" | "high" | "peak"

export interface BayHourlyRow {
  bay: BayId
  /**
   * Per-hour utilisation 0–1. Length must equal the visible hour count.
   */
  hours: ReadonlyArray<number>
}

interface BayHourlyUtilisationProps {
  rows: ReadonlyArray<BayHourlyRow>
  /** First hour of the workshop day, default 7. */
  startHour?: number
  /** Last hour exclusive, default 18. */
  endHour?: number
  className?: string
}

const TONE_VAR: Readonly<Record<UtilisationTone, string>> = {
  idle: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
  light: "color-mix(in oklab, var(--primitive-teal) 22%, transparent)",
  moderate: "color-mix(in oklab, var(--primitive-teal) 46%, transparent)",
  high: "color-mix(in oklab, var(--primitive-amber) 62%, transparent)",
  peak: "color-mix(in oklab, var(--primitive-red) 78%, transparent)",
}

function bucket(value: number): UtilisationTone {
  if (value <= 0.05) return "idle"
  if (value <= 0.3) return "light"
  if (value <= 0.6) return "moderate"
  if (value <= 0.85) return "high"
  return "peak"
}

export function BayHourlyUtilisation({
  rows,
  startHour = 7,
  endHour = 18,
  className,
}: BayHourlyUtilisationProps) {
  const hourCount = endHour - startHour
  const labels = buildHourLabels(startHour, endHour - 1, 24)
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Bay utilisation between ${labels[0]} and ${labels[labels.length - 1]}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Live · today</span>
        <h3 className={styles.title}>Bay-hour utilisation</h3>
      </header>

      <div
        className={styles.grid}
        style={{ "--col-count": hourCount } as CSSProperties}
        role="table"
        aria-label="Per-bay hourly utilisation"
      >
        <div className={styles.corner} aria-hidden="true" />
        {labels.map((label) => (
          <div key={label} className={styles.hour} role="columnheader">
            {label}
          </div>
        ))}

        {rows.map((row) => (
          <div key={row.bay} className={styles.row} role="row">
            <div className={styles.bay} role="rowheader">
              {BAY_LABEL[row.bay]}
            </div>
            {row.hours.slice(0, hourCount).map((value, idx) => {
              const tone = bucket(value)
              return (
                <div
                  key={`${row.bay}-${idx}`}
                  className={styles.cell}
                  role="cell"
                  style={{ background: TONE_VAR[tone] } as CSSProperties}
                  aria-label={`${BAY_LABEL[row.bay]} at ${labels[idx]} — ${Math.round(value * 100)}% utilised`}
                />
              )
            })}
          </div>
        ))}
      </div>

      <ul className={styles.legend} aria-label="Utilisation legend">
        <li>
          <i style={{ background: TONE_VAR.idle } as CSSProperties} /> Idle
        </li>
        <li>
          <i style={{ background: TONE_VAR.light } as CSSProperties} /> Light
        </li>
        <li>
          <i style={{ background: TONE_VAR.moderate } as CSSProperties} /> Moderate
        </li>
        <li>
          <i style={{ background: TONE_VAR.high } as CSSProperties} /> High
        </li>
        <li>
          <i style={{ background: TONE_VAR.peak } as CSSProperties} /> Peak
        </li>
      </ul>
    </section>
  )
}

export default BayHourlyUtilisation
