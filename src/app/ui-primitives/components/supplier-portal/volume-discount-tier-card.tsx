import { DashboardCard } from "../data-display/dashboard-card"
import { ProgressLinear } from "../primitives/progress-linear"
import { Chip } from "../primitives/chip"

import styles from "./volume-discount-tier-card.module.css"
import type { SupplierTone } from "./supplier-portal-types"

export interface VolumeDiscountTierCardProps {
  /** Tier name e.g. "Loyal trade", "Workshop fleet". */
  tierName: string
  /** Annual spend threshold (AUD) to qualify for this tier. */
  thresholdAud: number
  /** Discount percent at this tier. */
  discountPct: number
  /** Workshop's current annual spend (AUD). */
  currentSpendAud: number
  /** Optional next tier preview label, e.g. "Next: Fleet partner". */
  nextTierLabel?: string
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function tierTone(progressRatio: number): SupplierTone {
  if (progressRatio >= 1) return "green"
  if (progressRatio >= 0.66) return "teal"
  if (progressRatio >= 0.33) return "amber"
  return "red"
}

export function VolumeDiscountTierCard({
  tierName,
  thresholdAud,
  discountPct,
  currentSpendAud,
  nextTierLabel,
}: VolumeDiscountTierCardProps) {
  const safeThreshold = Math.max(thresholdAud, 1)
  const ratio = Math.min(1, currentSpendAud / safeThreshold)
  const tone = tierTone(ratio)
  const unlocked = currentSpendAud >= thresholdAud
  const remaining = Math.max(0, thresholdAud - currentSpendAud)

  return (
    <article
      className={styles.card}
      data-tone={tone}
      role="region"
      aria-label={`Volume discount tier ${tierName}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Volume tier</span>
          <h3 className={styles.title}>{tierName}</h3>
        </div>
        <div className={styles.discountChip}>
          <span className={styles.discountValue}>{discountPct}</span>
          <span className={styles.discountUnit}>% off</span>
        </div>
      </header>

      <div className={styles.metrics}>
        <DashboardCard
          label="Threshold"
          value={formatAud(thresholdAud)}
          surface="neuo"
          meta="Annual spend"
        />
        <DashboardCard
          label="Current spend"
          value={formatAud(currentSpendAud)}
          surface="glass"
          meta={unlocked ? "Tier unlocked" : `${formatAud(remaining)} to unlock`}
        />
      </div>

      <ProgressLinear
        value={Math.min(currentSpendAud, thresholdAud)}
        max={thresholdAud}
        tone={tone}
        variant="solid"
        label={unlocked ? "Tier unlocked" : `${Math.round(ratio * 100)}% toward tier`}
        showLabel
      />

      <footer className={styles.footer}>
        <Chip
          label={unlocked ? "Active rebate" : "Progress"}
          tone={tone}
        />
        {nextTierLabel ? (
          <span className={styles.nextTier}>{nextTierLabel}</span>
        ) : null}
      </footer>
    </article>
  )
}

export default VolumeDiscountTierCard
