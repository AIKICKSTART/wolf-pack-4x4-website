import styles from "./error-budget-gauge.module.css"
import type { StatusTone } from "./status-types"

export interface ErrorBudgetGaugeProps {
  /** Fraction consumed, 0..1. */
  consumed: number
  /** Per-day burn rate as a multiple of expected, e.g. 0.3 = below pace, 4 = burning hot. */
  burnRate: number
  /** Mini trend over last N points (e.g. 12 weeks), each 0..1 consumed. */
  trend: ReadonlyArray<number>
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

function tone(consumed: number, burn: number): StatusTone {
  if (consumed >= 0.9 || burn >= 4) return "red"
  if (consumed >= 0.6 || burn >= 2) return "amber"
  return "green"
}

const W = 200
const H = 110
const CX = W / 2
const CY = H - 6
const R = 80

function polar(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)]
}

function arcPath(fromDeg: number, toDeg: number, radius: number): string {
  const [x1, y1] = polar(fromDeg, radius)
  const [x2, y2] = polar(toDeg, radius)
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0
  const sweep = toDeg > fromDeg ? 1 : 0
  return `M${x1.toFixed(2)},${y1.toFixed(2)} A${radius},${radius} 0 ${large} ${sweep} ${x2.toFixed(2)},${y2.toFixed(2)}`
}

function buildTrend(points: ReadonlyArray<number>): string {
  if (points.length === 0) return ""
  const tw = 96
  const th = 22
  const stepX = tw / Math.max(points.length - 1, 1)
  return points
    .map((p, i) => {
      const clamped = Math.min(Math.max(p, 0), 1)
      const y = th - clamped * (th - 2) - 1
      return `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(2)},${y.toFixed(2)}`
    })
    .join(" ")
}

export function ErrorBudgetGauge({
  consumed,
  burnRate,
  trend,
  className,
}: ErrorBudgetGaugeProps) {
  const clamped = Math.min(Math.max(consumed, 0), 1)
  const remaining = 1 - clamped
  const tn = tone(clamped, burnRate)
  const classes = [styles.gauge, TONE_CLASS[tn], className]
    .filter(Boolean)
    .join(" ")

  const startAngle = 180
  const endAngle = 360
  const sweep = endAngle - startAngle
  const fillEnd = startAngle + sweep * clamped
  const trackPath = arcPath(startAngle, endAngle, R)
  const fillPath = arcPath(startAngle, fillEnd, R)
  const trendPath = buildTrend(trend)
  const burnText = `${burnRate.toFixed(1)}×`

  return (
    <article
      className={classes}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      aria-label={`Error budget gauge — ${(clamped * 100).toFixed(1)}% consumed, ${burnText} burn rate`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Error budget</span>
        <span className={[styles.burn, styles.burnChip].join(" ")}>{burnText} burn</span>
      </header>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-hidden="true">
        <path d={trackPath} className={styles.track} />
        <path d={fillPath} className={styles.fill} />
      </svg>
      <div className={styles.center}>
        <span className={styles.consumed}>{(clamped * 100).toFixed(1)}%</span>
        <span className={styles.consumedLabel}>consumed</span>
      </div>
      <div className={styles.metaRow}>
        <span className={styles.meta}>
          <span className={styles.metaLabel}>Remaining</span>
          <span className={styles.metaValue}>{(remaining * 100).toFixed(1)}%</span>
        </span>
        <svg viewBox="0 0 96 22" className={styles.trend} aria-hidden="true">
          <path d={trendPath} className={styles.trendLine} />
        </svg>
      </div>
    </article>
  )
}

export default ErrorBudgetGauge
