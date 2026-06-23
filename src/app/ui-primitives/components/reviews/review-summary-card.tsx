import { DashboardCard } from "../data-display/dashboard-card"
import { DonutChart, type DonutSegment } from "../charts/donut-chart"
import { Sparkline } from "../charts/sparkline"

import { RatingBreakdownBar, type RatingBreakdownTier } from "./rating-breakdown-bar"
import { clampRating } from "./reviews-types"

import styles from "./review-summary-card.module.css"

export interface ReviewSummaryCardProps {
  overallRating: number
  totalReviews: number
  tiers: ReadonlyArray<RatingBreakdownTier>
  sentimentSegments: ReadonlyArray<DonutSegment>
  trend: ReadonlyArray<number>
  recommendPercentage: number
  /** Trailing meta string (e.g. "Updated 2 hours ago"). */
  meta?: string
  className?: string
}

function renderStars(rating: number): string {
  const safe = clampRating(rating)
  const full = Math.floor(safe)
  const hasHalf = safe - full === 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)
  return "★".repeat(full) + (hasHalf ? "⯨" : "") + "☆".repeat(empty)
}

export function ReviewSummaryCard({
  overallRating,
  totalReviews,
  tiers,
  sentimentSegments,
  trend,
  recommendPercentage,
  meta = "Across all jobs",
  className,
}: ReviewSummaryCardProps) {
  const ratingLabel = `Overall rating ${overallRating.toFixed(2)} out of 5`
  const totalLabel = `${totalReviews.toLocaleString("en-AU")} reviews`
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Customer reviews overview"
    >
      <div className={styles.top}>
        <DashboardCard
          label="Overall rating"
          value={overallRating.toFixed(2)}
          unit="/5"
          surface="glass"
          meta={meta}
          spark={
            <span className={styles.stars} aria-label={ratingLabel}>
              {renderStars(overallRating)}
            </span>
          }
        />
      </div>

      <div className={styles.body}>
        <div className={styles.breakdownArea}>
          <RatingBreakdownBar tiers={tiers} totalCount={totalReviews} />
          <span className={styles.total}>{totalLabel}</span>
        </div>
        <div className={styles.donutBlock}>
          <DonutChart
            segments={[...sentimentSegments]}
            ariaLabel="Sentiment distribution across recent reviews"
            centerLabel="Tone"
            centerCaption="last 90 days"
            size={180}
            thickness={22}
          />
        </div>
      </div>

      <div className={styles.lowerGrid}>
        <div className={styles.trendBlock}>
          <span className={styles.label}>30-day trend</span>
          <Sparkline
            points={[...trend]}
            ariaLabel="Daily average rating over last 30 days"
            tone="teal"
          />
        </div>
        <div className={styles.recommendBlock}>
          <span className={styles.label}>Would recommend</span>
          <p className={`${styles.bigValue} ${styles.recommendValue}`}>{recommendPercentage}%</p>
        </div>
      </div>
    </section>
  )
}

export default ReviewSummaryCard
