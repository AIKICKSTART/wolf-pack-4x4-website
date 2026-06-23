import { useId } from "react"

import styles from "./social-scheduler.module.css"
import type {
  AudienceSeries,
  PlatformDescriptor,
  SocialPlatform,
} from "./social-scheduler-types"

interface AudienceGrowthChartProps {
  title?: string
  series: ReadonlyArray<AudienceSeries>
  platforms: ReadonlyArray<PlatformDescriptor>
}

// Per-platform brand hues for the chart series. Where a brand colour has an
// exact central token it references the token so the viz re-themes from one
// place; the rest are documented brand hex with no primitive equivalent.
const PLATFORM_COLOR: Record<SocialPlatform, string> = {
  instagram: "#ff6fb5",
  facebook: "#4f8cff",
  tiktok: "var(--primitive-violet)",
  x: "var(--primitive-text-strong)",
  linkedin: "#0a66c2",
  youtube: "var(--primitive-red)",
  threads: "#d3d6dc",
  bluesky: "var(--primitive-teal)",
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(Math.round(value))
}

function deltaText(delta: number): string {
  const sign = delta > 0 ? "+" : ""
  return `${sign}${formatNumber(delta)}`
}

export function AudienceGrowthChart({
  title = "Audience growth",
  series,
  platforms,
}: AudienceGrowthChartProps) {
  const gradientId = useId()

  const width = 720
  const height = 240
  const padding = { top: 16, right: 18, bottom: 28, left: 50 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const allPoints = series.flatMap((s) => s.points)
  const maxFollowers = Math.max(...allPoints.map((p) => p.followers), 1)
  const minFollowers = Math.min(...allPoints.map((p) => p.followers), 0)
  const range = maxFollowers - minFollowers || 1
  const sampleCount = Math.max(...series.map((s) => s.points.length))

  const paths = series.map((s) => {
    const step = s.points.length > 1 ? innerW / (s.points.length - 1) : innerW
    const coords = s.points.map((point, index) => {
      const x = padding.left + index * step
      const ratio = (point.followers - minFollowers) / range
      const y = padding.top + innerH - ratio * innerH
      return [x, y] as const
    })
    const d = coords
      .map(([x, y], idx) => `${idx === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(" ")
    return { platform: s.platform, d, last: coords[coords.length - 1] ?? null }
  })

  const yTicks = 4
  const ticks = Array.from({ length: yTicks + 1 }, (_, idx) => {
    const value = minFollowers + (range / yTicks) * idx
    const y = padding.top + innerH - (idx / yTicks) * innerH
    return { value, y }
  })

  return (
    <section
      className={`${styles.frame} ${styles.audienceChart}`}
      aria-label={title}
    >
      <header className={styles.audienceHead}>
        <h2 className={styles.audienceTitle}>{title}</h2>
        <div className={styles.audienceLegend} aria-label="Platform legend">
          {series.map((s) => {
            const platform = platforms.find((p) => p.key === s.platform)
            return (
              <span key={s.platform} className={styles.audienceLegendItem}>
                <span
                  className={styles.audienceLegendDot}
                  style={{ background: PLATFORM_COLOR[s.platform] }}
                  aria-hidden="true"
                />
                {platform?.label ?? s.platform}
              </span>
            )
          })}
        </div>
      </header>

      <div className={styles.audienceCanvas}>
        <svg
          className={styles.audienceSvg}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${title} over ${sampleCount} samples`}
        >
          <title>{title}</title>
          <defs>
            <linearGradient id={`${gradientId}-grid`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primitive-glass-strong)" />
              <stop offset="100%" stopColor="var(--primitive-glass-soft)" />
            </linearGradient>
          </defs>

          {ticks.map((tick) => (
            <g key={tick.y}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={tick.y}
                y2={tick.y}
                stroke={`url(#${gradientId}-grid)`}
                strokeDasharray="2 4"
              />
              <text
                x={padding.left - 8}
                y={tick.y + 4}
                fill="var(--pulse-muted)"
                fontSize="10"
                fontFamily="var(--pulse-font-mono)"
                textAnchor="end"
              >
                {formatNumber(tick.value)}
              </text>
            </g>
          ))}

          {paths.map((p) => (
            <g key={p.platform}>
              <path
                d={p.d}
                stroke={PLATFORM_COLOR[p.platform]}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {p.last && (
                <circle
                  cx={p.last[0]}
                  cy={p.last[1]}
                  r={3.5}
                  fill={PLATFORM_COLOR[p.platform]}
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.audienceStats}>
        {series.map((s) => {
          const platform = platforms.find((p) => p.key === s.platform)
          const positive = s.delta30d >= 0
          return (
            <article
              key={s.platform}
              className={styles.audienceStat}
              aria-label={`${platform?.label ?? s.platform}: ${formatNumber(s.current)} followers, ${deltaText(s.delta30d)} in 30 days`}
            >
              <span className={styles.audienceStatLabel}>
                {platform?.label ?? s.platform}
              </span>
              <span className={styles.audienceStatVal}>
                {formatNumber(s.current)}
              </span>
              <span
                className={`${styles.audienceStatDelta} ${
                  positive ? styles.audienceStatDeltaUp : styles.audienceStatDeltaDown
                }`}
              >
                {deltaText(s.delta30d)} 30d
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default AudienceGrowthChart
