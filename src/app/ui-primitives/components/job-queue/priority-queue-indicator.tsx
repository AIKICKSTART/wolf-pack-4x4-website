import { Chip } from "../primitives/chip"

import { PRIORITY_TONE, type QueuePriority } from "./job-queue-types"
import styles from "./priority-queue-indicator.module.css"

export interface PriorityBacklog {
  priority: QueuePriority
  /** Pending count on this priority lane. */
  backlog: number
}

interface PriorityQueueIndicatorProps {
  /** Per-priority backlog counts. */
  lanes: ReadonlyArray<PriorityBacklog>
  className?: string
}

const PRIORITY_LABEL: Record<QueuePriority, string> = {
  high: "High",
  normal: "Normal",
  low: "Low",
}

export function PriorityQueueIndicator({
  lanes,
  className,
}: PriorityQueueIndicatorProps) {
  const total = lanes.reduce((sum, lane) => sum + lane.backlog, 0)
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={`Backlog across ${lanes.length} priority lanes: ${total} jobs total`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Priority lanes</span>
        <h3 className={styles.title}>{total.toLocaleString()} pending</h3>
      </header>
      <ul className={styles.list}>
        {lanes.map((lane) => (
          <li key={lane.priority} className={styles.item}>
            <Chip label={PRIORITY_LABEL[lane.priority]} tone={PRIORITY_TONE[lane.priority]} />
            <span className={styles.count}>{lane.backlog.toLocaleString()}</span>
            <span className={styles.suffix}>jobs</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PriorityQueueIndicator
