import { MetricBlock } from "../data-display/metric-block"
import type { MetricBlockItem } from "../data-display/metric-block"
import { Sparkline } from "../charts/sparkline"
import type { SparklineTone } from "../charts/sparkline"

import styles from "./real-time-results-card.module.css"

export type ResultsTileKind =
  | "sent"
  | "delivered"
  | "opened"
  | "clicked"
  | "bounced"

export interface ResultsTile {
  kind: ResultsTileKind
  /** Big numeric value. */
  value: string
  /** Unit, e.g. "+12% vs avg". */
  delta?: {
    label: string
    direction: "up" | "down" | "flat"
  }
  /** Sparkline trend samples. */
  trend: ReadonlyArray<number>
}

interface RealTimeResultsCardProps {
  campaignName: string
  tiles: ReadonlyArray<ResultsTile>
  className?: string
}

const KIND_LABEL: Record<ResultsTileKind, string> = {
  sent: "Sent",
  delivered: "Delivered",
  opened: "Opened",
  clicked: "Clicked",
  bounced: "Bounced",
}

const KIND_TONE: Record<ResultsTileKind, SparklineTone> = {
  sent: "teal",
  delivered: "teal",
  opened: "green",
  clicked: "green",
  bounced: "red",
}

export function RealTimeResultsCard({
  campaignName,
  tiles,
  className,
}: RealTimeResultsCardProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  const metrics: ReadonlyArray<MetricBlockItem> = tiles.map((tile) => ({
    id: tile.kind,
    label: KIND_LABEL[tile.kind],
    value: tile.value,
    delta: tile.delta,
  }))

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Live results for ${campaignName}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Live results</span>
        <span className={styles.campaign}>{campaignName}</span>
        <span className={styles.pulse} aria-hidden="true">
          <span className={styles.pulseDot} />
          Streaming
        </span>
      </header>

      <MetricBlock metrics={metrics} className={styles.metrics} />

      <div className={styles.trends}>
        {tiles.map((tile) => (
          <div key={tile.kind} className={styles.trend}>
            <span className={styles.trendLabel}>{KIND_LABEL[tile.kind]}</span>
            <Sparkline
              points={[...tile.trend]}
              tone={KIND_TONE[tile.kind]}
              ariaLabel={`${KIND_LABEL[tile.kind]} trend, ${tile.trend.length} samples`}
              width={140}
              height={36}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RealTimeResultsCard
