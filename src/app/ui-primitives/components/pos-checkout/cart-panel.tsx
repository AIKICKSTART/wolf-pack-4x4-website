"use client"

import { useState } from "react"

import type { PosCartLine } from "./pos-checkout-types"
import styles from "./cart-panel.module.css"

interface CartPanelProps {
  /** Header kicker, e.g. "Bay 1 · register". */
  kicker?: string
  /** Display title for the cart. */
  title?: string
  /** Current cart lines. */
  lines: ReadonlyArray<PosCartLine>
  /** AUD GST rate, default 0.10. */
  gstRate?: number
  /** Fires when the operator changes a line quantity. */
  onQuantityChange?: (id: string, quantity: number) => void
  /** Fires when the operator confirms a swipe-to-remove. */
  onRemove?: (id: string) => void
  /** Minimum quantity (defaults to 1). */
  minQuantity?: number
  /** Maximum quantity. */
  maxQuantity?: number
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function CartPanel({
  kicker = "Bay 1 · register",
  title = "Active sale",
  lines,
  gstRate = 0.1,
  onQuantityChange,
  onRemove,
  minQuantity = 1,
  maxQuantity = 99,
}: CartPanelProps) {
  const [swipingId, setSwipingId] = useState<string | null>(null)

  const subtotalIncGst = lines.reduce(
    (acc, line) => acc + line.unitPrice * line.quantity,
    0,
  )
  const subtotalExGst = subtotalIncGst / (1 + gstRate)
  const gst = subtotalIncGst - subtotalExGst

  const adjust = (line: PosCartLine, delta: number) => {
    const next = Math.max(minQuantity, Math.min(maxQuantity, line.quantity + delta))
    if (next !== line.quantity) {
      onQuantityChange?.(line.id, next)
    }
  }

  return (
    <section className={styles.panel} aria-label="Active POS cart">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <span className={styles.rowMeta}>{lines.length} lines</span>
      </header>

      {lines.length === 0 ? (
        <p className={styles.empty}>No items scanned</p>
      ) : (
        <ul className={styles.list} role="list">
          {lines.map((line) => {
            const isSwiping = swipingId === line.id
            return (
              <li
                key={line.id}
                className={`${styles.row}${isSwiping ? ` ${styles.rowSwiping}` : ""}`}
              >
                <div>
                  <h3 className={styles.rowTitle}>{line.title}</h3>
                  <span className={styles.rowMeta}>SKU · {line.sku}</span>
                </div>
                <span className={styles.linePrice}>
                  {formatAud(line.unitPrice * line.quantity)}
                </span>
                {line.note && <span className={styles.rowNote}>{line.note}</span>}
                <div className={styles.rowControls}>
                  <div
                    className={styles.stepper}
                    role="group"
                    aria-label={`Quantity controls for ${line.title}`}
                  >
                    <button
                      type="button"
                      className={styles.stepperBtn}
                      aria-label={`Decrease ${line.title}`}
                      onClick={() => adjust(line, -1)}
                      disabled={line.quantity <= minQuantity}
                    >
                      −
                    </button>
                    <span className={styles.stepperValue} aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      className={styles.stepperBtn}
                      aria-label={`Increase ${line.title}`}
                      onClick={() => adjust(line, 1)}
                      disabled={line.quantity >= maxQuantity}
                    >
                      +
                    </button>
                  </div>
                  <span className={styles.rowMeta}>{formatAud(line.unitPrice)} ea</span>
                  <button
                    type="button"
                    className={styles.swipeToggle}
                    aria-expanded={isSwiping}
                    aria-controls={`pos-remove-${line.id}`}
                    onClick={() => setSwipingId(isSwiping ? null : line.id)}
                  >
                    {isSwiping ? "Cancel" : "Swipe"}
                  </button>
                </div>
                <button
                  type="button"
                  id={`pos-remove-${line.id}`}
                  className={styles.remove}
                  aria-label={`Remove ${line.title} from cart`}
                  onClick={() => {
                    onRemove?.(line.id)
                    setSwipingId(null)
                  }}
                  tabIndex={isSwiping ? 0 : -1}
                >
                  Remove
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <footer className={styles.foot}>
        <div className={styles.totalsRow}>
          <span>Subtotal ex GST</span>
          <span>{formatAud(subtotalExGst)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>GST ({Math.round(gstRate * 100)}%)</span>
          <span>{formatAud(gst)}</span>
        </div>
        <div className={`${styles.totalsRow} ${styles.totalsRowGrand}`}>
          <span>Total inc GST</span>
          <span>{formatAud(subtotalIncGst)}</span>
        </div>
      </footer>
    </section>
  )
}

export default CartPanel
