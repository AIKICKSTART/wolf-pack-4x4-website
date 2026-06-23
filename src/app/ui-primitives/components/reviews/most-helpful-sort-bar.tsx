"use client"

import { Chip } from "../primitives/chip"

import styles from "./most-helpful-sort-bar.module.css"

export type ReviewSortId =
  | "most-helpful"
  | "most-recent"
  | "highest-rating"
  | "lowest-rating"
  | "with-photos"

export interface MostHelpfulSortBarProps {
  selected: ReviewSortId
  onSelect: (next: ReviewSortId) => void
  resultCount: number
  label?: string
  className?: string
}

interface SortDescriptor {
  id: ReviewSortId
  label: string
}

const SORTS: ReadonlyArray<SortDescriptor> = [
  { id: "most-helpful", label: "Most helpful" },
  { id: "most-recent", label: "Most recent" },
  { id: "highest-rating", label: "Highest rating" },
  { id: "lowest-rating", label: "Lowest rating" },
  { id: "with-photos", label: "With photos" },
]

export function MostHelpfulSortBar({
  selected,
  onSelect,
  resultCount,
  label = "Sort reviews",
  className,
}: MostHelpfulSortBarProps) {
  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="group" aria-label={label}>
      <span className={styles.label}>{label}</span>
      <div className={styles.row}>
        {SORTS.map((sort) => (
          <Chip
            key={sort.id}
            label={sort.label}
            tone={selected === sort.id ? "teal" : "neutral"}
            selected={selected === sort.id}
            onSelect={() => onSelect(sort.id)}
          />
        ))}
      </div>
      <span className={styles.count}>
        <Chip
          label={`${resultCount.toLocaleString("en-AU")} results`}
          tone="neutral"
        />
      </span>
    </div>
  )
}

export default MostHelpfulSortBar
