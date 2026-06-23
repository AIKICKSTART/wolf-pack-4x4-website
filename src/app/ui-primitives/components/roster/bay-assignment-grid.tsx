import { buildHourLabels } from "../calendar/date-utils"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import { BAY_LABEL, type BayId } from "./roster-types"
import styles from "./bay-assignment-grid.module.css"

export interface BayAssignmentCell {
  /** Technician initials or short label, e.g. "TW" or "Trent W." */
  techShort: string
  techName: string
  tone: ChipTone
}

export interface BayAssignmentRow {
  bay: BayId
  /** Cells aligned 1:1 with the visible hour columns. null = unassigned. */
  cells: ReadonlyArray<BayAssignmentCell | null>
}

interface BayAssignmentGridProps {
  rows: ReadonlyArray<BayAssignmentRow>
  /** First visible hour, default 7. */
  startHour?: number
  /** Last visible hour exclusive, default 18. */
  endHour?: number
  className?: string
}

export function BayAssignmentGrid({
  rows,
  startHour = 7,
  endHour = 18,
  className,
}: BayAssignmentGridProps) {
  const hours = buildHourLabels(startHour, endHour - 1, 24)
  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Bay assignment grid">
      <header className={styles.head}>
        <span className={styles.kicker}>Bay assignment</span>
        <strong className={styles.title}>Bays × hours · today</strong>
      </header>
      <div
        className={styles.matrix}
        style={{ "--col-count": hours.length } as React.CSSProperties}
        role="grid"
        aria-label="Bay assignment by hour"
      >
        <div className={styles.corner} aria-hidden="true" />
        {hours.map((label) => (
          <div key={label} role="columnheader" className={styles.hourHead}>
            {label}
          </div>
        ))}
        {rows.map((row) => (
          <div key={row.bay} className={styles.row} role="row">
            <div role="rowheader" className={styles.bayHead}>
              <strong>{BAY_LABEL[row.bay]}</strong>
              <span>{row.bay}</span>
            </div>
            {row.cells.map((cell, index) => (
              <div
                key={`${row.bay}-${index}`}
                role="gridcell"
                className={styles.cell}
                data-state={cell ? "assigned" : "empty"}
                aria-label={
                  cell
                    ? `${BAY_LABEL[row.bay]} at ${hours[index]} — ${cell.techName}`
                    : `${BAY_LABEL[row.bay]} at ${hours[index]} — unassigned`
                }
              >
                {cell ? (
                  <Chip label={cell.techShort} tone={cell.tone} />
                ) : (
                  <span className={styles.empty}>—</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default BayAssignmentGrid
