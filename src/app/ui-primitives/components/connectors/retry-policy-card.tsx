"use client"

import { useState } from "react"

import styles from "./retry-policy-card.module.css"

export interface RetryPolicyCardProps {
  /** Display name, e.g. "Stripe webhook delivery". */
  consumer: string
  /** Initial backoff in milliseconds. */
  initialBackoffMs: number
  /** Backoff multiplier per attempt. */
  multiplier: number
  /** Maximum retry attempts. */
  maxAttempts: number
  /** Default jitter state. */
  initialJitter?: boolean
  /** Fires when the jitter toggle changes. */
  onJitterChange?: (jitter: boolean) => void
  className?: string
}

function formatBackoff(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  const s = ms / 1000
  if (s < 60) return `${s.toFixed(s >= 10 ? 0 : 1)}s`
  const m = s / 60
  return `${m.toFixed(m >= 10 ? 0 : 1)}m`
}

export function RetryPolicyCard({
  consumer,
  initialBackoffMs,
  multiplier,
  maxAttempts,
  initialJitter = true,
  onJitterChange,
  className,
}: RetryPolicyCardProps) {
  const [jitter, setJitter] = useState(initialJitter)

  const attempts: ReadonlyArray<{ attempt: number; min: number; max: number }> = Array.from(
    { length: maxAttempts },
    (_, index) => {
      const base = initialBackoffMs * Math.pow(multiplier, index)
      const min = jitter ? Math.round(base * 0.7) : Math.round(base)
      const max = jitter ? Math.round(base * 1.3) : Math.round(base)
      return { attempt: index + 1, min, max }
    },
  )

  const totalMin = attempts.reduce((sum, row) => sum + row.min, 0)
  const totalMax = attempts.reduce((sum, row) => sum + row.max, 0)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${consumer} retry policy — ${maxAttempts} attempts with ${multiplier}× exponential backoff`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Retry policy</span>
          <h3 className={styles.consumer}>{consumer}</h3>
        </div>
        <button
          type="button"
          className={[styles.jitter, jitter ? styles.jitterOn : ""].join(" ")}
          onClick={() => {
            const next = !jitter
            setJitter(next)
            onJitterChange?.(next)
          }}
          role="switch"
          aria-checked={jitter}
          aria-label={`Toggle jitter ${jitter ? "off" : "on"} for ${consumer}`}
        >
          <span className={styles.jitterTrack} aria-hidden="true">
            <span className={styles.jitterKnob} />
          </span>
          <span className={styles.jitterLabel}>Jitter</span>
        </button>
      </header>

      <dl className={styles.policy}>
        <div className={styles.policyItem}>
          <dt className={styles.policyLabel}>Initial</dt>
          <dd className={styles.policyValue}>{formatBackoff(initialBackoffMs)}</dd>
        </div>
        <div className={styles.policyItem}>
          <dt className={styles.policyLabel}>Multiplier</dt>
          <dd className={styles.policyValue}>{multiplier.toFixed(2)}×</dd>
        </div>
        <div className={styles.policyItem}>
          <dt className={styles.policyLabel}>Max attempts</dt>
          <dd className={styles.policyValue}>{maxAttempts}</dd>
        </div>
        <div className={styles.policyItem}>
          <dt className={styles.policyLabel}>Total window</dt>
          <dd className={styles.policyValue}>
            {jitter
              ? `${formatBackoff(totalMin)} – ${formatBackoff(totalMax)}`
              : formatBackoff(totalMin)}
          </dd>
        </div>
      </dl>

      <ol className={styles.timeline} aria-label="Per-attempt backoff timeline">
        {attempts.map((row) => {
          const widthRatio = row.max / Math.max(1, totalMax)
          const style = { width: `${Math.min(100, widthRatio * 100)}%` }
          return (
            <li key={row.attempt} className={styles.timelineRow}>
              <span className={styles.timelineAttempt}>#{row.attempt}</span>
              <span className={styles.timelineBar} style={style} aria-hidden="true" />
              <span className={styles.timelineDelay}>
                {jitter
                  ? `${formatBackoff(row.min)} – ${formatBackoff(row.max)}`
                  : formatBackoff(row.min)}
              </span>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default RetryPolicyCard
