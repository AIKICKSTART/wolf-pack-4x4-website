import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import {
  RUN_STEP_STATUS_LABEL,
  RUN_STEP_STATUS_TONE,
  TOOL_LABEL,
  type HermesRunStepKind,
  type HermesRunStepStatus,
  type HermesToolName,
} from "./hermes-agent-types"
import styles from "./run-timeline.module.css"

export interface RunTimelineStep {
  id: string
  kind: HermesRunStepKind
  title: string
  /** Short narrative line. */
  detail?: string
  /** Optional verbatim payload (e.g. tool args, plan text). */
  payload?: string
  status: HermesRunStepStatus
  /** Timestamp shown to operators. */
  timestamp: string
  /** Duration ms (when known). */
  durationMs?: number
  /** Tool used at this step, if kind === "tool". */
  toolName?: HermesToolName
}

interface RunTimelineProps {
  runId: string
  customerName: string
  steps: ReadonlyArray<RunTimelineStep>
  /** Total tokens consumed across the run. */
  tokenTotal?: number
  /** Total cost in cents. */
  costCents?: number
  /** Total wall-clock duration ms. */
  totalDurationMs?: number
  className?: string
}

const KIND_LABEL: Record<HermesRunStepKind, string> = {
  plan: "Plan",
  tool: "Tool call",
  reflection: "Reflection",
  response: "Response",
  handoff: "Handoff",
}

function StepIcon({
  kind,
  status,
}: {
  kind: HermesRunStepKind
  status: HermesRunStepStatus
}): ReactNode {
  if (status === "running") {
    return <Loader2 size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  if (status === "failed") {
    return <AlertTriangle size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  switch (kind) {
    case "plan":
      return <Sparkles size={13} strokeWidth={2.4} aria-hidden="true" />
    case "tool":
      return <Wrench size={13} strokeWidth={2.4} aria-hidden="true" />
    case "reflection":
      return <MessageCircle size={13} strokeWidth={2.4} aria-hidden="true" />
    case "response":
      return <Send size={13} strokeWidth={2.4} aria-hidden="true" />
    case "handoff":
      return <CheckCircle2 size={13} strokeWidth={2.4} aria-hidden="true" />
    default:
      return <Sparkles size={13} strokeWidth={2.4} aria-hidden="true" />
  }
}

function formatCost(cents?: number): string {
  if (cents === undefined) return "—"
  return `$${(cents / 100).toFixed(2)}`
}

function formatDuration(ms?: number): string {
  if (ms === undefined) return "—"
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

export function RunTimeline({
  runId,
  customerName,
  steps,
  tokenTotal,
  costCents,
  totalDurationMs,
  className,
}: RunTimelineProps) {
  const classes = [styles.timeline, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Run timeline ${runId} for ${customerName}`}
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>Run · {runId}</h3>
          <span className={styles.subtitle}>
            Conversation with {customerName} · {steps.length} steps
          </span>
        </div>
        <div className={styles.summaryBlock}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Tokens</span>
            <span className={styles.summaryValue}>
              {tokenTotal !== undefined ? tokenTotal.toLocaleString() : "—"}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Cost</span>
            <span className={styles.summaryValue}>{formatCost(costCents)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>
              {formatDuration(totalDurationMs)}
            </span>
          </div>
        </div>
      </header>

      <ol className={styles.list} aria-label="Run steps">
        {steps.map((step) => {
          const tone = RUN_STEP_STATUS_TONE[step.status]
          const stepTitle =
            step.kind === "tool" && step.toolName
              ? `${TOOL_LABEL[step.toolName]}`
              : step.title
          return (
            <li key={step.id} className={styles.step} data-status={step.status}>
              <span className={styles.dot} aria-hidden="true">
                <StepIcon kind={step.kind} status={step.status} />
              </span>
              <div className={styles.body}>
                <div className={styles.bodyHead}>
                  <span className={styles.kind}>{KIND_LABEL[step.kind]}</span>
                  <h4 className={styles.title2}>{stepTitle}</h4>
                  <Chip
                    label={RUN_STEP_STATUS_LABEL[step.status]}
                    tone={tone}
                  />
                </div>
                {step.detail ? (
                  <p className={styles.detail}>{step.detail}</p>
                ) : null}
                {step.payload ? (
                  <pre className={styles.payload}>
                    <code>{step.payload}</code>
                  </pre>
                ) : null}
              </div>
              <div className={styles.timing}>
                <strong>{step.timestamp}</strong>
                <span>{formatDuration(step.durationMs)}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default RunTimeline
