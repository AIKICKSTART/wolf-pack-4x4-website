import styles from "./goal-funnel-card.module.css"

export interface GoalFunnelStep {
  id: string
  label: string
  count: number
}

interface GoalFunnelCardProps {
  /** Goal name. */
  goalName: string
  /** Description / context, e.g. "Quote → Booked dyno session". */
  description?: string
  /** Funnel steps, top of funnel first. */
  steps: ReadonlyArray<GoalFunnelStep>
  /** Average monetary value per converted unit (AUD). */
  averageValue: number
  /** Optional tone applied to bar gradient. */
  tone?: "default" | "amber"
  className?: string
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-AU")
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function GoalFunnelCard({
  goalName,
  description,
  steps,
  averageValue,
  tone = "default",
  className,
}: GoalFunnelCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const top = steps[0]?.count ?? 0
  const bottom = steps[steps.length - 1]?.count ?? 0
  const conversionRate = top > 0 ? (bottom / top) * 100 : 0
  const totalValue = bottom * averageValue

  return (
    <article
      className={classes}
      aria-label={`Goal funnel · ${goalName}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Goal funnel</span>
          <h3 className={styles.title}>{goalName}</h3>
          {description ? (
            <p className={styles.subline}>{description}</p>
          ) : null}
        </div>
        <div className={styles.summary}>
          <span className={styles.summaryLabel}>Conversion</span>
          <span className={styles.summaryValue}>
            {conversionRate.toFixed(1)}%
          </span>
          <span className={styles.summaryRate}>
            {formatAud(totalValue)} value · {formatAud(averageValue)} avg
          </span>
        </div>
      </header>

      <ol className={styles.funnel} aria-label={`${goalName} funnel steps`}>
        {steps.map((step, idx) => {
          const ratio = top > 0 ? step.count / top : 0
          const prevCount = idx > 0 ? steps[idx - 1].count : null
          const dropoff =
            prevCount !== null && prevCount > 0
              ? ((prevCount - step.count) / prevCount) * 100
              : null
          return (
            <li key={step.id} className={styles.step}>
              <span className={styles.stepLabel}>{step.label}</span>
              <span className={styles.bar} aria-hidden="true">
                <span
                  className={styles.barFill}
                  data-tone={tone === "amber" ? "amber" : undefined}
                  style={{ width: `${Math.max(2, ratio * 100)}%` }}
                />
              </span>
              <span className={styles.count}>{formatNumber(step.count)}</span>
              <span className={styles.rate}>
                {dropoff === null ? (
                  "—"
                ) : (
                  <>
                    <span className={styles.dropoff}>−{dropoff.toFixed(1)}%</span>
                  </>
                )}
              </span>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default GoalFunnelCard
