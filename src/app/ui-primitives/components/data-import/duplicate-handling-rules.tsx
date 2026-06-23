"use client"

import { useId, useState } from "react"

import type { DuplicateAction, DuplicateRuleEntry } from "./import-types"
import styles from "./duplicate-handling-rules.module.css"

interface DuplicateHandlingRulesProps {
  rules: ReadonlyArray<DuplicateRuleEntry>
  onChange?: (rules: ReadonlyArray<DuplicateRuleEntry>) => void
  className?: string
}

const ACTION_LABEL: Record<DuplicateAction, string> = {
  skip: "Skip duplicate",
  update: "Update existing",
  "keep-both": "Keep both",
  "merge-by-rule": "Merge by rule",
}

const ACTION_OPTIONS: ReadonlyArray<DuplicateAction> = [
  "skip",
  "update",
  "keep-both",
  "merge-by-rule",
]

export function DuplicateHandlingRules({
  rules,
  onChange,
  className,
}: DuplicateHandlingRulesProps) {
  const groupId = useId()
  const [draft, setDraft] = useState<ReadonlyArray<DuplicateRuleEntry>>(rules)

  const updateAction = (id: string, next: DuplicateAction) => {
    const computed = draft.map((rule) =>
      rule.id === id ? { ...rule, action: next } : rule,
    )
    setDraft(computed)
    onChange?.(computed)
  }

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-labelledby={`${groupId}-heading`}
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Duplicates</span>
          <h3 id={`${groupId}-heading`} className={styles.heading}>
            Duplicate handling rules
          </h3>
        </div>
        <span className={styles.metaChip}>
          {draft.length} rule{draft.length === 1 ? "" : "s"}
        </span>
      </header>

      <ul className={styles.list}>
        {draft.map((rule) => {
          const selectId = `${groupId}-${rule.id}-action`
          return (
            <li key={rule.id} className={styles.row}>
              <div className={styles.rowText}>
                <div className={styles.keyColumns}>
                  {rule.keyColumns.map((column) => (
                    <span key={column} className={styles.keyChip}>
                      {column}
                    </span>
                  ))}
                </div>
                <p className={styles.description}>{rule.description}</p>
              </div>
              <div className={styles.actionCell}>
                <label htmlFor={selectId} className={styles.fieldLabel}>
                  Action
                </label>
                <select
                  id={selectId}
                  className={styles.select}
                  value={rule.action}
                  onChange={(event) =>
                    updateAction(rule.id, event.target.value as DuplicateAction)
                  }
                >
                  {ACTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {ACTION_LABEL[option]}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default DuplicateHandlingRules
