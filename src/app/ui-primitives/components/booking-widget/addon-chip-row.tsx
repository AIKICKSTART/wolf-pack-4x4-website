"use client"

import { Check } from "lucide-react"
import { useMemo } from "react"

import styles from "./addon-chip-row.module.css"
import type { AddonItem } from "./booking-widget-types"

interface AddonChipRowProps {
  addons: ReadonlyArray<AddonItem>
  selectedIds: ReadonlyArray<string>
  onToggle?: (id: string) => void
  /** Optional kicker label rendered above the chips. */
  label?: string
}

function formatAud(cents: number): string {
  if (cents === 0) return "Free"
  const sign = cents > 0 ? "+" : ""
  return `${sign}${new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)}`
}

export function AddonChipRow({
  addons,
  selectedIds,
  onToggle,
  label = "Optional add-ons",
}: AddonChipRowProps) {
  const total = useMemo(() => {
    let cents = 0
    for (const id of selectedIds) {
      const addon = addons.find((item) => item.id === id)
      if (addon) cents += addon.price.cents
    }
    return cents
  }, [addons, selectedIds])

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={styles.total}>
          Total add-ons: <strong>{formatAud(total)}</strong>
        </span>
      </div>
      <div className={styles.row} role="group" aria-label={label}>
        {addons.map((addon) => {
          const isSelected = selectedIds.includes(addon.id)
          return (
            <label
              key={addon.id}
              className={[styles.chip, isSelected && styles.chipSelected]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle?.(addon.id)}
                className={styles.input}
              />
              <span className={styles.box} aria-hidden="true">
                {isSelected ? <Check size={11} strokeWidth={3} /> : null}
              </span>
              <span className={styles.body}>
                <span className={styles.name}>{addon.label}</span>
                <span className={styles.blurb}>{addon.blurb}</span>
              </span>
              <span className={styles.price}>{formatAud(addon.price.cents)}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default AddonChipRow
