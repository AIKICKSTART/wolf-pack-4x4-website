import { BarChart } from "../charts/bar-chart"
import type { BarSeries } from "../charts/bar-chart"

import styles from "./conversion-funnel-card.module.css"

export interface FunnelStep {
  /** Step label, e.g. "Sent". */
  label: string
  /** Count for the step. */
  count: number
}

interface ConversionFunnelCardProps {
  campaignName: string
  steps: ReadonlyArray<FunnelStep>
  className?: string
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-AU")
}

export function ConversionFunnelCard({
  campaignName,
  steps,
  className,
}: ConversionFunnelCardProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  if (steps.length === 0) {
    return null
  }

  const start = steps[0].count
  const finalCount = steps[steps.length - 1].count
  const overall = start > 0 ? (finalCount / start) * 100 : 0

  const series: ReadonlyArray<BarSeries> = [
    {
      label: "Reach",
      tone: "teal",
      values: steps.map((s) => s.count),
    },
  ]
  const xLabels = steps.map((s) => s.label)

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Conversion funnel for ${campaignName}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Conversion funnel</span>
        <span className={styles.campaign}>{campaignName}</span>
        <span
          className={styles.overall}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(overall)}
          aria-label="Overall conversion percentage"
        >
          {overall.toFixed(1)}% end-to-end
        </span>
      </header>

      <div className={styles.chartWrap}>
        <BarChart
          series={[...series]}
          xLabels={[...xLabels]}
          mode="grouped"
          height={220}
          ariaLabel={`Funnel chart with ${steps.length} stages`}
          valueLabels
        />
      </div>

      <ol className={styles.stepList}>
        {steps.map((step, idx) => {
          const prev = idx > 0 ? steps[idx - 1].count : step.count
          const dropOff =
            idx === 0 || prev === 0
              ? 0
              : ((prev - step.count) / prev) * 100
          return (
            <li key={step.label} className={styles.step}>
              <span className={styles.stepLabel}>{step.label}</span>
              <span className={styles.stepValue}>{formatNumber(step.count)}</span>
              <span
                className={styles.stepDelta}
                data-positive={idx === 0 ? "true" : dropOff < 30 ? "true" : "false"}
              >
                {idx === 0
                  ? "Base"
                  : `${dropOff.toFixed(1)}% drop-off`}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default ConversionFunnelCard
