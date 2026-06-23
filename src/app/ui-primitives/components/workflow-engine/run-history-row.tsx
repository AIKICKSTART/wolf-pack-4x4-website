import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MinusCircle,
  PauseCircle,
  StopCircle,
} from "lucide-react"

import {
  STATUS_LABEL,
  STATUS_TONE,
  TRIGGER_KIND_LABEL,
  TRIGGER_KIND_TONE,
  formatDuration,
  type EngineStatus,
  type EngineTone,
  type EngineTriggerKind,
} from "./workflow-engine-types"
import styles from "./run-history-row.module.css"

/**
 * Single row in the workflow run-history list. Wider than a table row —
 * surfaces a tile-shaped run that shows trigger, started timestamp,
 * step progress mini-strip, status pill, duration, and a final
 * "View run trace" link. Tabular numerics on the metric chips so the
 * scan column lines up.
 */
interface RunHistoryRowProps {
  /** Run identifier — used for the trailing link target. */
  runId: string
  /** Started timestamp label, e.g. "2026-05-29 09:14". */
  startedAt: string
  /** Trigger kind discriminator. */
  triggerKind: EngineTriggerKind
  /** Short trigger label — e.g. "Refund > $200 webhook". */
  triggerLabel: string
  status: EngineStatus
  /** Run duration in milliseconds — formatted to display. */
  durationMs: number
  /** Number of steps that have completed in this run. */
  stepsCompleted: number
  /** Total step count. */
  stepsTotal: number
  /** Optional final destination — e.g. "Manager approval". */
  finalStepLabel?: string
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

function StatusIcon({ status }: { status: EngineStatus }) {
  if (status === "running") {
    return <Loader2 size={13} strokeWidth={2.4} className={styles.spin} aria-hidden="true" />
  }
  if (status === "failed") {
    return <AlertCircle size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  if (status === "skipped") {
    return <MinusCircle size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  if (status === "cancelled") {
    return <StopCircle size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  if (status === "waiting") {
    return <PauseCircle size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  return <CheckCircle2 size={13} strokeWidth={2.4} aria-hidden="true" />
}

export function RunHistoryRow({
  runId,
  startedAt,
  triggerKind,
  triggerLabel,
  status,
  durationMs,
  stepsCompleted,
  stepsTotal,
  finalStepLabel,
  className,
}: RunHistoryRowProps) {
  const tone = STATUS_TONE[status]
  const triggerTone = TRIGGER_KIND_TONE[triggerKind]
  const ratio = stepsTotal > 0 ? Math.min(1, stepsCompleted / stepsTotal) : 0
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      data-status={status}
      style={
        {
          "--row-tone": TONE_VAR[tone],
          "--row-trigger-tone": TONE_VAR[triggerTone],
        } as Record<string, string>
      }
      aria-label={`Workflow run ${runId} · ${STATUS_LABEL[status]}`}
    >
      <div className={styles.timestamp}>
        <strong className={styles.timeStrong}>{startedAt}</strong>
        <small className={styles.runId}>Run · {runId}</small>
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.triggerChip}>
            <span className={styles.triggerDot} aria-hidden="true" />
            {TRIGGER_KIND_LABEL[triggerKind]} · {triggerLabel}
          </span>
          <span className={styles.statusChip} aria-label={`Status ${STATUS_LABEL[status]}`}>
            <StatusIcon status={status} />
            {STATUS_LABEL[status]}
          </span>
        </header>

        <div className={styles.progressRow}>
          <div className={styles.progressTrack} aria-hidden="true">
            <span
              className={styles.progressFill}
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
          <span className={styles.progressLabel}>
            {stepsCompleted} / {stepsTotal} steps
          </span>
        </div>
      </div>

      <div className={styles.metrics}>
        <span className={styles.metric}>
          <span className={styles.metricLabel}>Duration</span>
          <span className={styles.metricValue}>{formatDuration(durationMs)}</span>
        </span>
        {finalStepLabel ? (
          <span className={styles.finalChip}>Last · {finalStepLabel}</span>
        ) : null}
        <a
          className={styles.viewLink}
          href={`#run-${runId}`}
          aria-label={`View trace for run ${runId}`}
        >
          Trace
          <ArrowRight size={12} strokeWidth={2.4} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default RunHistoryRow
