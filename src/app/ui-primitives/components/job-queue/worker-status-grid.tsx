import { Cpu } from "lucide-react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import {
  JOB_KIND_LABEL,
  WORKER_TONE,
  type JobKind,
  type WorkerState,
} from "./job-queue-types"
import styles from "./worker-status-grid.module.css"

export interface WorkerStatusItem {
  id: string
  name: string
  state: WorkerState
  /** Worker uptime — human-formatted (e.g. "4h 12m"). */
  uptime: string
  /** Job kind currently running. Undefined when idle/offline. */
  currentJob?: JobKind
  /** Current concurrency in use. */
  concurrency: number
  /** Maximum concurrency this worker can sustain. */
  concurrencyCap: number
}

interface WorkerStatusGridProps {
  workers: ReadonlyArray<WorkerStatusItem>
  className?: string
}

const STATE_LABEL: Record<WorkerState, string> = {
  idle: "Idle",
  busy: "Busy",
  draining: "Draining",
  offline: "Offline",
}

const STATE_PROGRESS_TONE: Record<WorkerState, "teal" | "green" | "amber" | "red"> = {
  idle: "teal",
  busy: "green",
  draining: "amber",
  offline: "red",
}

export function WorkerStatusGrid({ workers, className }: WorkerStatusGridProps) {
  const busyCount = workers.filter((w) => w.state === "busy").length
  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <section
      className={styles.wrap}
      role="status"
      aria-live="polite"
      aria-label={`Worker fleet: ${busyCount} of ${workers.length} busy`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Worker fleet</span>
        <h3 className={styles.title}>
          {busyCount}/{workers.length} busy
        </h3>
      </header>
      <ul className={classes}>
        {workers.map((worker) => (
          <li key={worker.id} className={styles.card}>
            <header className={styles.cardHead}>
              <span className={styles.icon} aria-hidden="true">
                <Cpu size={14} strokeWidth={2.2} />
              </span>
              <span className={styles.name}>{worker.name}</span>
              <Chip label={STATE_LABEL[worker.state]} tone={WORKER_TONE[worker.state]} />
            </header>
            <dl className={styles.meta}>
              <div>
                <dt>Uptime</dt>
                <dd>{worker.uptime}</dd>
              </div>
              <div>
                <dt>Current</dt>
                <dd>{worker.currentJob ? JOB_KIND_LABEL[worker.currentJob] : "—"}</dd>
              </div>
            </dl>
            <ProgressLinear
              value={worker.concurrency}
              max={worker.concurrencyCap}
              tone={STATE_PROGRESS_TONE[worker.state]}
              variant="segmented"
              segments={worker.concurrencyCap}
              label={`Concurrency ${worker.concurrency}/${worker.concurrencyCap}`}
              showLabel={false}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WorkerStatusGrid
