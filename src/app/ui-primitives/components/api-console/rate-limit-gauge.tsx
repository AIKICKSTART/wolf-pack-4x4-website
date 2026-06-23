import { AlertTriangle, Gauge } from "lucide-react"

import styles from "./rate-limit-gauge.module.css"

interface RateLimitGaugeProps {
  /** Current requests per minute. */
  currentRpm: number
  /** Sustained allowance per minute. */
  limitRpm: number
  /** Burst capacity (in extra requests above the sustained limit). */
  burstCapacity: number
  /** Threshold at which the throttle warning shows. Defaults to 0.85. */
  warnAt?: number
  className?: string
  ariaLabel?: string
}

function describeRatio(ratio: number): "calm" | "watch" | "hot" {
  if (ratio < 0.6) return "calm"
  if (ratio < 0.85) return "watch"
  return "hot"
}

export function RateLimitGauge({
  currentRpm,
  limitRpm,
  burstCapacity,
  warnAt = 0.85,
  className,
  ariaLabel = "Live rate limit gauge",
}: RateLimitGaugeProps) {
  const safeLimit = Math.max(1, limitRpm)
  const ratio = Math.max(0, Math.min(1.2, currentRpm / safeLimit))
  const tone = describeRatio(ratio)
  const pct = Math.min(100, Math.round(ratio * 100))
  const warn = ratio >= warnAt
  const classes = [styles.gauge, styles[`tone-${tone}`], warn && styles.warn, className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label={ariaLabel}>
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Gauge size={13} strokeWidth={2.2} aria-hidden="true" />
          Live rate limit
        </span>
        <span className={styles.value}>
          <strong>{currentRpm.toLocaleString()}</strong>
          <span>/{limitRpm.toLocaleString()} rpm</span>
        </span>
      </header>

      <div
        className={styles.track}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={limitRpm}
        aria-valuenow={currentRpm}
        aria-label={`${currentRpm} of ${limitRpm} requests per minute`}
      >
        <span className={styles.fill} style={{ width: `${pct}%` }} />
        <span className={styles.warnLine} style={{ left: `${Math.round(warnAt * 100)}%` }} aria-hidden="true" />
      </div>

      <footer className={styles.foot}>
        <span className={styles.burst}>
          Burst capacity <strong>+{burstCapacity}</strong>
        </span>
        {warn ? (
          <span className={styles.warning} role="alert">
            <AlertTriangle size={12} strokeWidth={2.4} aria-hidden="true" /> Throttle imminent
          </span>
        ) : (
          <span className={styles.statusOk}>Headroom available</span>
        )}
      </footer>
    </section>
  )
}

export default RateLimitGauge
