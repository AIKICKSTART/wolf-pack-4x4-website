import { ProgressRadial } from "../primitives/progress-radial"
import type { StatusTone } from "../status-page/status-types"
import styles from "./rate-limit-gauge.module.css"

export interface RateLimitGaugeProps {
  /** Display name, e.g. "Google Calendar API". */
  provider: string
  /** Calls consumed within the current window. */
  used: number
  /** Window quota cap, e.g. 600. */
  quota: number
  /** Window unit label, e.g. "per minute", "per day". */
  window: string
  /** Seconds until the window resets. */
  resetInSeconds: number
  className?: string
}

const SECOND = 1
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

function formatCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  if (safe < MINUTE) return `${safe}s`
  if (safe < HOUR) {
    const m = Math.floor(safe / MINUTE)
    const s = safe % MINUTE
    return `${m}m ${s.toString().padStart(2, "0")}s`
  }
  const h = Math.floor(safe / HOUR)
  const m = Math.floor((safe % HOUR) / MINUTE)
  return `${h}h ${m.toString().padStart(2, "0")}m`
}

function toneForUsage(ratio: number): StatusTone {
  if (ratio >= 0.9) return "red"
  if (ratio >= 0.7) return "amber"
  return "green"
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function RateLimitGauge({
  provider,
  used,
  quota,
  window,
  resetInSeconds,
  className,
}: RateLimitGaugeProps) {
  const safeUsed = Math.max(0, used)
  const safeQuota = Math.max(1, quota)
  const ratio = Math.min(1, safeUsed / safeQuota)
  const remaining = Math.max(0, safeQuota - safeUsed)
  const usagePct = Math.round(ratio * 100)
  const tone = toneForUsage(ratio)
  const radialTone = tone === "neutral" || tone === "violet" ? "teal" : tone
  const classes = [styles.gauge, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${provider} rate limit — ${usagePct}% used (${safeUsed} of ${safeQuota} ${window})`}
    >
      <div className={styles.dial}>
        <ProgressRadial
          value={safeUsed}
          max={safeQuota}
          size="lg"
          tone={radialTone}
          showLabel
          label={`${provider} rate limit usage`}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Rate limit</span>
          <h3 className={styles.provider}>{provider}</h3>
        </div>
        <dl className={styles.stats}>
          <div className={styles.statRow}>
            <dt className={styles.statLabel}>Used</dt>
            <dd className={styles.statValue}>
              {safeUsed.toLocaleString()} <span className={styles.muted}>/ {safeQuota.toLocaleString()}</span>
            </dd>
          </div>
          <div className={styles.statRow}>
            <dt className={styles.statLabel}>Remaining</dt>
            <dd className={styles.statValue}>{remaining.toLocaleString()}</dd>
          </div>
          <div className={styles.statRow}>
            <dt className={styles.statLabel}>Window</dt>
            <dd className={styles.statValue}>{window}</dd>
          </div>
          <div className={styles.statRow}>
            <dt className={styles.statLabel}>Resets in</dt>
            <dd className={[styles.statValue, styles.countdown].join(" ")}>{formatCountdown(resetInSeconds)}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default RateLimitGauge
