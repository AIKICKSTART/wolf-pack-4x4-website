import { AlertTriangle, RefreshCw } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import styles from "./backorder-notice-card.module.css"
import type { BackorderReason, SupplierTone } from "./supplier-portal-types"

export interface BackorderAlternative {
  sku: string
  title: string
  unitsAvailable: number
}

export interface BackorderNoticeCardProps {
  sku: string
  title: string
  reason: BackorderReason
  /** Expected back-in-stock label, e.g. "Mid June · ETA 14 Jun". */
  expectedRestockLabel: string
  /** Number of workshop customer orders affected. */
  affectedCustomerCount: number
  /** Optional alternative recommendation. */
  alternative?: BackorderAlternative
}

const REASON_LABEL: Record<BackorderReason, string> = {
  "stock-out": "Stock out",
  "freight-delay": "Freight delay",
  "manufacturer-recall": "Recall",
  discontinued: "Discontinued",
  "qc-hold": "QC hold",
}

const REASON_TONE: Record<BackorderReason, SupplierTone> = {
  "stock-out": "amber",
  "freight-delay": "amber",
  "manufacturer-recall": "red",
  discontinued: "red",
  "qc-hold": "amber",
}

export function BackorderNoticeCard({
  sku,
  title,
  reason,
  expectedRestockLabel,
  affectedCustomerCount,
  alternative,
}: BackorderNoticeCardProps) {
  const tone = REASON_TONE[reason]

  return (
    <article
      className={styles.card}
      data-tone={tone}
      role="region"
      aria-label={`Backorder notice for ${sku}`}
    >
      <header className={styles.head}>
        <span className={styles.warnIcon} aria-hidden="true">
          <AlertTriangle size={18} />
        </span>
        <div className={styles.identity}>
          <span className={styles.kicker}>Backorder broadcast</span>
          <h3 className={styles.title}>
            {sku} · {title}
          </h3>
        </div>
        <Chip label={REASON_LABEL[reason]} tone={tone} />
      </header>

      <div className={styles.metricRow}>
        <DashboardCard
          label="Expected restock"
          value={expectedRestockLabel}
          surface="neuo"
          meta="Supplier provided"
        />
        <DashboardCard
          label="Customers affected"
          value={affectedCustomerCount.toString()}
          unit={affectedCustomerCount === 1 ? "workshop order" : "workshop orders"}
          surface="material"
          meta="Across pending POs"
        />
      </div>

      {alternative ? (
        <div className={styles.alternative} aria-label="Alternative SKU">
          <span className={styles.altKicker}>
            <RefreshCw size={12} aria-hidden="true" />
            Alternative ready now
          </span>
          <div className={styles.altBody}>
            <div>
              <strong>{alternative.sku}</strong>
              <span>{alternative.title}</span>
            </div>
            <Chip
              label={`${alternative.unitsAvailable} on hand`}
              tone="green"
            />
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default BackorderNoticeCard
