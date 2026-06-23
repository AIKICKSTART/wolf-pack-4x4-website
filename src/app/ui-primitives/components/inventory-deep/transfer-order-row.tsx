import { Chip } from "../primitives/chip"

import styles from "./transfer-order-row.module.css"
import {
  TRANSFER_TONE,
  type TransferStatus,
  type InventoryTone,
} from "./inventory-deep-types"

export interface TransferOrderRowProps {
  /** Transfer order reference, e.g. "TO-2026-0188". */
  transferRef: string
  /** Source bin / location, e.g. "A3-04". */
  fromBin: string
  /** Destination bin / location, e.g. "C2-01". */
  toBin: string
  /** SKU being transferred. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Units moving in this transfer. */
  qty: number
  /** Transfer lifecycle state. */
  status: TransferStatus
  /** Optional ETA, e.g. "Today 14:30" or "29 May 09:00". */
  eta?: string
  /** Optional signer who closed off receipt. */
  signedBy?: string
}

const STATUS_LABEL: Record<TransferStatus, string> = {
  draft: "Draft",
  "in-transit": "In transit",
  received: "Received",
  signed: "Signed",
  cancelled: "Cancelled",
}

function toChipTone(
  tone: InventoryTone | "neutral",
): "red" | "amber" | "teal" | "green" | "neutral" {
  return tone
}

export function TransferOrderRow({
  transferRef,
  fromBin,
  toBin,
  sku,
  title,
  qty,
  status,
  eta,
  signedBy,
}: TransferOrderRowProps) {
  const tone = TRANSFER_TONE[status]

  return (
    <article
      className={styles.row}
      role="group"
      aria-label={`Transfer ${transferRef} ${sku} ${STATUS_LABEL[status]}`}
    >
      <div className={styles.identity}>
        <span className={styles.ref}>{transferRef}</span>
        <span className={styles.sku}>{sku}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.flow} aria-label={`Move from ${fromBin} to ${toBin}`}>
        <span className={styles.bin}>{fromBin}</span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <span className={`${styles.bin} ${styles.binTo}`}>{toBin}</span>
      </div>
      <div className={styles.qtyCell}>
        <span className={styles.qty}>{qty}</span>
        <span className={styles.qtyUnit}>units</span>
      </div>
      <div className={styles.metaCell}>
        <Chip label={STATUS_LABEL[status]} tone={toChipTone(tone)} />
        {eta ? <span className={styles.eta}>ETA {eta}</span> : null}
        {signedBy ? (
          <span className={styles.signed}>Signed · {signedBy}</span>
        ) : null}
      </div>
    </article>
  )
}

export default TransferOrderRow
