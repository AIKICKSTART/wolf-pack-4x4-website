import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Wrench,
} from "lucide-react"

import {
  MODEL_LABEL,
  NODE_KIND_LABEL,
  NODE_STATUS_TONE,
  formatCost,
  formatTokens,
  type WorkflowModelId,
  type WorkflowNodeKind,
  type WorkflowNodeStatus,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./chain-step-row.module.css"

interface ChainStepRowProps {
  index: number
  /** Kind for the row icon. */
  kind: WorkflowNodeKind
  /** Step label, e.g. "Classify intent". */
  title: string
  /** Optional model used at this step. */
  modelId?: WorkflowModelId
  status: WorkflowNodeStatus
  /** Short truncated preview of the input. */
  inputPreview: string
  /** Short truncated preview of the output. */
  outputPreview: string
  /** Token spend at this step. */
  tokens: number
  /** Cost in USD. */
  costUsd: number
  /** Latency in ms. */
  latencyMs?: number
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

function StatusIcon({ status }: { status: WorkflowNodeStatus }) {
  if (status === "running") {
    return (
      <Loader2 size={12} strokeWidth={2.4} className={styles.spin} aria-hidden="true" />
    )
  }
  if (status === "failed") {
    return <AlertCircle size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  if (status === "skipped") {
    return <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  return <CheckCircle2 size={12} strokeWidth={2.4} aria-hidden="true" />
}

export function ChainStepRow({
  index,
  kind,
  title,
  modelId,
  status,
  inputPreview,
  outputPreview,
  tokens,
  costUsd,
  latencyMs,
  className,
}: ChainStepRowProps) {
  const tone = NODE_STATUS_TONE[status]
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      data-status={status}
      style={{ "--row-tone": TONE_VAR[tone] } as Record<string, string>}
      aria-label={`Chain step ${index + 1} · ${title}`}
    >
      <span className={styles.index}>
        {(index + 1).toString().padStart(2, "0")}
      </span>
      <div className={styles.body}>
        <header className={styles.head}>
          <div className={styles.titleBlock}>
            <span className={styles.kindKicker}>
              <Wrench size={11} strokeWidth={2.4} aria-hidden="true" />{" "}
              {NODE_KIND_LABEL[kind]}
              {modelId ? ` · ${MODEL_LABEL[modelId]}` : ""}
            </span>
            <h4 className={styles.title}>{title}</h4>
          </div>
          <span className={styles.statusChip} aria-label={`Status ${status}`}>
            <StatusIcon status={status} />
            {status}
          </span>
        </header>

        <div className={styles.io}>
          <div className={styles.ioBlock}>
            <span className={styles.ioLabel}>Input</span>
            <p className={styles.ioPreview}>{inputPreview}</p>
          </div>
          <span className={styles.ioArrow} aria-hidden="true">
            <ArrowRight size={13} strokeWidth={2.4} />
          </span>
          <div className={styles.ioBlock}>
            <span className={styles.ioLabel}>Output</span>
            <p className={styles.ioPreview}>{outputPreview}</p>
          </div>
        </div>

        <footer className={styles.metrics}>
          <span className={styles.metric}>
            <span className={styles.metricLabel}>Tokens</span>
            <span className={styles.metricValue}>{formatTokens(tokens)}</span>
          </span>
          <span className={styles.metric}>
            <span className={styles.metricLabel}>Cost</span>
            <span className={styles.metricValue}>{formatCost(costUsd)}</span>
          </span>
          {latencyMs !== undefined ? (
            <span className={styles.metric}>
              <span className={styles.metricLabel}>Latency</span>
              <span className={styles.metricValue}>{latencyMs}ms</span>
            </span>
          ) : null}
        </footer>
      </div>
    </article>
  )
}

export default ChainStepRow
