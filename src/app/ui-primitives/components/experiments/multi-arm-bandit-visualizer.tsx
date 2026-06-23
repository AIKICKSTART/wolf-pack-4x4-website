import { AreaChart, type AreaSeries } from "../charts/area-chart"
import { Chip } from "../primitives/chip"

import { BANDIT_LABEL, type BanditAlgorithm } from "./experiments-types"

import styles from "./multi-arm-bandit-visualizer.module.css"

export interface BanditArm {
  id: string
  name: string
  /** Per-step traffic share %, sums to ~100 per step. */
  traffic: ReadonlyArray<number>
  tone: AreaSeries["tone"]
}

export interface MultiArmBanditVisualizerProps {
  arms: ReadonlyArray<BanditArm>
  steps: ReadonlyArray<string>
  algorithm: BanditAlgorithm
  /** 0..1: 0 = pure exploit, 1 = pure explore. */
  explorationBalance: number
  /** Predicted winning arm id. */
  predictedWinnerId?: string
  className?: string
}

function balanceLabel(value: number): string {
  if (value < 0.2) return "Exploit-heavy"
  if (value < 0.5) return "Slight exploit"
  if (value < 0.7) return "Balanced"
  if (value < 0.9) return "Slight explore"
  return "Explore-heavy"
}

function balanceTone(value: number): "green" | "teal" | "amber" {
  if (value > 0.7) return "amber"
  if (value > 0.4) return "teal"
  return "green"
}

export function MultiArmBanditVisualizer({
  arms,
  steps,
  algorithm,
  explorationBalance,
  predictedWinnerId,
  className,
}: MultiArmBanditVisualizerProps) {
  const series: AreaSeries[] = arms.map((arm) => ({
    label: arm.name,
    values: [...arm.traffic],
    tone: arm.tone,
  }))

  const winner = predictedWinnerId
    ? arms.find((arm) => arm.id === predictedWinnerId)
    : undefined

  const balance = Math.max(0, Math.min(1, explorationBalance))

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Multi-arm bandit traffic visualizer"
    >
      <AreaChart
        series={series}
        xLabels={[...steps]}
        ariaLabel={`Multi-arm bandit traffic flow over ${steps.length} steps`}
        unit="%"
      />

      <div className={styles.chips} role="status" aria-live="polite">
        <Chip label={`Algorithm · ${BANDIT_LABEL[algorithm]}`} tone="teal" />
        <Chip
          label={`${balanceLabel(balance)} (${Math.round(balance * 100)}% explore)`}
          tone={balanceTone(balance)}
        />
        {winner ? (
          <Chip label={`Predicted winner · ${winner.name}`} tone="green" />
        ) : (
          <Chip label="Predicted winner · TBD" tone="amber" />
        )}
      </div>
    </section>
  )
}

export default MultiArmBanditVisualizer
