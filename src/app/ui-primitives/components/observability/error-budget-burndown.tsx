import { GlassSurface } from "../surfaces/glass-surface"
import { Sparkline } from "../charts/sparkline"
import type { SparklineTone } from "../charts/sparkline"
import type { StatusTone } from "../status-page/status-types"

import styles from "./error-budget-burndown.module.css"

export interface BurndownPoint {
  /** Label for x-axis tick — e.g. "May 22", "13:00". */
  label: string
  /** Actual remaining budget at this point, 0..1. */
  actual: number
  /** Ideal linear burn at this point, 0..1. */
  ideal: number
}

export interface ErrorBudgetBurndownProps {
  service: string
  sloLabel: string
  /** Series of points across the window. The first point is window start. */
  points: ReadonlyArray<BurndownPoint>
  /** Total budget in minutes-down (display only). */
  totalBudgetMinutes: number
  /** Window label, e.g. "30 days". */
  window: string
  className?: string
}

function pickTone(actualRatio: number): { tone: StatusTone; spark: SparklineTone } {
  if (actualRatio <= 0.25) return { tone: "red", spark: "red" }
  if (actualRatio <= 0.5) return { tone: "amber", spark: "amber" }
  return { tone: "green", spark: "green" }
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function ErrorBudgetBurndown({
  service,
  sloLabel,
  points,
  totalBudgetMinutes,
  window,
  className,
}: ErrorBudgetBurndownProps) {
  const lastPoint = points[points.length - 1]
  const remaining = lastPoint?.actual ?? 1
  const { tone, spark } = pickTone(remaining)
  const remainingMinutes = Math.round(totalBudgetMinutes * remaining)
  const classes = [styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  const width = 480
  const height = 160
  const padding = { top: 12, right: 12, bottom: 22, left: 36 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const stepX = points.length > 1 ? innerW / (points.length - 1) : 0

  const toY = (value: number) =>
    padding.top + innerH - Math.max(0, Math.min(1, value)) * innerH

  const actualPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(padding.left + i * stepX).toFixed(2)} ${toY(p.actual).toFixed(2)}`)
    .join(" ")
  const idealPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(padding.left + i * stepX).toFixed(2)} ${toY(p.ideal).toFixed(2)}`)
    .join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <article aria-label={`Error budget burndown for ${service}`}>
        <header className={styles.head}>
          <div className={styles.identity}>
            <span className={styles.kicker}>{sloLabel}</span>
            <h3 className={styles.title}>{service} · error budget</h3>
            <span className={styles.window}>{window} window</span>
          </div>
          <div className={styles.summary}>
            <div className={styles.percentBlock}>
              <strong className={styles.percent}>{Math.round(remaining * 100)}%</strong>
              <span className={styles.percentLabel}>remaining</span>
            </div>
            <span className={styles.budgetChip}>{remainingMinutes}m / {totalBudgetMinutes}m</span>
          </div>
        </header>

        <div className={styles.chart}>
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${service} burndown over ${window}`} preserveAspectRatio="none">
            <title>{`${service} error budget burndown`}</title>
            <desc>{`Ideal vs actual budget remaining over ${points.length} samples.`}</desc>
            {/* gridlines at 0/25/50/75/100% */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={toY(t)}
                  y2={toY(t)}
                  className={styles.gridLine}
                />
                <text x={padding.left - 6} y={toY(t) + 4} className={styles.gridLabel} textAnchor="end">
                  {Math.round(t * 100)}%
                </text>
              </g>
            ))}
            <path d={idealPath} className={styles.ideal} fill="none" />
            <path d={actualPath} className={styles.actual} fill="none" />
            {/* end marker */}
            {points.length > 0 ? (
              <g>
                <circle
                  cx={padding.left + (points.length - 1) * stepX}
                  cy={toY(remaining)}
                  r={3}
                  className={styles.marker}
                />
              </g>
            ) : null}
          </svg>
        </div>

        <footer className={styles.foot}>
          <div className={styles.legend} aria-hidden="true">
            <span className={[styles.legendDot, styles.idealDot].join(" ")} /> Ideal
            <span className={[styles.legendDot, styles.actualDot].join(" ")} /> Actual
          </div>
          <div className={styles.trend}>
            <Sparkline
              points={points.map((p) => p.actual)}
              tone={spark}
              area={false}
              width={120}
              height={28}
              ariaLabel={`${service} remaining budget trend`}
            />
          </div>
        </footer>
      </article>
    </GlassSurface>
  )
}

export default ErrorBudgetBurndown
