"use client"

import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import type { AssignmentDimension } from "./sales-leads-types"

import styles from "./lead-assignment-rules.module.css"

export interface AssignmentRuleCondition {
  dimension: AssignmentDimension
  /** Display value — e.g. "Illawarra", "Fleet > $5k", "Website". */
  value: string
}

export interface AssignmentRule {
  id: string
  name: string
  conditions: ReadonlyArray<AssignmentRuleCondition>
  assigneeName: string
  assigneeRole: string
  /** Number of leads matched by this rule in the last 30 days. */
  matchedCount: number
}

interface LeadAssignmentRulesProps {
  rules: ReadonlyArray<AssignmentRule>
  className?: string
}

const DIMENSION_LABEL: Record<AssignmentDimension, string> = {
  region: "Region",
  source: "Source",
  value: "Value",
  segment: "Segment",
}

const DIMENSION_TONE: Record<
  AssignmentDimension,
  "teal" | "amber" | "red" | "green"
> = {
  region: "teal",
  source: "amber",
  value: "red",
  segment: "green",
}

export function LeadAssignmentRules({
  rules,
  className,
}: LeadAssignmentRulesProps) {
  const [order, setOrder] = useState<string[]>(() => rules.map((r) => r.id))
  const ordered = order
    .map((id) => rules.find((r) => r.id === id))
    .filter((rule): rule is AssignmentRule => Boolean(rule))

  const move = (id: string, delta: -1 | 1) => {
    setOrder((prev) => {
      const idx = prev.indexOf(id)
      const target = idx + delta
      if (idx === -1 || target < 0 || target >= prev.length) return prev
      const next = prev.slice()
      const [moved] = next.splice(idx, 1)
      next.splice(target, 0, moved)
      return next
    })
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Lead auto-assignment rules">
      <header className={styles.head}>
        <span className={styles.kicker}>Auto-assignment</span>
        <h3 className={styles.title}>Rule priority</h3>
        <p className={styles.lede}>
          Rules evaluate top-to-bottom. The first matching rule wins.
        </p>
      </header>

      <ol className={styles.list}>
        {ordered.map((rule, index) => {
          const isFirst = index === 0
          const isLast = index === ordered.length - 1
          return (
            <li key={rule.id} className={styles.row} aria-label={`Rule ${index + 1}`}>
              <span className={styles.rank} aria-hidden="true">
                <GripVertical size={14} strokeWidth={1.8} />
                <strong>{index + 1}</strong>
              </span>
              <div className={styles.ruleBody}>
                <span className={styles.ruleName}>{rule.name}</span>
                <div className={styles.conditions}>
                  {rule.conditions.map((cond, idx) => (
                    <span key={`${cond.dimension}-${idx}`} className={styles.condition}>
                      <Chip
                        label={DIMENSION_LABEL[cond.dimension]}
                        tone={DIMENSION_TONE[cond.dimension]}
                      />
                      <span className={styles.conditionValue}>{cond.value}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.assignee}>
                <span className={styles.assigneeName}>{rule.assigneeName}</span>
                <span className={styles.assigneeRole}>{rule.assigneeRole}</span>
                <span className={styles.matched}>
                  {rule.matchedCount} matched / 30d
                </span>
              </div>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.moveBtn}
                  onClick={() => move(rule.id, -1)}
                  disabled={isFirst}
                  aria-label={`Move rule ${rule.name} up`}
                >
                  <ChevronUp size={14} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.moveBtn}
                  onClick={() => move(rule.id, 1)}
                  disabled={isLast}
                  aria-label={`Move rule ${rule.name} down`}
                >
                  <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default LeadAssignmentRules
