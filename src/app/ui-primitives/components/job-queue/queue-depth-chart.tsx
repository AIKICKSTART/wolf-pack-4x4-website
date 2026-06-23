import { AreaChart, type AreaSeries } from "../charts/area-chart"

import { PRIORITY_TONE, type QueuePriority } from "./job-queue-types"
import styles from "./queue-depth-chart.module.css"

export interface QueueDepthSeries {
  /** Priority lane: high / normal / low. */
  priority: QueuePriority
  /** Depth samples — one per timestep. */
  depths: number[]
}

interface QueueDepthChartProps {
  series: ReadonlyArray<QueueDepthSeries>
  xLabels: ReadonlyArray<string>
  /** Total enqueued count across all lanes for the most recent step. */
  currentTotal: number
  height?: number
  className?: string
}

const PRIORITY_LABEL: Record<QueuePriority, string> = {
  high: "High",
  normal: "Normal",
  low: "Low",
}

export function QueueDepthChart({
  series,
  xLabels,
  currentTotal,
  height = 220,
  className,
}: QueueDepthChartProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const areaSeries: AreaSeries[] = series.map((entry) => ({
    label: PRIORITY_LABEL[entry.priority],
    values: entry.depths,
    tone: PRIORITY_TONE[entry.priority],
  }))

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label="Queue depth over time"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Queue depth</span>
        <div className={styles.headline}>
          <h3 className={styles.title}>{currentTotal.toLocaleString()}</h3>
          <span className={styles.suffix}>jobs in flight</span>
        </div>
      </header>
      <AreaChart
        series={areaSeries}
        xLabels={[...xLabels]}
        height={height}
        ariaLabel={`Stacked queue depth across ${series.length} priority lanes`}
      />
    </section>
  )
}

export default QueueDepthChart
