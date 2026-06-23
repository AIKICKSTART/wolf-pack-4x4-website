"use client"

import { AlertTriangle } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"
import styles from "./coverage-gap-warning.module.css"

interface CoverageGapWarningProps {
  /** Human-readable window, e.g. "Thu 6 Jun · 13:00 – 16:00". */
  window: string
  /** Hours actually rostered. */
  actualHours: number
  /** Hours required to meet coverage minimum. */
  requiredHours: number
  /** Optional secondary detail, e.g. "Bay 2 + mobile fit van uncovered". */
  detail?: string
  /** Click handler to start filling the gap. */
  onAssignCover?: () => void
  className?: string
}

export function CoverageGapWarning({
  window,
  actualHours,
  requiredHours,
  detail,
  onAssignCover,
  className,
}: CoverageGapWarningProps) {
  const shortfall = Math.max(0, requiredHours - actualHours)
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="alert" aria-label="Coverage gap warning">
      <DashboardCard
        label="Coverage gap"
        value={`${shortfall}h short`}
        unit={`of ${requiredHours}h`}
        icon={<AlertTriangle size={18} strokeWidth={2.2} aria-hidden="true" />}
        meta={window}
        delta={{
          label: `${actualHours}/${requiredHours}h covered`,
          direction: "down",
        }}
        surface="material"
      />

      <div className={styles.body}>
        {detail ? <p className={styles.detail}>{detail}</p> : null}
        <div className={styles.chipRow}>
          <Chip label={`Required ${requiredHours}h`} tone="neutral" />
          <Chip label={`Actual ${actualHours}h`} tone="red" />
        </div>
        {onAssignCover ? (
          <button
            type="button"
            className={styles.btnAssign}
            onClick={onAssignCover}
          >
            Assign cover
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default CoverageGapWarning
