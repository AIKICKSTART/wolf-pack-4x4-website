import type { ReactNode } from "react"

import type { KpiTone } from "./reports-types"
import styles from "./period-comparison-strip.module.css"

interface PeriodComparisonStripProps {
  metricLabel: string
  currentValue: string
  currentLabel: string
  priorValue: string
  priorLabel: string
  deltaLabel: string
  deltaTone: KpiTone
  spark?: ReactNode
  className?: string
}

const DELTA_CLASS: Record<KpiTone, string> = {
  positive: styles.deltaPositive,
  negative: styles.deltaNegative,
  neutral: styles.deltaNeutral,
  warning: styles.deltaWarning,
}

const DELTA_GLYPH: Record<KpiTone, string> = {
  positive: "▲",
  negative: "▼",
  neutral: "→",
  warning: "!",
}

export function PeriodComparisonStrip({
  metricLabel,
  currentValue,
  currentLabel,
  priorValue,
  priorLabel,
  deltaLabel,
  deltaTone,
  spark,
  className,
}: PeriodComparisonStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`${metricLabel} period comparison`}>
      <div className={styles.column}>
        <span className={styles.label}>{currentLabel}</span>
        <span className={styles.value}>{currentValue}</span>
      </div>
      <span
        className={`${styles.delta} ${DELTA_CLASS[deltaTone]}`}
        role="status"
        aria-live="polite"
      >
        <span aria-hidden="true">{DELTA_GLYPH[deltaTone]}</span>
        {deltaLabel}
      </span>
      <div className={styles.column}>
        <span className={styles.label}>{priorLabel}</span>
        <span className={styles.priorValue}>{priorValue}</span>
      </div>
      <div className={styles.spark}>{spark}</div>
    </section>
  )
}

export default PeriodComparisonStrip
