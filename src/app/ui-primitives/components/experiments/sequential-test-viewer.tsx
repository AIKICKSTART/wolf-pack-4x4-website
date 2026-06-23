import { AreaChart, type AreaSeries } from "../charts/area-chart"
import { Chip } from "../primitives/chip"

import styles from "./sequential-test-viewer.module.css"

export interface SequentialTestViewerProps {
  /** P-values across peeks (always-valid / corrected). */
  pValues: ReadonlyArray<number>
  /** Naive p-values for comparison. */
  naivePValues?: ReadonlyArray<number>
  /** X-axis labels (peek N). */
  peekLabels: ReadonlyArray<string>
  /** Stopping boundary (e.g. 0.05). */
  alphaBoundary?: number
  /** Index at which the test crossed the upper boundary. -1 = not crossed. */
  crossedAtIndex?: number
  className?: string
}

export function SequentialTestViewer({
  pValues,
  naivePValues,
  peekLabels,
  alphaBoundary = 0.05,
  crossedAtIndex = -1,
  className,
}: SequentialTestViewerProps) {
  /* AreaChart takes 0..max values — we plot p*100 for legibility. */
  const series: AreaSeries[] = [
    {
      label: "Corrected p (always-valid)",
      values: pValues.map((p) => p * 100),
      tone: "teal",
    },
  ]
  if (naivePValues && naivePValues.length > 0) {
    series.push({
      label: "Naive p",
      values: naivePValues.map((p) => p * 100),
      tone: "amber",
    })
  }

  const finalCorrected = pValues[pValues.length - 1] ?? 1
  const significant = finalCorrected < alphaBoundary
  const crossedLabel =
    crossedAtIndex >= 0 && crossedAtIndex < peekLabels.length
      ? peekLabels[crossedAtIndex]
      : null

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Sequential testing p-value viewer"
    >
      <div className={styles.chartFrame}>
        <AreaChart
          series={series}
          xLabels={[...peekLabels]}
          ariaLabel={`Sequential test corrected p-values over ${peekLabels.length} peeks`}
          unit="%"
        />
        <div
          className={styles.boundary}
          style={{ bottom: `${Math.min(99, alphaBoundary * 100 * 8)}%` }}
          aria-hidden="true"
        >
          <span className={styles.boundaryLabel}>α = {alphaBoundary}</span>
        </div>
      </div>

      <div className={styles.chips} role="status" aria-live="polite">
        <Chip
          label={`Final corrected p = ${finalCorrected.toFixed(3)}`}
          tone={significant ? "green" : "neutral"}
        />
        <Chip label={`Boundary α = ${alphaBoundary}`} tone="amber" />
        {crossedLabel ? (
          <Chip label={`Crossed at ${crossedLabel} — early stop OK`} tone="green" />
        ) : (
          <Chip label="Boundary not yet crossed" tone="neutral" />
        )}
      </div>
    </section>
  )
}

export default SequentialTestViewer
