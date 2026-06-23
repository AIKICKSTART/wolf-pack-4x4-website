"use client"

import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Info,
} from "lucide-react"
import { useState } from "react"

import {
  STATUS_LABEL,
  STATUS_TONE,
  TRACE_LEVEL_TONE,
  formatDuration,
  type EngineStatus,
  type EngineTone,
  type EngineTraceLevel,
} from "./workflow-engine-types"
import styles from "./run-trace-viewer.module.css"

/** Single span on the trace timeline. */
export interface RunTraceSpan {
  id: string
  /** Step label, e.g. "Send SMS · Twilio". */
  label: string
  /** Sub-label — service / step kind. */
  service: string
  status: EngineStatus
  /** Start offset within the run, in milliseconds. */
  startOffsetMs: number
  /** Span duration in milliseconds. */
  durationMs: number
  /** Optional inline message — surfaces on expand. */
  message?: string
  /** Log level for the message — drives the tone of the expanded chip. */
  level?: EngineTraceLevel
}

interface RunTraceViewerProps {
  /** Run id label — shown in the kicker. */
  runId: string
  /** Optional kicker prefix. */
  kicker?: string
  /** Title — e.g. "Refund > $200 · 09:14 trace". */
  title: string
  /** Total run duration in milliseconds — drives the timeline scale. */
  totalDurationMs: number
  /** Spans rendered onto the gantt-style timeline. */
  spans: ReadonlyArray<RunTraceSpan>
  /** Whether to default-expand all spans. */
  defaultExpanded?: boolean
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

function LevelIcon({ level }: { level: EngineTraceLevel }) {
  if (level === "error") {
    return <AlertCircle size={11} strokeWidth={2.4} aria-hidden="true" />
  }
  if (level === "warn") {
    return <AlertCircle size={11} strokeWidth={2.4} aria-hidden="true" />
  }
  return <Info size={11} strokeWidth={2.4} aria-hidden="true" />
}

export function RunTraceViewer({
  runId,
  kicker = "Run trace",
  title,
  totalDurationMs,
  spans,
  defaultExpanded = false,
  className,
}: RunTraceViewerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set(defaultExpanded ? spans.map((span) => span.id) : []),
  )

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const classes = [styles.viewer, className].filter(Boolean).join(" ")
  const safeTotal = Math.max(totalDurationMs, 1)

  return (
    <section className={classes} aria-label={`Trace viewer · ${title}`}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>
            {kicker} · {runId}
          </span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.totalChip}>
          Total · {formatDuration(totalDurationMs)}
        </span>
      </header>

      <div className={styles.scale} aria-hidden="true">
        {[0, 0.25, 0.5, 0.75, 1].map((step) => (
          <span key={step} className={styles.scaleTick}>
            {formatDuration(safeTotal * step)}
          </span>
        ))}
      </div>

      <ol className={styles.spans} aria-label="Trace spans">
        {spans.map((span) => {
          const tone = STATUS_TONE[span.status]
          const isExpanded = expanded.has(span.id)
          const offsetPct = (span.startOffsetMs / safeTotal) * 100
          const widthPct = Math.max(2, (span.durationMs / safeTotal) * 100)
          const levelTone =
            span.level !== undefined ? TRACE_LEVEL_TONE[span.level] : "neutral"
          return (
            <li
              key={span.id}
              className={styles.span}
              data-status={span.status}
              style={
                {
                  "--span-tone": TONE_VAR[tone],
                  "--level-tone": TONE_VAR[levelTone],
                } as Record<string, string>
              }
            >
              <button
                type="button"
                className={styles.spanBtn}
                onClick={() => toggle(span.id)}
                aria-expanded={isExpanded}
                aria-controls={`trace-detail-${span.id}`}
              >
                <span className={styles.expandIcon} aria-hidden="true">
                  {isExpanded ? (
                    <ChevronDown size={12} strokeWidth={2.4} />
                  ) : (
                    <ChevronRight size={12} strokeWidth={2.4} />
                  )}
                </span>
                <div className={styles.spanLabelBlock}>
                  <span className={styles.spanLabel}>{span.label}</span>
                  <span className={styles.spanService}>{span.service}</span>
                </div>
                <div className={styles.timelineTrack} aria-hidden="true">
                  <span
                    className={styles.timelineBar}
                    style={{ left: `${offsetPct}%`, width: `${widthPct}%` }}
                  />
                </div>
                <span className={styles.spanStatus}>
                  {span.status === "passed" ? (
                    <CheckCircle2 size={11} strokeWidth={2.4} aria-hidden="true" />
                  ) : null}
                  {STATUS_LABEL[span.status]}
                </span>
                <span className={styles.spanDuration}>
                  {formatDuration(span.durationMs)}
                </span>
              </button>
              {isExpanded && span.message ? (
                <div
                  id={`trace-detail-${span.id}`}
                  className={styles.spanDetail}
                  data-level={span.level ?? "info"}
                >
                  <span className={styles.detailIcon} aria-hidden="true">
                    <LevelIcon level={span.level ?? "info"} />
                  </span>
                  <span className={styles.detailMessage}>{span.message}</span>
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default RunTraceViewer
