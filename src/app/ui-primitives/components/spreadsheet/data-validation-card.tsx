"use client"

import { useState } from "react"
import type { ChangeEvent } from "react"

import type { ValidationRuleKind } from "./spreadsheet-types"
import styles from "./data-validation-card.module.css"

export interface DataValidationCardProps {
  /** A1 column reference or column label (e.g. "Supplier"). */
  columnLabel: string
  /** A1 column letter (e.g. "C"). */
  columnLetter?: string
  rule?: ValidationRuleKind
  /** Rule-specific expression text. */
  expression?: string
  errorMessage?: string
  rejectInvalid?: boolean
  onChangeRule?: (rule: ValidationRuleKind) => void
  onRemove?: () => void
}

const RULE_LABEL: Record<ValidationRuleKind, string> = {
  list: "Pick from list",
  range: "Number in range",
  regex: "Matches regex",
  date: "Date constraint",
  "custom-formula": "Custom formula",
}

const RULE_HINT: Record<ValidationRuleKind, string> = {
  list: "e.g. Active, Watch, Hold",
  range: "e.g. 0 to 9999",
  regex: "e.g. ^OF-\\d{4}$",
  date: "e.g. after 2025-01-01",
  "custom-formula": "e.g. =LEN(A2) > 3",
}

export function DataValidationCard({
  columnLabel: column,
  columnLetter,
  rule: ruleProp = "list",
  expression: expressionProp = "",
  errorMessage: errorMessageProp = "Value does not match the validation rule",
  rejectInvalid: rejectInvalidProp = true,
  onChangeRule,
  onRemove,
}: DataValidationCardProps) {
  const [rule, setRule] = useState<ValidationRuleKind>(ruleProp)
  const [expression, setExpression] = useState(expressionProp)
  const [errorMessage, setErrorMessage] = useState(errorMessageProp)
  const [rejectInvalid, setRejectInvalid] = useState(rejectInvalidProp)

  const handleRule = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as ValidationRuleKind
    setRule(next)
    onChangeRule?.(next)
  }

  return (
    <article className={styles.card} aria-label={`Validation rule for column ${column}`}>
      <header className={styles.head}>
        <div className={styles.headMain}>
          {columnLetter ? (
            <span className={styles.letter} aria-hidden="true">
              {columnLetter}
            </span>
          ) : null}
          <div>
            <span className={styles.kicker}>Validation</span>
            <h3 className={styles.title}>{column}</h3>
          </div>
        </div>
        <button type="button" className={styles.remove} onClick={onRemove} aria-label="Remove rule">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      </header>
      <div className={styles.body}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Rule type</span>
          <select
            className={styles.select}
            value={rule}
            onChange={handleRule}
            aria-label="Validation rule type"
          >
            {(Object.keys(RULE_LABEL) as ValidationRuleKind[]).map((key) => (
              <option key={key} value={key}>
                {RULE_LABEL[key]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Expression</span>
          <input
            className={styles.input}
            value={expression}
            onChange={(event) => setExpression(event.target.value)}
            placeholder={RULE_HINT[rule]}
            aria-label="Validation expression"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Error message</span>
          <textarea
            className={styles.textarea}
            value={errorMessage}
            onChange={(event) => setErrorMessage(event.target.value)}
            rows={2}
            aria-label="Error message shown on invalid input"
          />
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={rejectInvalid}
            onChange={(event) => setRejectInvalid(event.target.checked)}
          />
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>Reject invalid input</span>
        </label>
      </div>
    </article>
  )
}

export default DataValidationCard
