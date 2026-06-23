import { Check } from "lucide-react"

import { ProgressLinear } from "../primitives/progress-linear"
import {
  JOB_STAGE_LABEL,
  JOB_STAGE_ORDER,
  type CheckpointState,
  type JobStage,
} from "./workshop-floor-types"
import styles from "./live-job-progress-strip.module.css"

export interface JobCheckpoint {
  stage: JobStage
  state: CheckpointState
  /** Optional time stamp e.g. "09:42". */
  at?: string
}

export interface LiveJobProgressStripProps {
  jobNumber: string
  vehicle: string
  checkpoints: ReadonlyArray<JobCheckpoint>
  /** Overall percentage 0–100 used by the bar fill. */
  percent: number
  className?: string
}

const STATE_CLASS: Record<CheckpointState, string> = {
  done: "done",
  active: "active",
  pending: "pending",
  skipped: "skipped",
}

export function LiveJobProgressStrip({
  jobNumber,
  vehicle,
  checkpoints,
  percent,
  className,
}: LiveJobProgressStripProps) {
  const stageMap = new Map<JobStage, JobCheckpoint>()
  for (const c of checkpoints) {
    stageMap.set(c.stage, c)
  }
  const ordered = JOB_STAGE_ORDER.map<JobCheckpoint>(
    (stage) => stageMap.get(stage) ?? { stage, state: "pending" },
  )
  const activeStage = ordered.find((c) => c.state === "active")
  const tone = activeStage?.stage === "test" ? "amber" : "teal"

  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Live job progress for ${jobNumber}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{jobNumber}</span>
          <strong className={styles.vehicle}>{vehicle}</strong>
        </div>
        <span className={styles.pct} aria-live="polite">
          {Math.round(percent)}%
        </span>
      </header>

      <ProgressLinear value={percent} tone={tone} variant="solid" />

      <ol className={styles.checkpoints} aria-label="Job checkpoints">
        {ordered.map((c) => (
          <li
            key={c.stage}
            className={`${styles.cp} ${styles[STATE_CLASS[c.state]]}`}
            aria-current={c.state === "active" ? "step" : undefined}
          >
            <span className={styles.dot} aria-hidden="true">
              {c.state === "done" ? (
                <Check size={10} strokeWidth={3} aria-hidden="true" />
              ) : null}
            </span>
            <span className={styles.cpLabel}>{JOB_STAGE_LABEL[c.stage]}</span>
            {c.at && <span className={styles.at}>{c.at}</span>}
          </li>
        ))}
      </ol>
    </article>
  )
}

export default LiveJobProgressStrip
