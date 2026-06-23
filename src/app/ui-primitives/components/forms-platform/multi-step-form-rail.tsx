import type { FormWizardStep, WizardStepState } from "./forms-platform-types"
import styles from "./multi-step-form-rail.module.css"

interface MultiStepFormRailProps {
  /** Title surfaced at the top left — e.g. "Trade account application". */
  title: string
  /** Ordered list of steps. */
  steps: ReadonlyArray<FormWizardStep>
  /** Optional explicit overall percent — overrides the derived value. */
  overallPercent?: number
  className?: string
}

const STEP_STATE_CLASS: Record<WizardStepState, string> = {
  complete: styles.stepComplete,
  current: styles.stepCurrent,
  upcoming: "",
  skipped: styles.stepSkipped,
}

const BUBBLE_STATE_CLASS: Record<WizardStepState, string> = {
  complete: styles.indexBubbleComplete,
  current: styles.indexBubbleCurrent,
  upcoming: "",
  skipped: styles.indexBubbleSkipped,
}

function deriveOverallPercent(steps: ReadonlyArray<FormWizardStep>): number {
  if (steps.length === 0) {
    return 0
  }
  const total = steps.reduce((sum, step) => {
    if (step.state === "complete") {
      return sum + 100
    }
    if (step.state === "current") {
      return sum + (step.progress ?? 0)
    }
    return sum
  }, 0)
  return Math.round(total / steps.length)
}

export function MultiStepFormRail({
  title,
  steps,
  overallPercent,
  className,
}: MultiStepFormRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")
  const overall = overallPercent ?? deriveOverallPercent(steps)
  const clampedOverall = Math.max(0, Math.min(100, overall))
  const currentStep = steps.find((step) => step.state === "current")

  return (
    <section className={classes} aria-label={`${title} progress`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Multi-step form</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.percentBlock}>
          <span className={styles.percentValue}>{clampedOverall}%</span>
          <span className={styles.percentLabel}>
            Step {currentStep ? currentStep.index : 1} of {steps.length}
          </span>
        </div>
      </header>

      <ol
        className={styles.steps}
        aria-label="Form steps"
      >
        {steps.map((step) => {
          const stepClass = [styles.step, STEP_STATE_CLASS[step.state]]
            .filter(Boolean)
            .join(" ")
          const bubbleClass = [
            styles.indexBubble,
            BUBBLE_STATE_CLASS[step.state],
          ]
            .filter(Boolean)
            .join(" ")
          const percent =
            step.state === "complete"
              ? 100
              : step.state === "current"
                ? Math.max(0, Math.min(100, step.progress ?? 0))
                : 0
          const fillClass = [
            styles.barFill,
            step.state === "complete" ? styles.barFillComplete : "",
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <li
              key={step.id}
              className={stepClass}
              aria-current={step.state === "current" ? "step" : undefined}
            >
              <div className={styles.stepHead}>
                <span className={bubbleClass} aria-hidden="true">
                  {step.state === "complete" ? "✓" : step.index}
                </span>
                <span className={styles.stepTitle}>{step.title}</span>
              </div>
              <div className={styles.stepMeta}>
                <span>
                  {step.fieldCount !== undefined
                    ? `${step.fieldCount} field${step.fieldCount === 1 ? "" : "s"}`
                    : "—"}
                </span>
                <span>{percent}%</span>
              </div>
              <span
                className={styles.barTrack}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-label={`${step.title} progress`}
              >
                <span
                  className={fillClass}
                  style={{ width: `${percent}%` }}
                />
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
