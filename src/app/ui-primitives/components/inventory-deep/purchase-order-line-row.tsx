"use client"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./purchase-order-line-row.module.css"
import type { PoLineStatus } from "./inventory-deep-types"

export interface PurchaseOrderLineRowProps {
  /** SKU. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Quantity ordered. */
  qtyOrdered: number
  /** Quantity received so far. */
  qtyReceived: number
  /** Unit price excl GST in AUD. */
  unitPrice: number
  /** Lifecycle state. */
  status: PoLineStatus
  /** Optional override label for the action button. */
  receiveLabel?: string
  /** Fires when an operator clicks the receive button. */
  onReceive?: (sku: string) => void
  /** Disable the receive button. */
  receiveDisabled?: boolean
}

const STATUS_LABEL: Record<PoLineStatus, string> = {
  open: "Open",
  partial: "Partial",
  received: "Received",
  "back-ordered": "Back-ordered",
  cancelled: "Cancelled",
}

const STATUS_TONE: Record<
  PoLineStatus,
  "neutral" | "amber" | "green" | "red" | "teal"
> = {
  open: "neutral",
  partial: "amber",
  received: "green",
  "back-ordered": "red",
  cancelled: "neutral",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function PurchaseOrderLineRow({
  sku,
  title,
  qtyOrdered,
  qtyReceived,
  unitPrice,
  status,
  receiveLabel,
  onReceive,
  receiveDisabled = false,
}: PurchaseOrderLineRowProps) {
  const subtotal = qtyOrdered * unitPrice
  const safeOrdered = Math.max(qtyOrdered, 1)
  const fill = Math.max(0, Math.min(qtyReceived, qtyOrdered))
  const tone =
    status === "received"
      ? "green"
      : status === "back-ordered"
        ? "red"
        : status === "partial"
          ? "amber"
          : "teal"

  return (
    <article
      className={styles.row}
      role="group"
      aria-label={`PO line ${sku} ${STATUS_LABEL[status]}`}
    >
      <div className={styles.identity}>
        <span className={styles.sku}>{sku}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <dl className={styles.qty}>
        <div className={styles.qtyCell}>
          <dt>Ordered</dt>
          <dd>{qtyOrdered}</dd>
        </div>
        <div className={styles.qtyCell}>
          <dt>Received</dt>
          <dd className={styles.received}>{qtyReceived}</dd>
        </div>
      </dl>
      <div className={styles.priceCol}>
        <span className={styles.priceLabel}>Unit</span>
        <span className={styles.priceValue}>{formatAud(unitPrice)}</span>
        <span className={styles.subtotalLabel}>Subtotal</span>
        <span className={styles.subtotalValue}>{formatAud(subtotal)}</span>
      </div>
      <div className={styles.statusCol}>
        <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
        <ProgressLinear
          value={fill}
          max={safeOrdered}
          tone={tone}
          variant="solid"
          label={`Receive progress ${fill} of ${safeOrdered}`}
        />
        <button
          type="button"
          className={styles.receiveBtn}
          disabled={receiveDisabled || status === "received" || status === "cancelled"}
          onClick={() => onReceive?.(sku)}
          aria-label={`Receive ${sku}`}
        >
          {receiveLabel ?? "Receive"}
        </button>
      </div>
    </article>
  )
}

export default PurchaseOrderLineRow
