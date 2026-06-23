"use client"

import { Check, Cpu, DollarSign, Zap } from "lucide-react"
import { useState } from "react"

import {
  MODEL_COST_PER_MILLION,
  MODEL_LABEL,
  MODEL_SPEED,
  MODEL_SPEED_LABEL,
  MODEL_TIER,
  MODEL_TIER_LABEL,
  MODEL_TIER_TONE,
  MODEL_TYPICAL_LATENCY_MS,
  MODEL_VENDOR,
  formatCost,
  type WorkflowModelId,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./model-selector.module.css"

interface WorkflowModelSelectorProps {
  /** Models offered as cards. */
  models: ReadonlyArray<WorkflowModelId>
  selectedId?: WorkflowModelId
  defaultSelectedId?: WorkflowModelId
  onSelect?: (id: WorkflowModelId) => void
  /** Kicker label above the card grid. */
  kicker?: string
  className?: string
}

const TONE_BG: Record<WorkflowTone, string> = {
  neutral: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
  red: "color-mix(in oklab, var(--primitive-red) 10%, transparent)",
  amber: "color-mix(in oklab, var(--primitive-amber) 10%, transparent)",
  teal: "color-mix(in oklab, var(--primitive-teal) 10%, transparent)",
  green: "color-mix(in oklab, var(--primitive-green) 10%, transparent)",
  violet: "color-mix(in oklab, var(--primitive-teal) 12%, transparent)",
}

const TONE_BORDER: Record<WorkflowTone, string> = {
  neutral: "color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)",
  red: "color-mix(in oklab, var(--primitive-red) 42%, transparent)",
  amber: "color-mix(in oklab, var(--primitive-amber) 42%, transparent)",
  teal: "color-mix(in oklab, var(--primitive-teal) 42%, transparent)",
  green: "color-mix(in oklab, var(--primitive-green) 42%, transparent)",
  violet: "color-mix(in oklab, var(--primitive-teal) 42%, transparent)",
}

export function ModelSelector({
  models,
  selectedId: controlledId,
  defaultSelectedId,
  onSelect,
  kicker = "Model",
  className,
}: WorkflowModelSelectorProps) {
  const isControlled = controlledId !== undefined
  const [internal, setInternal] = useState<WorkflowModelId>(
    defaultSelectedId ?? models[0] ?? "gpt-4o-2024",
  )
  const selected = isControlled ? controlledId : internal

  const handleSelect = (id: WorkflowModelId) => {
    if (!isControlled) {
      setInternal(id)
    }
    onSelect?.(id)
  }

  return (
    <fieldset className={[styles.root, className].filter(Boolean).join(" ")}>
      <legend className={styles.legend}>
        <Cpu size={11} strokeWidth={2.4} aria-hidden="true" /> {kicker}
      </legend>
      <div
        className={styles.grid}
        role="radiogroup"
        aria-label="Model options"
      >
        {models.map((id) => {
          const tier = MODEL_TIER[id]
          const tierTone = MODEL_TIER_TONE[tier]
          const isSelected = selected === id
          const speed = MODEL_SPEED[id]
          return (
            <label
              key={id}
              className={styles.card}
              data-selected={isSelected ? "true" : "false"}
              style={
                {
                  "--card-bg": TONE_BG[tierTone],
                  "--card-border": TONE_BORDER[tierTone],
                } as Record<string, string>
              }
            >
              <input
                type="radio"
                name="workflow-model"
                value={id}
                checked={isSelected}
                onChange={() => handleSelect(id)}
                className={styles.input}
              />
              <span className={styles.cardHead}>
                <span className={styles.cardName}>{MODEL_LABEL[id]}</span>
                <span className={styles.tierBadge} data-tone={tierTone}>
                  {MODEL_TIER_LABEL[tier]}
                </span>
              </span>
              <span className={styles.vendor}>{MODEL_VENDOR[id]}</span>
              <span className={styles.stats}>
                <span className={styles.statChip}>
                  <DollarSign size={10} strokeWidth={2.4} aria-hidden="true" />
                  {formatCost(MODEL_COST_PER_MILLION[id])} / 1M
                </span>
                <span className={styles.statChip}>
                  <Zap size={10} strokeWidth={2.4} aria-hidden="true" />
                  {MODEL_TYPICAL_LATENCY_MS[id]}ms
                </span>
                <span className={styles.statChip} data-mute="true">
                  {MODEL_SPEED_LABEL[speed]}
                </span>
              </span>
              {isSelected ? (
                <span className={styles.check} aria-hidden="true">
                  <Check size={12} strokeWidth={2.6} />
                </span>
              ) : null}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default ModelSelector
