import type { SubmissionDropOff } from "./form-builder-types"
import styles from "./submission-analytics-card.module.css"

interface SubmissionAnalyticsCardProps {
  /** Total submissions count. */
  totalSubmissions: number
  /** Completion rate 0-100. */
  completionRate: number
  /** Average time-to-complete label e.g. "1m 48s". */
  averageTime: string
  /** Per-field drop-off — render as a horizontal bar set. */
  dropOff: ReadonlyArray<SubmissionDropOff>
  /** Optional delta vs the prior period e.g. "+12%". */
  trend?: string
  className?: string
}

const GAUGE_RADIUS = 32
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS

export function SubmissionAnalyticsCard({
  totalSubmissions,
  completionRate,
  averageTime,
  dropOff,
  trend,
  className,
}: SubmissionAnalyticsCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const clamped = Math.max(0, Math.min(100, completionRate))
  const dash = (clamped / 100) * GAUGE_CIRCUMFERENCE

  return (
    <section className={classes} aria-label="Submission analytics">
      <header className={styles.head}>
        <span className={styles.kicker}>Submissions · last 30 days</span>
        <h3 className={styles.title}>How the form performed</h3>
      </header>

      <div className={styles.kpis}>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>Total submissions</span>
          <span className={styles.kpiValue}>{totalSubmissions.toLocaleString("en-AU")}</span>
          {trend ? <span className={styles.kpiTrend}>{trend}</span> : null}
        </div>

        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>Average time-to-complete</span>
          <span className={styles.kpiValue}>{averageTime}</span>
          <span className={styles.kpiHint}>per respondent</span>
        </div>

        <div className={styles.gauge}>
          <svg viewBox="0 0 80 80" className={styles.gaugeSvg} aria-hidden="true">
            <circle
              cx="40"
              cy="40"
              r={GAUGE_RADIUS}
              fill="none"
              stroke="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r={GAUGE_RADIUS}
              fill="none"
              stroke="var(--primitive-green)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${GAUGE_CIRCUMFERENCE}`}
              transform="rotate(-90 40 40)"
            />
          </svg>
          <div className={styles.gaugeBody}>
            <span className={styles.gaugeValue}>{Math.round(clamped)}%</span>
            <span className={styles.gaugeLabel}>Completion</span>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <div className={styles.chartHead}>
          <span className={styles.chartTitle}>Drop-off by field</span>
          <span className={styles.chartHint}>Lower bars = more abandonment</span>
        </div>
        <ul className={styles.bars}>
          {dropOff.map((entry) => {
            const value = Math.max(0, Math.min(100, entry.completion))
            return (
              <li key={entry.field} className={styles.bar}>
                <span className={styles.barLabel}>{entry.field}</span>
                <span className={styles.barTrack} aria-hidden="true">
                  <span
                    className={[
                      styles.barFill,
                      value < 50
                        ? styles.barFillLow
                        : value < 80
                          ? styles.barFillMid
                          : styles.barFillHigh,
                    ].join(" ")}
                    style={{ width: `${value}%` }}
                  />
                </span>
                <span className={styles.barValue}>{value}%</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
