"use client"

import { useCallback, useState, type ChangeEvent } from "react"

import { Chip, type ChipTone } from "../primitives/chip"

import {
  STOP_CONDITION_LABEL,
  STOP_CONDITION_TONE,
  type ExperimentTone,
  type StopConditionKind,
} from "./experiments-types"

import styles from "./stop-rule-editor.module.css"

export interface StopRuleConfig {
  kind: StopConditionKind
  /** Numeric threshold semantically tied to kind:
   *  - min-sample: integer N
   *  - significance: alpha (e.g. 0.05)
   *  - time-elapsed: hours
   *  - manual: ignored
   *  - guardrail: percent regression (e.g. 5 = -5%)
   */
  threshold?: number
}

export interface StopRuleEditorProps {
  defaultRules?: ReadonlyArray<StopRuleConfig>
  onChange?: (next: ReadonlyArray<StopRuleConfig>) => void
  className?: string
}

const ALL_KINDS: ReadonlyArray<StopConditionKind> = [
  "min-sample",
  "significance",
  "time-elapsed",
  "manual",
  "guardrail",
]

const TONE_TO_CHIP: Record<ExperimentTone, ChipTone> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

const THRESHOLD_HINT: Record<StopConditionKind, string> = {
  "min-sample": "Min subjects",
  significance: "α",
  "time-elapsed": "Hours",
  manual: "—",
  guardrail: "Max regression %",
}

const DEFAULT_THRESHOLDS: Record<StopConditionKind, number> = {
  "min-sample": 12000,
  significance: 0.05,
  "time-elapsed": 168,
  manual: 0,
  guardrail: 5,
}

export function StopRuleEditor({
  defaultRules = [
    { kind: "min-sample", threshold: 12000 },
    { kind: "significance", threshold: 0.05 },
  ],
  onChange,
  className,
}: StopRuleEditorProps) {
  const [rules, setRules] = useState<ReadonlyArray<StopRuleConfig>>(defaultRules)

  const emit = useCallback(
    (next: ReadonlyArray<StopRuleConfig>) => {
      setRules(next)
      onChange?.(next)
    },
    [onChange],
  )

  const toggleKind = useCallback(
    (kind: StopConditionKind) => {
      const present = rules.some((r) => r.kind === kind)
      if (present) {
        emit(rules.filter((r) => r.kind !== kind))
      } else {
        emit([...rules, { kind, threshold: DEFAULT_THRESHOLDS[kind] }])
      }
    },
    [rules, emit],
  )

  const updateThreshold = useCallback(
    (kind: StopConditionKind, event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value)
      if (Number.isNaN(value)) return
      emit(
        rules.map((r) =>
          r.kind === kind
            ? { ...r, threshold: Math.max(0, value) }
            : r,
        ),
      )
    },
    [rules, emit],
  )

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Stop rule editor"
    >
      <div className={styles.kindRow}>
        {ALL_KINDS.map((kind) => {
          const active = rules.some((r) => r.kind === kind)
          return (
            <Chip
              key={kind}
              label={STOP_CONDITION_LABEL[kind]}
              tone={active ? TONE_TO_CHIP[STOP_CONDITION_TONE[kind]] : "neutral"}
              selected={active}
              onSelect={() => toggleKind(kind)}
            />
          )
        })}
      </div>

      <ul className={styles.thresholdList}>
        {rules.map((rule) => (
          <li key={rule.kind} className={styles.thresholdRow}>
            <span className={styles.thresholdName}>
              {STOP_CONDITION_LABEL[rule.kind]}
            </span>
            {rule.kind !== "manual" ? (
              <label className={styles.thresholdInput}>
                <span>{THRESHOLD_HINT[rule.kind]}</span>
                <input
                  type="number"
                  step={rule.kind === "significance" ? 0.01 : 1}
                  value={rule.threshold ?? 0}
                  onChange={(event) => updateThreshold(rule.kind, event)}
                  inputMode="decimal"
                  aria-label={`Threshold for ${STOP_CONDITION_LABEL[rule.kind]}`}
                />
              </label>
            ) : (
              <span className={styles.manualNote}>Manual approval required</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StopRuleEditor
