import { ProgressLinear, type ProgressLinearTone } from "../primitives/progress-linear"

import styles from "./rating-breakdown-bar.module.css"

export interface RatingBreakdownTier {
  stars: 1 | 2 | 3 | 4 | 5
  count: number
}

export interface RatingBreakdownBarProps {
  tiers: ReadonlyArray<RatingBreakdownTier>
  totalCount?: number
  title?: string
  className?: string
}

const TONE_FOR_STAR: Record<RatingBreakdownTier["stars"], ProgressLinearTone> = {
  5: "green",
  4: "teal",
  3: "amber",
  2: "amber",
  1: "red",
}

export function RatingBreakdownBar({
  tiers,
  totalCount,
  title = "Rating breakdown",
  className,
}: RatingBreakdownBarProps) {
  const sortedTiers = [...tiers].sort((a, b) => b.stars - a.stars)
  const sum = totalCount ?? sortedTiers.reduce((acc, tier) => acc + tier.count, 0)
  const safeTotal = sum > 0 ? sum : 1

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="group" aria-label={title}>
      {title ? <p className={styles.title}>{title}</p> : null}
      {sortedTiers.map((tier) => {
        const pct = Math.round((tier.count / safeTotal) * 100)
        const tone = TONE_FOR_STAR[tier.stars]
        const ariaLabel = `${tier.stars} star reviews — ${pct}%, ${tier.count} of ${sum}`
        return (
          <div key={tier.stars} className={styles.row}>
            <span className={styles.tier} aria-hidden="true">
              {tier.stars}
            </span>
            <div
              className={styles.bar}
              role="meter"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={ariaLabel}
            >
              <ProgressLinear value={pct} tone={tone} variant="solid" />
            </div>
            <span className={styles.count}>
              <span className={styles.percentage}>{pct}%</span>
              {tier.count}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default RatingBreakdownBar
