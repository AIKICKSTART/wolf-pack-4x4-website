import type { CsatRating } from "./support-types"
import styles from "./csat-score-card.module.css"

export interface CsatBreakdownEntry {
  rating: CsatRating
  count: number
}

export interface CsatScoreCardProps {
  /** Average rating, 1.0..5.0. */
  averageRating: number
  /** Total responses received in the period. */
  responseCount: number
  /** Histogram counts per 1..5 rating. */
  breakdown: ReadonlyArray<CsatBreakdownEntry>
  /** Optional period caption, e.g. "Last 30 days". */
  period?: string
  /** Optional excerpted comment. */
  commentExcerpt?: string
  commentAuthor?: string
  className?: string
}

const SMILEY: Record<CsatRating, string> = {
  1: "☹",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😄",
}

function clamp(value: number, lo: number, hi: number): number {
  if (value < lo) return lo
  if (value > hi) return hi
  return value
}

export function CsatScoreCard({
  averageRating,
  responseCount,
  breakdown,
  period = "Last 30 days",
  commentExcerpt,
  commentAuthor,
  className,
}: CsatScoreCardProps) {
  const rounded = clamp(averageRating, 1, 5)
  const totalForBars =
    breakdown.reduce((sum, entry) => sum + entry.count, 0) || 1
  const ordered: ReadonlyArray<CsatBreakdownEntry> = [5, 4, 3, 2, 1].map(
    (rating) => {
      const entry = breakdown.find((b) => b.rating === rating)
      return { rating: rating as CsatRating, count: entry?.count ?? 0 }
    },
  )
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Customer satisfaction — ${rounded.toFixed(1)} of 5 over ${responseCount} responses, ${period}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>CSAT · {period}</span>
        <div className={styles.score}>
          <span className={styles.scoreNumber}>{rounded.toFixed(1)}</span>
          <span className={styles.scoreTotal}>/ 5</span>
        </div>
        <div
          className={styles.stars}
          aria-label={`${rounded.toFixed(1)} stars out of 5`}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= Math.round(rounded)
            return (
              <span
                key={star}
                className={[styles.star, filled ? styles.starFull : ""].join(" ")}
                aria-hidden="true"
              >
                ★
              </span>
            )
          })}
        </div>
        <span className={styles.responses}>{responseCount} responses</span>
      </header>

      <ul
        className={styles.bars}
        aria-label="Rating distribution"
      >
        {ordered.map((entry) => {
          const pct = Math.round((entry.count / totalForBars) * 100)
          return (
            <li key={entry.rating} className={styles.barRow}>
              <span className={styles.barRating}>
                <span aria-hidden="true">{SMILEY[entry.rating]}</span>
                <span className={styles.srOnly}>
                  {entry.rating} stars
                </span>
                <span className={styles.barRatingNum}>{entry.rating}</span>
              </span>
              <span className={styles.barTrack} aria-hidden="true">
                <span
                  className={[
                    styles.barFill,
                    entry.rating >= 4
                      ? styles.barGood
                      : entry.rating === 3
                      ? styles.barOk
                      : styles.barBad,
                  ].join(" ")}
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className={styles.barCount}>{entry.count}</span>
            </li>
          )
        })}
      </ul>

      {commentExcerpt ? (
        <blockquote className={styles.quote}>
          <p className={styles.quoteBody}>{commentExcerpt}</p>
          {commentAuthor ? (
            <footer className={styles.quoteFoot}>— {commentAuthor}</footer>
          ) : null}
        </blockquote>
      ) : null}
    </section>
  )
}

export default CsatScoreCard
