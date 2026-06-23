"use client"

import { X } from "lucide-react"

import styles from "./chip-filter-row.module.css"

export interface ChipFilterOption {
  id: string
  label: string
  count?: number
}

interface ChipFilterRowProps {
  options: ReadonlyArray<ChipFilterOption>
  active: ReadonlyArray<string>
  onToggle: (id: string) => void
  onClear?: () => void
  clearLabel?: string
  label?: string
  className?: string
}

export function ChipFilterRow({
  options,
  active,
  onToggle,
  onClear,
  clearLabel = "Clear",
  label = "Filter chips",
  className,
}: ChipFilterRowProps) {
  const activeSet = new Set(active)
  const hasActive = active.length > 0

  return (
    <div
      className={[styles.row, className].filter(Boolean).join(" ")}
      role="group"
      aria-label={label}
    >
      <div className={styles.track}>
        {hasActive && onClear ? (
          <button
            type="button"
            className={styles.clearChip}
            onClick={onClear}
            aria-label={`${clearLabel} all filters`}
          >
            <X size={12} strokeWidth={2.6} aria-hidden="true" />
            <span>{clearLabel}</span>
          </button>
        ) : null}
        {options.map((option) => {
          const isActive = activeSet.has(option.id)
          return (
            <button
              key={option.id}
              type="button"
              className={[styles.chip, isActive ? styles.chipActive : ""].filter(Boolean).join(" ")}
              aria-pressed={isActive}
              onClick={() => onToggle(option.id)}
            >
              <span className={styles.chipLabel}>{option.label}</span>
              {typeof option.count === "number" ? (
                <span className={styles.chipCount}>{option.count}</span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChipFilterRow
