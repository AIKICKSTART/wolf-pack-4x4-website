import { Zap } from "lucide-react"

import styles from "./token-usage-chip.module.css"

interface TokenUsageChipProps {
  used: number
  budget: number
  label?: string
  className?: string
}

function clampRatio(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

function toneFor(ratio: number): "calm" | "amber" | "red" {
  if (ratio >= 0.85) return "red"
  if (ratio >= 0.6) return "amber"
  return "calm"
}

export function TokenUsageChip({
  used,
  budget,
  label = "Tokens",
  className,
}: TokenUsageChipProps) {
  const ratio = clampRatio(used / Math.max(budget, 1))
  const tone = toneFor(ratio)
  const percent = Math.round(ratio * 100)
  const classes = [styles.chip, styles[`tone_${tone}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={classes}
      role="meter"
      aria-valuenow={used}
      aria-valuemin={0}
      aria-valuemax={budget}
      aria-label={`${label}: ${used.toLocaleString()} of ${budget.toLocaleString()}`}
    >
      <Zap size={11} strokeWidth={2.4} className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {used.toLocaleString()}
        <span className={styles.budget}> / {budget.toLocaleString()}</span>
      </span>
      <span className={styles.meter} aria-hidden="true">
        <span className={styles.fill} style={{ width: `${percent}%` }} />
      </span>
    </span>
  )
}

export default TokenUsageChip
