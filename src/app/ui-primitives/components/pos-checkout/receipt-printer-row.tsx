"use client"

import type { ReceiptQueueItem, ReceiptStatus } from "./pos-checkout-types"
import styles from "./receipt-printer-row.module.css"

interface ReceiptPrinterRowProps extends ReceiptQueueItem {
  /** Fires when the operator triggers a reprint. */
  onReprint?: (id: string) => void
}

const STATUS_LABEL: Record<ReceiptStatus, string> = {
  queued: "Queued",
  printing: "Printing",
  printed: "Printed",
  failed: "Failed",
}

const STATUS_CLASS: Record<ReceiptStatus, string> = {
  queued: styles.dotQueued,
  printing: styles.dotPrinting,
  printed: styles.dotPrinted,
  failed: styles.dotFailed,
}

const KIND_LABEL: Record<ReceiptQueueItem["kind"], string> = {
  sale: "Sale",
  refund: "Refund",
  void: "Void",
  "tax-invoice": "Tax invoice",
  duplicate: "Duplicate",
}

const KIND_GLYPH: Record<ReceiptQueueItem["kind"], string> = {
  sale: "$",
  refund: "↺",
  void: "✗",
  "tax-invoice": "TI",
  duplicate: "II",
}

export function ReceiptPrinterRow({
  id,
  receiptNumber,
  kind,
  operator,
  enqueuedLabel,
  status,
  onReprint,
}: ReceiptPrinterRowProps) {
  const canReprint = status === "printed" || status === "failed"

  return (
    <article
      className={styles.row}
      role="listitem"
      aria-label={`Receipt ${receiptNumber} · ${STATUS_LABEL[status]}`}
    >
      <span className={styles.glyph} aria-hidden="true">
        {KIND_GLYPH[kind]}
      </span>
      <div className={styles.body}>
        <h3 className={styles.receiptNumber}>{receiptNumber}</h3>
        <span className={styles.meta}>
          {KIND_LABEL[kind]} · {operator} · {enqueuedLabel}
        </span>
      </div>
      <span className={`${styles.status} ${STATUS_CLASS[status]}`} aria-live="polite">
        <span className={styles.dot} aria-hidden="true" />
        {STATUS_LABEL[status]}
      </span>
      <button
        type="button"
        className={styles.reprint}
        onClick={() => onReprint?.(id)}
        disabled={!canReprint}
        aria-label={`Reprint receipt ${receiptNumber}`}
      >
        Reprint
      </button>
    </article>
  )
}

export default ReceiptPrinterRow
