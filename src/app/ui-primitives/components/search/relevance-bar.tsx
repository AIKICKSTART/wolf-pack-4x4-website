import styles from "./relevance-bar.module.css"

export type RelevanceConfidence = "high" | "medium" | "low"

interface RelevanceBarProps {
  score: number
  label?: string
  showChip?: boolean
  size?: "sm" | "md"
  className?: string
}

function classifyConfidence(score: number): RelevanceConfidence {
  if (score >= 75) return "high"
  if (score >= 45) return "medium"
  return "low"
}

const CONFIDENCE_CLASS: Record<RelevanceConfidence, string> = {
  high: styles.confidenceHigh,
  medium: styles.confidenceMedium,
  low: styles.confidenceLow,
}

const CONFIDENCE_LABEL: Record<RelevanceConfidence, string> = {
  high: "Strong match",
  medium: "Partial match",
  low: "Loose match",
}

export function RelevanceBar({
  score,
  label,
  showChip = true,
  size = "md",
  className,
}: RelevanceBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(score)))
  const confidence = classifyConfidence(clamped)
  const classes = [
    styles.bar,
    size === "sm" && styles.sizeSm,
    CONFIDENCE_CLASS[confidence],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      <div
        className={styles.track}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Relevance ${clamped}%`}
      >
        <span className={styles.fill} style={{ width: `${clamped}%` }} aria-hidden="true" />
      </div>
      {showChip ? (
        <span className={styles.chip} aria-hidden="true">
          <span className={styles.score}>{clamped}%</span>
          <span className={styles.chipLabel}>{label ?? CONFIDENCE_LABEL[confidence]}</span>
        </span>
      ) : null}
    </div>
  )
}

export default RelevanceBar
