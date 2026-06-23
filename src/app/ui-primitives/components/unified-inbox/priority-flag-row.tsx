"use client"

import { Flag } from "lucide-react"
import { useState } from "react"

import {
  PRIORITY_LABEL,
  PRIORITY_TONE,
  type UnifiedPriority,
} from "./unified-inbox-types"
import styles from "./priority-flag-row.module.css"

interface PriorityFlagRowProps {
  /** Current priority value. */
  value?: UnifiedPriority
  /** Default value when uncontrolled. */
  defaultValue?: UnifiedPriority
  /** Triggered when the operator toggles the priority. */
  onChange?: (value: UnifiedPriority) => void
  /** Optional helper caption shown beside the row. */
  caption?: string
  className?: string
}

const ORDER: ReadonlyArray<UnifiedPriority> = [
  "low",
  "normal",
  "high",
  "urgent",
]

export function PriorityFlagRow({
  value,
  defaultValue = "normal",
  onChange,
  caption = "Priority flag drives SLA + escalation routing.",
  className,
}: PriorityFlagRowProps) {
  const [internal, setInternal] = useState<UnifiedPriority>(defaultValue)
  const active = value ?? internal

  const handleSelect = (next: UnifiedPriority) => {
    if (value === undefined) {
      setInternal(next)
    }
    onChange?.(next)
  }

  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Priority flag">
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Flag size={11} strokeWidth={2.4} aria-hidden="true" />
          <span>Priority</span>
        </span>
        <span className={styles.caption}>{caption}</span>
      </header>
      <div
        className={styles.toggleGroup}
        role="radiogroup"
        aria-label="Priority level"
      >
        {ORDER.map((priority) => {
          const tone = PRIORITY_TONE[priority]
          const isActive = active === priority
          return (
            <button
              key={priority}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[
                styles.toggle,
                styles[`tone_${tone}`],
                isActive ? styles.toggleActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(priority)}
            >
              <span
                className={styles.toggleGlyph}
                aria-hidden="true"
              >
                <Flag size={12} strokeWidth={2.6} />
              </span>
              <span className={styles.toggleLabel}>
                {PRIORITY_LABEL[priority]}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default PriorityFlagRow
