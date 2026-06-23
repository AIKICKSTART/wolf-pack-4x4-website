"use client"

import { Percent, DollarSign, Layers } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import type { DiscountKind, AppliedDiscount } from "./quote-types"
import styles from "./discount-editor.module.css"

interface DiscountEditorProps {
  initial?: AppliedDiscount
  scopeOptions: ReadonlyArray<string>
  currency?: string
  onChange?: (next: AppliedDiscount) => void
}

const KIND_OPTIONS: ReadonlyArray<{ value: DiscountKind; label: string; icon: React.ReactNode }> = [
  { value: "percentage", label: "Percentage", icon: <Percent size={14} aria-hidden="true" /> },
  { value: "fixed", label: "Fixed amount", icon: <DollarSign size={14} aria-hidden="true" /> },
  { value: "bulk-tier", label: "Bulk tier", icon: <Layers size={14} aria-hidden="true" /> },
]

export function DiscountEditor({
  initial,
  scopeOptions,
  currency = "AUD",
  onChange,
}: DiscountEditorProps) {
  const [kind, setKind] = useState<DiscountKind>(initial?.kind ?? "percentage")
  const [amount, setAmount] = useState<string>(
    initial?.amount !== undefined ? String(initial.amount) : "10"
  )
  const [scope, setScope] = useState<string>(initial?.scope ?? scopeOptions[0] ?? "Whole quote")
  const [reason, setReason] = useState<string>(initial?.reason ?? "")

  const emit = (next: Partial<AppliedDiscount>) => {
    const merged: AppliedDiscount = {
      kind,
      amount: Number.parseFloat(amount) || 0,
      scope,
      reason: reason || undefined,
      ...next,
    }
    onChange?.(merged)
  }

  const handleKind = (next: DiscountKind) => {
    setKind(next)
    emit({ kind: next })
  }

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "" || /^\d*(\.\d{0,2})?$/.test(value)) {
      setAmount(value)
      emit({ amount: Number.parseFloat(value) || 0 })
    }
  }

  const handleScope = (event: ChangeEvent<HTMLSelectElement>) => {
    setScope(event.target.value)
    emit({ scope: event.target.value })
  }

  const handleReason = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value)
    emit({ reason: event.target.value })
  }

  const suffix = kind === "percentage" ? "%" : currency
  const amountLabel = kind === "percentage" ? "Discount percentage" : "Discount amount"

  return (
    <section className={styles.card} aria-labelledby="discount-editor-title">
      <header className={styles.head}>
        <span className={styles.kicker}>Discount</span>
        <h3 id="discount-editor-title" className={styles.title}>Apply discount</h3>
      </header>
      <fieldset className={styles.kindRow}>
        <legend className={styles.legend}>Type</legend>
        {KIND_OPTIONS.map((option) => (
          <button
            type="button"
            key={option.value}
            className={[styles.kindBtn, kind === option.value && styles.kindBtnActive]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={kind === option.value}
            onClick={() => handleKind(option.value)}
          >
            <span className={styles.kindIcon}>{option.icon}</span>
            {option.label}
          </button>
        ))}
      </fieldset>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{amountLabel}</span>
          <div className={styles.amountWrap}>
            <input
              type="text"
              inputMode="decimal"
              className={styles.amount}
              value={amount}
              aria-label={amountLabel}
              onChange={handleAmount}
            />
            <span className={styles.amountSuffix}>{suffix}</span>
          </div>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Applied to</span>
          <select className={styles.select} value={scope} onChange={handleScope}>
            {scopeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.scopeChip}>
        <Chip label={`Scope · ${scope}`} tone="teal" />
      </div>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Reason (internal note)</span>
        <textarea
          className={styles.reason}
          rows={2}
          value={reason}
          placeholder="Loyal customer / volume order / show pricing…"
          onChange={handleReason}
        />
      </label>
    </section>
  )
}

export default DiscountEditor
