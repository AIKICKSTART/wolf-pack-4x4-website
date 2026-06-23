import { Fragment, type CSSProperties } from "react"

import styles from "./lead-score-matrix.module.css"

export interface LeadScoreAxis {
  id: string
  label: string
  /** Optional helper, e.g. "vehicle = Hilux | Ranger". */
  helper?: string
}

interface LeadScoreMatrixProps {
  /** Y-axis — firmographic / static segment, e.g. vehicle. */
  rows: ReadonlyArray<LeadScoreAxis>
  /** X-axis — behavioural signal, e.g. quote viewed in 7 days. */
  cols: ReadonlyArray<LeadScoreAxis>
  /** Score values. `rows.length` × `cols.length`. */
  scores: ReadonlyArray<ReadonlyArray<number>>
  /** Sales-ready (MQL→SQL) threshold. */
  threshold: number
  /** Caption / title. */
  title?: string
  className?: string
}

function heatClass(score: number): string {
  if (score <= 0) return styles.heat0
  if (score < 25) return styles.heat1
  if (score < 50) return styles.heat2
  if (score < 75) return styles.heat3
  return styles.heat4
}

export function LeadScoreMatrix({
  rows,
  cols,
  scores,
  threshold,
  title = "Lead score matrix",
  className,
}: LeadScoreMatrixProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${title} · sales-ready threshold ${threshold}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Score matrix</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <span className={styles.threshold}>
          MQL → SQL
          <span className={styles.thresholdValue}>{threshold}</span>
        </span>
      </header>

      <div
        className={styles.matrix}
        style={{ "--behaviour-cols": cols.length } as CSSProperties}
        role="grid"
        aria-rowcount={rows.length + 1}
        aria-colcount={cols.length + 1}
      >
        <span role="columnheader" className={styles.colHeader} aria-rowindex={1} aria-colindex={1}>
          Firmographic
        </span>
        {cols.map((col, cIdx) => (
          <span
            key={col.id}
            role="columnheader"
            className={styles.colHeader}
            title={col.helper}
            aria-rowindex={1}
            aria-colindex={cIdx + 2}
          >
            {col.label}
          </span>
        ))}

        {rows.map((row, rIdx) => (
          <Fragment key={row.id}>
            <span
              role="rowheader"
              className={styles.rowHeader}
              aria-rowindex={rIdx + 2}
              aria-colindex={1}
            >
              {row.label}
              {row.helper ? (
                <>
                  <br />
                  <small style={{ color: "var(--primitive-muted)" }}>{row.helper}</small>
                </>
              ) : null}
            </span>
            {cols.map((col, cIdx) => {
              const score = scores[rIdx]?.[cIdx] ?? 0
              const meetsThreshold = score >= threshold
              return (
                <span
                  key={`${row.id}-${col.id}`}
                  role="gridcell"
                  className={[styles.cell, heatClass(score)].join(" ")}
                  aria-label={`${row.label} × ${col.label} score ${score}${meetsThreshold ? ", sales ready" : ""}`}
                  aria-rowindex={rIdx + 2}
                  aria-colindex={cIdx + 2}
                  tabIndex={0}
                >
                  {score}
                </span>
              )
            })}
          </Fragment>
        ))}
      </div>

      <div className={styles.legend} aria-label="Score legend">
        <span className={styles.legendChip}>
          <span className={[styles.legendSwatch, styles.heat1].join(" ")} /> 1–24
        </span>
        <span className={styles.legendChip}>
          <span className={[styles.legendSwatch, styles.heat2].join(" ")} /> 25–49
        </span>
        <span className={styles.legendChip}>
          <span className={[styles.legendSwatch, styles.heat3].join(" ")} /> 50–74
        </span>
        <span className={styles.legendChip}>
          <span className={[styles.legendSwatch, styles.heat4].join(" ")} /> 75+
        </span>
      </div>
    </section>
  )
}

export default LeadScoreMatrix
