import { BarChart, type BarSeries } from "../charts/bar-chart"
import { Chip } from "../primitives/chip"

import styles from "./job-timing-distribution.module.css"

export interface TimingBucket {
  /** Bucket label (e.g. "<100ms", "100-250ms"). */
  label: string
  /** Sample count in the bucket. */
  count: number
}

export interface TimingPercentile {
  /** Percentile name (e.g. "p50"). */
  label: string
  /** Value in ms. */
  valueMs: number
}

export interface TimingOutlier {
  jobId: string
  /** Duration ms. */
  valueMs: number
}

interface JobTimingDistributionProps {
  buckets: ReadonlyArray<TimingBucket>
  percentiles: ReadonlyArray<TimingPercentile>
  outliers: ReadonlyArray<TimingOutlier>
  /** Caption shown above the chart (e.g. queue name). */
  caption: string
  className?: string
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

export function JobTimingDistribution({
  buckets,
  percentiles,
  outliers,
  caption,
  className,
}: JobTimingDistributionProps) {
  const series: BarSeries[] = [
    {
      label: "Jobs",
      values: buckets.map((b) => b.count),
      tone: "teal",
    },
  ]

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Job timing distribution">
      <header className={styles.head}>
        <span className={styles.kicker}>Timing distribution</span>
        <h3 className={styles.title}>{caption}</h3>
      </header>
      <BarChart
        series={series}
        xLabels={buckets.map((b) => b.label)}
        ariaLabel="Histogram of job durations"
        mode="grouped"
        valueLabels={false}
      />
      <dl className={styles.pctRow}>
        {percentiles.map((p) => (
          <div key={p.label}>
            <dt>{p.label}</dt>
            <dd>{formatMs(p.valueMs)}</dd>
          </div>
        ))}
      </dl>
      {outliers.length > 0 && (
        <div className={styles.outliers}>
          <span className={styles.outliersLabel}>Outliers</span>
          <div className={styles.outliersList}>
            {outliers.map((outlier) => (
              <Chip
                key={outlier.jobId}
                label={`${outlier.jobId} · ${formatMs(outlier.valueMs)}`}
                tone="red"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default JobTimingDistribution
