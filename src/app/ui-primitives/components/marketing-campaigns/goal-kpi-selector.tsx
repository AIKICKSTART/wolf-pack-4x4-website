"use client"

import { Target } from "lucide-react"
import { useId, useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./goal-kpi-selector.module.css"
import { GOAL_LABEL, type GoalKind } from "./marketing-campaigns-types"

export interface GoalOption {
  id: GoalKind
  /** Descriptive helper. */
  helper: string
  /** Unit shown next to the target input, e.g. "AUD", "%", "bookings". */
  unit: string
  /** Suggested target. */
  suggestedTarget: number
}

interface GoalKpiSelectorProps {
  options: ReadonlyArray<GoalOption>
  defaultGoal?: GoalKind
  className?: string
}

export function GoalKpiSelector({
  options,
  defaultGoal,
  className,
}: GoalKpiSelectorProps) {
  const groupId = useId()
  const initial = defaultGoal ?? options[0]?.id ?? "opens"
  const [goal, setGoal] = useState<GoalKind>(initial)
  const [targets, setTargets] = useState<Record<GoalKind, number>>(() => {
    const out = {} as Record<GoalKind, number>
    for (const opt of options) {
      out[opt.id] = opt.suggestedTarget
    }
    return out
  })

  const activeOption = options.find((o) => o.id === goal) ?? options[0]
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  if (!activeOption) {
    return null
  }

  return (
    <section
      className={classes}
      role="region"
      aria-label="Goal KPI selector"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Target size={13} strokeWidth={2.4} aria-hidden="true" />
          Goal
        </span>
        <Chip label={`Target · ${GOAL_LABEL[goal]}`} tone="amber" selected />
      </header>

      <div
        className={styles.options}
        role="radiogroup"
        aria-label="Campaign goal"
        id={groupId}
      >
        {options.map((opt) => {
          const selected = opt.id === goal
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={styles.option}
              onClick={() => setGoal(opt.id)}
            >
              <span className={styles.optionLabel}>{GOAL_LABEL[opt.id]}</span>
              <span className={styles.optionHelper}>{opt.helper}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.targetRow}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Target {GOAL_LABEL[activeOption.id].toLowerCase()}
          </span>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={targets[activeOption.id]}
              min={0}
              step={activeOption.id === "revenue" ? 100 : 10}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTargets((prev) => ({
                  ...prev,
                  [activeOption.id]: Number(event.target.value),
                }))
              }
              className={styles.input}
            />
            <span className={styles.unit}>{activeOption.unit}</span>
          </div>
        </label>
      </div>
    </section>
  )
}

export default GoalKpiSelector
