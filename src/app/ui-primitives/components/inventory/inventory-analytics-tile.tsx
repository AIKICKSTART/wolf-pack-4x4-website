import { Sparkline } from "../charts/sparkline"
import { MetricBlock } from "../data-display/metric-block"
import type { MetricBlockItem } from "../data-display/metric-block"

import styles from "./inventory-analytics-tile.module.css"

export interface InventoryAnalyticsTileProps {
  /** Warehouse / segment label. */
  scopeLabel: string
  /** Annualised inventory turnover (e.g. 6.4 = 6.4× per year). */
  turnoverRate: number
  /** Days of stock on hand at current burn. */
  daysOfStock: number
  /** Monthly carrying cost in AUD. */
  carryingCost: number
  /** 12-period sparkline of turnover history. */
  turnoverTrend: ReadonlyArray<number>
  /** Optional delta vs prior period (percent, e.g. 4 = +4%). */
  turnoverDeltaPct?: number
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function InventoryAnalyticsTile({
  scopeLabel,
  turnoverRate,
  daysOfStock,
  carryingCost,
  turnoverTrend,
  turnoverDeltaPct,
}: InventoryAnalyticsTileProps) {
  const delta: MetricBlockItem["delta"] | undefined =
    typeof turnoverDeltaPct === "number"
      ? {
          label: `${turnoverDeltaPct > 0 ? "+" : ""}${turnoverDeltaPct.toFixed(1)}%`,
          direction:
            turnoverDeltaPct > 0 ? "up" : turnoverDeltaPct < 0 ? "down" : "flat",
        }
      : undefined

  const metrics: ReadonlyArray<MetricBlockItem> = [
    {
      id: "turnover",
      label: "Turnover",
      value: turnoverRate.toFixed(1),
      unit: "× / yr",
      delta,
    },
    {
      id: "days",
      label: "Days of stock",
      value: daysOfStock.toFixed(0),
      unit: "days",
    },
    {
      id: "carry",
      label: "Carrying cost",
      value: formatAud(carryingCost),
      unit: "p/m",
    },
  ]

  return (
    <article className={styles.wrap} aria-label={`Inventory analytics for ${scopeLabel}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Inventory analytics</span>
        <h3 className={styles.title}>{scopeLabel}</h3>
      </header>
      <MetricBlock metrics={metrics} />
      <div className={styles.sparkSlot} aria-hidden="true">
        <Sparkline
          points={[...turnoverTrend]}
          tone={turnoverDeltaPct && turnoverDeltaPct < 0 ? "red" : "green"}
          width={260}
          height={48}
          ariaLabel={`Turnover trend for ${scopeLabel}`}
        />
      </div>
    </article>
  )
}

export default InventoryAnalyticsTile
