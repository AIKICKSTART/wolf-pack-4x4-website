"use client"

import type { CSSProperties } from "react"

import styles from "./coach-mark.module.css"

export type CoachMarkPlacement = "top" | "right" | "bottom" | "left"

interface CoachMarkProps {
  title: string
  body: string
  placement?: CoachMarkPlacement
  step?: number
  totalSteps?: number
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  style?: CSSProperties
  className?: string
  arrowAriaLabel?: string
}

export function CoachMark({
  title,
  body,
  placement = "bottom",
  step,
  totalSteps,
  primaryLabel = "Next",
  secondaryLabel = "Skip",
  onPrimary,
  onSecondary,
  style,
  className,
  arrowAriaLabel = "Pointer to highlighted element",
}: CoachMarkProps) {
  const classes = [styles.mark, styles[`placement_${placement}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} role="dialog" aria-label={title} style={style}>
      <span className={styles.arrow} aria-hidden="true" aria-label={arrowAriaLabel} />
      <header className={styles.head}>
        {typeof step === "number" && typeof totalSteps === "number" && (
          <span className={styles.progress}>
            Step {step} / {totalSteps}
          </span>
        )}
        <h3 className={styles.title}>{title}</h3>
      </header>
      <p className={styles.body}>{body}</p>
      <footer className={styles.foot}>
        {onSecondary && (
          <button type="button" className={styles.skip} onClick={onSecondary}>
            {secondaryLabel}
          </button>
        )}
        {onPrimary && (
          <button type="button" className={styles.next} onClick={onPrimary}>
            {primaryLabel}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </footer>
    </div>
  )
}

export default CoachMark
