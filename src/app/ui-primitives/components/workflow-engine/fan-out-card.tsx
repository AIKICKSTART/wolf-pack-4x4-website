import { GitBranch, Layers } from "lucide-react"

import {
  JOIN_STRATEGY_LABEL,
  STATUS_LABEL,
  STATUS_TONE,
  formatDuration,
  type EngineJoinStrategy,
  type EngineStatus,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./fan-out-card.module.css"

/** Single lane in a fan-out card. */
export interface FanOutLane {
  id: string
  /** Lane label, e.g. "SMS · Mick", "Email · Mick", "Push · driver app". */
  label: string
  /** Sub-label — "Twilio · sms.send", "Mailgun · transactional". */
  service: string
  status: EngineStatus
  /** Lane runtime in milliseconds. */
  runtimeMs: number
}

interface FanOutCardProps {
  title: string
  /** Optional kicker. */
  kicker?: string
  /** Join strategy — first / all / race. */
  join: EngineJoinStrategy
  /** Lanes for the fan-out. */
  lanes: ReadonlyArray<FanOutLane>
  /** Maximum concurrent lane limit, displayed as a chip. */
  concurrencyCap?: number
  className?: string
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
}

export function FanOutCard({
  title,
  kicker = "Fan-out · parallel",
  join,
  lanes,
  concurrencyCap,
  className,
}: FanOutCardProps) {
  const totalRuntime = lanes.reduce((sum, lane) => sum + lane.runtimeMs, 0)
  const maxRuntime = Math.max(...lanes.map((lane) => lane.runtimeMs), 1)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={`Fan-out · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <GitBranch size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.joinChip}>{JOIN_STRATEGY_LABEL[join]}</span>
      </header>

      <div className={styles.metaRow}>
        <span className={styles.metaChip}>
          <Layers size={11} strokeWidth={2.4} aria-hidden="true" />
          {lanes.length} lanes
        </span>
        {concurrencyCap !== undefined ? (
          <span className={styles.metaChip}>
            Concurrency cap · {concurrencyCap}
          </span>
        ) : null}
        <span className={styles.metaChip}>
          Total · {formatDuration(totalRuntime)}
        </span>
      </div>

      <ol className={styles.lanes} aria-label="Fan-out lanes">
        {lanes.map((lane) => {
          const tone = STATUS_TONE[lane.status]
          const ratio = lane.runtimeMs / maxRuntime
          return (
            <li
              key={lane.id}
              className={styles.lane}
              data-status={lane.status}
              style={{ "--lane-tone": TONE_VAR[tone] } as Record<string, string>}
            >
              <div className={styles.laneHead}>
                <div className={styles.laneTitleBlock}>
                  <span className={styles.laneLabel}>{lane.label}</span>
                  <span className={styles.laneService}>{lane.service}</span>
                </div>
                <span className={styles.laneStatus}>
                  <span className={styles.laneStatusDot} aria-hidden="true" />
                  {STATUS_LABEL[lane.status]}
                </span>
              </div>
              <div className={styles.laneTrack} aria-hidden="true">
                <span
                  className={styles.laneFill}
                  style={{ width: `${Math.max(4, ratio * 100)}%` }}
                />
              </div>
              <span className={styles.laneRuntime}>
                {formatDuration(lane.runtimeMs)}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default FanOutCard
