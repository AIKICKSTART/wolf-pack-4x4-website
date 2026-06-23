import { BarChart } from "../charts/bar-chart"

import styles from "./lost-reason-pareto.module.css"

export interface LostReasonDatum {
  reason: string
  count: number
}

interface LostReasonParetoProps {
  data: ReadonlyArray<LostReasonDatum>
  /** Override label color for the count series. */
  title?: string
  className?: string
}

export function LostReasonPareto({
  data,
  title = "Lost reasons (last 90d)",
  className,
}: LostReasonParetoProps) {
  // Sort descending to get Pareto ordering. Then compute cumulative %.
  const sorted = [...data].sort((a, b) => b.count - a.count)
  const total = sorted.reduce((sum, d) => sum + d.count, 0) || 1

  const cumulative = sorted.map((_, index) => {
    const runningTotal = sorted
      .slice(0, index + 1)
      .reduce((sum, d) => sum + d.count, 0)

    return Math.round((runningTotal / total) * 100)
  })

  const counts = sorted.map((d) => d.count)
  const labels = sorted.map((d) => d.reason)

  const classes = [styles.card, className].filter(Boolean).join(" ")
  const headlineReason = sorted[0]
  const top80Index = cumulative.findIndex((v) => v >= 80)
  const top80Count = top80Index >= 0 ? top80Index + 1 : sorted.length

  return (
    <section className={classes} aria-label={`Pareto of lost reasons: ${title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Pareto</span>
        <h3 className={styles.title}>{title}</h3>
        {headlineReason ? (
          <p className={styles.callout}>
            Top reason: <strong>{headlineReason.reason}</strong> (
            {headlineReason.count} losses). {top80Count} reasons drive 80% of
            losses.
          </p>
        ) : null}
      </header>

      <div className={styles.chartWrap}>
        <BarChart
          series={[
            {
              label: "Losses",
              values: counts,
              tone: "red",
            },
          ]}
          xLabels={labels}
          mode="grouped"
          ariaLabel={`Pareto bar chart of lost reasons, total ${total} losses`}
        />
        <ol className={styles.cumList}>
          {sorted.map((datum, idx) => (
            <li key={datum.reason} className={styles.cumRow}>
              <span className={styles.cumRank}>{idx + 1}</span>
              <span className={styles.cumLabel}>{datum.reason}</span>
              <span className={styles.cumCount}>{datum.count}</span>
              <span
                className={styles.cumPct}
                data-flag={cumulative[idx] >= 80 ? "over" : "under"}
              >
                {cumulative[idx]}% cum.
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default LostReasonPareto
