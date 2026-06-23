"use client"

import { X } from "lucide-react"
import type { MouseEvent } from "react"

import styles from "./active-filter-chip-bar.module.css"

export interface ActiveFilter {
  id: string
  group: string
  label: string
  value: string
}

interface ActiveFilterChipBarProps {
  filters: ReadonlyArray<ActiveFilter>
  onDismiss?: (filter: ActiveFilter) => void
  onClearAll?: () => void
  emptyHint?: string
  className?: string
  ariaLabel?: string
}

export function ActiveFilterChipBar({
  filters,
  onDismiss,
  onClearAll,
  emptyHint = "No filters applied",
  className,
  ariaLabel = "Active filters",
}: ActiveFilterChipBarProps) {
  const classes = [styles.bar, className].filter(Boolean).join(" ")

  if (filters.length === 0) {
    return (
      <div className={classes} role="group" aria-label={ariaLabel}>
        <span className={styles.empty}>{emptyHint}</span>
      </div>
    )
  }

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      <span className={styles.kicker}>{filters.length} active</span>
      <ul className={styles.list}>
        {filters.map((filter) => (
          <li key={filter.id} className={styles.chip}>
            <span className={styles.chipGroup}>{filter.group}</span>
            <span className={styles.chipSep} aria-hidden="true">
              :
            </span>
            <span className={styles.chipLabel}>{filter.label}</span>
            <button
              type="button"
              className={styles.chipDismiss}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation()
                onDismiss?.(filter)
              }}
              aria-label={`Remove filter ${filter.group}: ${filter.label}`}
            >
              <X size={11} strokeWidth={2.6} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      {onClearAll ? (
        <button type="button" className={styles.clearAll} onClick={onClearAll}>
          Clear all
        </button>
      ) : null}
    </div>
  )
}

export default ActiveFilterChipBar
