"use client"

import { useCallback, useMemo, useState, type ChangeEvent } from "react"

import styles from "./variant-picker.module.css"

export interface VariantSpec {
  id: string
  name: string
  description?: string
  weight: number
  tone?: "red" | "amber" | "teal" | "green"
}

export interface VariantPickerProps {
  variants: ReadonlyArray<VariantSpec>
  onChange?: (next: ReadonlyArray<VariantSpec>) => void
  className?: string
  /** Label for the legend / aria. */
  label?: string
}

const TONE_CLASS: Record<NonNullable<VariantSpec["tone"]>, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

function sumWeights(list: ReadonlyArray<VariantSpec>): number {
  return list.reduce((acc, v) => acc + (Number.isFinite(v.weight) ? v.weight : 0), 0)
}

export function VariantPicker({
  variants,
  onChange,
  className,
  label = "Variant weights",
}: VariantPickerProps) {
  const [state, setState] = useState<ReadonlyArray<VariantSpec>>(variants)

  const update = useCallback(
    (id: string, weight: number) => {
      const next = state.map((v) => (v.id === id ? { ...v, weight } : v))
      setState(next)
      onChange?.(next)
    },
    [state, onChange],
  )

  const total = useMemo(() => sumWeights(state), [state])
  const isValid = total === 100

  return (
    <fieldset
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <legend className={styles.legend}>{label}</legend>

      <ul className={styles.list}>
        {state.map((variant) => {
          const tone = variant.tone ? TONE_CLASS[variant.tone] : styles.toneNeutral
          return (
            <li key={variant.id} className={[styles.row, tone].join(" ")}>
              <span className={styles.identity}>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  <strong className={styles.name}>{variant.name}</strong>
                  {variant.description ? (
                    <span className={styles.description}>{variant.description}</span>
                  ) : null}
                </span>
              </span>
              <label className={styles.weightLabel}>
                <span>Weight</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  inputMode="numeric"
                  className={styles.weightInput}
                  value={variant.weight}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const parsed = Number(event.target.value)
                    if (!Number.isNaN(parsed)) {
                      update(variant.id, Math.max(0, Math.min(100, Math.round(parsed))))
                    }
                  }}
                  aria-label={`Weight for ${variant.name}`}
                />
                <span>%</span>
              </label>
            </li>
          )
        })}
      </ul>

      <div
        className={[styles.total, isValid ? styles.totalOk : styles.totalBad].join(" ")}
        role="status"
        aria-live="polite"
      >
        <span className={styles.totalLabel}>Total weight</span>
        <span className={styles.totalValue}>{total}%</span>
        <span className={styles.totalHint}>
          {isValid ? "Sums to 100%" : `Must sum to 100% (${100 - total} off)`}
        </span>
      </div>
    </fieldset>
  )
}

export default VariantPicker
