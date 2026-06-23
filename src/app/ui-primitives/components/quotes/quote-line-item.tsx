"use client"

import { Trash2 } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import {
  formatCurrency,
  lineSubtotal,
  type QuoteLine,
} from "./quote-types"
import styles from "./quote-line-item.module.css"

export interface QuoteLineItemOption {
  label: string
  value: string
}

interface QuoteLineItemProps {
  line: QuoteLine
  /** Static catalogue of products / services the editor offers. */
  catalogue: ReadonlyArray<QuoteLineItemOption>
  currency?: string
  onLineChange?: (next: QuoteLine) => void
  onRemove?: (id: string) => void
}

export function QuoteLineItem({
  line,
  catalogue,
  currency = "AUD",
  onLineChange,
  onRemove,
}: QuoteLineItemProps) {
  const [qtyDraft, setQtyDraft] = useState<string>(String(line.quantity))
  const [priceDraft, setPriceDraft] = useState<string>(line.unitPrice.toFixed(2))

  const handleCatalogueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = catalogue.find((entry) => entry.value === event.target.value)
    if (!next) {
      return
    }
    onLineChange?.({ ...line, sku: next.value, title: next.label })
  }

  const handleQtyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setQtyDraft(value)
    }
  }

  const commitQty = () => {
    const parsed = Number.parseInt(qtyDraft, 10)
    const next = Number.isNaN(parsed) ? 1 : Math.max(1, parsed)
    setQtyDraft(String(next))
    if (next !== line.quantity) {
      onLineChange?.({ ...line, quantity: next })
    }
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setPriceDraft(value)
    }
  }

  const commitPrice = () => {
    const parsed = Number.parseFloat(priceDraft)
    const next = Number.isNaN(parsed) ? line.unitPrice : Math.max(0, parsed)
    setPriceDraft(next.toFixed(2))
    if (next !== line.unitPrice) {
      onLineChange?.({ ...line, unitPrice: next })
    }
  }

  const total = lineSubtotal(line)
  const lineId = `quote-line-${line.id}`

  return (
    <article className={styles.row} aria-labelledby={`${lineId}-title`}>
      <div className={styles.body}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Product / service</span>
          <select
            id={`${lineId}-title`}
            className={styles.select}
            value={line.sku}
            onChange={handleCatalogueChange}
          >
            {catalogue.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>
        {line.discount && (
          <Chip
            label={`-${
              line.discount.kind === "percentage"
                ? `${line.discount.amount}%`
                : formatCurrency(line.discount.amount, currency)
            } · ${line.discount.scope}`}
            tone="green"
          />
        )}
      </div>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Qty</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={styles.qty}
          value={qtyDraft}
          aria-label={`Quantity for ${line.title}`}
          onChange={handleQtyChange}
          onBlur={commitQty}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Unit ({currency})</span>
        <input
          type="text"
          inputMode="decimal"
          className={styles.price}
          value={priceDraft}
          aria-label={`Unit price for ${line.title}`}
          onChange={handlePriceChange}
          onBlur={commitPrice}
        />
      </label>
      <div className={styles.total}>
        <span className={styles.totalLabel}>Line total</span>
        <strong className={styles.totalValue}>{formatCurrency(total, currency)}</strong>
      </div>
      <button
        type="button"
        className={styles.remove}
        aria-label={`Remove ${line.title} from quote`}
        onClick={() => onRemove?.(line.id)}
      >
        <Trash2 size={14} aria-hidden="true" />
      </button>
    </article>
  )
}

export default QuoteLineItem
