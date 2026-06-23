import type { CSSProperties } from "react"

import { TONE_VAR, type TourTone } from "./tour-types"
import styles from "./step-progress-dots.module.css"

interface StepProgressDotsProps {
  /** 1-based current step index. */
  currentStep: number
  /** Total steps in the tour. */
  totalSteps: number
  /** Variant — dots, bars, or numeric counter. */
  variant?: "dots" | "bars" | "counter"
  tone?: TourTone
  /** Optional aria label override. */
  ariaLabel?: string
  className?: string
}

export function StepProgressDots({
  currentStep,
  totalSteps,
  variant = "dots",
  tone = "teal",
  ariaLabel,
  className,
}: StepProgressDotsProps) {
  const safeTotal = Math.max(1, totalSteps)
  const safeCurrent = Math.max(1, Math.min(currentStep, safeTotal))
  const label =
    ariaLabel ?? `Tour step ${safeCurrent} of ${safeTotal}`

  const classes = [
    styles.wrapper,
    styles[`variant_${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  if (variant === "counter") {
    return (
      <div
        className={classes}
        role="progressbar"
        aria-valuenow={safeCurrent}
        aria-valuemin={1}
        aria-valuemax={safeTotal}
        aria-label={label}
        style={{ "--dot-tone": TONE_VAR[tone] } as CSSProperties}
      >
        <span className={styles.counterCurrent}>
          {String(safeCurrent).padStart(2, "0")}
        </span>
        <span className={styles.counterSeparator} aria-hidden="true">
          /
        </span>
        <span className={styles.counterTotal}>
          {String(safeTotal).padStart(2, "0")}
        </span>
      </div>
    )
  }

  const items = Array.from({ length: safeTotal }, (_, index) => index + 1)

  return (
    <ol
      className={classes}
      role="progressbar"
      aria-valuenow={safeCurrent}
      aria-valuemin={1}
      aria-valuemax={safeTotal}
      aria-label={label}
      style={{ "--dot-tone": TONE_VAR[tone] } as CSSProperties}
    >
      {items.map((item) => {
        const isComplete = item < safeCurrent
        const isCurrent = item === safeCurrent
        const classList = [
          styles.item,
          isComplete ? styles.itemComplete : null,
          isCurrent ? styles.itemCurrent : null,
        ]
          .filter(Boolean)
          .join(" ")
        return (
          <li key={item} className={classList} aria-hidden="true">
            <span className={styles.dot} />
          </li>
        )
      })}
    </ol>
  )
}

export default StepProgressDots
