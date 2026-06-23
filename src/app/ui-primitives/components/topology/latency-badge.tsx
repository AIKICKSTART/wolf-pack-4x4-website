import styles from "./latency-badge.module.css"
import type { LatencySample } from "./topology-types"

interface LatencyBadgeProps {
  /** p50 / p99 / trend samples. */
  sample: LatencySample
  /** SLO p99 threshold in ms — drives tone shift. Defaults to 250ms. */
  sloP99?: number
  /** Visual size — defaults to `md`. */
  size?: "sm" | "md"
}

function classify(p99: number, slo: number): string {
  if (p99 >= slo * 1.5) return styles.toneRed
  if (p99 >= slo) return styles.toneAmber
  if (p99 >= slo * 0.75) return styles.toneTeal
  return styles.toneGreen
}

function buildPath(trend: ReadonlyArray<number>, width: number, height: number): string {
  if (trend.length === 0) return ""
  const min = Math.min(...trend)
  const max = Math.max(...trend)
  const range = max - min || 1
  const step = width / Math.max(1, trend.length - 1)
  return trend
    .map((value, index) => {
      const x = index * step
      const normalised = (value - min) / range
      const y = height - normalised * height
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

export function LatencyBadge({
  sample,
  sloP99 = 250,
  size = "md",
}: LatencyBadgeProps) {
  const tone = classify(sample.p99, sloP99)
  const trend = sample.trend ?? []
  const sparkWidth = size === "sm" ? 40 : 56
  const sparkHeight = size === "sm" ? 14 : 18
  const path = buildPath(trend, sparkWidth, sparkHeight)
  const sizeClass = size === "sm" ? styles.sizeSm : styles.sizeMd

  return (
    <span
      className={[styles.badge, tone, sizeClass].join(" ")}
      role="img"
      aria-label={`Latency p50 ${sample.p50}ms, p99 ${sample.p99}ms, SLO ${sloP99}ms`}
    >
      <span className={styles.metrics}>
        <span className={styles.metricRow}>
          <span className={styles.metricLabel}>p50</span>
          <span className={styles.metricValue}>{sample.p50}<small>ms</small></span>
        </span>
        <span className={styles.metricRow}>
          <span className={styles.metricLabel}>p99</span>
          <span className={styles.metricValue}>{sample.p99}<small>ms</small></span>
        </span>
      </span>
      {path ? (
        <svg
          className={styles.spark}
          viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={path} className={styles.sparkPath} />
        </svg>
      ) : null}
    </span>
  )
}
