import { ProgressLinear, type ProgressLinearTone } from "../primitives/progress-linear"
import { Chip } from "../primitives/chip"

import { TIER_META, nextTier, type LoyaltyTier } from "./loyalty-types"
import styles from "./tier-progress-meter.module.css"

interface TierProgressMeterProps {
  /** Member's current tier. */
  currentTier: LoyaltyTier
  /** Current points balance — used to compute distance to next tier. */
  points: number
  /** Optional preview line for next-tier benefit. */
  nextBenefitPreview?: string
  className?: string
}

const TIER_TO_TONE: Record<LoyaltyTier, ProgressLinearTone> = {
  bronze: "amber",
  silver: "teal",
  gold: "amber",
  platinum: "teal",
  brodie: "red",
}

export function TierProgressMeter({
  currentTier,
  points,
  nextBenefitPreview,
  className,
}: TierProgressMeterProps) {
  const classes = [styles.meter, className].filter(Boolean).join(" ")
  const current = TIER_META[currentTier]
  const upcoming = nextTier(currentTier)
  const upcomingMeta = upcoming ? TIER_META[upcoming] : null

  const ceiling = upcomingMeta?.pointsFloor ?? current.pointsCeiling
  const floor = current.pointsFloor
  const span = Math.max(1, ceiling - floor)
  const progressed = Math.max(0, points - floor)
  const value = Math.min(progressed, span)
  const remaining = Math.max(0, ceiling - points)
  const remainingLabel = `${remaining.toLocaleString("en-AU")} pts to ${upcomingMeta?.label ?? "Top tier"}`

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Tier progress — ${current.label} toward ${upcomingMeta?.label ?? "max tier"}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Tier progress</span>
        <div className={styles.tiers}>
          <span className={styles.tierFrom}>{current.label}</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
          <span className={styles.tierTo}>{upcomingMeta?.label ?? "Max"}</span>
        </div>
      </header>

      <div
        className={styles.barWrap}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={span}
        aria-label={remainingLabel}
      >
        <ProgressLinear
          value={value}
          max={span}
          tone={TIER_TO_TONE[currentTier]}
          variant="segmented"
          segments={10}
        />
      </div>

      <div className={styles.foot}>
        <Chip label={remainingLabel} tone="amber" />
        {nextBenefitPreview ? (
          <span className={styles.preview}>
            Next perk · <strong>{nextBenefitPreview}</strong>
          </span>
        ) : null}
      </div>
    </section>
  )
}

export default TierProgressMeter
