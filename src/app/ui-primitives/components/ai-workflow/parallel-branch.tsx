import { GitBranch } from "lucide-react"

import {
  JOIN_STRATEGY_LABEL,
  NODE_STATUS_LABEL,
  NODE_STATUS_TONE,
  type WorkflowJoinStrategy,
  type WorkflowNodeStatus,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./parallel-branch.module.css"

export interface ParallelBranchLane {
  id: string
  name: string
  /** Short description of the branch — e.g. "GPT-4o draft". */
  detail: string
  status: WorkflowNodeStatus
  /** Optional latency ms. */
  latencyMs?: number
  /** Optional score (0..100) for race strategies. */
  score?: number
}

interface ParallelBranchProps {
  title: string
  /** Short context kicker. */
  kicker?: string
  /** Join strategy. */
  join: WorkflowJoinStrategy
  /** Lanes that run in parallel. */
  lanes: ReadonlyArray<ParallelBranchLane>
  className?: string
}

const TONE_VAR: Record<WorkflowTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-teal)",
}

export function ParallelBranch({
  title,
  kicker = "Parallel branch",
  join,
  lanes,
  className,
}: ParallelBranchProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Parallel branch · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <GitBranch size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.joinChip}>
          Join · {JOIN_STRATEGY_LABEL[join]}
        </span>
      </header>

      <div className={styles.fan} aria-hidden="true">
        <span className={styles.fanIn} />
        <span className={styles.fanLines}>
          {lanes.map((lane) => (
            <span key={lane.id} className={styles.fanLine} />
          ))}
        </span>
        <span className={styles.fanOut} />
      </div>

      <ol className={styles.lanes} aria-label="Parallel lanes">
        {lanes.map((lane) => {
          const tone = NODE_STATUS_TONE[lane.status]
          return (
            <li
              key={lane.id}
              className={styles.lane}
              data-status={lane.status}
              style={{ "--lane-tone": TONE_VAR[tone] } as Record<string, string>}
            >
              <span className={styles.laneDot} aria-hidden="true" />
              <div className={styles.laneBody}>
                <span className={styles.laneName}>{lane.name}</span>
                <span className={styles.laneDetail}>{lane.detail}</span>
              </div>
              <span className={styles.laneStats}>
                <span className={styles.laneStatus}>
                  {NODE_STATUS_LABEL[lane.status]}
                </span>
                {lane.latencyMs !== undefined ? (
                  <span className={styles.laneChip}>{lane.latencyMs}ms</span>
                ) : null}
                {lane.score !== undefined ? (
                  <span className={styles.laneChip}>{lane.score}/100</span>
                ) : null}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default ParallelBranch
