import type { ReactNode } from "react"

import type { LogicAction, LogicOperator, LogicRule } from "./form-builder-types"
import styles from "./logic-rule-builder.module.css"

interface LogicRuleBuilderProps {
  rules: ReadonlyArray<LogicRule>
  /** Available fields the rule can reference (id + label). */
  availableFields: ReadonlyArray<{ id: string; label: string }>
  className?: string
}

const OPERATOR_LABEL: Record<LogicOperator, string> = {
  equals: "is",
  "not-equals": "is not",
  contains: "contains",
  "greater-than": "is greater than",
  "less-than": "is less than",
  "is-empty": "is empty",
  "is-not-empty": "is not empty",
}

const ACTION_LABEL: Record<LogicAction, string> = {
  show: "show",
  hide: "hide",
  skip: "skip to",
  require: "require",
}

const ACTION_CLASS: Record<LogicAction, string> = {
  show: styles.actionShow,
  hide: styles.actionHide,
  skip: styles.actionSkip,
  require: styles.actionRequire,
}

export function LogicRuleBuilder({
  rules,
  availableFields,
  className,
}: LogicRuleBuilderProps) {
  const classes = [styles.builder, className].filter(Boolean).join(" ")
  const fieldLabel = (id: string) =>
    availableFields.find((field) => field.id === id)?.label ?? id

  return (
    <section className={classes} aria-label="Conditional logic rules">
      <header className={styles.head}>
        <span className={styles.kicker}>Logic</span>
        <div>
          <h3 className={styles.title}>Show / hide rules</h3>
          <p className={styles.subtitle}>
            Build the rule with chip selectors. Visual only.
          </p>
        </div>
      </header>

      <ul className={styles.rules}>
        {rules.map((rule, index) => (
          <li key={rule.id} className={styles.rule}>
            <span className={styles.ruleIndex}>R{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.ruleRow}>
              <span className={styles.connector}>When</span>
              <Chip variant="field">{fieldLabel(rule.sourceField)}</Chip>
              <Chip variant="operator">{OPERATOR_LABEL[rule.operator]}</Chip>
              {rule.operator !== "is-empty" && rule.operator !== "is-not-empty" ? (
                <Chip variant="value">{rule.value}</Chip>
              ) : null}
              <span className={styles.connector}>then</span>
              <span className={[styles.actionChip, ACTION_CLASS[rule.action]].join(" ")}>
                {ACTION_LABEL[rule.action]}
              </span>
              <Chip variant="field">{fieldLabel(rule.targetField)}</Chip>
            </div>
            <button type="button" className={styles.removeBtn} aria-label={`Remove rule ${index + 1}`}>
              ×
            </button>
          </li>
        ))}
        <li className={styles.addRow}>
          <button type="button" className={styles.addBtn}>
            <span aria-hidden="true">+</span> Add rule
          </button>
        </li>
      </ul>
    </section>
  )
}

interface ChipProps {
  variant: "field" | "operator" | "value"
  children: ReactNode
}

function Chip({ variant, children }: ChipProps) {
  const variantClass =
    variant === "field"
      ? styles.chipField
      : variant === "operator"
        ? styles.chipOperator
        : styles.chipValue
  return <span className={[styles.chip, variantClass].join(" ")}>{children}</span>
}
