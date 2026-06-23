import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./supplier-lead-time-row.module.css"

export interface SupplierLeadTimeRowProps {
  /** Supplier identifier, e.g. "Pacemaker NSW". */
  supplier: string
  /** Coverage tagline, e.g. "Headers · extractors". */
  tagline?: string
  /** Quoted lead time in days. */
  quotedLeadDays: number
  /** Actual median lead time in days. */
  actualLeadDays: number
  /** On-time percent, 0–100. */
  onTimePercent: number
  /** Total deliveries this quarter. */
  deliveries: number
  /** Number of deliveries that arrived late. */
  lateCount: number
}

function leadDeltaTone(delta: number): "green" | "amber" | "red" {
  if (delta <= 0) return "green"
  if (delta <= 3) return "amber"
  return "red"
}

function onTimeTone(percent: number): "red" | "amber" | "green" {
  if (percent < 75) return "red"
  if (percent < 90) return "amber"
  return "green"
}

export function SupplierLeadTimeRow({
  supplier,
  tagline,
  quotedLeadDays,
  actualLeadDays,
  onTimePercent,
  deliveries,
  lateCount,
}: SupplierLeadTimeRowProps) {
  const delta = actualLeadDays - quotedLeadDays
  const deltaSign = delta > 0 ? "+" : delta < 0 ? "−" : ""
  const deltaTone = leadDeltaTone(delta)
  const otTone = onTimeTone(onTimePercent)
  const meterCap = Math.max(quotedLeadDays * 2, actualLeadDays, 1)

  return (
    <article
      className={styles.row}
      role="group"
      aria-label={`Supplier ${supplier} lead time row`}
    >
      <div className={styles.identity}>
        <span className={styles.supplier}>{supplier}</span>
        {tagline ? <span className={styles.tagline}>{tagline}</span> : null}
      </div>

      <div className={styles.leadCol}>
        <div className={styles.leadHead}>
          <span className={styles.leadQuoted}>
            <span className={styles.leadValue}>{quotedLeadDays}</span>
            <span className={styles.leadUnit}>quoted</span>
          </span>
          <span className={styles.divider} aria-hidden="true">
            /
          </span>
          <span className={styles.leadActual}>
            <span className={styles.leadValue}>{actualLeadDays}</span>
            <span className={styles.leadUnit}>actual</span>
          </span>
        </div>
        <ProgressLinear
          value={actualLeadDays}
          max={meterCap}
          tone={deltaTone}
          variant="solid"
          label={`Actual lead time ${actualLeadDays} of ${meterCap} day cap`}
        />
      </div>

      <div className={styles.chipsCol}>
        <Chip
          label={`Δ ${deltaSign}${Math.abs(delta)}d`}
          tone={deltaTone}
        />
        <Chip
          label={`On-time ${onTimePercent}%`}
          tone={otTone}
        />
        <span className={styles.deliveries}>
          {deliveries} deliveries · {lateCount} late
        </span>
      </div>
    </article>
  )
}

export default SupplierLeadTimeRow
