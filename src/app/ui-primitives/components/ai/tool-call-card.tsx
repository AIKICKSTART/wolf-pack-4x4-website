import { AlertCircle, CheckCircle2, ChevronRight, Loader2, Wrench } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import styles from "./tool-call-card.module.css"

export type ToolCallStatus = "running" | "done" | "failed"

interface ToolCallCardProps {
  toolName: string
  status: ToolCallStatus
  inputJson: string
  outputJson?: string
  durationMs?: number
  defaultOpen?: boolean
  className?: string
}

const STATUS_LABEL: Record<ToolCallStatus, string> = {
  running: "Running",
  done: "Done",
  failed: "Failed",
}

function StatusIcon({ status }: { status: ToolCallStatus }) {
  if (status === "running") {
    return <Loader2 size={13} strokeWidth={2.4} className={styles.spin} aria-hidden="true" />
  }
  if (status === "failed") {
    return <AlertCircle size={13} strokeWidth={2.4} aria-hidden="true" />
  }
  return <CheckCircle2 size={13} strokeWidth={2.4} aria-hidden="true" />
}

export function ToolCallCard({
  toolName,
  status,
  inputJson,
  outputJson,
  durationMs,
  defaultOpen = false,
  className,
}: ToolCallCardProps) {
  const classes = [styles.card, styles[`status_${status}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <details className={classes} open={defaultOpen}>
      <summary className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Wrench size={14} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className={styles.name}>{toolName}</span>
        <span className={styles.statusChip} data-status={status}>
          <StatusIcon status={status} />
          {STATUS_LABEL[status]}
        </span>
        {durationMs !== undefined && (
          <span className={styles.duration}>{durationMs}ms</span>
        )}
        <ChevronRight
          size={14}
          strokeWidth={2.2}
          className={styles.caret}
          aria-hidden="true"
        />
      </summary>
      <div className={styles.body}>
        <div className={styles.block}>
          <span className={styles.blockLabel}>Input</span>
          <CodeBlock code={inputJson} language="json" showLineNumbers={false} maxHeight={220} />
        </div>
        {outputJson && (
          <div className={styles.block}>
            <span className={styles.blockLabel}>Output</span>
            <CodeBlock
              code={outputJson}
              language="json"
              showLineNumbers={false}
              maxHeight={220}
            />
          </div>
        )}
      </div>
    </details>
  )
}

export default ToolCallCard
