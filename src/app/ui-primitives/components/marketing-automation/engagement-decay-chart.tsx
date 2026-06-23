import { TrendingDown } from "lucide-react"

import styles from "./engagement-decay-chart.module.css"
import {
  CHANNEL_LABEL,
  type AutomationChannel,
} from "./marketing-automation-types"

export interface EngagementDecaySeries {
  channel: AutomationChannel
  /** Normalised engagement points (0..1 typical), index = day. */
  points: ReadonlyArray<number>
  /** Engagement half-life in days. */
  halfLifeDays: number
}

interface EngagementDecayChartProps {
  /** Title. */
  title?: string
  /** Per-channel series. */
  series: ReadonlyArray<EngagementDecaySeries>
  /** Maximum day count on the X axis. */
  maxDays?: number
  className?: string
}

const LINE_CLASS: Record<AutomationChannel, string> = {
  email: styles.lineEmail,
  sms: styles.lineSms,
  push: styles.linePush,
  voice: styles.lineVoice,
  task: styles.lineTask,
  webhook: styles.lineWebhook,
}

const CHANNEL_COLOR: Record<AutomationChannel, string> = {
  email: "var(--primitive-teal)",
  sms: "var(--primitive-green)",
  push: "var(--primitive-amber)",
  voice: "var(--primitive-red)",
  task: "var(--primitive-body)",
  webhook: "var(--primitive-amber)",
}

function buildPath(points: ReadonlyArray<number>, w: number, h: number): string {
  if (points.length === 0) return ""
  const step = points.length > 1 ? w / (points.length - 1) : 0
  return points
    .map((value, idx) => {
      const x = idx * step
      const y = h - Math.max(0, Math.min(value, 1)) * h
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

export function EngagementDecayChart({
  title = "Engagement half-life",
  series,
  maxDays = 14,
  className,
}: EngagementDecayChartProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const innerW = 720
  const innerH = 200
  const pad = { l: 40, t: 12, r: 16, b: 26 }
  const drawW = innerW - pad.l - pad.r
  const drawH = innerH - pad.t - pad.b

  const halfLifeAriaSummary = series
    .map(
      (s) =>
        `${CHANNEL_LABEL[s.channel]}: ${s.halfLifeDays.toFixed(1)} days`,
    )
    .join(", ")

  return (
    <section className={classes} role="region" aria-label={title}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Engagement decay</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </header>

      <div className={styles.summary}>
        {series.map((s) => (
          <div key={s.channel} className={styles.summaryTile}>
            <span className={styles.summaryLabel}>
              <TrendingDown size={11} strokeWidth={2.4} aria-hidden="true" />
              {CHANNEL_LABEL[s.channel]}
            </span>
            <span className={styles.summaryValue}>
              {s.halfLifeDays.toFixed(1)} d
            </span>
            <span className={styles.summaryHalfLife}>Half-life to 50%</span>
          </div>
        ))}
      </div>

      <svg
        className={styles.chartCanvas}
        viewBox={`0 0 ${innerW} ${innerH}`}
        role="img"
        aria-label={`Engagement decay curve per channel. Half lives ${halfLifeAriaSummary}.`}
        preserveAspectRatio="none"
      >
        <title>{title}</title>
        <g transform={`translate(${pad.l} ${pad.t})`}>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={0}
              y1={drawH * (1 - t)}
              x2={drawW}
              y2={drawH * (1 - t)}
              className={styles.grid}
            />
          ))}
          <text x={-30} y={10} className={styles.axisLabel}>100%</text>
          <text x={-30} y={drawH / 2 + 4} className={styles.axisLabel}>50%</text>
          <text x={-30} y={drawH + 4} className={styles.axisLabel}>0%</text>
          <text x={0} y={drawH + 18} className={styles.axisLabel}>Day 0</text>
          <text x={drawW - 36} y={drawH + 18} className={styles.axisLabel}>
            Day {maxDays}
          </text>

          {series.map((s) => {
            const path = buildPath(s.points, drawW, drawH)
            const halfX = (s.halfLifeDays / maxDays) * drawW
            return (
              <g key={s.channel}>
                <line
                  x1={halfX}
                  y1={0}
                  x2={halfX}
                  y2={drawH}
                  className={styles.halfLifeMarker}
                />
                <path d={path} className={[styles.line, LINE_CLASS[s.channel]].join(" ")} />
              </g>
            )
          })}
        </g>
      </svg>

      <div className={styles.legend} aria-label="Channel legend">
        {series.map((s) => (
          <span key={s.channel} className={styles.legendItem}>
            <span
              className={styles.legendSwatch}
              style={{ background: CHANNEL_COLOR[s.channel] }}
            />
            {CHANNEL_LABEL[s.channel]}
          </span>
        ))}
      </div>
    </section>
  )
}

export default EngagementDecayChart
