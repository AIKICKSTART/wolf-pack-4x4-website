import type { ReactNode } from "react"

import type { DeepTone } from "./reports-deep-types"
import styles from "./kpi-card-large.module.css"

interface KpiCardLargeProps {
  readonly kicker: string
  readonly label: string
  readonly value: string
  readonly unit?: string
  readonly deltaLabel: string
  readonly deltaTone: DeepTone
  readonly comparisonLabel: string
  readonly goalRatio: number
  readonly goalLabel: string
  readonly spark?: ReactNode
  readonly className?: string
}

const TONE_CLASS: Record<DeepTone, string> = {
  neutral: styles.toneNeutral,
  positive: styles.tonePositive,
  negative: styles.toneNegative,
  warning: styles.toneWarning,
  info: styles.toneInfo,
}

const TONE_GLYPH: Record<DeepTone, string> = {
  neutral: "→",
  positive: "▲",
  negative: "▼",
  warning: "!",
  info: "i",
}

const ARC_CIRCUMFERENCE = 2 * Math.PI * 38
const ARC_RANGE = 0.75 // 270 degrees

export function KpiCardLarge({
  kicker,
  label,
  value,
  unit,
  deltaLabel,
  deltaTone,
  comparisonLabel,
  goalRatio,
  goalLabel,
  spark,
  className,
}: KpiCardLargeProps) {
  const safeRatio = Math.max(0, Math.min(1, goalRatio))
  const dashUsed = ARC_CIRCUMFERENCE * ARC_RANGE * safeRatio
  const dashRest = ARC_CIRCUMFERENCE - dashUsed
  const baseDashUsed = ARC_CIRCUMFERENCE * ARC_RANGE
  const baseDashRest = ARC_CIRCUMFERENCE - baseDashUsed

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`${label}: ${value}${unit ? ` ${unit}` : ""}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <span
          className={`${styles.delta} ${TONE_CLASS[deltaTone]}`}
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true">{TONE_GLYPH[deltaTone]}</span>
          {deltaLabel}
        </span>
      </header>

      <div className={styles.body}>
        <div className={styles.column}>
          <span className={styles.label}>{label}</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{value}</span>
            {unit ? <span className={styles.unit}>{unit}</span> : null}
          </div>
          <span className={styles.comparison}>{comparisonLabel}</span>
        </div>

        <div className={styles.gauge} role="img" aria-label={`Goal ${Math.round(safeRatio * 100)}%`}>
          <svg viewBox="0 0 100 100" className={styles.gaugeSvg} aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--primitive-meter-track)"
              strokeWidth="7"
              strokeDasharray={`${baseDashUsed.toFixed(2)} ${baseDashRest.toFixed(2)}`}
              strokeDashoffset="0"
              transform="rotate(135 50 50)"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeDasharray={`${dashUsed.toFixed(2)} ${dashRest.toFixed(2)}`}
              strokeDashoffset="0"
              transform="rotate(135 50 50)"
              strokeLinecap="round"
              className={styles.gaugeStroke}
            />
          </svg>
          <div className={styles.gaugeText}>
            <span className={styles.gaugePct}>{Math.round(safeRatio * 100)}%</span>
            <span className={styles.gaugeLabel}>{goalLabel}</span>
          </div>
        </div>
      </div>

      {spark ? <div className={styles.sparkSlot}>{spark}</div> : null}
    </article>
  )
}

export default KpiCardLarge
