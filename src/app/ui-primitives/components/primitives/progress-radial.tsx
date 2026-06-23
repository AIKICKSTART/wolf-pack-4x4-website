import type { CSSProperties } from "react"

import styles from "./progress-radial.module.css"

export type ProgressRadialTone = "red" | "amber" | "teal" | "green" | "neutral"
export type ProgressRadialSize = "sm" | "md" | "lg"

interface ProgressRadialProps {
  value?: number
  max?: number
  size?: ProgressRadialSize
  tone?: ProgressRadialTone
  indeterminate?: boolean
  showLabel?: boolean
  label?: string
  thickness?: number
  className?: string
}

const TONE_VAR: Record<ProgressRadialTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  neutral: "var(--primitive-body)",
}

const SIZE_PX: Record<ProgressRadialSize, number> = {
  sm: 36,
  md: 64,
  lg: 96,
}

const SIZE_CLASS: Record<ProgressRadialSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

export function ProgressRadial({
  value = 0,
  max = 100,
  size = "md",
  tone = "teal",
  indeterminate = false,
  showLabel = false,
  label,
  thickness,
  className,
}: ProgressRadialProps) {
  const dim = SIZE_PX[size]
  const stroke = thickness ?? (size === "sm" ? 3 : size === "lg" ? 7 : 5)
  const radius = (dim - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const safeValue = Math.max(0, Math.min(value, max))
  const ratio = max > 0 ? safeValue / max : 0
  const offset = circumference * (1 - ratio)
  const percentage = Math.round(ratio * 100)

  const classes = [
    styles.wrapper,
    SIZE_CLASS[size],
    indeterminate && styles.indeterminate,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const ariaProps = indeterminate
    ? { "aria-valuetext": label ?? "Loading" }
    : {
        "aria-valuenow": safeValue,
        "aria-valuemin": 0,
        "aria-valuemax": max,
      }

  return (
    <div
      className={classes}
      style={{ "--progress-tone": TONE_VAR[tone], width: dim, height: dim } as CSSProperties}
      role="progressbar"
      aria-label={label ?? (indeterminate ? "Loading" : `${percentage}% complete`)}
      {...ariaProps}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${dim} ${dim}`}
        width={dim}
        height={dim}
        aria-hidden="true"
      >
        <circle
          className={styles.track}
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className={styles.fill}
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? circumference * 0.65 : offset}
          transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
        />
      </svg>
      {showLabel && !indeterminate && (
        <span className={styles.label}>
          <strong>{percentage}</strong>
          <em>%</em>
        </span>
      )}
    </div>
  )
}

export default ProgressRadial
