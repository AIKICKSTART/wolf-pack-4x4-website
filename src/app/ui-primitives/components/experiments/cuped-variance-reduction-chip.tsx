import { Chip } from "../primitives/chip"

import styles from "./cuped-variance-reduction-chip.module.css"

export interface CupedVarianceReductionChipProps {
  /** Variance reduction as percentage 0..100. */
  varianceReductionPercent: number
  /** Covariate column used by CUPED. */
  covariate: string
  /** Power improvement attributed to CUPED (percentage points). */
  powerImprovementPoints: number
  className?: string
}

function tone(value: number): "neutral" | "amber" | "teal" | "green" {
  if (value >= 30) return "green"
  if (value >= 15) return "teal"
  if (value > 0) return "amber"
  return "neutral"
}

export function CupedVarianceReductionChip({
  varianceReductionPercent,
  covariate,
  powerImprovementPoints,
  className,
}: CupedVarianceReductionChipProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      role="region"
      aria-label="CUPED variance reduction summary"
    >
      <span className={styles.kicker}>CUPED · variance reduction</span>
      <div className={styles.chips}>
        <Chip
          label={`Variance −${varianceReductionPercent.toFixed(1)}%`}
          tone={tone(varianceReductionPercent)}
          selected
        />
        <Chip label={`Covariate · ${covariate}`} tone="neutral" />
        <Chip
          label={`+${powerImprovementPoints.toFixed(1)} pt power`}
          tone={powerImprovementPoints > 5 ? "green" : "teal"}
        />
      </div>
    </section>
  )
}

export default CupedVarianceReductionChip
