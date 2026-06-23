import {
  STEP_LABEL,
  type KycStepId,
} from "./kyc-types"
import styles from "./kyc-progress-stepper.module.css"

export type KycStepState = "complete" | "current" | "upcoming" | "locked"

export interface KycStep {
  id: KycStepId
  state: KycStepState
  /** Optional override label; defaults to STEP_LABEL[id]. */
  label?: string
  /** Optional caption line beneath the label. */
  caption?: string
}

export interface KycProgressStepperProps {
  steps: ReadonlyArray<KycStep>
  /** ARIA label for the progressbar wrapper. */
  progressLabel?: string
  className?: string
}

function computePercent(steps: ReadonlyArray<KycStep>): number {
  if (steps.length === 0) return 0
  const completed = steps.filter((s) => s.state === "complete").length
  const current = steps.findIndex((s) => s.state === "current")
  // halfway across the current dot if there is one
  const index = current >= 0 ? current : completed
  if (steps.length === 1) {
    return steps[0].state === "complete" ? 100 : 0
  }
  return Math.round((index / (steps.length - 1)) * 100)
}

export function KycProgressStepper({
  steps,
  progressLabel = "KYC progress",
  className,
}: KycProgressStepperProps) {
  const percent = computePercent(steps)
  const currentIndex = steps.findIndex((s) => s.state === "current")
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="progressbar"
      aria-label={progressLabel}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railTrack} />
        <span className={styles.railFill} style={{ width: `${percent}%` }} />
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const label = step.label ?? STEP_LABEL[step.id]
          const isCurrent = step.state === "current" || index === currentIndex
          return (
            <li
              key={step.id}
              className={styles.step}
              data-state={step.state}
              {...(isCurrent ? { "aria-current": "step" as const } : {})}
            >
              <span className={styles.dot} aria-hidden="true">
                {step.state === "complete" ? (
                  <svg viewBox="0 0 12 12" width="10" height="10">
                    <path
                      d="M2 6 L5 9 L10 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : step.state === "locked" ? (
                  <svg viewBox="0 0 12 12" width="9" height="9">
                    <rect
                      x="2"
                      y="6"
                      width="8"
                      height="5"
                      fill="currentColor"
                    />
                    <path
                      d="M4 6 V4 a2 2 0 0 1 4 0 V6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <span className={styles.dotIndex}>{index + 1}</span>
                )}
              </span>
              <span className={styles.label}>{label}</span>
              {step.caption ? (
                <span className={styles.caption}>{step.caption}</span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default KycProgressStepper
