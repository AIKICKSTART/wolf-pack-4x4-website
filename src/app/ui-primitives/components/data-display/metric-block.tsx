import styles from "./metric-block.module.css"

export type MetricDeltaDirection = "up" | "down" | "flat"

export interface MetricBlockItem {
  id: string
  label: string
  value: string
  unit?: string
  delta?: {
    label: string
    direction: MetricDeltaDirection
  }
}

interface MetricBlockProps {
  metrics: ReadonlyArray<MetricBlockItem>
  className?: string
}

const DELTA_CLASS: Record<MetricDeltaDirection, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

const DELTA_GLYPH: Record<MetricDeltaDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
}

export function MetricBlock({ metrics, className }: MetricBlockProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <dl className={classes} role="group" aria-label="Metric summary">
      {metrics.map((metric) => (
        <div key={metric.id} className={styles.metric}>
          <dt className={styles.label}>{metric.label}</dt>
          <dd className={styles.valueRow} style={{ margin: 0 }}>
            <span className={styles.value}>{metric.value}</span>
            {metric.unit && <span className={styles.unit}>{metric.unit}</span>}
            {metric.delta && (
              <span
                className={`${styles.delta} ${DELTA_CLASS[metric.delta.direction]}`}
                aria-label={`Change: ${metric.delta.label}`}
              >
                <span aria-hidden="true">{DELTA_GLYPH[metric.delta.direction]}</span>
                {metric.delta.label}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default MetricBlock
