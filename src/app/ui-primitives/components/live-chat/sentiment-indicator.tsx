import { Chip } from "../primitives/chip"
import { RadialMeter, type RadialTone } from "../charts/radial-meter"

import {
  SENTIMENT_BUCKET_LABEL,
  SENTIMENT_BUCKET_TONE,
  bucketForSentiment,
  type SentimentBucket,
} from "./live-chat-types"
import styles from "./sentiment-indicator.module.css"

interface SentimentIndicatorProps {
  /** Sentiment value in -100..100 range. */
  score: number
  /** Recent shift compared to the prior reading. */
  recentShiftPoints: number
  /** Optional source of the reading, e.g. "Last 6 messages". */
  source?: string
  /** Override the auto-computed bucket. */
  bucket?: SentimentBucket
  className?: string
}

const TONE_TO_RADIAL: Record<string, RadialTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "amber",
  violet: "teal",
}

function clamp(value: number): number {
  return Math.max(-100, Math.min(100, value))
}

export function SentimentIndicator({
  score,
  recentShiftPoints,
  source = "Last 6 messages",
  bucket,
  className,
}: SentimentIndicatorProps) {
  const value = clamp(score)
  const resolvedBucket = bucket ?? bucketForSentiment(value)
  const supportTone = SENTIMENT_BUCKET_TONE[resolvedBucket]
  const radialTone = TONE_TO_RADIAL[supportTone] ?? "teal"
  const meterValue = ((value + 100) / 200) * 100

  const shiftDirection =
    recentShiftPoints > 0 ? "up" : recentShiftPoints < 0 ? "down" : "flat"
  const shiftClass =
    shiftDirection === "up"
      ? styles.shiftUp
      : shiftDirection === "down"
        ? styles.shiftDown
        : styles.shiftFlat
  const shiftGlyph =
    shiftDirection === "up" ? "▲" : shiftDirection === "down" ? "▼" : "—"

  const ariaValueNow = Math.round(meterValue)
  const announcement = `Sentiment ${SENTIMENT_BUCKET_LABEL[resolvedBucket]}, score ${value}.`

  const classes = [styles.indicator, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="meter"
      aria-label={announcement}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValueNow}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Sentiment</span>
        <Chip
          label={SENTIMENT_BUCKET_LABEL[resolvedBucket]}
          tone={
            supportTone === "red"
              ? "red"
              : supportTone === "amber"
                ? "amber"
                : supportTone === "green"
                  ? "green"
                  : "neutral"
          }
        />
      </header>

      <div className={styles.body}>
        <div className={styles.meterWrap}>
          <RadialMeter
            value={meterValue}
            max={100}
            label={resolvedBucket}
            tone={radialTone}
            ariaLabel={announcement}
            unit=""
            size={96}
          />
        </div>
        <div className={styles.detail}>
          <span className={styles.title}>Live read</span>
          <span className={styles.bucket}>
            {SENTIMENT_BUCKET_LABEL[resolvedBucket]}
          </span>
          <span className={styles.score}>
            Score {value} / 100 · {source}
          </span>
          <span className={`${styles.shift} ${shiftClass}`}>
            <span className={styles.shiftGlyph} aria-hidden="true">
              {shiftGlyph}
            </span>
            <span>
              {shiftDirection === "flat"
                ? "Holding steady"
                : `${Math.abs(recentShiftPoints)} pts shift`}
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default SentimentIndicator
