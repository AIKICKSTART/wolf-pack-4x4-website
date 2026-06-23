"use client"

import { useState } from "react"

import {
  SENTIMENT_LABEL,
  SENTIMENT_TONE,
  type UnifiedSentiment,
} from "./unified-inbox-types"
import styles from "./sentiment-tag-strip.module.css"

interface SentimentTagStripProps {
  /** Auto-detected sentiment, presented as the recommendation. */
  detected: UnifiedSentiment
  /** Optional human-confirmed override. */
  confirmed?: UnifiedSentiment
  /** Triggered when the operator confirms or overrides the sentiment. */
  onConfirm?: (value: UnifiedSentiment) => void
  /** Optional short context label, e.g. "Auto-detected from 6 messages". */
  source?: string
  className?: string
}

const ORDER: ReadonlyArray<UnifiedSentiment> = [
  "positive",
  "neutral",
  "negative",
  "upset",
]

export function SentimentTagStrip({
  detected,
  confirmed,
  onConfirm,
  source = "Auto-detected · last 6 messages",
  className,
}: SentimentTagStripProps) {
  const [internal, setInternal] = useState<UnifiedSentiment | null>(
    confirmed ?? null,
  )
  const active = confirmed ?? internal ?? detected

  const handleSelect = (value: UnifiedSentiment) => {
    if (confirmed === undefined) {
      setInternal(value)
    }
    onConfirm?.(value)
  }

  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="radiogroup"
      aria-label={`Sentiment, ${source}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Sentiment</span>
        <span className={styles.source}>{source}</span>
      </header>
      <ul className={styles.list}>
        {ORDER.map((value) => {
          const tone = SENTIMENT_TONE[value]
          const isActive = active === value
          const isDetected = value === detected
          return (
            <li key={value}>
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                className={[
                  styles.chip,
                  styles[`tone_${tone}`],
                  isActive ? styles.chipActive : "",
                  isDetected ? styles.chipDetected : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSelect(value)}
              >
                <span className={styles.chipLabel}>
                  {SENTIMENT_LABEL[value]}
                </span>
                {isDetected ? (
                  <span className={styles.chipBadge} aria-hidden="true">
                    AI
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SentimentTagStrip
