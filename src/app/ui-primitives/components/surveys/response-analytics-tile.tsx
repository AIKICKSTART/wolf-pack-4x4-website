import type { QuestionDistributionBucket } from "./survey-types"

import styles from "./response-analytics-tile.module.css"

interface ResponseAnalyticsTileProps {
  question: string
  /** Total responses for this question — drives the percentage math. */
  responseCount: number
  buckets: ReadonlyArray<QuestionDistributionBucket>
  /** Optional sub-label e.g. "Q03 / Single choice". */
  meta?: string
  className?: string
}

const TONE_CLASS = {
  teal: styles.toneTeal,
  amber: styles.toneAmber,
  violet: styles.toneViolet,
  green: styles.toneGreen,
  red: styles.toneRed,
  neutral: styles.toneNeutral,
}

export function ResponseAnalyticsTile({
  question,
  responseCount,
  buckets,
  meta,
  className,
}: ResponseAnalyticsTileProps) {
  const totalInBuckets = buckets.reduce((acc, b) => acc + b.count, 0)
  const max = Math.max(1, totalInBuckets)
  const classes = [styles.tile, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`Response analytics for: ${question}`}
    >
      <header className={styles.head}>
        <div className={styles.headBody}>
          {meta ? <span className={styles.kicker}>{meta}</span> : null}
          <h3 className={styles.question}>{question}</h3>
        </div>
        <span className={styles.count}>
          <span className={styles.countNumber}>{responseCount.toLocaleString()}</span>
          <span className={styles.countLabel}>responses</span>
        </span>
      </header>

      <ul className={styles.bars}>
        {buckets.map((bucket) => {
          const pct = Math.round((bucket.count / max) * 100)
          return (
            <li key={bucket.label} className={`${styles.bar} ${TONE_CLASS[bucket.tone]}`}>
              <span className={styles.barLabel}>{bucket.label}</span>
              <span className={styles.barTrack}>
                <span
                  className={styles.barFill}
                  style={{ width: `${pct}%` }}
                  aria-hidden="true"
                />
              </span>
              <span className={styles.barValue}>
                <span className={styles.barCount}>{bucket.count}</span>
                <span className={styles.barPercent}>{pct}%</span>
              </span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
