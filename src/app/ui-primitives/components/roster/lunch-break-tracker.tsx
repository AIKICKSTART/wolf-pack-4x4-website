"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import type { TechnicianRef } from "./roster-types"
import styles from "./lunch-break-tracker.module.css"

export interface BreakStatus {
  technician: TechnicianRef
  /** Minutes already taken on this break. */
  takenMinutes: number
  /** Total allowance — typically 30. */
  allowanceMinutes: number
  /** Whether the break is in progress right now. */
  inProgress: boolean
}

interface LunchBreakTrackerProps {
  rows: ReadonlyArray<BreakStatus>
  onExtendBreak?: (technicianId: string) => void
  className?: string
}

function remainingTone(taken: number, allowance: number): ChipTone {
  const remaining = Math.max(0, allowance - taken)
  if (remaining <= 0) {
    return "red"
  }
  if (remaining <= allowance * 0.25) {
    return "amber"
  }
  return "teal"
}

export function LunchBreakTracker({
  rows,
  onExtendBreak,
  className,
}: LunchBreakTrackerProps) {
  const classes = [styles.tracker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Lunch break tracker">
      <header className={styles.head}>
        <span className={styles.kicker}>Breaks</span>
        <strong className={styles.title}>Lunch break tracker</strong>
      </header>
      <ul className={styles.list}>
        {rows.map((row) => {
          const remaining = Math.max(0, row.allowanceMinutes - row.takenMinutes)
          return (
            <li key={row.technician.id} className={styles.row}>
              <Avatar
                name={row.technician.name}
                src={row.technician.avatarSrc}
                size="sm"
                tone="amber"
                status={row.inProgress ? "busy" : "online"}
              />
              <div className={styles.identity}>
                <strong>{row.technician.name}</strong>
                <span>{row.technician.role}</span>
              </div>
              <div className={styles.progress}>
                <ProgressLinear
                  value={row.takenMinutes}
                  max={row.allowanceMinutes}
                  tone={row.takenMinutes >= row.allowanceMinutes ? "red" : "teal"}
                  variant="solid"
                  label={`${row.takenMinutes}/${row.allowanceMinutes} min`}
                  showLabel
                />
              </div>
              <div className={styles.actions}>
                <Chip
                  label={`${remaining}m left`}
                  tone={remainingTone(row.takenMinutes, row.allowanceMinutes)}
                />
                {onExtendBreak ? (
                  <button
                    type="button"
                    className={styles.btnExtend}
                    onClick={() => onExtendBreak(row.technician.id)}
                  >
                    +5m
                  </button>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default LunchBreakTracker
