import type { CSSProperties } from "react"

import styles from "./form-stepper.module.css"

export interface FormStepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

type StepState = "done" | "active" | "pending"

function resolveState(index: number, currentStep: number): StepState {
  if (index < currentStep) return "done"
  if (index === currentStep) return "active"
  return "pending"
}

export function FormStepper({ steps, currentStep, className }: FormStepperProps) {
  const safeCurrent = Math.min(Math.max(currentStep, 0), steps.length - 1)
  const progress =
    steps.length <= 1 ? 0 : (safeCurrent / (steps.length - 1)) * 100
  const trackStyle = {
    "--stepper-count": String(steps.length),
    "--stepper-progress": `${progress}%`,
  } as CSSProperties

  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const currentLabel = steps[safeCurrent] ?? ""

  return (
    <div
      className={classes}
      role="group"
      aria-label={`Step ${safeCurrent + 1} of ${steps.length}: ${currentLabel}`}
    >
      <ol className={styles.track} style={trackStyle}>
        <span className={styles.rail} aria-hidden="true">
          <span className={styles.railFill} />
        </span>
        {steps.map((label, index) => {
          const state = resolveState(index, safeCurrent)
          const isCurrent = state === "active"
          return (
            <li
              key={`${label}-${index}`}
              className={styles.step}
              data-state={state}
              {...(isCurrent ? { "aria-current": "step" as const } : {})}
            >
              <span className={styles.dot} aria-hidden="true">
                {state === "done" ? "✓" : index + 1}
              </span>
              <span className={styles.label}>{label}</span>
            </li>
          )
        })}
      </ol>

      <div className={styles.summary}>
        <span>
          Step <strong>{safeCurrent + 1}</strong> of {steps.length}
        </span>
        <span>{currentLabel}</span>
      </div>
    </div>
  )
}

export default FormStepper
