"use client"

import { useMemo, useState } from "react"

import { AreaChart, type AreaSeries } from "../charts/area-chart"
import { Chip } from "../primitives/chip"

import {
  formatAud,
  formatAudCompact,
  formatDayLabel,
  formatPctSigned,
  type DailyCostPoint,
} from "./cloud-costs-types"
import styles from "./cost-trend-area-chart.module.css"

export type CostTrendRange = "7d" | "14d" | "30d" | "90d"

interface RangeOption {
  id: CostTrendRange
  label: string
  days: number
}

const RANGE_OPTIONS: ReadonlyArray<RangeOption> = [
  { id: "7d", label: "7 days", days: 7 },
  { id: "14d", label: "14 days", days: 14 },
  { id: "30d", label: "30 days", days: 30 },
  { id: "90d", label: "90 days", days: 90 },
]

export interface CostTrendAreaChartProps {
  /** Account / context label e.g. "verridian-prod". */
  accountLabel: string
  /** All available points, most recent last. */
  points: ReadonlyArray<DailyCostPoint>
  /** Initial range. Defaults to 30d. */
  initialRange?: CostTrendRange
  className?: string
}

export function CostTrendAreaChart({
  accountLabel,
  points,
  initialRange = "30d",
  className,
}: CostTrendAreaChartProps) {
  const [range, setRange] = useState<CostTrendRange>(initialRange)

  const slice = useMemo(() => {
    const days = RANGE_OPTIONS.find((opt) => opt.id === range)?.days ?? 30
    return points.slice(-days)
  }, [points, range])

  const actualSeries: AreaSeries = {
    label: "Actual spend",
    values: slice.map((p) => p.actual),
    tone: "teal",
  }

  const forecastSeries: AreaSeries | null = useMemo(() => {
    if (!slice.some((p) => typeof p.forecast === "number")) {
      return null
    }
    return {
      label: "Forecast band",
      values: slice.map((p) => {
        if (typeof p.forecast === "number") {
          return Math.max(0, p.forecast - p.actual)
        }
        return 0
      }),
      tone: "amber",
    }
  }, [slice])

  const xLabels = slice.map((p) => formatDayLabel(p.dateISO))
  const totalActual = slice.reduce((sum, p) => sum + p.actual, 0)
  const totalForecast = slice.reduce(
    (sum, p) => sum + (p.forecast ?? p.actual),
    0
  )
  const avgDaily = slice.length > 0 ? totalActual / slice.length : 0
  const forecastDelta =
    totalActual > 0 ? ((totalForecast - totalActual) / totalActual) * 100 : 0
  const series: ReadonlyArray<AreaSeries> = forecastSeries
    ? [actualSeries, forecastSeries]
    : [actualSeries]

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Daily cost trend for ${accountLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Daily cost · {accountLabel}</span>
          <h3 className={styles.title}>Cost trend</h3>
        </div>
        <div
          className={styles.rangePicker}
          role="radiogroup"
          aria-label="Trend range"
        >
          {RANGE_OPTIONS.map((opt) => {
            const selected = opt.id === range
            return (
              <button
                key={opt.id}
                type="button"
                className={selected ? styles.rangeSelected : styles.rangeOption}
                role="radio"
                aria-checked={selected}
                onClick={() => setRange(opt.id)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </header>

      <div className={styles.summary}>
        <Chip label={`Range ${range}`} tone="teal" />
        <span className={styles.metric}>
          <span className={styles.metricLabel}>Spend</span>
          <span className={styles.metricValue}>{formatAudCompact(totalActual)}</span>
        </span>
        <span className={styles.metric}>
          <span className={styles.metricLabel}>Daily avg</span>
          <span className={styles.metricValue}>{formatAud(avgDaily)}</span>
        </span>
        {forecastSeries ? (
          <span className={styles.metric}>
            <span className={styles.metricLabel}>Forecast Δ</span>
            <span
              className={styles.metricValue}
              data-tone={forecastDelta >= 0 ? "amber" : "green"}
            >
              {formatPctSigned(forecastDelta)}
            </span>
          </span>
        ) : null}
      </div>

      <div className={styles.chartWrap}>
        <AreaChart
          series={[...series]}
          xLabels={xLabels}
          ariaLabel={`Cost trend over ${range}`}
          gridlines={4}
          unit=""
        />
      </div>
    </section>
  )
}

export default CostTrendAreaChart
