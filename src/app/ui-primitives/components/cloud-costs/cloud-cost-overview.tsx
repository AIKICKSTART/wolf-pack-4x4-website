import { Chip } from "../primitives/chip"
import { ProgressLinear, type ProgressLinearTone } from "../primitives/progress-linear"
import { StatTile, type StatTileTone } from "../primitives/stat-tile"
import { BarChart, type BarSeries } from "../charts/bar-chart"

import {
  formatAud,
  formatAudCompact,
  formatPctSigned,
  type BudgetState,
} from "./cloud-costs-types"
import styles from "./cloud-cost-overview.module.css"

function budgetTone(state: BudgetState): ProgressLinearTone {
  switch (state) {
    case "ok":
      return "green"
    case "approaching":
      return "amber"
    case "exceeded":
      return "red"
  }
}

function budgetStatTone(state: BudgetState): StatTileTone {
  switch (state) {
    case "ok":
      return "green"
    case "approaching":
      return "amber"
    case "exceeded":
      return "red"
  }
}

export interface CloudCostOverviewProps {
  /** Org / account label e.g. "verridian-prod (Sydney)". */
  accountLabel: string
  /** Month label e.g. "May 2026". */
  monthLabel: string
  /** Month-to-date spend in AUD. */
  mtdSpend: number
  /** Projected end-of-month spend in AUD. */
  forecastSpend: number
  /** Budget for the month in AUD. */
  budget: number
  /** Last month total for delta comparison in AUD. */
  lastMonthSpend: number
  /** Labels for the budget vs actual bar chart (typically weeks). */
  trendLabels: ReadonlyArray<string>
  /** Budget value per label in AUD. */
  budgetSeries: ReadonlyArray<number>
  /** Actual spend per label in AUD. */
  actualSeries: ReadonlyArray<number>
  className?: string
}

function resolveBudgetState(actual: number, budget: number): BudgetState {
  if (budget <= 0) {
    return "ok"
  }
  const ratio = actual / budget
  if (ratio >= 1) {
    return "exceeded"
  }
  if (ratio >= 0.8) {
    return "approaching"
  }
  return "ok"
}

export function CloudCostOverview({
  accountLabel,
  monthLabel,
  mtdSpend,
  forecastSpend,
  budget,
  lastMonthSpend,
  trendLabels,
  budgetSeries,
  actualSeries,
  className,
}: CloudCostOverviewProps) {
  const budgetPct = budget > 0 ? Math.min(100, Math.round((mtdSpend / budget) * 100)) : 0
  const forecastDeltaPct = budget > 0 ? ((forecastSpend - budget) / budget) * 100 : 0
  const monthOverMonthPct =
    lastMonthSpend > 0 ? ((forecastSpend - lastMonthSpend) / lastMonthSpend) * 100 : 0
  const state = resolveBudgetState(forecastSpend, budget)
  const meterTone = budgetTone(state)
  const tileTone = budgetStatTone(state)
  const stateLabel =
    state === "exceeded"
      ? "Forecast over budget"
      : state === "approaching"
        ? "Approaching budget"
        : "Within budget"

  const trendSeries: BarSeries[] = [
    { label: "Budget", values: [...budgetSeries], tone: "teal" },
    {
      label: "Actual",
      values: [...actualSeries],
      tone: state === "exceeded" ? "red" : "amber",
    },
  ]

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Cloud cost overview for ${accountLabel} — ${monthLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Cloud spend · {monthLabel}</span>
          <h3 className={styles.title}>{accountLabel}</h3>
        </div>
        <Chip label={stateLabel} tone={meterTone} />
      </header>

      <div className={styles.tiles}>
        <StatTile
          label="Month-to-date"
          value={formatAudCompact(mtdSpend)}
          caption={formatAud(mtdSpend)}
          tone="teal"
        />
        <StatTile
          label="Forecast EOM"
          value={formatAudCompact(forecastSpend)}
          caption={`Budget ${formatAudCompact(budget)} · ${formatPctSigned(forecastDeltaPct)}`}
          tone={tileTone}
          delta={{
            value: formatPctSigned(monthOverMonthPct),
            direction: monthOverMonthPct > 0 ? "up" : monthOverMonthPct < 0 ? "down" : "flat",
            helpText: "vs last month",
          }}
        />
        <StatTile
          label="Budget used"
          value={`${budgetPct}%`}
          caption={`${formatAud(mtdSpend)} of ${formatAud(budget)}`}
          tone={tileTone}
        />
      </div>

      <div className={styles.meter}>
        <div className={styles.meterHead}>
          <span className={styles.meterLabel}>Month progress vs budget</span>
          <span className={styles.meterValue}>{budgetPct}%</span>
        </div>
        <ProgressLinear value={budgetPct} max={100} tone={meterTone} variant="solid" />
      </div>

      <div className={styles.chartWrap}>
        <BarChart
          series={trendSeries}
          xLabels={[...trendLabels]}
          ariaLabel={`Budget vs actual spend for ${monthLabel}`}
          unit=""
        />
      </div>
    </section>
  )
}

export default CloudCostOverview
