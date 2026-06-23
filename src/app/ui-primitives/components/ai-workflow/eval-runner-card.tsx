"use client"

import { CircleDot, Play } from "lucide-react"

import { ProgressLinear } from "../primitives/progress-linear"
import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import {
  workflowScoreTone,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./eval-runner-card.module.css"

export interface EvalRubricAxis {
  id: string
  label: string
  /** Weighting 0..1 — used to compute the weighted overall. */
  weight: number
}

export interface EvalSampleRow {
  id: string
  label: string
  /** Map of axis id → 0..100 score. */
  scores: Record<string, number>
  /** Optional notes shown in the row tail. */
  notes?: string
}

interface EvalRunnerCardProps {
  title: string
  /** Eval suite descriptor. */
  kicker?: string
  axes: ReadonlyArray<EvalRubricAxis>
  samples: ReadonlyArray<EvalSampleRow>
  /** Last run timestamp. */
  lastRunLabel?: string
  /** Pass threshold 0..100. */
  passThreshold?: number
  className?: string
}

const TONE_TO_PROGRESS: Record<
  WorkflowTone,
  "red" | "amber" | "teal" | "green"
> = {
  neutral: "teal",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  violet: "teal",
}

function calculateOverall(
  axes: ReadonlyArray<EvalRubricAxis>,
  scores: Record<string, number>,
): number {
  const totalWeight = axes.reduce((sum, axis) => sum + axis.weight, 0) || 1
  const weighted = axes.reduce((sum, axis) => {
    const score = scores[axis.id] ?? 0
    return sum + score * axis.weight
  }, 0)
  return Math.round(weighted / totalWeight)
}

export function EvalRunnerCard({
  title,
  kicker = "Eval runner",
  axes,
  samples,
  lastRunLabel,
  passThreshold = 80,
  className,
}: EvalRunnerCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const overallByAxis: Record<string, number> = {}
  for (const axis of axes) {
    const values = samples.map((s) => s.scores[axis.id] ?? 0)
    const sum = values.reduce((acc, v) => acc + v, 0)
    overallByAxis[axis.id] = samples.length === 0 ? 0 : Math.round(sum / samples.length)
  }
  const weightedOverall = calculateOverall(axes, overallByAxis)
  const overallTone = workflowScoreTone(weightedOverall)
  const passed = samples.filter(
    (sample) => calculateOverall(axes, sample.scores) >= passThreshold,
  ).length

  const columns: ReadonlyArray<DataTableColumn<EvalSampleRow>> = [
    {
      id: "label",
      header: "Sample",
      cell: (row) => <span className={styles.sampleLabel}>{row.label}</span>,
    },
    ...axes.map<DataTableColumn<EvalSampleRow>>((axis) => ({
      id: axis.id,
      header: axis.label,
      align: "right",
      cell: (row) => {
        const score = row.scores[axis.id] ?? 0
        const tone = workflowScoreTone(score)
        return (
          <span className={styles.scorePill} data-tone={tone}>
            {score}
          </span>
        )
      },
    })),
    {
      id: "overall",
      header: "Overall",
      align: "right",
      cell: (row) => {
        const score = calculateOverall(axes, row.scores)
        const tone = workflowScoreTone(score)
        return (
          <span className={styles.overallPill} data-tone={tone}>
            {score}
          </span>
        )
      },
    },
  ]

  return (
    <section className={classes} aria-label={`Eval runner · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <CircleDot size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <button type="button" className={styles.runBtn} aria-label="Run eval suite">
          <Play size={11} strokeWidth={2.4} aria-hidden="true" /> Run suite
        </button>
      </header>

      <div className={styles.summary}>
        <div className={styles.summaryBlock}>
          <span className={styles.summaryLabel}>Weighted overall</span>
          <span className={styles.summaryValue} data-tone={overallTone}>
            {weightedOverall}
          </span>
          <ProgressLinear
            value={weightedOverall}
            max={100}
            tone={TONE_TO_PROGRESS[overallTone]}
            label={`Weighted overall score ${weightedOverall}/100`}
          />
        </div>
        <div className={styles.summaryBlock}>
          <span className={styles.summaryLabel}>
            Pass threshold · {passThreshold}/100
          </span>
          <span className={styles.summaryValue}>
            {passed}/{samples.length}
          </span>
          <span className={styles.subLabel}>
            samples cleared the bar
            {lastRunLabel ? ` · last run ${lastRunLabel}` : ""}
          </span>
        </div>
        <div className={styles.summaryBlock}>
          <span className={styles.summaryLabel}>Rubric axes</span>
          <ul className={styles.axisList}>
            {axes.map((axis) => {
              const score = overallByAxis[axis.id] ?? 0
              const tone = workflowScoreTone(score)
              return (
                <li
                  key={axis.id}
                  className={styles.axisRow}
                  data-tone={tone}
                >
                  <span className={styles.axisName}>{axis.label}</span>
                  <span className={styles.axisWeight}>
                    × {axis.weight.toFixed(2)}
                  </span>
                  <span className={styles.axisScore}>{score}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <DataTable
        rows={[...samples]}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        zebra
        kicker="Scoreboard"
        caption="Sample inputs scored across rubric axes."
      />
    </section>
  )
}

export default EvalRunnerCard
