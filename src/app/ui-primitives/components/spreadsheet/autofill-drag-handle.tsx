"use client"

import styles from "./autofill-drag-handle.module.css"

export type AutofillHandleSize = "sm" | "md" | "lg"

export interface AutofillDragHandleProps {
  size?: AutofillHandleSize
  /** Show a subtle pulse to draw attention. */
  pulse?: boolean
  onDragStart?: () => void
}

const SIZE_CLASS: Record<AutofillHandleSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

export function AutofillDragHandle({
  size = "md",
  pulse = false,
  onDragStart,
}: AutofillDragHandleProps) {
  const classes = [styles.handle, SIZE_CLASS[size], pulse ? styles.pulse : ""]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      aria-label="Drag to autofill series"
    >
      <span className={styles.dot} aria-hidden="true" />
    </button>
  )
}

export default AutofillDragHandle
