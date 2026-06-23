import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import styles from "./cohort-retention-grid.module.css"

export interface CohortRow {
  /** Cohort label e.g. "Jan 2026". */
  cohort: string
  /** Customers that joined in this cohort. */
  cohortSize: number
  /** Retention percentage per "months since signup". 100 at index 0. */
  retention: ReadonlyArray<number>
}

interface CohortRetentionGridProps {
  rows: ReadonlyArray<CohortRow>
  /** Header labels for "Month N since signup". */
  columnLabels: ReadonlyArray<string>
  ariaLabel: string
  className?: string
}

function bucketForRetention(value: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (value <= 0) return 0
  if (value < 25) return 1
  if (value < 50) return 2
  if (value < 70) return 3
  if (value < 85) return 4
  return 5
}

function toneForRetention(value: number): "red" | "amber" | "teal" | "green" {
  if (value < 25) return "red"
  if (value < 55) return "amber"
  if (value < 80) return "teal"
  return "green"
}

export function CohortRetentionGrid({
  rows,
  columnLabels,
  ariaLabel,
  className,
}: CohortRetentionGridProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  // Pre-compute "average M3 retention" headline.
  const m3values = rows
    .map((r) => r.retention[3])
    .filter((v): v is number => typeof v === "number")
  const m3Avg = m3values.length
    ? Math.round(m3values.reduce((s, v) => s + v, 0) / m3values.length)
    : null

  return (
    <section className={classes} aria-label={ariaLabel}>
      <header className={styles.head}>
        <span className={styles.kicker}>Cohort retention</span>
        <h3 className={styles.title}>Monthly cohorts</h3>
        {m3Avg !== null ? (
          <Chip
            label={`M3 avg · ${m3Avg}%`}
            tone={toneForRetention(m3Avg) === "red" ? "red" : toneForRetention(m3Avg) === "amber" ? "amber" : toneForRetention(m3Avg) === "teal" ? "teal" : "green"}
          />
        ) : null}
      </header>

      <div className={styles.scroll}>
        <table className={styles.table} aria-label="Cohort retention grid">
          <thead>
            <tr>
              <th scope="col" className={styles.colHead}>Cohort</th>
              <th scope="col" className={styles.colHead}>Size</th>
              {columnLabels.map((label) => (
                <th key={label} scope="col" className={styles.colHead}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.cohort}>
                <th scope="row" className={styles.rowHead}>{row.cohort}</th>
                <td className={styles.size}>{row.cohortSize}</td>
                {columnLabels.map((_, idx) => {
                  const value = row.retention[idx]
                  if (typeof value !== "number") {
                    return <td key={idx} className={styles.cellEmpty} aria-label="No data">—</td>
                  }
                  const bucket = bucketForRetention(value)
                  const tone = toneForRetention(value)
                  return (
                    <td
                      key={idx}
                      className={styles.cell}
                      data-bucket={bucket}
                      data-tone={tone}
                      style={{ "--cell-tone": `var(--primitive-${tone})` } as CSSProperties}
                      aria-label={`${row.cohort} retention at ${columnLabels[idx]}: ${value}%`}
                    >
                      <span className={styles.cellValue}>{value}</span>
                      <span className={styles.cellUnit}>%</span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.legend} aria-hidden="true">
        <span className={styles.legendLabel}>Less retention</span>
        {[1, 2, 3, 4, 5].map((bucket) => (
          <span key={bucket} className={styles.legendCell} data-bucket={bucket} />
        ))}
        <span className={styles.legendLabel}>More retention</span>
      </footer>
    </section>
  )
}

export default CohortRetentionGrid
