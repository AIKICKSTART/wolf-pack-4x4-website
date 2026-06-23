import { Clock4 } from "lucide-react"

import { Chip } from "../primitives/chip"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import styles from "./next-up-queue.module.css"

export interface NextUpEntry {
  id: string
  vehicle: string
  customer: string
  /** Booking time formatted "10:30 am". */
  bookedAt: string
  /** Pre-allocated bay if known. */
  bay?: BayId
  /** Service code or summary, e.g. "Manta cat-back". */
  service: string
  /** Status — has the customer arrived yet? */
  arrived: boolean
}

interface NextUpQueueProps {
  entries: ReadonlyArray<NextUpEntry>
  className?: string
}

export function NextUpQueue({ entries, className }: NextUpQueueProps) {
  const classes = [styles.queue, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Next up queue">
      <header className={styles.head}>
        <span className={styles.kicker}>Next up · waiting list</span>
        <h3 className={styles.title}>Coming into bays</h3>
      </header>

      <ol className={styles.list}>
        {entries.map((entry, index) => (
          <li key={entry.id} className={styles.row}>
            <span className={styles.idx} aria-hidden="true">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <div className={styles.body}>
              <strong className={styles.vehicle}>{entry.vehicle}</strong>
              <span className={styles.customer}>{entry.customer}</span>
              <span className={styles.service}>{entry.service}</span>
            </div>
            <div className={styles.meta}>
              <span className={styles.time}>
                <Clock4 size={12} strokeWidth={2.2} aria-hidden="true" />
                {entry.bookedAt}
              </span>
              {entry.bay && <Chip label={BAY_LABEL[entry.bay]} tone="teal" />}
              <Chip
                label={entry.arrived ? "Arrived" : "En route"}
                tone={entry.arrived ? "green" : "amber"}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default NextUpQueue
