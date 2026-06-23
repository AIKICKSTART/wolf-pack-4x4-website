import type { CSSProperties } from "react"
import { Activity, ClipboardList } from "lucide-react"

import { Chip } from "../primitives/chip"
import {
  toneForScore,
  type HermesRubricAxis,
  type HermesTone,
} from "./hermes-agent-types"
import styles from "./evaluation-rubric-grid.module.css"

export interface RubricScores extends Record<HermesRubricAxis, number> {
  accuracy: number
  tone: number
  safety: number
  resolution: number
}

export interface RubricSample {
  runId: string
  topic: string
  scores: RubricScores
  /** Sampled-by reviewer name. */
  reviewer: string
}

interface EvaluationRubricGridProps {
  title: string
  samplePeriod: string
  samples: ReadonlyArray<RubricSample>
  className?: string
}

const AXIS_LABEL: Record<HermesRubricAxis, string> = {
  accuracy: "Accuracy",
  tone: "Tone",
  safety: "Safety",
  resolution: "Resolution",
}

const TONE_CSS: Record<HermesTone, string> = {
  neutral: "var(--primitive-muted)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

function ScoreCell({ value }: { value: number }) {
  const tone = toneForScore(value)
  const style = { "--score-tone": TONE_CSS[tone] } as CSSProperties
  return (
    <div className={styles.scoreCell}>
      <span className={styles.score}>{value.toFixed(0)}</span>
      <span className={styles.scoreBar} aria-hidden="true">
        <span
          className={styles.scoreFill}
          style={{ ...style, width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </span>
    </div>
  )
}

function overallScore(sample: RubricSample): number {
  const { accuracy, tone, safety, resolution } = sample.scores
  return (accuracy + tone + safety + resolution) / 4
}

export function EvaluationRubricGrid({
  title,
  samplePeriod,
  samples,
  className,
}: EvaluationRubricGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ")
  const overallAvg =
    samples.length === 0
      ? 0
      : samples.reduce((acc, sample) => acc + overallScore(sample), 0) /
        samples.length
  const overallTone = toneForScore(overallAvg)

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Evaluation rubric: ${title}`}
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>
            <ClipboardList
              size={13}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 6 }}
            />
            {title}
          </h3>
          <span className={styles.kicker}>
            <Activity
              size={10}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 4 }}
            />
            Sample period · {samplePeriod} · {samples.length} runs
          </span>
        </div>
        <div className={styles.overall}>
          <div className={styles.overallItem}>
            <span className={styles.overallLabel}>Overall</span>
            <span className={styles.overallValue}>{overallAvg.toFixed(1)}</span>
          </div>
          <div className={styles.overallItem}>
            <span className={styles.overallLabel}>Grade</span>
            <span>
              <Chip
                label={
                  overallTone === "green"
                    ? "Excellent"
                    : overallTone === "teal"
                      ? "Strong"
                      : overallTone === "amber"
                        ? "Watch"
                        : "Action required"
                }
                tone={overallTone}
              />
            </span>
          </div>
        </div>
      </header>

      <div
        className={styles.tableWrap}
        role="table"
        aria-label="Per-run rubric scores"
      >
        <div className={styles.row} data-head="true" role="row">
          <span className={styles.cellHead} role="columnheader">
            Run
          </span>
          {(Object.keys(AXIS_LABEL) as HermesRubricAxis[]).map((axis) => (
            <span key={axis} className={styles.cellHead} role="columnheader">
              {AXIS_LABEL[axis]}
            </span>
          ))}
          <span className={styles.cellHead} role="columnheader">
            Reviewer
          </span>
        </div>
        {samples.map((sample) => (
          <div key={sample.runId} className={styles.row} role="row">
            <div className={styles.cell} role="cell">
              <div className={styles.runLabel}>
                <span className={styles.runId}>{sample.runId}</span>
                <span className={styles.runTopic}>{sample.topic}</span>
              </div>
            </div>
            {(Object.keys(AXIS_LABEL) as HermesRubricAxis[]).map((axis) => (
              <div key={axis} className={styles.cell} role="cell">
                <ScoreCell value={sample.scores[axis]} />
              </div>
            ))}
            <div className={styles.cell} role="cell">
              <span style={{ fontSize: 12 }}>{sample.reviewer}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EvaluationRubricGrid
