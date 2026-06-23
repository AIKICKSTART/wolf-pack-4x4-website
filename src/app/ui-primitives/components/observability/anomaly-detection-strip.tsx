import { GlassSurface } from "../surfaces/glass-surface"
import { Sparkline } from "../charts/sparkline"
import type { SparklineTone } from "../charts/sparkline"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { StatusTone } from "../status-page/status-types"

import {
  ANOMALY_KIND_LABEL,
  ANOMALY_KIND_TONE,
  type AnomalyKind,
} from "./observability-types"
import styles from "./anomaly-detection-strip.module.css"

export interface AnomalyAnnotation {
  /** Index in `points` where the anomaly occurred. */
  index: number
  kind: AnomalyKind
  /** Short caption shown on hover and below the strip. */
  caption: string
}

export interface AnomalyDetectionStripProps {
  metricLabel: string
  service: string
  /** Time-series points. */
  points: ReadonlyArray<number>
  /** Annotated anomalies. */
  anomalies: ReadonlyArray<AnomalyAnnotation>
  /** Optional baseline label, e.g. "Forecast band p5-p95". */
  baselineLabel?: string
  /** Pre-formatted x-axis range, e.g. "Last 6 hours". */
  rangeLabel?: string
  className?: string
}

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const SPARK_TONE: SparklineTone = "teal"

export function AnomalyDetectionStrip({
  metricLabel,
  service,
  points,
  anomalies,
  baselineLabel = "Forecast band",
  rangeLabel,
  className,
}: AnomalyDetectionStripProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const width = 480
  const height = 96
  const padX = 12
  const padY = 14
  const innerW = width - padX * 2
  const innerH = height - padY * 2
  const min = points.length > 0 ? Math.min(...points) : 0
  const max = points.length > 0 ? Math.max(...points) : 1
  const range = max - min || 1
  const stepX = points.length > 1 ? innerW / (points.length - 1) : 0

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <section
        role="region"
        aria-label={`Anomaly strip for ${metricLabel}`}
        className={styles.inner}
      >
        <header className={styles.head}>
          <div className={styles.identity}>
            <h3 className={styles.title}>{metricLabel}</h3>
            <span className={styles.service}>{service}</span>
          </div>
          <div className={styles.meta}>
            {rangeLabel ? <span className={styles.range}>{rangeLabel}</span> : null}
            <span className={styles.count}>{anomalies.length} anomalies</span>
          </div>
        </header>

        <div className={styles.strip}>
          <Sparkline
            points={[...points]}
            tone={SPARK_TONE}
            area
            width={width}
            height={height}
            ariaLabel={`${metricLabel} time series with ${anomalies.length} anomalies`}
          />
          <svg
            className={styles.overlay}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {anomalies.map((annotation, idx) => {
              if (annotation.index < 0 || annotation.index >= points.length) return null
              const value = points[annotation.index]
              const x = padX + annotation.index * stepX
              const y = padY + (1 - (value - min) / range) * innerH
              const tone: StatusTone = ANOMALY_KIND_TONE[annotation.kind]
              return (
                <g key={`anom-${idx}`} className={[styles.annot, styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`]].join(" ")}>
                  <line x1={x} y1={padY} x2={x} y2={height - padY} className={styles.annotLine} />
                  <circle cx={x} cy={y} r={5} className={styles.annotHalo} />
                  <circle cx={x} cy={y} r={2.4} className={styles.annotDot} />
                </g>
              )
            })}
          </svg>
        </div>

        <ul className={styles.list}>
          {anomalies.map((annotation, idx) => {
            const tone: StatusTone = ANOMALY_KIND_TONE[annotation.kind]
            return (
              <li key={`row-${idx}`} className={styles.row}>
                <Chip
                  label={ANOMALY_KIND_LABEL[annotation.kind]}
                  tone={TONE_CHIP[tone]}
                />
                <span className={styles.rowCaption}>{annotation.caption}</span>
                <span className={styles.rowIndex}>t-{points.length - annotation.index}</span>
              </li>
            )
          })}
          {anomalies.length === 0 ? (
            <li className={styles.empty}>{baselineLabel} clear · no anomalies detected.</li>
          ) : null}
        </ul>
      </section>
    </GlassSurface>
  )
}

export default AnomalyDetectionStrip
