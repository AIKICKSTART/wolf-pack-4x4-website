"use client"

import { SEGMENT_GLYPH, SEGMENT_LABEL, type CustomerSegment } from "./crm-types"
import styles from "./segment-chip.module.css"

interface SegmentChipProps {
  segment: CustomerSegment
  selected?: boolean
  onToggle?: () => void
  className?: string
}

export function SegmentChip({
  segment,
  selected = false,
  onToggle,
  className,
}: SegmentChipProps) {
  const classes = [styles.chip, className].filter(Boolean).join(" ")
  const label = SEGMENT_LABEL[segment]
  const glyph = SEGMENT_GLYPH[segment]

  if (onToggle) {
    return (
      <button
        type="button"
        className={classes}
        data-segment={segment}
        aria-pressed={selected}
        onClick={onToggle}
      >
        <span className={styles.glyph} aria-hidden="true">
          {glyph}
        </span>
        <span>{label}</span>
      </button>
    )
  }

  return (
    <span className={classes} data-segment={segment} aria-label={`Segment: ${label}`}>
      <span className={styles.glyph} aria-hidden="true">
        {glyph}
      </span>
      <span>{label}</span>
    </span>
  )
}

export default SegmentChip
