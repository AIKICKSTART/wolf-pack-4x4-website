"use client"

import { Chip } from "../primitives/chip"

import styles from "./obsolete-stock-card.module.css"
import type { ObsoleteAction } from "./inventory-deep-types"

export interface ObsoleteStockCardProps {
  /** SKU code, e.g. "MAN-CB-25-FAL". */
  sku: string
  /** Friendly part title. */
  title: string
  /** Reason the SKU is considered obsolete. */
  reason: string
  /** Quantity in stock. */
  qty: number
  /** Book value (cost basis) in AUD. */
  bookValue: number
  /** Last sale date string, e.g. "12 Aug 2024". */
  lastSale?: string
  /** Optional default-selected disposition. */
  defaultDisposition?: ObsoleteAction
  /** Disposition options to render. */
  dispositions?: ReadonlyArray<ObsoleteAction>
  /** Fires when an operator selects a disposition. */
  onDispose?: (action: ObsoleteAction, sku: string) => void
}

const DISPOSITION_LABEL: Record<ObsoleteAction, string> = {
  scrap: "Scrap & write-off",
  auction: "Send to auction",
  donate: "Donate / give-away",
  "return-supplier": "Return to supplier",
}

const DISPOSITION_TONE: Record<
  ObsoleteAction,
  "red" | "amber" | "green" | "teal"
> = {
  scrap: "red",
  auction: "amber",
  donate: "green",
  "return-supplier": "teal",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ObsoleteStockCard({
  sku,
  title,
  reason,
  qty,
  bookValue,
  lastSale,
  defaultDisposition,
  dispositions = ["scrap", "auction", "donate", "return-supplier"],
  onDispose,
}: ObsoleteStockCardProps) {
  return (
    <article
      className={styles.wrap}
      aria-label={`Obsolete stock card for ${sku}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Obsolete · disposal</span>
          <h3 className={styles.title}>{sku}</h3>
          <span className={styles.subtitle}>{title}</span>
        </div>
        <Chip label="Obsolete" tone="red" />
      </header>

      <p className={styles.reason}>{reason}</p>

      <dl className={styles.metrics}>
        <div className={styles.metric}>
          <dt>Qty</dt>
          <dd>{qty}</dd>
        </div>
        <div className={styles.metric}>
          <dt>Book value</dt>
          <dd className={styles.bookValue}>{formatAud(bookValue)}</dd>
        </div>
        <div className={styles.metric}>
          <dt>Last sale</dt>
          <dd className={styles.lastSale}>{lastSale ?? "Never"}</dd>
        </div>
      </dl>

      <div className={styles.disposeRow} role="group" aria-label="Disposal options">
        {dispositions.map((d) => (
          <button
            key={d}
            type="button"
            className={`${styles.disposeBtn} ${
              defaultDisposition === d ? styles.primary : ""
            }`}
            data-tone={DISPOSITION_TONE[d]}
            onClick={() => onDispose?.(d, sku)}
            aria-label={`${DISPOSITION_LABEL[d]} for ${sku}`}
          >
            {DISPOSITION_LABEL[d]}
          </button>
        ))}
      </div>
    </article>
  )
}

export default ObsoleteStockCard
