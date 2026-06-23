import type { CSSProperties } from "react"

import styles from "./progress-linear.module.css"

export type ProgressLinearTone = "red" | "amber" | "teal" | "green"
export type ProgressLinearVariant = "solid" | "striped" | "segmented" | "indeterminate"

interface ProgressLinearProps {
  value?: number
  max?: number
  tone?: ProgressLinearTone
  variant?: ProgressLinearVariant
  segments?: number
  label?: string
  showLabel?: boolean
  className?: string
}

const TONE_VAR: Record<ProgressLinearTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

const VARIANT_CLASS: Record<ProgressLinearVariant, string> = {
  solid: styles.solid,
  striped: styles.striped,
  segmented: styles.segmented,
  indeterminate: styles.indeterminate,
}

export function ProgressLinear({
  value = 0,
  max = 100,
  tone = "teal",
  variant = "solid",
  segments = 8,
  label,
  showLabel = false,
  className,
}: ProgressLinearProps) {
  const safeValue = Math.max(0, Math.min(value, max))
  const ratio = max > 0 ? safeValue / max : 0
  const percentage = Math.round(ratio * 100)
  const isIndeterminate = variant === "indeterminate"

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  if (variant === "segmented") {
    const safeSegments = Math.max(1, Math.min(segments, 24))
    const filled = Math.round(safeSegments * ratio)
    const blocks = Array.from({ length: safeSegments }, (_, index) => index)

    return (
      <div className={classes}>
        {(showLabel || label) && (
          <div className={styles.head}>
            {label && <span className={styles.label}>{label}</span>}
            {showLabel && <span className={styles.value}>{percentage}%</span>}
          </div>
        )}
        <div
          className={`${styles.track} ${styles.segmentedTrack}`}
          role="progressbar"
          aria-valuenow={safeValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label ?? `${percentage}% complete`}
          style={{ "--progress-tone": TONE_VAR[tone] } as CSSProperties}
        >
          {blocks.map((index) => (
            <span
              key={index}
              className={`${styles.segmentBlock} ${index < filled ? styles.segmentBlockOn : ""}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={classes}>
      {(showLabel || label) && (
        <div className={styles.head}>
          {label && <span className={styles.label}>{label}</span>}
          {showLabel && !isIndeterminate && <span className={styles.value}>{percentage}%</span>}
        </div>
      )}
      <div
        className={`${styles.track} ${VARIANT_CLASS[variant]}`}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : safeValue}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : max}
        aria-label={label ?? (isIndeterminate ? "Loading" : `${percentage}% complete`)}
        style={{ "--progress-tone": TONE_VAR[tone] } as CSSProperties}
      >
        <span
          className={styles.fill}
          style={!isIndeterminate ? { width: `${ratio * 100}%` } : undefined}
        />
      </div>
    </div>
  )
}

export default ProgressLinear
