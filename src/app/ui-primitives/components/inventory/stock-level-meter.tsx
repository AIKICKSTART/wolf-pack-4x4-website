import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./stock-level-meter.module.css"
import type { StockHealth } from "./inventory-types"

export interface StockLevelMeterProps {
  /** Friendly label for the SKU / location. */
  label: string
  /** Current units on hand. */
  current: number
  /** Bin / shelf capacity ceiling. */
  capacity: number
  /** Reorder point — drives the tone band thresholds. */
  reorderPoint: number
  /** Optional accent kicker, e.g. "OF-MFR-001". */
  kicker?: string
  className?: string
}

function resolveHealth(current: number, capacity: number, reorderPoint: number): StockHealth {
  if (current <= 0) return "critical"
  if (current < reorderPoint) return "critical"
  if (current < reorderPoint * 1.6) return "low"
  if (current > capacity * 0.92) return "overstocked"
  return "healthy"
}

const HEALTH_TONE: Record<StockHealth, "red" | "amber" | "teal" | "green"> = {
  critical: "red",
  low: "amber",
  healthy: "green",
  overstocked: "teal",
}

const HEALTH_LABEL: Record<StockHealth, string> = {
  critical: "Below reorder",
  low: "Near reorder",
  healthy: "Healthy",
  overstocked: "Over capacity",
}

export function StockLevelMeter({
  label,
  current,
  capacity,
  reorderPoint,
  kicker,
  className,
}: StockLevelMeterProps) {
  const safeCapacity = Math.max(capacity, 1)
  const safeCurrent = Math.max(0, Math.min(current, safeCapacity))
  const health = resolveHealth(safeCurrent, safeCapacity, reorderPoint)
  const tone = HEALTH_TONE[health]
  const percent = Math.round((safeCurrent / safeCapacity) * 100)

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  const meterLabel = `${label}: ${safeCurrent} of ${safeCapacity} units, ${HEALTH_LABEL[health]}`

  return (
    <div
      className={classes}
      role="meter"
      aria-label={meterLabel}
      aria-valuemin={0}
      aria-valuemax={safeCapacity}
      aria-valuenow={safeCurrent}
    >
      <div className={styles.head}>
        <div className={styles.identity}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <span className={styles.label}>{label}</span>
        </div>
        <div className={`${styles.tag} ${styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`]}`}>
          {HEALTH_LABEL[health]}
        </div>
      </div>

      <ProgressLinear
        value={safeCurrent}
        max={safeCapacity}
        tone={tone}
        variant="solid"
      />

      <div className={styles.scaleRow}>
        <span>
          <strong>{safeCurrent}</strong> on hand
        </span>
        <span aria-hidden="true">·</span>
        <span>Reorder at {reorderPoint}</span>
        <span aria-hidden="true">·</span>
        <span>{percent}% of {safeCapacity}</span>
      </div>
    </div>
  )
}

export default StockLevelMeter
