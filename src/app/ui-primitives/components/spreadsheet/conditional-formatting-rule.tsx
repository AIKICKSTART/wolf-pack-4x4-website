"use client"

import { useState } from "react"
import type { ChangeEvent } from "react"

import type { ConditionalFormatKind } from "./spreadsheet-types"
import styles from "./conditional-formatting-rule.module.css"

export type ConditionOperator =
  | "greater-than"
  | "less-than"
  | "equal"
  | "between"
  | "contains"
  | "top-percent"

export interface ConditionalFormattingRuleProps {
  /** Display title (e.g. "Stock below safety level"). */
  title?: string
  scopeLabel: string
  operator?: ConditionOperator
  value?: string
  format?: ConditionalFormatKind
  /** Hex / token name shown as the format chip swatch. */
  swatch?: string
  onApply?: () => void
  onRemove?: () => void
}

const OPERATOR_LABEL: Record<ConditionOperator, string> = {
  "greater-than": "Greater than",
  "less-than": "Less than",
  equal: "Equal to",
  between: "Between",
  contains: "Contains text",
  "top-percent": "Top % of values",
}

const FORMAT_LABEL: Record<ConditionalFormatKind, string> = {
  "background-tone": "Background tone",
  "text-color": "Text color",
  "icon-set": "Icon set",
  "data-bar": "Data bar",
}

const FORMAT_GLYPH: Record<ConditionalFormatKind, string> = {
  "background-tone": "▦",
  "text-color": "A",
  "icon-set": "◆",
  "data-bar": "▌",
}

export function ConditionalFormattingRule({
  title = "New rule",
  scopeLabel,
  operator: operatorProp = "greater-than",
  value: valueProp = "",
  format: formatProp = "background-tone",
  swatch = "var(--primitive-red)",
  onApply,
  onRemove,
}: ConditionalFormattingRuleProps) {
  const [operator, setOperator] = useState<ConditionOperator>(operatorProp)
  const [value, setValue] = useState<string>(valueProp)
  const [format, setFormat] = useState<ConditionalFormatKind>(formatProp)

  const handleOperator = (event: ChangeEvent<HTMLSelectElement>) => {
    setOperator(event.target.value as ConditionOperator)
  }

  const handleFormat = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value as ConditionalFormatKind)
  }

  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={styles.kicker}>Rule</span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.scope}>Scope · {scopeLabel}</span>
      </header>
      <div className={styles.body}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Condition</span>
          <select
            className={styles.select}
            value={operator}
            onChange={handleOperator}
            aria-label="Condition operator"
          >
            {(Object.keys(OPERATOR_LABEL) as ConditionOperator[]).map((key) => (
              <option key={key} value={key}>
                {OPERATOR_LABEL[key]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Value</span>
          <input
            className={styles.input}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="e.g. 25"
            aria-label="Comparison value"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Format</span>
          <div className={styles.formatRow}>
            <select
              className={styles.select}
              value={format}
              onChange={handleFormat}
              aria-label="Format kind"
            >
              {(Object.keys(FORMAT_LABEL) as ConditionalFormatKind[]).map((key) => (
                <option key={key} value={key}>
                  {FORMAT_LABEL[key]}
                </option>
              ))}
            </select>
            <span className={styles.swatch} style={{ background: swatch }} aria-hidden="true">
              {FORMAT_GLYPH[format]}
            </span>
          </div>
        </label>
      </div>
      <footer className={styles.foot}>
        <button type="button" className={styles.apply} onClick={onApply}>
          Apply rule
        </button>
        <button type="button" className={styles.remove} onClick={onRemove}>
          Remove
        </button>
      </footer>
    </article>
  )
}

export default ConditionalFormattingRule
