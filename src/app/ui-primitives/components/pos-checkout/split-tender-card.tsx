"use client"

import type { ChangeEvent } from "react"

import { ProgressLinear } from "../primitives/progress-linear"

import type { SplitTenderEntry } from "./pos-checkout-types"
import styles from "./split-tender-card.module.css"

type SplitMethod = SplitTenderEntry["method"]

interface SplitTenderCardProps {
  /** Total inc GST in AUD. */
  total: number
  /** Current split entries. */
  entries: ReadonlyArray<SplitTenderEntry>
  /** Fires when an entry's amount is edited. */
  onEntryChange?: (id: string, amount: number) => void
  /** Fires when the operator changes a method. */
  onMethodChange?: (id: string, method: SplitMethod) => void
  /** Fires when a split row is removed. */
  onRemove?: (id: string) => void
  /** Fires when the operator adds a new split row. */
  onAdd?: () => void
}

const METHOD_LABEL: Record<SplitMethod, string> = {
  cash: "Cash",
  card: "Card",
  voucher: "Voucher",
  loyalty: "Loyalty",
}

const METHODS: ReadonlyArray<SplitMethod> = ["cash", "card", "voucher", "loyalty"]

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, "")
  if (cleaned === "") return 0
  const num = Number.parseFloat(cleaned)
  return Number.isFinite(num) ? num : 0
}

export function SplitTenderCard({
  total,
  entries,
  onEntryChange,
  onMethodChange,
  onRemove,
  onAdd,
}: SplitTenderCardProps) {
  const tendered = entries.reduce((acc, entry) => acc + entry.amount, 0)
  const delta = tendered - total
  const remaining = Math.max(0, total - tendered)
  const overpaid = Math.max(0, tendered - total)
  const fullyTendered = Math.abs(delta) < 0.005

  const progressMax = Math.max(total, 0.01)
  const progressValue = Math.min(tendered, progressMax)
  const progressTone: "amber" | "green" | "red" = fullyTendered
    ? "green"
    : tendered > total
    ? "red"
    : "amber"

  const handleAmount = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    onEntryChange?.(id, parseAmount(event.target.value))
  }

  const handleMethod = (id: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SplitMethod
    onMethodChange?.(id, value)
  }

  return (
    <section className={styles.card} aria-label="Split tender editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Split payment</span>
        <h2 className={styles.title}>Allocate tender</h2>
      </header>

      <ul className={styles.list} role="list">
        {entries.map((entry) => {
          const inputId = `pos-split-${entry.id}`
          return (
            <li key={entry.id} className={styles.entry}>
              <label htmlFor={`${inputId}-method`} hidden>
                Method
              </label>
              <select
                id={`${inputId}-method`}
                className={styles.method}
                value={entry.method}
                onChange={handleMethod(entry.id)}
              >
                {METHODS.map((method) => (
                  <option key={method} value={method}>
                    {METHOD_LABEL[method]}
                  </option>
                ))}
              </select>
              <label htmlFor={`${inputId}-amount`} hidden>
                Amount
              </label>
              <input
                id={`${inputId}-amount`}
                type="text"
                inputMode="decimal"
                className={styles.amountInput}
                value={entry.amount.toFixed(2)}
                onChange={handleAmount(entry.id)}
                aria-label={`${METHOD_LABEL[entry.method]} amount`}
              />
              <button
                type="button"
                className={styles.remove}
                onClick={() => onRemove?.(entry.id)}
                aria-label={`Remove ${METHOD_LABEL[entry.method]} split`}
                disabled={entries.length <= 1}
              >
                Remove
              </button>
            </li>
          )
        })}
      </ul>

      <button type="button" className={styles.add} onClick={() => onAdd?.()}>
        + Add tender
      </button>

      <ProgressLinear
        value={progressValue}
        max={progressMax}
        tone={progressTone}
        variant="solid"
        showLabel
        label="Tendered vs total"
      />

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Total due</span>
          <span>{formatAud(total)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Tendered</span>
          <span>{formatAud(tendered)}</span>
        </div>
        {!fullyTendered && remaining > 0 && (
          <div className={`${styles.summaryRow} ${styles.summaryRowAlert}`}>
            <span>Remaining</span>
            <span>{formatAud(remaining)}</span>
          </div>
        )}
        {overpaid > 0 && (
          <div className={`${styles.summaryRow} ${styles.summaryRowAlert}`}>
            <span>Change due</span>
            <span>{formatAud(overpaid)}</span>
          </div>
        )}
        {fullyTendered && (
          <div className={`${styles.summaryRow} ${styles.summaryRowOk}`}>
            <span>Balance</span>
            <span>Fully tendered</span>
          </div>
        )}
        <div className={`${styles.summaryRow} ${styles.summaryRowGrand}`}>
          <span>Cleared</span>
          <span>{formatAud(Math.min(tendered, total))}</span>
        </div>
      </div>
    </section>
  )
}

export default SplitTenderCard
