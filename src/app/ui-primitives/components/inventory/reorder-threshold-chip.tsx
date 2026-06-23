"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives/chip"
import { QuoteBubble } from "../primitives/quote-bubble"

import styles from "./reorder-threshold-chip.module.css"
import type { InventoryTone } from "./inventory-types"

export interface ReorderThresholdChipProps {
  /** Reorder point in units. */
  threshold: number
  /** Supplier lead time in days. */
  leadTimeDays: number
  /** Optional supplier name for the tooltip copy. */
  supplier?: string
  /** Tone override — defaults to amber. */
  tone?: InventoryTone
}

export function ReorderThresholdChip({
  threshold,
  leadTimeDays,
  supplier,
  tone = "amber",
}: ReorderThresholdChipProps) {
  const tooltipId = useId()
  const [open, setOpen] = useState(false)

  const tooltipCopy = supplier
    ? `Restock from ${supplier} when stock dips below ${threshold}. Lead time runs ~${leadTimeDays} days door-to-bay.`
    : `Reorder when stock dips below ${threshold}. Supplier lead time is ~${leadTimeDays} days.`

  return (
    <span
      className={styles.wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={tooltipId}
    >
      <Chip
        label={`Reorder at ${threshold} units`}
        tone={tone}
        icon={<span aria-hidden="true">↻</span>}
      />
      <span className={styles.bubble} data-open={open} role="presentation">
        <QuoteBubble side="bottom" tone="obsidian" label={tooltipCopy}>
          <span id={tooltipId}>{tooltipCopy}</span>
        </QuoteBubble>
      </span>
    </span>
  )
}

export default ReorderThresholdChip
