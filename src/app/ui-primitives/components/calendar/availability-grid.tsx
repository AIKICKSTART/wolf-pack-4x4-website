import { buildHourLabels } from "./date-utils"
import styles from "./availability-grid.module.css"

export type BayOccupancy = "free" | "busy" | "blocked" | "maintenance"

export interface BayRow {
  id: string
  label: string
  /** One occupancy state per visible hour, in column order. */
  hours: ReadonlyArray<BayOccupancy>
}

interface AvailabilityGridProps {
  bays: ReadonlyArray<BayRow>
  /** First visible hour, 0-23. Default 7. */
  startHour?: number
  /** Last visible hour exclusive. Default 18. */
  endHour?: number
  className?: string
}

const OCCUPANCY_LABEL: Record<BayOccupancy, string> = {
  free: "Free",
  busy: "Busy",
  blocked: "Blocked",
  maintenance: "Maintenance",
}

export function AvailabilityGrid({
  bays,
  startHour = 7,
  endHour = 18,
  className,
}: AvailabilityGridProps) {
  const labels = buildHourLabels(startHour, endHour - 1, 24)
  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>Bay availability</span>
        <ul className={styles.legend} aria-label="Legend">
          <li data-state="free">
            <span /> Free
          </li>
          <li data-state="busy">
            <span /> Busy
          </li>
          <li data-state="blocked">
            <span /> Blocked
          </li>
          <li data-state="maintenance">
            <span /> Maintenance
          </li>
        </ul>
      </header>
      <div
        className={styles.matrix}
        style={{ "--col-count": labels.length } as React.CSSProperties}
        role="grid"
      >
        <div className={styles.corner} aria-hidden="true" />
        {labels.map((label) => (
          <div key={label} role="columnheader" className={styles.hourHead}>
            {label}
          </div>
        ))}
        {bays.map((bay) => (
          <div key={bay.id} className={styles.row} role="row">
            <div role="rowheader" className={styles.bayHead}>
              <strong>{bay.label}</strong>
              <span>{bay.id}</span>
            </div>
            {bay.hours.map((state, index) => (
              <div
                key={`${bay.id}-${index}`}
                role="gridcell"
                aria-label={`${bay.label} at ${labels[index]} — ${OCCUPANCY_LABEL[state]}`}
                data-state={state}
                className={styles.cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailabilityGrid
