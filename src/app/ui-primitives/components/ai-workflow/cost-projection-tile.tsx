import { DollarSign } from "lucide-react"

import { BarChart } from "../charts/bar-chart"
import {
  MODEL_LABEL,
  formatCost,
  projectCost,
  type WorkflowModelId,
} from "./ai-workflow-types"
import styles from "./cost-projection-tile.module.css"

interface CostProjectionTileProps {
  title: string
  /** Model used for the projection. */
  modelId: WorkflowModelId
  /** Average input tokens per run. */
  inputTokensPerRun: number
  /** Average output tokens per run. */
  outputTokensPerRun: number
  /** Projected runs per day. */
  runsPerDay: number
  /** Daily spend trend tail (7 days). Display via bar chart. */
  trendUsd?: ReadonlyArray<number>
  /** Currency for the display. Defaults to USD. */
  currency?: "USD" | "AUD"
  kicker?: string
  className?: string
}

export function CostProjectionTile({
  title,
  modelId,
  inputTokensPerRun,
  outputTokensPerRun,
  runsPerDay,
  trendUsd,
  currency = "USD",
  kicker = "Cost projection",
  className,
}: CostProjectionTileProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const perRun = projectCost(modelId, inputTokensPerRun, outputTokensPerRun)
  const perDay = perRun * runsPerDay
  const perMonth = perDay * 30
  const exchangeRate = currency === "AUD" ? 1.52 : 1

  return (
    <section className={classes} aria-label={`Cost projection · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <DollarSign size={14} strokeWidth={2.4} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.modelChip}>{MODEL_LABEL[modelId]}</span>
      </header>

      <div className={styles.figures}>
        <div className={styles.figureBlock} data-emphasis="primary">
          <span className={styles.figureLabel}>Per run</span>
          <span className={styles.figureValue}>
            {formatCost(perRun * exchangeRate, currency)}
          </span>
          <span className={styles.figureSub}>
            {(inputTokensPerRun + outputTokensPerRun).toLocaleString()} tok
          </span>
        </div>
        <div className={styles.figureBlock}>
          <span className={styles.figureLabel}>Per day</span>
          <span className={styles.figureValue}>
            {formatCost(perDay * exchangeRate, currency)}
          </span>
          <span className={styles.figureSub}>
            {runsPerDay.toLocaleString()} runs
          </span>
        </div>
        <div className={styles.figureBlock}>
          <span className={styles.figureLabel}>Per month</span>
          <span className={styles.figureValue}>
            {formatCost(perMonth * exchangeRate, currency)}
          </span>
          <span className={styles.figureSub}>30-day projection</span>
        </div>
      </div>

      {trendUsd && trendUsd.length > 0 ? (
        <div className={styles.chartWrap}>
          <span className={styles.chartLabel}>
            Daily spend · last {trendUsd.length} days ({currency})
          </span>
          <BarChart
            series={[
              {
                label: "Daily spend",
                values: trendUsd.map((value) => value * exchangeRate),
                tone: "teal",
              },
            ]}
            xLabels={trendUsd.map((_, idx) => `D${idx + 1}`)}
            mode="grouped"
            height={140}
            ariaLabel={`Daily ${currency} spend trend for ${title}`}
            unit={currency === "AUD" ? "A$" : "$"}
            valueLabels={false}
          />
        </div>
      ) : null}
    </section>
  )
}

export default CostProjectionTile
