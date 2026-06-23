"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"
import {
  AUDIENCE_RULE_LABEL,
  AUDIENCE_RULE_TONE,
  TOUR_TONE_TO_CHIP,
  type AudienceRuleKind,
} from "./tour-types"
import styles from "./audience-targeting-rules.module.css"

export interface AudienceRule {
  id: string
  kind: AudienceRuleKind
  /** Comparator e.g. "matches", "is", "contains". */
  comparator: string
  /** Right-hand operand value. */
  value: string
}

interface AudienceTargetingRulesProps {
  tourName: string
  rules: ReadonlyArray<AudienceRule>
  /** Join logic between rules. */
  match?: "all" | "any"
  /** Optional estimated audience size. */
  estimatedReach?: number
  onAddRule?: (kind: AudienceRuleKind) => void
  onRemoveRule?: (ruleId: string) => void
  onToggleMatch?: () => void
  className?: string
}

const QUICK_ADD: ReadonlyArray<AudienceRuleKind> = [
  "url",
  "segment",
  "role",
  "first-time",
  "device",
]

export function AudienceTargetingRules({
  tourName,
  rules,
  match = "all",
  estimatedReach,
  onAddRule,
  onRemoveRule,
  onToggleMatch,
  className,
}: AudienceTargetingRulesProps) {
  const matchId = useId()
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const reachLabel = typeof estimatedReach === "number"
    ? `${estimatedReach.toLocaleString("en-AU")} users`
    : null

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Audience targeting rules for ${tourName}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Audience · {tourName}</span>
          <h3 className={styles.title}>Who sees this tour</h3>
        </div>
        {reachLabel ? (
          <span className={styles.reach}>
            <span className={styles.reachLabel}>Est. reach</span>
            <strong className={styles.reachValue}>{reachLabel}</strong>
          </span>
        ) : null}
      </header>

      <button
        type="button"
        className={styles.matchToggle}
        id={matchId}
        aria-pressed={match === "all"}
        onClick={onToggleMatch}
      >
        Match <strong>{match === "all" ? "ALL" : "ANY"}</strong> of these rules
        <span aria-hidden="true">↻</span>
      </button>

      <ul className={styles.ruleList} aria-label="Active audience rules">
        {rules.map((rule) => {
          const tone = AUDIENCE_RULE_TONE[rule.kind]
          return (
            <li key={rule.id} className={styles.ruleItem}>
              <Chip
                label={AUDIENCE_RULE_LABEL[rule.kind]}
                tone={TOUR_TONE_TO_CHIP[tone]}
              />
              <span className={styles.comparator}>{rule.comparator}</span>
              <code className={styles.value}>{rule.value}</code>
              <button
                type="button"
                className={styles.remove}
                aria-label={`Remove ${AUDIENCE_RULE_LABEL[rule.kind]} rule`}
                onClick={() => onRemoveRule?.(rule.id)}
              >
                ×
              </button>
            </li>
          )
        })}
        {rules.length === 0 ? (
          <li className={styles.empty}>No rules yet — everyone is eligible.</li>
        ) : null}
      </ul>

      <div className={styles.adders}>
        <span className={styles.adderLabel}>Add rule</span>
        <div className={styles.adderChips}>
          {QUICK_ADD.map((kind) => (
            <Chip
              key={kind}
              label={`+ ${AUDIENCE_RULE_LABEL[kind]}`}
              tone={TOUR_TONE_TO_CHIP[AUDIENCE_RULE_TONE[kind]]}
              onSelect={() => onAddRule?.(kind)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudienceTargetingRules
