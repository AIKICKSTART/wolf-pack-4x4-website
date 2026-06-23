"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives/chip"
import {
  PART_STOCK_LABEL,
  PART_STOCK_TONE,
  type PartPullEntry,
  formatAud,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./parts-pull-list.module.css"

interface PartsPullListProps {
  jobLabel: string
  bayLabel: string
  parts: ReadonlyArray<PartPullEntry>
  /** Optional pull state seed — pulled IDs. */
  pulledIds?: ReadonlyArray<string>
  /** Visual variant. "compact" hides bin column for tight surfaces. */
  variant?: "default" | "compact"
  className?: string
}

export function PartsPullList({
  jobLabel,
  bayLabel,
  parts,
  pulledIds,
  variant = "default",
  className,
}: PartsPullListProps) {
  const headingId = useId()
  const [pulled, setPulled] = useState<ReadonlySet<string>>(() => {
    const initial = new Set<string>()
    for (const part of parts) {
      if (part.pulled) initial.add(part.id)
    }
    if (pulledIds) {
      for (const id of pulledIds) initial.add(id)
    }
    return initial
  })

  const togglePulled = (id: string) => {
    setPulled((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const remaining = parts.filter((part) => !pulled.has(part.id)).length
  const total = parts.length
  const subtotal = parts.reduce(
    (sum, part) => sum + part.unitPriceAud * part.quantity,
    0,
  )

  const classes = [styles.list, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-labelledby={headingId}
      data-variant={variant}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Parts pull</span>
          <h3 id={headingId} className={styles.title}>
            {jobLabel}
          </h3>
          <span className={styles.subtitle}>From {bayLabel} request bench</span>
        </div>
        <div className={styles.counts} aria-label="Pull progress">
          <span className={styles.countRemaining}>
            <strong>{remaining}</strong>
            <span>to pull</span>
          </span>
          <span className={styles.countTotal}>{total} total</span>
        </div>
      </header>

      <ul className={styles.rows}>
        {parts.map((part) => {
          const isPulled = pulled.has(part.id)
          const stockTone = opsToneToChip(PART_STOCK_TONE[part.stock])
          const lineTotal = part.unitPriceAud * part.quantity
          return (
            <li
              key={part.id}
              className={[
                styles.row,
                isPulled ? styles.rowPulled : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={isPulled}
                  onChange={() => togglePulled(part.id)}
                  aria-label={`Mark ${part.label} as pulled`}
                />
                <span className={styles.checkBox} aria-hidden="true">
                  {isPulled ? "✓" : ""}
                </span>
              </label>
              <div className={styles.identity}>
                <span className={styles.partNumber}>{part.partNumber}</span>
                <span className={styles.partLabel}>{part.label}</span>
                <span className={styles.supplier}>{part.supplier}</span>
              </div>
              {variant === "default" ? (
                <span className={styles.bin}>
                  <span className={styles.binKicker}>Bin</span>
                  <span className={styles.binValue}>{part.bin}</span>
                </span>
              ) : null}
              <span className={styles.qty}>×{part.quantity}</span>
              <span className={styles.lineTotal}>{formatAud(lineTotal)}</span>
              <span className={styles.stock}>
                <Chip
                  label={PART_STOCK_LABEL[part.stock]}
                  tone={stockTone}
                />
              </span>
            </li>
          )
        })}
      </ul>

      <footer className={styles.foot}>
        <span className={styles.subtotalLabel}>Parts subtotal</span>
        <span className={styles.subtotalValue}>{formatAud(subtotal)}</span>
      </footer>
    </section>
  )
}

export default PartsPullList
