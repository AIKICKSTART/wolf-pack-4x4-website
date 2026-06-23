import type {
  ConditionalLogicAction,
  ConditionalLogicOperator,
  ConditionalLogicRule,
} from "./forms-platform-types"
import styles from "./conditional-logic-card.module.css"

interface ConditionalLogicCardProps {
  rule: ConditionalLogicRule
  className?: string
}

const OPERATOR_LABEL: Record<ConditionalLogicOperator, string> = {
  equals: "equals",
  "not-equals": "is not",
  contains: "contains",
  "is-empty": "is empty",
  "is-not-empty": "is filled",
  "greater-than": "greater than",
  "less-than": "less than",
}

const ACTION_LABEL: Record<ConditionalLogicAction, string> = {
  show: "Show",
  hide: "Hide",
  require: "Require",
  "skip-page": "Skip page",
  "jump-to": "Jump to",
}

const ACTION_CLASS: Record<ConditionalLogicAction, string> = {
  show: styles.actionShow,
  hide: styles.actionHide,
  require: styles.actionRequire,
  "skip-page": styles.actionSkipPage,
  "jump-to": styles.actionJumpTo,
}

export function ConditionalLogicCard({
  rule,
  className,
}: ConditionalLogicCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const toggleClass = [
    styles.toggle,
    rule.enabled ? styles.toggleOn : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      aria-label={rule.label}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Conditional rule</span>
          <h3 className={styles.title}>{rule.label}</h3>
        </div>
        <span className={styles.toggleRow}>
          <span>{rule.enabled ? "Armed" : "Off"}</span>
          <span
            className={toggleClass}
            role="switch"
            aria-checked={rule.enabled}
            tabIndex={0}
            aria-label={`Toggle rule ${rule.label}`}
          >
            <span className={styles.toggleThumb} />
          </span>
        </span>
      </header>

      <div className={styles.rule}>
        <div className={styles.ruleGate}>
          <span>If</span>
          <span className={styles.gateBadge}>
            {rule.match === "all" ? "ALL match" : "ANY match"}
          </span>
          <span>·</span>
          <span>{rule.conditions.length} condition{rule.conditions.length === 1 ? "" : "s"}</span>
        </div>

        <ul className={styles.conditionList}>
          {rule.conditions.map((condition) => (
            <li key={condition.id} className={styles.condition}>
              <span className={styles.conditionField}>{condition.sourceField}</span>
              <span className={styles.conditionOperator}>
                {OPERATOR_LABEL[condition.operator]}
              </span>
              <span />
              <span className={styles.conditionValue}>
                {condition.operator === "is-empty" || condition.operator === "is-not-empty"
                  ? "—"
                  : condition.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actionRow}>
        <span className={styles.thenLabel}>Then</span>
        <span
          className={`${styles.actionChip} ${ACTION_CLASS[rule.action]}`}
        >
          {ACTION_LABEL[rule.action]}
        </span>
        <span className={styles.targetChip}>{rule.targetField}</span>
      </div>
    </section>
  )
}
