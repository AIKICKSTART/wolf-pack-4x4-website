import { RotateCw, Shuffle, TrendingUp } from "lucide-react"

import {
  BACKOFF_LABEL,
  formatDuration,
  type EngineBackoff,
} from "./workflow-engine-types"
import styles from "./retry-policy-block.module.css"

/**
 * Retry policy editor — block that surfaces the deterministic retry knobs:
 * max attempts, base delay, backoff strategy, jitter on/off, and a
 * preview strip showing the projected delays per attempt. Read-only
 * visual reference — no live editing wired up.
 */
interface RetryPolicyBlockProps {
  /** Label, e.g. "Twilio SMS retries". */
  title: string
  /** Maximum retry attempts. */
  maxAttempts: number
  /** Initial backoff delay in milliseconds. */
  baseDelayMs: number
  /** Strategy used to compute each subsequent delay. */
  backoff: EngineBackoff
  /** Whether to apply random ±20% jitter to each delay. */
  jitterEnabled: boolean
  /** Optional kicker — workflow scope. */
  kicker?: string
  className?: string
}

/** Compute the projected delays for the preview strip. */
function projectDelays(
  maxAttempts: number,
  baseDelayMs: number,
  backoff: EngineBackoff,
): ReadonlyArray<number> {
  const out: number[] = []
  for (let attempt = 1; attempt <= Math.min(maxAttempts, 6); attempt++) {
    if (backoff === "fixed") {
      out.push(baseDelayMs)
    } else if (backoff === "linear") {
      out.push(baseDelayMs * attempt)
    } else {
      out.push(baseDelayMs * Math.pow(2, attempt - 1))
    }
  }
  return out
}

export function RetryPolicyBlock({
  title,
  maxAttempts,
  baseDelayMs,
  backoff,
  jitterEnabled,
  kicker = "Retry policy",
  className,
}: RetryPolicyBlockProps) {
  const delays = projectDelays(maxAttempts, baseDelayMs, backoff)
  const maxDelay = Math.max(...delays, 1)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={`Retry policy · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <RotateCw size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.backoffChip}>
          <TrendingUp size={11} strokeWidth={2.4} aria-hidden="true" />
          {BACKOFF_LABEL[backoff]}
        </span>
      </header>

      <div className={styles.knobs} role="group" aria-label="Policy knobs">
        <div className={styles.knob}>
          <span className={styles.knobLabel}>Max attempts</span>
          <span className={styles.knobValue}>{maxAttempts}</span>
        </div>
        <div className={styles.knob}>
          <span className={styles.knobLabel}>Base delay</span>
          <span className={styles.knobValue}>{formatDuration(baseDelayMs)}</span>
        </div>
        <div className={styles.knob}>
          <span className={styles.knobLabel}>Jitter</span>
          <span
            className={styles.knobValue}
            data-on={jitterEnabled ? "true" : "false"}
          >
            <Shuffle size={11} strokeWidth={2.4} aria-hidden="true" />
            {jitterEnabled ? "On · ±20%" : "Off"}
          </span>
        </div>
      </div>

      <div className={styles.preview} aria-label="Projected attempt delays">
        <span className={styles.previewLabel}>
          Projected delays · attempts 1–{delays.length}
        </span>
        <ol className={styles.previewBars}>
          {delays.map((delay, idx) => {
            const ratio = delay / maxDelay
            return (
              <li key={idx} className={styles.previewItem}>
                <span className={styles.previewBarTrack} aria-hidden="true">
                  <span
                    className={styles.previewBarFill}
                    style={{ height: `${Math.max(8, ratio * 100)}%` }}
                  />
                </span>
                <span className={styles.previewIndex}>
                  #{(idx + 1).toString().padStart(2, "0")}
                </span>
                <span className={styles.previewDelay}>
                  {formatDuration(delay)}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default RetryPolicyBlock
