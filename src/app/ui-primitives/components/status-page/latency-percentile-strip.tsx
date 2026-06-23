import styles from "./latency-percentile-strip.module.css"
import type { StatusTone } from "./status-types"

export type LatencyPercentile = "p50" | "p75" | "p90" | "p95" | "p99" | "p99_9"

export interface LatencyPercentileValue {
  percentile: LatencyPercentile
  /** Latency in ms. */
  ms: number
}

export interface LatencyPercentileStripProps {
  /** All six percentiles, in increasing order. */
  values: ReadonlyArray<LatencyPercentileValue>
  /** Latency budget at p95 in ms — bars beyond this trend amber/red. */
  budgetMs?: number
  caption?: string
  className?: string
}

const PCTL_LABEL: Record<LatencyPercentile, string> = {
  p50: "p50",
  p75: "p75",
  p90: "p90",
  p95: "p95",
  p99: "p99",
  p99_9: "p99.9",
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function barTone(ms: number, budget: number | undefined): StatusTone {
  if (budget === undefined) return "teal"
  if (ms > budget * 1.5) return "red"
  if (ms > budget) return "amber"
  if (ms > budget * 0.8) return "teal"
  return "green"
}

export function LatencyPercentileStrip({
  values,
  budgetMs,
  caption = "Latency percentiles",
  className,
}: LatencyPercentileStripProps) {
  const max = values.reduce((acc, v) => Math.max(acc, v.ms), 1)
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{caption}</span>
        {budgetMs !== undefined ? (
          <span className={styles.budget}>p95 budget: {budgetMs}ms</span>
        ) : null}
      </header>
      <ul className={styles.bars}>
        {values.map((v) => {
          const tone = barTone(v.ms, budgetMs)
          const height = Math.max(6, Math.round((v.ms / max) * 100))
          return (
            <li
              key={v.percentile}
              className={[styles.col, TONE_CLASS[tone]].join(" ")}
            >
              <div className={styles.barWrap}>
                <span
                  className={styles.bar}
                  style={{ height: `${height}%` }}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.colFoot}>
                <span className={styles.value}>{v.ms}ms</span>
                <span className={styles.label}>{PCTL_LABEL[v.percentile]}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default LatencyPercentileStrip
