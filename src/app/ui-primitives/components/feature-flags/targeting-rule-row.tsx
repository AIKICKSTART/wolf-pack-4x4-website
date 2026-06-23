"use client"

import {
  useCallback,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import {
  OPERATOR_LABEL,
  SUBJECT_LABEL,
  type FlagOperator,
  type FlagSubject,
} from "./feature-flag-types"
import styles from "./targeting-rule-row.module.css"

export interface TargetingRule {
  id: string
  subject: FlagSubject
  operator: FlagOperator
  values: ReadonlyArray<string>
}

export interface TargetingRuleRowProps {
  rule: TargetingRule
  onSubjectChange?: (id: string, subject: FlagSubject) => void
  onOperatorChange?: (id: string, operator: FlagOperator) => void
  onValuesChange?: (id: string, values: ReadonlyArray<string>) => void
  onRemove?: (id: string) => void
  className?: string
}

const SUBJECTS: ReadonlyArray<FlagSubject> = ["user", "workspace", "role", "geo", "device"]
const OPERATORS: ReadonlyArray<FlagOperator> = [
  "is",
  "is-not",
  "in",
  "starts-with",
  "regex",
]

const SUBJECT_TONE: Record<FlagSubject, string> = {
  user: styles.subjectUser,
  workspace: styles.subjectWorkspace,
  role: styles.subjectRole,
  geo: styles.subjectGeo,
  device: styles.subjectDevice,
}

export function TargetingRuleRow({
  rule,
  onSubjectChange,
  onOperatorChange,
  onValuesChange,
  onRemove,
  className,
}: TargetingRuleRowProps) {
  const [draft, setDraft] = useState<string>("")

  const removeTag = useCallback(
    (tag: string) => {
      const next = rule.values.filter((v) => v !== tag)
      onValuesChange?.(rule.id, next)
    },
    [rule.id, rule.values, onValuesChange],
  )

  const addTagFromDraft = useCallback(() => {
    const trimmed = draft.trim()
    if (!trimmed) return
    if (rule.values.includes(trimmed)) {
      setDraft("")
      return
    }
    onValuesChange?.(rule.id, [...rule.values, trimmed])
    setDraft("")
  }, [draft, rule.id, rule.values, onValuesChange])

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      addTagFromDraft()
    } else if (event.key === "Backspace" && draft === "" && rule.values.length > 0) {
      removeTag(rule.values[rule.values.length - 1])
    }
  }

  return (
    <div className={[styles.row, className].filter(Boolean).join(" ")} role="group" aria-label="Targeting rule">
      <label className={styles.field}>
        <span className={styles.label}>Subject</span>
        <select
          value={rule.subject}
          className={[styles.select, SUBJECT_TONE[rule.subject]].join(" ")}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onSubjectChange?.(rule.id, event.target.value as FlagSubject)
          }
          aria-label="Subject"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {SUBJECT_LABEL[s]}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Operator</span>
        <select
          value={rule.operator}
          className={styles.select}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            onOperatorChange?.(rule.id, event.target.value as FlagOperator)
          }
          aria-label="Operator"
        >
          {OPERATORS.map((o) => (
            <option key={o} value={o}>
              {OPERATOR_LABEL[o]}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.field}>
        <span className={styles.label}>Values</span>
        <div className={styles.tagInput}>
          {rule.values.map((value) => (
            <span key={value} className={styles.tag}>
              <span>{value}</span>
              <button
                type="button"
                className={styles.tagRemove}
                onClick={() => removeTag(value)}
                aria-label={`Remove ${value}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className={styles.tagDraft}
            value={draft}
            placeholder="Add value…"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKey}
            onBlur={addTagFromDraft}
            aria-label="Add value"
          />
        </div>
      </div>

      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove?.(rule.id)}
        aria-label="Remove rule"
      >
        Remove
      </button>
    </div>
  )
}

export default TargetingRuleRow
