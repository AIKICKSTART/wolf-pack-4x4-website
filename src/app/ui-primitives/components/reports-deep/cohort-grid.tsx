"use client"

import { useCallback, useMemo, useState } from "react"

import {
  formatAudCompact,
  formatCount,
  formatPercent,
} from "./reports-deep-types"
import type { CohortMetric, CohortRow } from "./reports-deep-types"
import styles from "./cohort-grid.module.css"

interface CohortDataset {
  readonly metric: CohortMetric
  readonly label: string
  readonly rows: ReadonlyArray<CohortRow>
}

interface CohortGridProps {
  readonly title: string
  readonly periodLabels: ReadonlyArray<string>
  readonly datasets: ReadonlyArray<CohortDataset>
  readonly initialMetric?: CohortMetric
  readonly className?: string
}

function formatCohortValue(value: number, metric: CohortMetric): string {
  switch (metric) {
    case "retention":
      return formatPercent(value)
    case "revenue":
      return formatAudCompact(value)
    case "engagement":
      return value.toFixed(1)
    default:
      return formatCount(value)
  }
}

function intensityFor(value: number, max: number): number {
  if (max <= 0) return 0
  return Math.max(0, Math.min(1, value / max))
}

const METRIC_TONE: Record<CohortMetric, string> = {
  retention: "var(--primitive-teal)",
  revenue: "var(--primitive-amber)",
  engagement: "var(--primitive-green)",
}

export function CohortGrid({
  title,
  periodLabels,
  datasets,
  initialMetric,
  className,
}: CohortGridProps) {
  const [metric, setMetric] = useState<CohortMetric>(
    initialMetric ?? datasets[0]?.metric ?? "retention",
  )

  const active = useMemo(
    () => datasets.find((dataset) => dataset.metric === metric) ?? datasets[0],
    [datasets, metric],
  )

  const maxValue = useMemo(() => {
    if (!active) return 0
    let max = 0
    for (const row of active.rows) {
      for (const value of row.cells) {
        if (value > max) max = value
      }
    }
    return max
  }, [active])

  const handleSelect = useCallback((next: CohortMetric) => () => {
    setMetric(next)
  }, [])

  const classes = [styles.frame, className].filter(Boolean).join(" ")

  if (!active) {
    return null
  }

  return (
    <section className={classes} aria-label={`Cohort grid: ${title}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Cohort · {active.label.toLowerCase()}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.toggle} role="radiogroup" aria-label="Cohort metric">
          {datasets.map((dataset) => (
            <button
              key={dataset.metric}
              type="button"
              role="radio"
              aria-checked={dataset.metric === metric}
              className={`${styles.toggleBtn} ${
                dataset.metric === metric ? styles.toggleBtnActive : ""
              }`.trim()}
              onClick={handleSelect(dataset.metric)}
            >
              {dataset.label}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.scroll}>
        <table className={styles.table} aria-rowcount={active.rows.length + 1}>
          <thead>
            <tr>
              <th scope="col" className={styles.cornerCell}>
                Cohort
              </th>
              <th scope="col" className={styles.sizeCol}>
                Size
              </th>
              {periodLabels.map((label) => (
                <th key={label} scope="col" className={styles.periodCol}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {active.rows.map((row) => (
              <tr key={row.id}>
                <th scope="row" className={styles.rowLabel}>
                  {row.cohortLabel}
                </th>
                <td className={styles.sizeCell}>{formatCount(row.size)}</td>
                {row.cells.map((value, index) => {
                  const intensity = intensityFor(value, maxValue)
                  return (
                    <td
                      key={`${row.id}-${index}`}
                      className={styles.heatCell}
                      style={
                        {
                          "--heat-intensity": intensity.toFixed(3),
                          "--heat-tone": METRIC_TONE[active.metric],
                        } as React.CSSProperties
                      }
                      title={`${row.cohortLabel} · ${periodLabels[index] ?? ""}`}
                    >
                      <span className={styles.heatValue}>
                        {formatCohortValue(value, active.metric)}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CohortGrid
