import type { CSSProperties } from "react"

import { MaterialSurface } from "../surfaces/material-surface"

import styles from "./correlation-matrix.module.css"

export interface CorrelationMatrixProps {
  /** Metric labels for the matrix axes. */
  metrics: ReadonlyArray<string>
  /** Square matrix of Pearson-style coefficients in [-1, 1]. */
  values: ReadonlyArray<ReadonlyArray<number>>
  caption?: string
  className?: string
}

const TONE_ABOVE = "var(--primitive-teal)"
const TONE_BELOW = "var(--primitive-red)"
const TONE_NEUTRAL = "color-mix(in oklab, var(--primitive-text-strong) 16%, transparent)"

function cellBackground(value: number): string {
  const clamped = Math.max(-1, Math.min(1, value))
  const abs = Math.abs(clamped)
  if (abs < 0.05) return TONE_NEUTRAL
  const colorVar = clamped >= 0 ? TONE_ABOVE : TONE_BELOW
  const opacity = 0.08 + abs * 0.62
  return `color-mix(in srgb, ${colorVar} ${(opacity * 100).toFixed(0)}%, transparent)`
}

function cellTextColor(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 0.6) return "var(--primitive-text-strong)"
  return "var(--primitive-body)"
}

export function CorrelationMatrix({
  metrics,
  values,
  caption,
  className,
}: CorrelationMatrixProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <MaterialSurface elevation={2} className={classes}>
      <section
        role="region"
        aria-label={caption ?? "Correlation matrix"}
        className={styles.inner}
      >
        {caption ? <header className={styles.caption}>{caption}</header> : null}
        <div className={styles.table} role="table" aria-label="Correlation coefficients between metrics">
          <div className={styles.row} role="row">
            <div className={styles.corner} role="columnheader" aria-label="Metric" />
            {metrics.map((m) => (
              <div key={`col-${m}`} className={styles.colHead} role="columnheader" title={m}>
                {m}
              </div>
            ))}
          </div>
          {metrics.map((rowMetric, rIndex) => (
            <div key={`row-${rowMetric}`} className={styles.row} role="row">
              <div className={styles.rowHead} role="rowheader" title={rowMetric}>
                {rowMetric}
              </div>
              {metrics.map((colMetric, cIndex) => {
                const value = values[rIndex]?.[cIndex] ?? 0
                const cellStyle: CSSProperties = {
                  background: cellBackground(value),
                  color: cellTextColor(value),
                }
                return (
                  <div
                    key={`cell-${rIndex}-${cIndex}`}
                    className={styles.cell}
                    role="cell"
                    style={cellStyle}
                    aria-label={`${rowMetric} vs ${colMetric}: ${value.toFixed(2)}`}
                  >
                    {value.toFixed(2)}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <footer className={styles.legend} aria-hidden="true">
          <span className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: TONE_BELOW }} />
            -1.0
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: TONE_NEUTRAL }} />
            0.0
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ background: TONE_ABOVE }} />
            +1.0
          </span>
        </footer>
      </section>
    </MaterialSurface>
  )
}

export default CorrelationMatrix
