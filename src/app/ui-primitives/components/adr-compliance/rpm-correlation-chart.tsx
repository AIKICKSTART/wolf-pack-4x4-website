import { AreaChart, type AreaSeries } from "../charts/area-chart"
import { Chip } from "../primitives/chip"

import styles from "./rpm-correlation-chart.module.css"

export interface RpmSample {
  /** Engine RPM. */
  rpm: number
  /** Sound level in dB(A) measured at this RPM. */
  db: number
}

interface RpmCorrelationChartProps {
  /** Heading, e.g. "VE Commodore SS · Sweep 800 → 6,500 RPM". */
  title: string
  /** RPM vs dB samples. Must be sorted by RPM ascending. */
  samples: ReadonlyArray<RpmSample>
  /** ADR sound limit, overlaid as a horizontal line. */
  limitDb: number
  /** Optional second series, e.g. pre-mod baseline. */
  baselineSamples?: ReadonlyArray<RpmSample>
  /** Optional caption. */
  caption?: string
  className?: string
}

export function RpmCorrelationChart({
  title,
  samples,
  limitDb,
  baselineSamples,
  caption,
  className,
}: RpmCorrelationChartProps) {
  const xLabels = samples.map((sample) => `${(sample.rpm / 1000).toFixed(1)}k`)

  const series: AreaSeries[] = [
    {
      label: "Post-mod dB(A)",
      values: samples.map((sample) => sample.db),
      tone: "red",
    },
  ]
  if (baselineSamples && baselineSamples.length === samples.length) {
    series.unshift({
      label: "Pre-mod dB(A)",
      values: baselineSamples.map((sample) => sample.db),
      tone: "teal",
    })
  }

  const peakDb = Math.max(...samples.map((sample) => sample.db))
  const peakSample = samples.find((sample) => sample.db === peakDb)
  const limitChipTone: "green" | "amber" | "red" =
    peakDb > limitDb ? "red" : peakDb >= limitDb - 2 ? "amber" : "green"

  return (
    <section
      className={`${styles.wrap} ${className ?? ""}`.trim()}
      aria-label={`RPM vs sound output chart for ${title}`}
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>RPM × dB correlation</span>
          <h3 className={styles.title}>{title}</h3>
          {caption ? <span>{caption}</span> : null}
        </div>
        <div className={styles.legend}>
          <span className={styles.legendSwatch} aria-hidden="true" />
          ADR {limitDb} dB(A) limit
        </div>
      </header>

      <div className={styles.chartSlot}>
        <AreaChart
          series={series}
          xLabels={xLabels}
          ariaLabel={`Sound output across the rev range, ADR limit ${limitDb} decibels.`}
          height={240}
          unit=""
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}>
        <Chip
          label={`Peak ${peakDb.toFixed(1)} dB @ ${peakSample ? `${(peakSample.rpm / 1000).toFixed(1)}k RPM` : "—"}`}
          tone={limitChipTone}
        />
        <Chip label={`Limit ${limitDb} dB(A)`} tone="neutral" />
        <Chip label={`${samples.length} samples`} tone="neutral" />
      </div>
    </section>
  )
}

export default RpmCorrelationChart
