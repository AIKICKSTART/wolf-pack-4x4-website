import { Chip } from "../primitives/chip"
import { AreaChart, type AreaSeries } from "../charts/area-chart"

import {
  formatAud,
  formatAudCompact,
  formatDayLabel,
  formatPctSigned,
  type BudgetState,
} from "./cloud-costs-types"
import styles from "./daily-budget-burndown.module.css"

export interface DailyBudgetBurndownProps {
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** ISO dates per sample. */
  dateLabels: ReadonlyArray<string>
  /** Daily-target line (e.g. budget / days). */
  targetSeries: ReadonlyArray<number>
  /** Daily-actual cumulative line. */
  actualSeries: ReadonlyArray<number>
  /** Total budget for the period. */
  budget: number
  className?: string
}

function projectState(actual: number, target: number): BudgetState {
  if (target <= 0) {
    return "ok"
  }
  const ratio = actual / target
  if (ratio >= 1.05) {
    return "exceeded"
  }
  if (ratio >= 0.95) {
    return "approaching"
  }
  return "ok"
}

export function DailyBudgetBurndown({
  periodLabel,
  dateLabels,
  targetSeries,
  actualSeries,
  budget,
  className,
}: DailyBudgetBurndownProps) {
  const lastIdx = Math.min(targetSeries.length, actualSeries.length) - 1
  const currentTarget = lastIdx >= 0 ? targetSeries[lastIdx] : 0
  const currentActual = lastIdx >= 0 ? actualSeries[lastIdx] : 0
  const deltaPct =
    currentTarget > 0
      ? ((currentActual - currentTarget) / currentTarget) * 100
      : 0
  const state = projectState(currentActual, currentTarget)
  const stateLabel =
    state === "exceeded"
      ? "Burning hot"
      : state === "approaching"
        ? "Close to plan"
        : "On plan"
  const stateTone = state === "exceeded" ? "red" : state === "approaching" ? "amber" : "green"
  const remaining = Math.max(0, budget - currentActual)

  const series: ReadonlyArray<AreaSeries> = [
    { label: "Target", values: [...targetSeries], tone: "teal" },
    {
      label: "Actual",
      values: [...actualSeries],
      tone: state === "exceeded" ? "red" : "amber",
    },
  ]

  const xLabels = dateLabels.map((iso) => formatDayLabel(iso))

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Daily budget burndown for ${periodLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Burndown · {periodLabel}</span>
          <h3 className={styles.title}>Daily budget burndown</h3>
        </div>
        <Chip label={stateLabel} tone={stateTone} />
      </header>

      <div className={styles.metricsRow}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Today actual</span>
          <span className={styles.metricValue}>{formatAud(currentActual)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Daily target</span>
          <span className={styles.metricValue}>{formatAud(currentTarget)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Variance</span>
          <span className={styles.metricValue} data-tone={stateTone}>
            {formatPctSigned(deltaPct)}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Budget left</span>
          <span className={styles.metricValue}>{formatAudCompact(remaining)}</span>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <AreaChart
          series={[...series]}
          xLabels={xLabels}
          ariaLabel={`Daily budget burndown chart for ${periodLabel}`}
          gridlines={4}
          unit=""
        />
      </div>
    </section>
  )
}

export default DailyBudgetBurndown
