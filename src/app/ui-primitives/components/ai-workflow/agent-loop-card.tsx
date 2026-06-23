"use client"

import { RotateCw, StopCircle, Target } from "lucide-react"
import { useMemo, useState } from "react"

import { ProgressRadial } from "../primitives/progress-radial"
import {
  HALT_REASON_LABEL,
  HALT_REASON_TONE,
  type WorkflowHaltReason,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./agent-loop-card.module.css"

export interface AgentLoopIteration {
  id: string
  /** Display index (1-based). */
  iteration: number
  /** Thought / planning blurb. */
  thought: string
  /** Action taken in this iteration. */
  action: string
  /** Observation returned to the loop. */
  observation: string
  /** Optional confidence score 0..1. */
  confidence?: number
}

interface AgentLoopCardProps {
  title: string
  /** Loop goal — the success criterion. */
  goal: string
  /** Maximum iterations cap. */
  maxIterations: number
  /** Halt conditions in priority order. */
  haltConditions: ReadonlyArray<WorkflowHaltReason>
  /** Iterations to display. */
  iterations: ReadonlyArray<AgentLoopIteration>
  /** Final halt reason. Omit while running. */
  haltedBy?: WorkflowHaltReason
  /** Kicker. */
  kicker?: string
  className?: string
}

const TONE_TO_RADIAL: Record<
  WorkflowTone,
  "red" | "amber" | "teal" | "green" | "neutral"
> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  violet: "teal",
}

export function AgentLoopCard({
  title,
  goal,
  maxIterations,
  haltConditions,
  iterations,
  haltedBy,
  kicker = "Agent loop",
  className,
}: AgentLoopCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const [expandedId, setExpandedId] = useState<string | null>(
    iterations[iterations.length - 1]?.id ?? null,
  )

  const usedRatio = useMemo(() => {
    return Math.min(1, iterations.length / Math.max(1, maxIterations))
  }, [iterations.length, maxIterations])

  const radialTone: WorkflowTone = haltedBy
    ? HALT_REASON_TONE[haltedBy]
    : usedRatio >= 0.85
      ? "amber"
      : "teal"

  return (
    <section className={classes} aria-label={`Agent loop · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <RotateCw size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.badge}>
          {iterations.length}/{maxIterations}
        </span>
      </header>

      <div className={styles.summary}>
        <ProgressRadial
          value={iterations.length}
          max={maxIterations}
          size="lg"
          tone={TONE_TO_RADIAL[radialTone]}
          showLabel
          label={`${iterations.length} of ${maxIterations} iterations used`}
        />
        <div className={styles.goalBlock}>
          <span className={styles.goalLabel}>
            <Target size={11} strokeWidth={2.4} aria-hidden="true" /> Goal
          </span>
          <p className={styles.goalText}>{goal}</p>
          <div className={styles.haltChips} aria-label="Halt conditions">
            {haltConditions.map((reason) => {
              const tone = HALT_REASON_TONE[reason]
              return (
                <span
                  key={reason}
                  className={styles.haltChip}
                  data-tone={tone}
                  data-active={haltedBy === reason ? "true" : "false"}
                >
                  {haltedBy === reason ? (
                    <StopCircle size={10} strokeWidth={2.4} aria-hidden="true" />
                  ) : null}
                  {HALT_REASON_LABEL[reason]}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <ol className={styles.timeline} aria-label="Loop iterations">
        {iterations.map((iter) => {
          const isOpen = expandedId === iter.id
          return (
            <li key={iter.id} className={styles.iteration}>
              <button
                type="button"
                className={styles.iterHead}
                onClick={() => setExpandedId(isOpen ? null : iter.id)}
                aria-expanded={isOpen}
                aria-controls={`iter-${iter.id}`}
              >
                <span className={styles.iterIndex}>
                  {iter.iteration.toString().padStart(2, "0")}
                </span>
                <span className={styles.iterPreview}>{iter.thought}</span>
                {iter.confidence !== undefined ? (
                  <span className={styles.iterConfidence}>
                    {(iter.confidence * 100).toFixed(0)}%
                  </span>
                ) : null}
              </button>
              {isOpen ? (
                <div
                  id={`iter-${iter.id}`}
                  className={styles.iterBody}
                  role="group"
                  aria-label={`Iteration ${iter.iteration} detail`}
                >
                  <div className={styles.iterField}>
                    <span className={styles.iterLabel}>Thought</span>
                    <p>{iter.thought}</p>
                  </div>
                  <div className={styles.iterField}>
                    <span className={styles.iterLabel}>Action</span>
                    <p>{iter.action}</p>
                  </div>
                  <div className={styles.iterField}>
                    <span className={styles.iterLabel}>Observation</span>
                    <p>{iter.observation}</p>
                  </div>
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default AgentLoopCard
