import Link from "next/link"

import { Chip } from "../primitives/chip"

import styles from "./batch-tracking-row.module.css"
import type { BatchStatus } from "./inventory-deep-types"

export interface BatchTrackingRowProps {
  /** Batch / lot identifier. */
  batchId: string
  /** SKU. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Quantity in this batch. */
  qty: number
  /** Manufacture date as "12 Mar 2026". */
  manufactured: string
  /** Expiry date as "12 Mar 2028". Optional for non-perishable batches. */
  expiry?: string
  /** Lifecycle bucket. */
  status: BatchStatus
  /** Optional href into a traceability detail screen. */
  traceHref?: string
}

const STATUS_LABEL: Record<BatchStatus, string> = {
  "in-stock": "In stock",
  "near-expiry": "Near expiry",
  expired: "Expired",
  quarantine: "Quarantine",
}

const STATUS_TONE: Record<BatchStatus, "green" | "amber" | "red" | "teal"> = {
  "in-stock": "green",
  "near-expiry": "amber",
  expired: "red",
  quarantine: "teal",
}

export function BatchTrackingRow({
  batchId,
  sku,
  title,
  qty,
  manufactured,
  expiry,
  status,
  traceHref,
}: BatchTrackingRowProps) {
  return (
    <article
      className={styles.row}
      role="group"
      aria-label={`Batch ${batchId} of ${sku} ${STATUS_LABEL[status]}`}
    >
      <div className={styles.identity}>
        <span className={styles.batchId}>{batchId}</span>
        <span className={styles.sku}>{sku}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <dl className={styles.dates}>
        <div className={styles.dateCell}>
          <dt>Mfg</dt>
          <dd>{manufactured}</dd>
        </div>
        {expiry ? (
          <div className={styles.dateCell}>
            <dt>Exp</dt>
            <dd>{expiry}</dd>
          </div>
        ) : (
          <div className={styles.dateCell}>
            <dt>Exp</dt>
            <dd className={styles.muted}>n/a</dd>
          </div>
        )}
      </dl>
      <div className={styles.qtyCell}>
        <span className={styles.qty}>{qty}</span>
        <span className={styles.qtyUnit}>units</span>
      </div>
      <div className={styles.metaCell}>
        <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
        {traceHref ? (
          <Link href={traceHref} className={styles.traceLink}>
            Trace <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  )
}

export default BatchTrackingRow
