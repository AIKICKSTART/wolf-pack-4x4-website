import { Check } from "lucide-react"

import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./checkout-stepper.module.css"

export type CheckoutStepStatus = "complete" | "current" | "upcoming"

export interface CheckoutStep {
  key: string
  label: string
  description?: string
  status: CheckoutStepStatus
}

interface CheckoutStepperProps {
  steps: ReadonlyArray<CheckoutStep>
  ariaLabel?: string
}

const STATUS_CLASS: Record<CheckoutStepStatus, string> = {
  complete: styles.complete,
  current: styles.current,
  upcoming: styles.upcoming,
}

export function CheckoutStepper({
  steps,
  ariaLabel = "Checkout progress",
}: CheckoutStepperProps) {
  const completeCount = steps.filter((step) => step.status === "complete").length
  const currentIndex = steps.findIndex((step) => step.status === "current")
  const totalIndex = currentIndex >= 0 ? currentIndex : completeCount
  const progress = steps.length > 0 ? Math.round(((totalIndex + 0.5) / steps.length) * 100) : 0

  return (
    <nav className={styles.nav} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const isComplete = step.status === "complete"
          const isCurrent = step.status === "current"
          return (
            <li
              key={step.key}
              className={`${styles.item} ${STATUS_CLASS[step.status]}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className={styles.indexBadge} aria-hidden="true">
                {isComplete ? (
                  <Check size={14} strokeWidth={2.8} />
                ) : (
                  <span>{String(index + 1).padStart(2, "0")}</span>
                )}
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{step.label}</span>
                {step.description && (
                  <span className={styles.description}>{step.description}</span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
      <ProgressLinear
        value={progress}
        variant="segmented"
        segments={steps.length * 4}
        tone="amber"
        label={`Step ${currentIndex + 1} of ${steps.length}`}
        showLabel
      />
    </nav>
  )
}

export default CheckoutStepper
