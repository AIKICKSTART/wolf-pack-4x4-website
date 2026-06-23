import Link from "next/link"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import styles from "./supplier-link-card.module.css"

export interface SupplierLinkCardProps {
  /** Supplier brand name, e.g. "Manta Performance". */
  supplier: string
  /** Tagline / coverage area, e.g. "Sydney metro". */
  tagline?: string
  /** Date of most recent PO, formatted ("28 May 2026"). */
  lastPoDate: string
  /** Lead time in days. */
  leadTimeDays: number
  /** On-time delivery percent, 0-100. */
  onTimePercent: number
  /** Outstanding PO count. */
  outstandingPoCount: number
  /** Optional href for the open-supplier CTA. */
  href?: string
}

function onTimeTone(percent: number): "red" | "amber" | "green" {
  if (percent < 70) return "red"
  if (percent < 90) return "amber"
  return "green"
}

function leadTimeTone(days: number): "teal" | "amber" {
  return days > 14 ? "amber" : "teal"
}

export function SupplierLinkCard({
  supplier,
  tagline,
  lastPoDate,
  leadTimeDays,
  onTimePercent,
  outstandingPoCount,
  href,
}: SupplierLinkCardProps) {
  return (
    <article className={styles.wrap} aria-label={`${supplier} supplier link card`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Supplier</span>
          <h3 className={styles.name}>{supplier}</h3>
          {tagline ? <span className={styles.tagline}>{tagline}</span> : null}
        </div>
        <div className={styles.chips}>
          <Chip label={`Lead ${leadTimeDays}d`} tone={leadTimeTone(leadTimeDays)} />
          <Chip
            label={`On-time ${onTimePercent}%`}
            tone={onTimeTone(onTimePercent)}
          />
        </div>
      </header>

      <DashboardCard
        label="Last PO"
        value={lastPoDate}
        unit=""
        surface="glass"
        meta={`${outstandingPoCount} open`}
        footer={
          href
            ? { label: "Open supplier", href }
            : undefined
        }
      />

      {href ? (
        <Link href={href} className={styles.openLink}>
          View supplier history <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  )
}

export default SupplierLinkCard
