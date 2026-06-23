"use client"

import { useId } from "react"

import type { BlogAccent, BlogCategory } from "./types"
import styles from "./category-filter-bar.module.css"

export interface CategoryFilterBarProps {
  categories: ReadonlyArray<BlogCategory>
  /** Active category id, or `null`/"all" for the "All" pseudo-filter. */
  activeId: string | null
  onChange: (id: string | null) => void
  /** Label for the all-posts pill. */
  allLabel?: string
  className?: string
}

const ACCENT_CLASS: Record<BlogAccent, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export function CategoryFilterBar({
  categories,
  activeId,
  onChange,
  allLabel = "All posts",
  className,
}: CategoryFilterBarProps) {
  const groupId = useId()
  const classes = [styles.bar, className].filter(Boolean).join(" ")
  const isAll = activeId === null || activeId === "all"

  return (
    <div
      className={classes}
      role="radiogroup"
      aria-label="Filter posts by category"
      id={groupId}
    >
      <button
        type="button"
        role="radio"
        aria-checked={isAll}
        className={[styles.pill, isAll ? styles.active : ""].filter(Boolean).join(" ")}
        onClick={() => onChange(null)}
      >
        <span className={styles.pillLabel}>{allLabel}</span>
      </button>

      {categories.map((category) => {
        const selected = category.id === activeId
        const accentClass = ACCENT_CLASS[category.accent ?? "red"]
        return (
          <button
            key={category.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={[styles.pill, accentClass, selected ? styles.active : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange(category.id)}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.pillLabel}>{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilterBar
