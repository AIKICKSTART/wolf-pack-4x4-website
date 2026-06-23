import {
  TestimonialWall,
  type TestimonialEntry,
} from "@/app/ui-primitives/components/marketing"
import {
  ReviewSummaryCard,
  type RatingBreakdownTier,
} from "@/app/ui-primitives/components/reviews"
import type { DonutSegment } from "@/app/ui-primitives/components/charts/donut-chart"

import styles from "./testimonials-section.module.css"

export interface TestimonialsSectionSummary {
  overallRating: number
  totalReviews: number
  tiers: ReadonlyArray<RatingBreakdownTier>
  sentimentSegments: ReadonlyArray<DonutSegment>
  trend: ReadonlyArray<number>
  recommendPercentage: number
  meta?: string
}

export interface TestimonialsSectionProps {
  kicker?: string
  heading: string
  body?: string
  /** Aggregate ratings panel — composes the reviews ReviewSummaryCard. */
  summary: TestimonialsSectionSummary
  /** Individual quotes — composes the marketing TestimonialWall. */
  testimonials: ReadonlyArray<TestimonialEntry>
  className?: string
}

/**
 * Testimonials / reviews section — composes the reviews `ReviewSummaryCard`
 * (aggregate rating, breakdown, sentiment donut, trend) beside the marketing
 * `TestimonialWall` (masonry of quotes). Pure composition of existing
 * primitives; token-driven; light/dark via tokens.
 */
export function TestimonialsSection({
  kicker,
  heading,
  body,
  summary,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h2 className={styles.heading}>{heading}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <div className={styles.layout}>
        <div className={styles.summaryColumn}>
          <ReviewSummaryCard
            overallRating={summary.overallRating}
            totalReviews={summary.totalReviews}
            tiers={summary.tiers}
            sentimentSegments={summary.sentimentSegments}
            trend={summary.trend}
            recommendPercentage={summary.recommendPercentage}
            meta={summary.meta}
          />
        </div>
        <div className={styles.wallColumn}>
          <TestimonialWall entries={testimonials} />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
