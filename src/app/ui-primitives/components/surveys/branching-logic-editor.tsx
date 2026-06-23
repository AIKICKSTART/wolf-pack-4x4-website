import type { BranchAction, BranchOperator, BranchRule } from "./survey-types"

import styles from "./branching-logic-editor.module.css"

interface BranchingLogicEditorProps {
  /** Question being edited — shown as the rule subject. */
  sourceLabel: string
  rules: ReadonlyArray<BranchRule>
  className?: string
}

const OPERATOR_LABEL: Record<BranchOperator, string> = {
  equals: "is",
  "not-equals": "is not",
  contains: "contains",
  "greater-than": ">",
  "less-than": "<",
  "is-answered": "answered",
  "is-empty": "left blank",
}

const ACTION_LABEL: Record<BranchAction, string> = {
  "skip-to": "skip to",
  "show-question": "show",
  "end-survey": "end survey",
}

const ACTION_TONE: Record<BranchAction, string> = {
  "skip-to": styles.actionAmber,
  "show-question": styles.actionGreen,
  "end-survey": styles.actionRed,
}

export function BranchingLogicEditor({
  sourceLabel,
  rules,
  className,
}: BranchingLogicEditorProps) {
  const classes = [styles.editor, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Branching logic for ${sourceLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Branching logic</span>
        <span className={styles.subject}>{sourceLabel}</span>
      </header>

      <ol className={styles.rules}>
        {rules.map((rule, idx) => (
          <li key={rule.id} className={styles.rule}>
            <span className={styles.ruleIndex} aria-hidden="true">{`R${idx + 1}`}</span>

            <div className={styles.ruleBody}>
              <div className={styles.line}>
                <span className={styles.tokenLabel}>If answer</span>
                <span className={styles.tokenChip}>{OPERATOR_LABEL[rule.operator]}</span>
                {rule.operator !== "is-answered" && rule.operator !== "is-empty" ? (
                  <span className={styles.tokenValue}>{rule.value}</span>
                ) : null}
              </div>
              <div className={styles.line}>
                <span className={styles.tokenLabel}>Then</span>
                <span className={[styles.actionChip, ACTION_TONE[rule.action]].join(" ")}>
                  {ACTION_LABEL[rule.action]}
                </span>
                {rule.action !== "end-survey" ? (
                  <span className={styles.tokenTarget}>{rule.targetLabel}</span>
                ) : null}
              </div>
            </div>

            <button type="button" className={styles.remove} aria-label={`Remove rule ${idx + 1}`}>
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </li>
        ))}
      </ol>

      <button type="button" className={styles.addRule}>
        <span aria-hidden="true">+</span> Add rule
      </button>
    </section>
  )
}
