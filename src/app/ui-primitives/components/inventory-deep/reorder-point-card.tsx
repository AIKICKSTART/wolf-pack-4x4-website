import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./reorder-point-card.module.css"

export interface ReorderPointCardProps {
  /** SKU code, e.g. "MAN-CB-25-FAL". */
  sku: string
  /** Friendly part title. */
  title: string
  /** Supplier label, e.g. "Auto Performance Wholesale". */
  supplier: string
  /** Stock on hand right now. */
  onHand: number
  /** Reorder point in units (when to trigger PO). */
  reorderPoint: number
  /** Economic order quantity in units. */
  eoq: number
  /** Safety stock in units. */
  safetyStock: number
  /** Supplier lead time in days. */
  leadTimeDays: number
  /** Daily demand in units (used to derive days of cover). */
  dailyDemand: number
}

function coverTone(daysOfCover: number, leadDays: number): "red" | "amber" | "green" {
  if (daysOfCover <= leadDays) return "red"
  if (daysOfCover <= leadDays * 1.6) return "amber"
  return "green"
}

export function ReorderPointCard({
  sku,
  title,
  supplier,
  onHand,
  reorderPoint,
  eoq,
  safetyStock,
  leadTimeDays,
  dailyDemand,
}: ReorderPointCardProps) {
  const safeDemand = Math.max(dailyDemand, 0.01)
  const daysOfCover = Math.round(onHand / safeDemand)
  const tone = coverTone(daysOfCover, leadTimeDays)
  const meterCap = Math.max(reorderPoint * 2, onHand, safetyStock * 2, 1)
  const willTrigger = onHand <= reorderPoint

  return (
    <article
      className={styles.wrap}
      aria-label={`Reorder point card for ${sku}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Reorder point</span>
          <h3 className={styles.title}>{sku}</h3>
          <span className={styles.subtitle}>{title}</span>
          <span className={styles.supplier}>{supplier}</span>
        </div>
        <div className={styles.chipRow}>
          <Chip
            label={willTrigger ? "Trigger now" : "On track"}
            tone={willTrigger ? "red" : "green"}
          />
          <Chip label={`Lead ${leadTimeDays}d`} tone={leadTimeDays > 14 ? "amber" : "teal"} />
        </div>
      </header>

      <ProgressLinear
        value={onHand}
        max={meterCap}
        tone={tone}
        variant="segmented"
        segments={12}
        label={`On hand ${onHand} / cap ${meterCap}`}
        showLabel
      />

      <dl className={styles.metrics}>
        <Metric label="On hand" value={onHand.toString()} unit="units" />
        <Metric
          label="Reorder at"
          value={reorderPoint.toString()}
          unit="units"
          accent="amber"
        />
        <Metric label="EOQ" value={eoq.toString()} unit="units" accent="teal" />
        <Metric
          label="Safety"
          value={safetyStock.toString()}
          unit="units"
          accent="green"
        />
        <Metric label="Lead" value={leadTimeDays.toString()} unit="days" />
        <Metric
          label="Cover"
          value={daysOfCover.toString()}
          unit="days"
          accent={tone}
        />
      </dl>
    </article>
  )
}

interface MetricProps {
  label: string
  value: string
  unit: string
  accent?: "teal" | "amber" | "green" | "red"
}

function Metric({ label, value, unit, accent }: MetricProps) {
  const accentClass = accent ? styles[`accent${accent[0].toUpperCase()}${accent.slice(1)}`] : ""
  return (
    <div className={`${styles.metric} ${accentClass}`.trim()}>
      <dt>{label}</dt>
      <dd>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
      </dd>
    </div>
  )
}

export default ReorderPointCard
