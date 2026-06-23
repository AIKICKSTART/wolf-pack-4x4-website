import Image from "next/image"
import type { ReactNode } from "react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import styles from "./sku-detail-card.module.css"
import type { StockHealth } from "./inventory-types"

export interface SkuDetailCardProps {
  /** Internal SKU code, e.g. "OF-MFR-001". */
  sku: string
  /** Display title — supplier + part. */
  title: string
  /** Supplier label, e.g. "Manta Performance". */
  supplier: string
  /** Optional thumbnail image URL. */
  thumbSrc?: string
  /** Two-character thumbnail fallback. */
  thumbPlaceholder?: string
  /** Current stock-on-hand in units. */
  stockOnHand: number
  /** Average landed cost ex GST, AUD. */
  averageCost: number
  /** Reorder point in units. */
  reorderPoint: number
  /** Supplier lead time in days. */
  leadTimeDays: number
  /** Health bucket, drives the tone chip. */
  health: StockHealth
  /** Optional trailing slot (e.g. quick-edit button). */
  trailing?: ReactNode
}

const HEALTH_LABEL: Record<StockHealth, string> = {
  critical: "Critical",
  low: "Low",
  healthy: "Healthy",
  overstocked: "Overstocked",
}

const HEALTH_TONE: Record<StockHealth, "red" | "amber" | "green" | "teal"> = {
  critical: "red",
  low: "amber",
  healthy: "green",
  overstocked: "teal",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function SkuDetailCard({
  sku,
  title,
  supplier,
  thumbSrc,
  thumbPlaceholder,
  stockOnHand,
  averageCost,
  reorderPoint,
  leadTimeDays,
  health,
  trailing,
}: SkuDetailCardProps) {
  const placeholder = thumbPlaceholder ?? sku.split("-").pop() ?? "SKU"

  return (
    <article className={styles.wrap} aria-label={`${sku} ${title}`}>
      <header className={styles.top}>
        <div className={styles.thumb}>
          {thumbSrc ? (
            <Image src={thumbSrc} alt={title} width={120} height={84} unoptimized />
          ) : (
            <span className={styles.placeholder} aria-hidden="true">
              {placeholder}
            </span>
          )}
          <span className={styles.sku}>{sku}</span>
        </div>
        <div className={styles.identity}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.supplier}>{supplier}</span>
          <div className={styles.chipRow}>
            <Chip
              label={`Lead ${leadTimeDays}d`}
              tone={leadTimeDays > 14 ? "amber" : "teal"}
            />
            <Chip label={HEALTH_LABEL[health]} tone={HEALTH_TONE[health]} />
          </div>
        </div>
        {trailing ? <div className={styles.trail}>{trailing}</div> : null}
      </header>

      <div className={styles.metricRow}>
        <DashboardCard
          label="On hand"
          value={stockOnHand.toString()}
          unit="units"
          surface="neuo"
          meta={`Reorder at ${reorderPoint}`}
        />
        <DashboardCard
          label="Avg cost"
          value={formatAud(averageCost)}
          unit="ex GST"
          surface="glass"
          meta={`Lead ${leadTimeDays}d`}
        />
      </div>
    </article>
  )
}

export default SkuDetailCard
