import { AlertTriangle, Check, Circle, Loader2 } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./installation-progress.module.css"

export type InstallationStepId =
  | "downloading"
  | "verifying"
  | "configuring"
  | "permissions"
  | "done"

export type InstallationStepStatus = "pending" | "active" | "done" | "error"

export interface InstallationStep {
  id: InstallationStepId
  label: string
  description?: string
  status: InstallationStepStatus
}

export interface InstallationProgressProps {
  steps: ReadonlyArray<InstallationStep>
  title?: string
  subtitle?: string
  className?: string
}

const STATUS_TONE_CLASS: Record<InstallationStepStatus, string> = {
  pending: styles.tonePending,
  active: styles.toneActive,
  done: styles.toneDone,
  error: styles.toneError,
}

const STATUS_LABEL: Record<InstallationStepStatus, string> = {
  pending: "Pending",
  active: "Running",
  done: "Done",
  error: "Error",
}

function BulletIcon({ status }: { status: InstallationStepStatus }): ReactNode {
  const props = { size: 14, strokeWidth: 2.4, "aria-hidden": true } as const
  if (status === "done") {
    return <Check {...props} />
  }
  if (status === "active") {
    return <Loader2 {...props} className={styles.spin} />
  }
  if (status === "error") {
    return <AlertTriangle {...props} />
  }
  return <Circle {...props} />
}

function computeFillPercent(steps: ReadonlyArray<InstallationStep>): number {
  if (steps.length === 0) {
    return 0
  }
  const completed = steps.filter((step) => step.status === "done").length
  const hasActive = steps.some((step) => step.status === "active")
  const denominator = steps.length
  const numerator = hasActive ? completed + 0.5 : completed
  return Math.min(100, Math.round((numerator / denominator) * 100))
}

export function InstallationProgress({
  steps,
  title = "Installation progress",
  subtitle,
  className,
}: InstallationProgressProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")
  const fillPercent = computeFillPercent(steps)
  const activeStep = steps.find((step) => step.status === "active")
  const liveSummary = activeStep
    ? `Step ${activeStep.label} running. ${fillPercent} percent complete.`
    : fillPercent === 100
      ? "Installation complete."
      : `Installation paused. ${fillPercent} percent complete.`

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </header>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={fillPercent}
        aria-label={`Installation ${fillPercent} percent complete`}
      >
        <span className={styles.fill} style={{ width: `${fillPercent}%` }} />
      </div>

      <ol className={styles.list}>
        {steps.map((step) => (
          <li
            key={step.id}
            className={[styles.row, STATUS_TONE_CLASS[step.status]].join(" ")}
            aria-current={step.status === "active" ? "step" : undefined}
          >
            <span className={styles.bullet} aria-hidden="true">
              <BulletIcon status={step.status} />
            </span>
            <div className={styles.label}>
              <span className={styles.labelTitle}>{step.label}</span>
              {step.description && (
                <span className={styles.labelDescription}>{step.description}</span>
              )}
            </div>
            <span className={styles.statusChip}>{STATUS_LABEL[step.status]}</span>
          </li>
        ))}
      </ol>

      <span role="status" aria-live="polite" className={styles.subtitle}>
        {liveSummary}
      </span>
    </section>
  )
}

export default InstallationProgress
