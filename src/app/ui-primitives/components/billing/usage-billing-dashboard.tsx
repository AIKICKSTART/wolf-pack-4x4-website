import {
  formatMoney,
  type BillingPeriod,
  type MeteredFeatureUsage,
  type MoneyAmount,
} from "./billing-types"
import styles from "./usage-billing-dashboard.module.css"

interface UsageBillingDashboardProps {
  period: BillingPeriod
  features: ReadonlyArray<MeteredFeatureUsage>
  /** 30-day trend per feature (max 30 numbers each). */
  trendByMetric?: Record<string, ReadonlyArray<number>>
}

function formatPeriod(period: BillingPeriod): string {
  const fmt = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
  })
  return `${fmt.format(new Date(period.startISO))} – ${fmt.format(new Date(period.endISO))}`
}

function projectedCharge(feature: MeteredFeatureUsage): MoneyAmount {
  const overage = Math.max(0, feature.used - feature.included)
  return { value: overage * feature.ratePerUnitAUD, currency: "AUD" }
}

function buildSparkline(points: ReadonlyArray<number>): string {
  if (points.length === 0) return ""
  const max = Math.max(...points, 1)
  const stepX = 100 / Math.max(points.length - 1, 1)
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(2)},${(32 - (p / max) * 28).toFixed(2)}`)
    .join(" ")
}

export function UsageBillingDashboard({
  period,
  features,
  trendByMetric,
}: UsageBillingDashboardProps) {
  const projectedTotal = features.reduce(
    (sum, f) => sum + projectedCharge(f).value,
    0,
  )

  return (
    <section className={styles.dashboard} aria-label="Usage-based billing">
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Metered usage</span>
          <h3 className={styles.title}>Current billing period</h3>
          <span className={styles.period}>{formatPeriod(period)}</span>
        </div>
        <div className={styles.projected}>
          <span className={styles.projectedLabel}>Projected overage</span>
          <span className={styles.projectedValue}>
            {formatMoney({ value: projectedTotal, currency: "AUD" })}
          </span>
        </div>
      </header>

      <div className={styles.grid}>
        {features.map((feature) => {
          const pct = Math.min(100, Math.round((feature.used / Math.max(feature.included, 1)) * 100))
          const isOverage = feature.used > feature.included
          const trend = trendByMetric?.[feature.metric]
          return (
            <article key={feature.metric} className={styles.tile}>
              <header className={styles.tileHead}>
                <h4 className={styles.tileLabel}>{feature.label}</h4>
                {isOverage ? <span className={styles.overChip}>Over plan</span> : null}
              </header>

              <p className={styles.tileNumbers}>
                <span className={styles.tileValue}>
                  {feature.used.toLocaleString("en-AU")}
                </span>
                <span className={styles.tileOf}>of</span>
                <span className={styles.tileIncluded}>
                  {feature.included.toLocaleString("en-AU")}
                </span>
                <span className={styles.tileUnit}>{feature.unitLabel}</span>
              </p>

              <div
                role="meter"
                aria-label={`${feature.label} usage`}
                aria-valuemin={0}
                aria-valuemax={feature.included}
                aria-valuenow={feature.used}
                className={styles.meter}
              >
                <span
                  className={`${styles.meterFill} ${isOverage ? styles.meterOver : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {trend && trend.length > 0 ? (
                <svg
                  className={styles.spark}
                  viewBox="0 0 100 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d={buildSparkline(trend)} fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              ) : null}

              <footer className={styles.tileFoot}>
                <span className={styles.rate}>
                  {formatMoney({ value: feature.ratePerUnitAUD, currency: "AUD" })} / {feature.unitLabel}
                </span>
                <span className={isOverage ? styles.chargeOver : styles.charge}>
                  + {formatMoney(projectedCharge(feature))}
                </span>
              </footer>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default UsageBillingDashboard
