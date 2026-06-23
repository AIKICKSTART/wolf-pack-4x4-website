import { DashboardCard } from "../data-display/dashboard-card"
import { Chip, type ChipTone } from "../primitives/chip"

import {
  STATUS_LABEL,
  STATUS_TONE,
  type ExperimentStatus,
  type ExperimentVariantSummary,
  type ExperimentTone,
} from "./experiments-types"

import styles from "./experiment-card.module.css"

export interface ExperimentCardProps {
  name: string
  hypothesis?: string
  status: ExperimentStatus
  variants: ReadonlyArray<ExperimentVariantSummary>
  /** Total subjects exposed so far. */
  sampleSize: number
  /** Required sample size for target power, if known. */
  requiredSampleSize?: number
  /** Significance p-value vs control, e.g. 0.03. */
  significance?: number
  /** Lift over control, in percent. */
  lift?: number
  className?: string
}

const TONE_TO_CHIP: Record<ExperimentTone, ChipTone> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function formatSample(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

function formatP(p: number): string {
  if (p < 0.001) return "p < 0.001"
  return `p = ${p.toFixed(3)}`
}

function formatLift(value: number): string {
  if (value > 0) return `+${value.toFixed(1)}%`
  if (value < 0) return `${value.toFixed(1)}%`
  return "0%"
}

export function ExperimentCard({
  name,
  hypothesis,
  status,
  variants,
  sampleSize,
  requiredSampleSize,
  significance,
  lift,
  className,
}: ExperimentCardProps) {
  const statusTone = STATUS_TONE[status]
  const significanceTone: ChipTone =
    significance === undefined
      ? "neutral"
      : significance < 0.05
        ? "green"
        : significance < 0.1
          ? "amber"
          : "neutral"
  const liftTone: ChipTone =
    lift === undefined ? "neutral" : lift > 0 ? "green" : lift < 0 ? "red" : "neutral"
  const sampleTone: ChipTone =
    requiredSampleSize && sampleSize >= requiredSampleSize ? "green" : "teal"

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Experiment ${name}, status ${STATUS_LABEL[status]}`}
    >
      <DashboardCard
        label={`Experiment · ${STATUS_LABEL[status]}`}
        value={name}
        meta={hypothesis}
        surface="glass"
      />

      <div className={styles.chipStrip} aria-label="Experiment chips">
        <Chip label={STATUS_LABEL[status]} tone={TONE_TO_CHIP[statusTone]} selected />
        {variants.map((variant) => (
          <Chip
            key={variant.id}
            label={`${variant.name}${variant.isControl ? " (control)" : ""}`}
            tone={variant.isControl ? "neutral" : "teal"}
          />
        ))}
        <Chip
          label={`Sample ${formatSample(sampleSize)}${
            requiredSampleSize ? ` / ${formatSample(requiredSampleSize)}` : ""
          }`}
          tone={sampleTone}
        />
        {significance !== undefined ? (
          <Chip label={formatP(significance)} tone={significanceTone} />
        ) : null}
        {lift !== undefined ? <Chip label={`Lift ${formatLift(lift)}`} tone={liftTone} /> : null}
      </div>
    </section>
  )
}

export default ExperimentCard
