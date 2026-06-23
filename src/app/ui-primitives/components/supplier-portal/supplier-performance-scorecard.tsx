import { RadialMeter, type RadialTone } from "../charts/radial-meter"
import { Chip } from "../primitives/chip"

import styles from "./supplier-performance-scorecard.module.css"
import type { SupplierTone } from "./supplier-portal-types"

export interface SupplierPerformanceScorecardProps {
  supplierName: string
  /** Percentage of POs delivered on or before promised date. */
  onTimeDeliveryPct: number
  /** Percentage of POs delivered with the right SKUs + counts. */
  orderAccuracyPct: number
  /** Net variance between quoted lead time and actual, in business days. */
  leadTimeVarianceDays: number
}

function scoreTone(value: number): RadialTone {
  if (value >= 95) return "green"
  if (value >= 85) return "teal"
  if (value >= 70) return "amber"
  return "red"
}

function varianceTone(days: number): SupplierTone {
  if (days <= 0) return "green"
  if (days <= 2) return "teal"
  if (days <= 5) return "amber"
  return "red"
}

function varianceLabel(days: number): string {
  if (days === 0) return "On promise"
  if (days < 0) return `${Math.abs(days)}d early`
  return `${days}d late`
}

export function SupplierPerformanceScorecard({
  supplierName,
  onTimeDeliveryPct,
  orderAccuracyPct,
  leadTimeVarianceDays,
}: SupplierPerformanceScorecardProps) {
  const onTimeTone = scoreTone(onTimeDeliveryPct)
  const accuracyTone = scoreTone(orderAccuracyPct)
  const variance = varianceTone(leadTimeVarianceDays)

  return (
    <section
      className={styles.card}
      role="region"
      aria-label={`${supplierName} performance scorecard`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Performance scorecard</span>
        <h3 className={styles.title}>{supplierName}</h3>
        <Chip
          label={`Lead variance: ${varianceLabel(leadTimeVarianceDays)}`}
          tone={variance}
        />
      </header>

      <div className={styles.metersRow}>
        <div
          role="meter"
          aria-label={`On-time delivery ${onTimeDeliveryPct}%`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={onTimeDeliveryPct}
          className={styles.meterCell}
        >
          <RadialMeter
            value={onTimeDeliveryPct}
            label="On-time"
            tone={onTimeTone}
            ariaLabel="On-time delivery percentage"
            caption="Last 90 days"
          />
        </div>
        <div
          role="meter"
          aria-label={`Order accuracy ${orderAccuracyPct}%`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={orderAccuracyPct}
          className={styles.meterCell}
        >
          <RadialMeter
            value={orderAccuracyPct}
            label="Accuracy"
            tone={accuracyTone}
            ariaLabel="Order accuracy percentage"
            caption="SKU + count match"
          />
        </div>
      </div>
    </section>
  )
}

export default SupplierPerformanceScorecard
