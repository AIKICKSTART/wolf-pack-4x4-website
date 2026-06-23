"use client"

import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./review-filter-chips.module.css"

export type ReviewFilterId =
  | "all"
  | "5-star"
  | "4-star"
  | "3-star"
  | "critical"
  | "with-photos"
  | "verified-only"
  | "last-30-days"

export interface ReviewFilterChipsProps {
  selected: ReviewFilterId
  onSelect: (next: ReviewFilterId) => void
  counts?: Partial<Record<ReviewFilterId, number>>
  label?: string
  className?: string
}

interface FilterDescriptor {
  id: ReviewFilterId
  label: string
  tone: ChipTone
}

const FILTERS: ReadonlyArray<FilterDescriptor> = [
  { id: "all", label: "All", tone: "neutral" },
  { id: "5-star", label: "5★", tone: "green" },
  { id: "4-star", label: "4★", tone: "teal" },
  { id: "3-star", label: "3★", tone: "amber" },
  { id: "critical", label: "Critical (1–2★)", tone: "red" },
  { id: "with-photos", label: "With photos", tone: "neutral" },
  { id: "verified-only", label: "Verified only", tone: "green" },
  { id: "last-30-days", label: "Last 30 days", tone: "neutral" },
]

export function ReviewFilterChips({
  selected,
  onSelect,
  counts,
  label = "Filter reviews",
  className,
}: ReviewFilterChipsProps) {
  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <span className={styles.label}>{label}</span>
      <div className={styles.row} role="group" aria-label={label}>
        {FILTERS.map((filter) => {
          const count = counts?.[filter.id]
          const labelText = count !== undefined ? `${filter.label} · ${count}` : filter.label
          return (
            <Chip
              key={filter.id}
              label={labelText}
              tone={filter.tone}
              selected={selected === filter.id}
              onSelect={() => onSelect(filter.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ReviewFilterChips
