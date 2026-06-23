"use client"

import { useState } from "react"

import styles from "./policy-rule-editor.module.css"

export interface PolicyRuleOption {
  readonly value: string
  readonly label: string
  readonly hint?: string
}

export interface PolicyRuleSlot {
  readonly id: string
  readonly label: string
  readonly options: ReadonlyArray<PolicyRuleOption>
  readonly defaultValue: string
}

export interface PolicyRuleEditorState {
  readonly trigger: string
  readonly subject: string
  readonly condition: string
  readonly outcome: "allow" | "deny"
  readonly reason: string
}

interface PolicyRuleEditorProps {
  triggers: ReadonlyArray<PolicyRuleOption>
  subjects: ReadonlyArray<PolicyRuleOption>
  conditions: ReadonlyArray<PolicyRuleOption>
  reasons: ReadonlyArray<PolicyRuleOption>
  defaultValue: PolicyRuleEditorState
  onChange?: (value: PolicyRuleEditorState) => void
  className?: string
}

function labelFor(options: ReadonlyArray<PolicyRuleOption>, value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}

export function PolicyRuleEditor({
  triggers,
  subjects,
  conditions,
  reasons,
  defaultValue,
  onChange,
  className,
}: PolicyRuleEditorProps) {
  const [state, setState] = useState<PolicyRuleEditorState>(defaultValue)

  const update = (patch: Partial<PolicyRuleEditorState>) => {
    const next: PolicyRuleEditorState = { ...state, ...patch }
    setState(next)
    onChange?.(next)
  }

  const classes = [styles.editor, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Policy rule editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Policy rule</span>
        <span className={styles.hint}>Chip-select each piece — preview compiles below.</span>
      </header>

      <div className={styles.rule}>
        <div className={styles.line}>
          <span className={styles.connective}>When</span>
          <SlotSelect
            options={triggers}
            value={state.trigger}
            onChange={(value) => update({ trigger: value })}
            label="Event or resource"
          />
        </div>

        <div className={styles.line}>
          <span className={styles.connective}>on</span>
          <SlotSelect
            options={subjects}
            value={state.subject}
            onChange={(value) => update({ subject: value })}
            label="Subject"
          />
        </div>

        <div className={styles.line}>
          <span className={styles.connective}>if</span>
          <SlotSelect
            options={conditions}
            value={state.condition}
            onChange={(value) => update({ condition: value })}
            label="Condition"
          />
        </div>

        <div className={styles.line}>
          <span className={styles.connective}>then</span>
          <div className={styles.outcomeGroup} role="radiogroup" aria-label="Outcome">
            <button
              type="button"
              role="radio"
              aria-checked={state.outcome === "allow"}
              className={styles.outcomeBtn}
              data-outcome="allow"
              data-active={state.outcome === "allow"}
              onClick={() => update({ outcome: "allow" })}
            >
              Allow
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={state.outcome === "deny"}
              className={styles.outcomeBtn}
              data-outcome="deny"
              data-active={state.outcome === "deny"}
              onClick={() => update({ outcome: "deny" })}
            >
              Deny
            </button>
          </div>
        </div>

        <div className={styles.line}>
          <span className={styles.connective}>because</span>
          <SlotSelect
            options={reasons}
            value={state.reason}
            onChange={(value) => update({ reason: value })}
            label="Reason"
          />
        </div>
      </div>

      <footer className={styles.preview}>
        <span className={styles.previewKicker}>Compiled preview</span>
        <p className={styles.previewLine}>
          When <strong>{labelFor(triggers, state.trigger)}</strong> on{" "}
          <strong>{labelFor(subjects, state.subject)}</strong>, if{" "}
          <strong>{labelFor(conditions, state.condition)}</strong>, then{" "}
          <strong data-outcome={state.outcome}>
            {state.outcome === "allow" ? "ALLOW" : "DENY"}
          </strong>{" "}
          because <strong>{labelFor(reasons, state.reason)}</strong>.
        </p>
      </footer>
    </section>
  )
}

interface SlotSelectProps {
  options: ReadonlyArray<PolicyRuleOption>
  value: string
  onChange: (value: string) => void
  label: string
}

function SlotSelect({ options, value, onChange, label }: SlotSelectProps) {
  return (
    <span className={styles.slot}>
      <select
        className={styles.slotControl}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.slotGlyph} aria-hidden="true">
        ▾
      </span>
    </span>
  )
}

export default PolicyRuleEditor
