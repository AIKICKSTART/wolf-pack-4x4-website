import styles from "./security-posture-score.module.css"

export type PostureFactorTone = "positive" | "warn" | "negative"

export interface PostureFactor {
  id: string
  label: string
  tone: PostureFactorTone
}

export interface SecurityPostureScoreProps {
  /** Score 0-100. */
  score: number
  /** Optional title override. */
  title?: string
  /** Contributing factors. */
  factors: ReadonlyArray<PostureFactor>
  /** Trailing scores for the sparkline (most recent last). */
  trend: ReadonlyArray<number>
  className?: string
}

const FACTOR_CLASS: Record<PostureFactorTone, string> = {
  positive: styles.factorPositive,
  warn: styles.factorWarn,
  negative: styles.factorNegative,
}

function toneForScore(value: number): "green" | "amber" | "red" {
  if (value >= 80) return "green"
  if (value >= 55) return "amber"
  return "red"
}

const TONE_CLASS: Record<"green" | "amber" | "red", string> = {
  green: styles.toneGreen,
  amber: styles.toneAmber,
  red: styles.toneRed,
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 100) return 100
  return Math.round(n)
}

function buildSparkPaths(values: ReadonlyArray<number>): {
  line: string
  area: string
  lastX: number
  lastY: number
} {
  if (values.length === 0) return { line: "", area: "", lastX: 0, lastY: 0 }
  const w = 220
  const h = 56
  const pad = 4
  const max = Math.max(...values, 100)
  const min = Math.min(...values, 0)
  const range = max === min ? 1 : max - min
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0
  const points: Array<[number, number]> = values.map((v, i) => {
    const x = pad + i * step
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return [x, y]
  })
  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ")
  const area = `${line} L ${(pad + (values.length - 1) * step).toFixed(2)} ${h - pad} L ${pad} ${h - pad} Z`
  const [lastX, lastY] = points[points.length - 1]
  return { line, area, lastX, lastY }
}

export function SecurityPostureScore({
  score,
  title = "Security posture",
  factors,
  trend,
  className,
}: SecurityPostureScoreProps) {
  const value = clamp(score)
  const tone = toneForScore(value)
  const RADIUS = 72
  const CIRC = 2 * Math.PI * RADIUS
  const offset = CIRC - (value / 100) * CIRC

  const spark = buildSparkPaths(trend)

  return (
    <section
      className={[styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Security posture score"
    >
      <div className={styles.scoreBlock}>
        <div
          className={styles.dial}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-label="Security posture score"
        >
          <svg className={styles.dialSvg} viewBox="0 0 168 168" aria-hidden="true">
            <circle
              cx={84}
              cy={84}
              r={RADIUS}
              className={styles.dialTrack}
            />
            <circle
              cx={84}
              cy={84}
              r={RADIUS}
              className={styles.dialFill}
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
            />
          </svg>
          <span className={styles.dialValue}>{value}</span>
        </div>
        <span className={styles.dialUnit}>out of 100</span>
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.kicker}>Posture</span>
          <h3 className={styles.title}>{title}</h3>
        </header>
        <ul className={styles.factorList}>
          {factors.map((factor) => (
            <li
              key={factor.id}
              className={[styles.factor, FACTOR_CLASS[factor.tone]].join(" ")}
            >
              <span className={styles.factorDot} aria-hidden="true" />
              {factor.label}
            </li>
          ))}
        </ul>
        {trend.length > 0 ? (
          <div className={styles.trend}>
            <span className={styles.trendLabel}>14-day trend</span>
            <svg
              className={styles.spark}
              viewBox="0 0 220 56"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d={spark.area} className={styles.sparkArea} />
              <path d={spark.line} className={styles.sparkPath} />
              <circle
                cx={spark.lastX}
                cy={spark.lastY}
                r={3}
                className={styles.sparkLast}
              />
            </svg>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default SecurityPostureScore
