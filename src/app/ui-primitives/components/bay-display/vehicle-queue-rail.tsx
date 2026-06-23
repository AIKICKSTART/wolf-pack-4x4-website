import { Chip } from "../primitives/chip"
import { BAY_LABEL } from "../roster/roster-types"
import {
  formatWait,
  type BayId,
  type QueuePosition,
} from "./bay-display-types"
import styles from "./vehicle-queue-rail.module.css"

export interface VehicleQueueEntry {
  id: string
  /** Position relative to the floor right now. */
  position: QueuePosition
  /** Vehicle stack — "Ranger PX3 · DTU-209". */
  vehicle: string
  /** Customer surname. */
  customer: string
  /** Booked-for clock time — "12:15 pm". */
  bookedAt: string
  /** Minutes the customer has already been waiting (0 for not-yet-arrived). */
  waitedMinutes?: number
  /** Pre-assigned bay if any. */
  bay?: BayId
  /** Whether they've walked in. */
  arrived?: boolean
}

export interface VehicleQueueRailProps {
  entries: ReadonlyArray<VehicleQueueEntry>
  className?: string
}

const POSITION_LABEL: Readonly<Record<QueuePosition, string>> = {
  next: "Up next",
  soon: "Soon",
  later: "Later",
}

const POSITION_TONE: Readonly<
  Record<QueuePosition, "red" | "amber" | "neutral">
> = {
  next: "red",
  soon: "amber",
  later: "neutral",
}

export function VehicleQueueRail({
  entries,
  className,
}: VehicleQueueRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Vehicle queue rail"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Queue</span>
        <h2 className={styles.title}>Coming up</h2>
      </header>
      <ol className={styles.track}>
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={styles.card}
            data-position={entry.position}
          >
            <div className={styles.cardHead}>
              <Chip
                label={POSITION_LABEL[entry.position]}
                tone={POSITION_TONE[entry.position]}
              />
              {entry.arrived && <Chip label="Arrived" tone="green" />}
            </div>
            <strong className={styles.vehicle}>{entry.vehicle}</strong>
            <span className={styles.customer}>{entry.customer}</span>
            <div className={styles.meta}>
              <span>
                <em>Booked</em>
                <strong className={styles.tabular}>{entry.bookedAt}</strong>
              </span>
              {entry.bay && (
                <span>
                  <em>Bay</em>
                  <strong>{BAY_LABEL[entry.bay]}</strong>
                </span>
              )}
              {typeof entry.waitedMinutes === "number" && entry.waitedMinutes > 0 && (
                <span>
                  <em>Waiting</em>
                  <strong className={styles.tabular}>
                    {formatWait(entry.waitedMinutes)}
                  </strong>
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default VehicleQueueRail
