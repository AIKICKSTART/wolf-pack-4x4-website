import { Star } from "lucide-react"

import type { LandingRating, LandingSocialProofLogo } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface SocialProofStripProps {
  kicker?: string
  heading: string
  rating: LandingRating
  /** "Serving Illawarra customers since 1972" */
  customerSinceLabel?: string
  logos: ReadonlyArray<LandingSocialProofLogo>
  className?: string
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(Math.max(0, Math.min(5, rating)))
  return (
    <span className={styles.socialProofStars} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={16}
          strokeWidth={1.4}
          fill={index < filled ? "currentColor" : "transparent"}
        />
      ))}
    </span>
  )
}

/**
 * Primitive 03 — Social proof strip: kicker + heading on the left, an aggregate
 * rating (stars + review count + customer-since line) on the right, and a row
 * of partner / brand logos as label cards underneath.
 */
export function SocialProofStrip({
  kicker,
  heading,
  rating,
  customerSinceLabel,
  logos,
  className,
}: SocialProofStripProps) {
  const sectionClasses = [styles.section, styles.socialProof, className]
    .filter(Boolean)
    .join(" ")

  const ratingLabel = `${rating.stars.toFixed(1)} out of 5`
  const reviewLabel = `${rating.reviewCount.toLocaleString("en-AU")} reviews${
    rating.source ? ` on ${rating.source}` : ""
  }`

  return (
    <section className={sectionClasses} aria-label="Social proof">
      <header className={styles.socialProofHeader}>
        <div>
          {kicker ? <span className={styles.socialProofKicker}>{kicker}</span> : null}
          <h2 className={styles.socialProofTitle}>{heading}</h2>
        </div>
        <div className={styles.socialProofRating}>
          <Stars rating={rating.stars} />
          <span className={styles.socialProofReviewCount} aria-label={ratingLabel}>
            {rating.stars.toFixed(1)}★ · {reviewLabel}
          </span>
          {customerSinceLabel ? (
            <span className={styles.socialProofReviewCount}>{customerSinceLabel}</span>
          ) : null}
        </div>
      </header>

      <ul className={styles.socialProofLogos} aria-label="Trusted partners">
        {logos.map((logo) => (
          <li key={logo.id} className={styles.socialProofLogo}>
            <span className={styles.socialProofLogoName}>{logo.label}</span>
            {logo.caption ? (
              <span className={styles.socialProofLogoCaption}>{logo.caption}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SocialProofStrip
