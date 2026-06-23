import { MetricBlock, type MetricBlockItem } from "../data-display/metric-block"
import { RadialMeter } from "../charts/radial-meter"
import { Chip } from "../primitives/chip"
import styles from "./tour-analytics-card.module.css"

export interface TourStepFunnel {
  /** Step index (1-based). */
  index: number
  /** Step title shown alongside the bar. */
  title: string
  /** Users that reached this step. */
  reached: number
  /** Users that completed this step. */
  completed: number
}

interface TourAnalyticsCardProps {
  tourName: string
  starts: number
  completions: number
  /** Step where drop-off was highest. */
  dropOffStep: number
  /** Total steps in the tour. */
  totalSteps: number
  /** Window label e.g. "Last 30 days". */
  window?: string
  /** Per-step funnel rows. */
  funnel: ReadonlyArray<TourStepFunnel>
  className?: string
}

export function TourAnalyticsCard({
  tourName,
  starts,
  completions,
  dropOffStep,
  totalSteps,
  window = "Last 30 days",
  funnel,
  className,
}: TourAnalyticsCardProps) {
  const completionRate = starts > 0 ? Math.round((completions / starts) * 100) : 0
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  const metrics: ReadonlyArray<MetricBlockItem> = [
    {
      id: "starts",
      label: "Starts",
      value: starts.toLocaleString("en-AU"),
    },
    {
      id: "completions",
      label: "Completions",
      value: completions.toLocaleString("en-AU"),
    },
    {
      id: "dropoff",
      label: "Drop-off",
      value: `Step ${dropOffStep}`,
      unit: `/ ${totalSteps}`,
    },
  ]

  const tone = completionRate >= 70 ? "green" : completionRate >= 40 ? "amber" : "red"
  const baseTotal = Math.max(1, ...funnel.map((row) => row.reached))

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Tour analytics for ${tourName}, ${completionRate}% completion`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Analytics · {window}</span>
          <h3 className={styles.title}>{tourName}</h3>
        </div>
        <Chip
          label={tone === "green" ? "Healthy" : tone === "amber" ? "Watch" : "Critical"}
          tone={tone}
        />
      </header>

      <div className={styles.body}>
        <div className={styles.meterWrap}>
          <RadialMeter
            value={completionRate}
            label="Completion"
            tone={tone}
            ariaLabel={`Completion rate ${completionRate}%`}
            caption={`${completions.toLocaleString("en-AU")} of ${starts.toLocaleString("en-AU")} users`}
          />
        </div>
        <MetricBlock metrics={metrics} className={styles.metrics} />
      </div>

      <div className={styles.funnel}>
        <span className={styles.label}>Step funnel</span>
        <ol className={styles.funnelList}>
          {funnel.map((row) => {
            const reachedPct = (row.reached / baseTotal) * 100
            const completedPct = (row.completed / baseTotal) * 100
            const stepRate = row.reached > 0
              ? Math.round((row.completed / row.reached) * 100)
              : 0
            return (
              <li key={row.index} className={styles.funnelRow}>
                <span className={styles.funnelHead}>
                  <span className={styles.funnelIdx}>
                    {String(row.index).padStart(2, "0")}
                  </span>
                  <span className={styles.funnelTitle}>{row.title}</span>
                  <span className={styles.funnelRate}>{stepRate}%</span>
                </span>
                <span
                  className={styles.funnelBar}
                  aria-hidden="true"
                >
                  <span
                    className={styles.funnelReached}
                    style={{ width: `${reachedPct}%` }}
                  />
                  <span
                    className={styles.funnelCompleted}
                    style={{ width: `${completedPct}%` }}
                  />
                </span>
                <span className={styles.funnelMeta}>
                  {row.completed.toLocaleString("en-AU")} of {row.reached.toLocaleString("en-AU")}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default TourAnalyticsCard
