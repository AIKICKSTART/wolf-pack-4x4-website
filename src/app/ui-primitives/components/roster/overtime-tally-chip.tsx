import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import { MetricBlock } from "../data-display/metric-block"
import type { MetricBlockItem } from "../data-display/metric-block"
import styles from "./overtime-tally-chip.module.css"

interface OvertimeTallyChipProps {
  weekHours: number
  monthHours: number
  /** Soft threshold for the week — over this triggers amber. */
  weekThreshold: number
  /** Hard threshold for the month — over this triggers red. */
  monthThreshold: number
  className?: string
}

function thresholdTone(value: number, threshold: number): ChipTone {
  if (value >= threshold) {
    return "red"
  }
  if (value >= threshold * 0.85) {
    return "amber"
  }
  return "green"
}

export function OvertimeTallyChip({
  weekHours,
  monthHours,
  weekThreshold,
  monthThreshold,
  className,
}: OvertimeTallyChipProps) {
  const weekTone = thresholdTone(weekHours, weekThreshold)
  const monthTone = thresholdTone(monthHours, monthThreshold)
  const alert = weekTone === "red" || monthTone === "red"

  const metrics: ReadonlyArray<MetricBlockItem> = [
    {
      id: "week",
      label: "Overtime this week",
      value: weekHours.toFixed(1),
      unit: "h",
      delta: {
        label: `${weekThreshold}h cap`,
        direction: weekHours >= weekThreshold ? "up" : "flat",
      },
    },
    {
      id: "month",
      label: "Overtime this month",
      value: monthHours.toFixed(1),
      unit: "h",
      delta: {
        label: `${monthThreshold}h cap`,
        direction: monthHours >= monthThreshold ? "up" : "flat",
      },
    },
  ]

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role={alert ? "alert" : undefined}
      aria-label="Overtime tally"
    >
      <MetricBlock metrics={metrics} />
      <div className={styles.chipRow}>
        <Chip
          label={`Week ${weekHours.toFixed(1)}/${weekThreshold}h`}
          tone={weekTone}
        />
        <Chip
          label={`Month ${monthHours.toFixed(1)}/${monthThreshold}h`}
          tone={monthTone}
        />
      </div>
    </div>
  )
}

export default OvertimeTallyChip
