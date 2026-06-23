import styles from "./quota-meter.module.css"

interface QuotaMeterProps {
  /** Number of calls consumed in the billing window. */
  used: number
  /** Included calls in the current plan. */
  limit: number
  /** Calls billed at the overage rate above the included tier. */
  overage?: number
  /** ISO billing period label (e.g. "Apr 2026"). */
  period: string
  /** Overage rate label (e.g. "$0.002 / call"). */
  overageRate?: string
  className?: string
  ariaLabel?: string
}

function pickTone(ratio: number): "calm" | "watch" | "hot" | "over" {
  if (ratio >= 1) return "over"
  if (ratio >= 0.85) return "hot"
  if (ratio >= 0.6) return "watch"
  return "calm"
}

export function QuotaMeter({
  used,
  limit,
  overage = 0,
  period,
  overageRate,
  className,
  ariaLabel,
}: QuotaMeterProps) {
  const safeLimit = Math.max(1, limit)
  const ratio = used / safeLimit
  const tone = pickTone(ratio)
  const cappedPct = Math.min(100, Math.round(ratio * 100))
  const overPct = Math.min(40, Math.round(Math.max(0, ratio - 1) * 100))
  const label =
    ariaLabel ?? `${used.toLocaleString()} of ${limit.toLocaleString()} calls used in ${period}`
  const classes = [styles.meter, styles[`tone-${tone}`], className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={label}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Monthly quota — {period}</span>
          <h3 className={styles.value}>
            <strong>{used.toLocaleString()}</strong>
            <span className={styles.divider}>/</span>
            <span className={styles.limit}>{limit.toLocaleString()}</span>
            <span className={styles.unit}>calls</span>
          </h3>
        </div>
        <span className={styles.percent}>{Math.round(ratio * 100)}%</span>
      </header>

      <div
        className={styles.track}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={Math.min(used, limit)}
      >
        <span className={styles.fill} style={{ width: `${cappedPct}%` }} />
        {ratio > 1 && (
          <span className={styles.overage} style={{ width: `${overPct}%`, left: `${cappedPct}%` }} />
        )}
      </div>

      <footer className={styles.foot}>
        <span>
          Overage <strong>{overage.toLocaleString()}</strong>
          {overageRate && <span className={styles.rate}> @ {overageRate}</span>}
        </span>
        <span className={styles.toneLabel}>
          {tone === "over" && "Quota exceeded"}
          {tone === "hot" && "Approaching limit"}
          {tone === "watch" && "Steady"}
          {tone === "calm" && "Healthy"}
        </span>
      </footer>
    </section>
  )
}

export default QuotaMeter
