import {
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  type ServiceStatus,
  type StatusTone,
} from "./status-types"
import styles from "./uptime-sparkline-row.module.css"

export interface UptimeSparklineRowProps {
  name: string
  status: ServiceStatus
  /** 24 points, one per hour, value 0..1 = healthy fraction. */
  points: ReadonlyArray<number>
  latencyP99Ms: number
  /** 0..1 error rate. */
  errorRate: number
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

const W = 200
const H = 36

function buildPath(points: ReadonlyArray<number>): string {
  if (points.length === 0) return ""
  const stepX = W / Math.max(points.length - 1, 1)
  return points
    .map((p, i) => {
      const clamped = Math.min(Math.max(p, 0), 1)
      const y = H - clamped * (H - 4) - 2
      return `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(2)},${y.toFixed(2)}`
    })
    .join(" ")
}

function formatErrorRate(rate: number): string {
  if (rate >= 0.01) return `${(rate * 100).toFixed(2)}%`
  return `${(rate * 100).toFixed(3)}%`
}

export function UptimeSparklineRow({
  name,
  status,
  points,
  latencyP99Ms,
  errorRate,
  className,
}: UptimeSparklineRowProps) {
  const tone = SERVICE_STATUS_TONE[status]
  const classes = [styles.row, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")
  const path = buildPath(points)
  const last = points[points.length - 1] ?? 0
  const lastX = W
  const lastY = H - Math.min(Math.max(last, 0), 1) * (H - 4) - 2

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${name} — ${SERVICE_STATUS_LABEL[status]}, p99 ${latencyP99Ms}ms, ${formatErrorRate(errorRate)} error`}
    >
      <div className={styles.identity}>
        <span className={styles.statusDot} aria-hidden="true" />
        <span className={styles.name}>{name}</span>
      </div>
      <svg
        className={styles.spark}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={path} className={styles.line} />
        <path d={`${path} L${W},${H} L0,${H} Z`} className={styles.fill} />
        <circle cx={lastX} cy={lastY} r="2.4" className={styles.lastDot} />
      </svg>
      <div className={styles.metrics}>
        <span className={styles.metric}>
          <span className={styles.metricValue}>{latencyP99Ms}ms</span>
          <span className={styles.metricLabel}>p99</span>
        </span>
        <span className={styles.metric}>
          <span className={styles.metricValue}>{formatErrorRate(errorRate)}</span>
          <span className={styles.metricLabel}>errors</span>
        </span>
      </div>
    </article>
  )
}

export default UptimeSparklineRow
