import { ProgressLinear, type ProgressLinearTone } from "../primitives/progress-linear"
import styles from "./usage-meter-card.module.css"

interface UsageMeterCardProps {
  label: string
  used: number
  limit: number
  unit?: string
  resetDate?: string
  caption?: string
  tone?: ProgressLinearTone
  className?: string
}

function pickTone(used: number, limit: number, tone: ProgressLinearTone): ProgressLinearTone {
  if (tone !== "teal") {
    return tone
  }
  const ratio = limit > 0 ? used / limit : 0
  if (ratio >= 0.9) {
    return "red"
  }
  if (ratio >= 0.7) {
    return "amber"
  }
  return tone
}

export function UsageMeterCard({
  label,
  used,
  limit,
  unit,
  resetDate,
  caption,
  tone = "teal",
  className,
}: UsageMeterCardProps) {
  const safeLimit = Math.max(0, limit)
  const safeUsed = Math.max(0, Math.min(used, safeLimit || Number.MAX_SAFE_INTEGER))
  const resolvedTone = pickTone(safeUsed, safeLimit, tone)
  const remaining = Math.max(0, safeLimit - safeUsed)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const formatter = new Intl.NumberFormat("en-AU")
  const usedDisplay = formatter.format(safeUsed)
  const limitDisplay = safeLimit > 0 ? formatter.format(safeLimit) : "∞"
  const remainingDisplay = formatter.format(remaining)

  return (
    <article className={classes} aria-label={`${label} usage`}>
      <header className={styles.head}>
        <span className={styles.label}>{label}</span>
        {resetDate && (
          <span className={styles.reset}>
            <span className={styles.resetDot} aria-hidden="true" />
            Resets {resetDate}
          </span>
        )}
      </header>

      <div className={styles.figureRow}>
        <strong className={styles.used}>{usedDisplay}</strong>
        <span className={styles.limit}>
          <span>/ {limitDisplay}</span>
          {unit && <span className={styles.unit}>{unit}</span>}
        </span>
      </div>

      <ProgressLinear
        value={safeUsed}
        max={safeLimit > 0 ? safeLimit : 100}
        tone={resolvedTone}
        variant="solid"
      />

      <footer className={styles.foot}>
        <span>{caption ?? `${remainingDisplay} ${unit ?? ""} remaining`.trim()}</span>
      </footer>
    </article>
  )
}

export default UsageMeterCard
