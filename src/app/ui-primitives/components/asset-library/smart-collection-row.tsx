"use client"

import { Pencil, Sparkles } from "lucide-react"

import type { SmartCollectionCriterion } from "./asset-library-types"

import styles from "./smart-collection-row.module.css"

interface SmartCollectionRowProps {
  name: string
  /** Auto-updating asset count. */
  count: number
  criteria: ReadonlyArray<SmartCollectionCriterion>
  onEdit?: () => void
  className?: string
}

export function SmartCollectionRow({
  name,
  count,
  criteria,
  onEdit,
  className,
}: SmartCollectionRowProps) {
  return (
    <article
      className={[styles.row, className].filter(Boolean).join(" ")}
      aria-label={`Smart collection ${name}`}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon} aria-hidden="true">
            <Sparkles size={14} strokeWidth={2.2} />
          </span>
          <div className={styles.title}>
            <span className={styles.kicker}>Smart collection</span>
            <h3 className={styles.name}>{name}</h3>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.count}>
            <span className={styles.countNumber}>{count}</span>
            <span className={styles.countLabel}>assets</span>
          </span>
          <button
            type="button"
            className={styles.editBtn}
            onClick={onEdit}
            aria-label="Edit smart collection rules"
          >
            <Pencil size={12} strokeWidth={2.2} aria-hidden="true" />
            Edit
          </button>
        </div>
      </div>

      <ul className={styles.criteria}>
        {criteria.map((criterion) => (
          <li key={criterion.id} className={styles.criterion}>
            {criterion.label}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default SmartCollectionRow
