import {
  RISK_LABEL,
  type RiskLevel,
} from "./kyc-types"
import styles from "./risk-rating-meter.module.css"

export interface RiskFactor {
  id: string
  /** Short label, e.g. "AU residency", "AUSTRAC clear". */
  label: string
  /** Tone driver — green = good, amber = neutral, red = bad. */
  tone: "positive" | "neutral" | "negative"
}

export interface RiskRatingMeterProps {
  /** Eyebrow label. */
  kicker: string
  /** Headline above the meter. */
  title: string
  level: RiskLevel
  /** Numeric score 0-100; meter fills proportionally. */
  score: number
  /** Optional body copy beneath the meter. */
  body?: string
  /** Contributing factor chips. */
  factors: ReadonlyArray<RiskFactor>
  className?: string
}

const LEVEL_TONE: Record<RiskLevel, string> = {
  low: "low",
  medium: "med",
  high: "high",
  "manual-review": "manual",
}

function clamp(value: number): number {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

export function RiskRatingMeter({
  kicker,
  title,
  level,
  score,
  body,
  factors,
  className,
}: RiskRatingMeterProps) {
  const tone = LEVEL_TONE[level]
  const percent = clamp(score)
  const classes = [styles.card, styles[`tone_${tone}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} data-level={level}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.meterRow}>
        <div
          className={styles.meterTrack}
          role="meter"
          aria-label="Risk score"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${RISK_LABEL[level]} risk — ${percent} of 100`}
        >
          <span className={styles.meterFill} style={{ width: `${percent}%` }} />
          <span className={styles.meterMarker} style={{ left: "25%" }} />
          <span className={styles.meterMarker} style={{ left: "50%" }} />
          <span className={styles.meterMarker} style={{ left: "75%" }} />
        </div>
        <span className={styles.levelChip}>{RISK_LABEL[level]}</span>
      </div>

      <div className={styles.scale} aria-hidden="true">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Review</span>
      </div>

      {body ? <p className={styles.body}>{body}</p> : null}

      <ul className={styles.factors}>
        {factors.map((factor) => (
          <li
            key={factor.id}
            className={styles.factorChip}
            data-tone={factor.tone}
          >
            <span className={styles.factorDot} aria-hidden="true" />
            {factor.label}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RiskRatingMeter
