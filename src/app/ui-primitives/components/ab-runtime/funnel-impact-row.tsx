import { formatLiftPercent, formatPercent } from "./ab-runtime-types"

import styles from "./funnel-impact-row.module.css"

export interface FunnelImpactRowProps {
  /** 1-based step number. */
  step: number
  /** Step name, e.g. "Land on quote". */
  name: string
  /** Optional hint, e.g. event key. */
  hint?: string
  /** Control conversion rate at this step, percent. */
  controlRate: number
  /** Treatment conversion rate at this step, percent. */
  treatmentRate: number
  className?: string
}

function deltaClass(delta: number): string {
  if (delta > 0) return styles.deltaUp
  if (delta < 0) return styles.deltaDown
  return styles.deltaFlat
}

export function FunnelImpactRow({
  step,
  name,
  hint,
  controlRate,
  treatmentRate,
  className,
}: FunnelImpactRowProps) {
  const delta = treatmentRate - controlRate
  const rel = controlRate === 0 ? 0 : (delta / controlRate) * 100
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="row"
      aria-label={`Funnel step ${step} ${name}: control ${formatPercent(controlRate, 1)}, treatment ${formatPercent(treatmentRate, 1)}, delta ${formatLiftPercent(rel)}`}
    >
      <span className={styles.stepBadge} aria-hidden="true">{step}</span>
      <div className={styles.stepName}>
        <span className={styles.stepLabel}>{name}</span>
        {hint ? <span className={styles.stepHint}>{hint}</span> : null}
      </div>
      <div className={styles.rateBlock}>
        <span className={styles.rateLabel}>Control</span>
        <span className={styles.rateValue}>{formatPercent(controlRate, 1)}</span>
      </div>
      <div className={styles.rateBlock}>
        <span className={styles.rateLabel}>Treatment</span>
        <span className={styles.rateValue}>{formatPercent(treatmentRate, 1)}</span>
      </div>
      <span className={`${styles.delta} ${deltaClass(delta)}`}>
        {formatLiftPercent(rel)}
      </span>
    </div>
  )
}

export default FunnelImpactRow
