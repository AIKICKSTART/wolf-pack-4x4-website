import { Check, Clock, X } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type { ApprovalStage } from "./social-scheduler-types"

interface ApprovalStageTrackerProps {
  title?: string
  stages: ReadonlyArray<ApprovalStage>
}

function StateIcon({ state }: { state: ApprovalStage["state"] }) {
  if (state === "approved") return <Check size={11} aria-hidden="true" />
  if (state === "rejected") return <X size={11} aria-hidden="true" />
  return <Clock size={11} aria-hidden="true" />
}

const STATE_LABEL: Record<ApprovalStage["state"], string> = {
  pending: "Pending",
  current: "Awaiting",
  approved: "Approved",
  rejected: "Rejected",
}

function formatDate(iso: string | undefined): string {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ApprovalStageTracker({
  title = "Approval workflow",
  stages,
}: ApprovalStageTrackerProps) {
  const currentIdx = stages.findIndex((stage) => stage.state === "current")
  const positionLabel =
    currentIdx >= 0
      ? `Step ${currentIdx + 1} of ${stages.length} · ${stages[currentIdx].label}`
      : `${stages.length} step workflow`

  return (
    <section
      className={`${styles.frame} ${styles.approvalTracker}`}
      aria-label={`${title}, ${positionLabel}`}
    >
      <header className={styles.approvalHead}>
        <h2 className={styles.approvalTitle}>{title}</h2>
        <span className={styles.composerEyebrow}>{positionLabel}</span>
      </header>

      <ol className={styles.approvalStages} aria-label="Approval stages">
        {stages.map((stage) => (
          <li
            key={stage.id}
            className={styles.approvalStage}
            data-state={stage.state}
            aria-current={stage.state === "current" ? "step" : undefined}
          >
            <div className={styles.approvalStageHead}>
              <span className={styles.approvalStageDot} aria-hidden="true" />
              <span className={styles.approvalStageLabel}>{stage.label}</span>
            </div>
            <span className={styles.approvalStageOwner}>{stage.owner}</span>
            {stage.note && (
              <p className={styles.approvalStageNote}>{stage.note}</p>
            )}
            <span className={styles.approvalStageMeta}>
              <StateIcon state={stage.state} /> {STATE_LABEL[stage.state]}
              {stage.completedAt ? ` · ${formatDate(stage.completedAt)}` : ""}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ApprovalStageTracker
