"use client"

import { ArrowRight, Zap } from "lucide-react"
import { useState } from "react"

import type {
  NotificationEventId,
  PriorityRuleAction,
  PriorityRuleSpec,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface PriorityRuleRowProps {
  rule: PriorityRuleSpec
  eventLabel: string
  onChange?: (rule: PriorityRuleSpec) => void
  className?: string
}

const ACTION_LABEL: Record<PriorityRuleAction, string> = {
  escalate: "Escalate to lead tech",
  page: "Page on-call pager",
  "email-supervisor": "Email supervisor",
  "sms-on-call": "SMS on-call",
}

const MINUTES_OPTIONS: ReadonlyArray<number> = [5, 10, 15, 30, 45, 60]

export function PriorityRuleRow({
  rule,
  eventLabel,
  onChange,
  className,
}: PriorityRuleRowProps) {
  const [value, setValue] = useState<PriorityRuleSpec>(rule)

  const update = <K extends keyof PriorityRuleSpec>(
    key: K,
    next: PriorityRuleSpec[K],
  ) => {
    const merged = { ...value, [key]: next }
    setValue(merged)
    onChange?.(merged)
  }

  const classes = [
    styles.ruleRow,
    value.enabled ? "" : styles.ruleRowOff,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} aria-label={`Priority rule for ${eventLabel}`}>
      <div className={styles.ruleHead}>
        <span className={styles.ruleIcon} aria-hidden="true">
          <Zap size={14} strokeWidth={2.4} />
        </span>
        <span className={styles.ruleEvent}>{eventLabel}</span>
        <label className={styles.ruleToggleLabel}>
          <span className={styles.srOnly}>
            {value.enabled ? "Disable" : "Enable"} rule
          </span>
          <span className={styles.ruleSwitch}>
            <input
              type="checkbox"
              checked={value.enabled}
              onChange={(event) => update("enabled", event.target.checked)}
              className={styles.ruleCheckbox}
              aria-label={`${value.enabled ? "Disable" : "Enable"} priority rule for ${eventLabel}`}
            />
            <span className={styles.ruleKnob} aria-hidden="true" />
          </span>
        </label>
      </div>

      <div className={styles.ruleFlow}>
        <span className={styles.ruleClause}>If unread for</span>
        <select
          value={value.ifUnreadMinutes}
          onChange={(event) =>
            update("ifUnreadMinutes", Number.parseInt(event.target.value, 10))
          }
          className={styles.ruleSelect}
          aria-label="Unread duration before escalation"
          disabled={!value.enabled}
        >
          {MINUTES_OPTIONS.map((mins) => (
            <option key={mins} value={mins}>
              {mins} min
            </option>
          ))}
        </select>

        <ArrowRight
          size={14}
          strokeWidth={2.4}
          aria-hidden="true"
          className={styles.ruleArrow}
        />

        <span className={styles.ruleClause}>then</span>
        <select
          value={value.action}
          onChange={(event) =>
            update("action", event.target.value as PriorityRuleAction)
          }
          className={styles.ruleSelect}
          aria-label="Action when unread"
          disabled={!value.enabled}
        >
          {(Object.keys(ACTION_LABEL) as PriorityRuleAction[]).map((action) => (
            <option key={action} value={action}>
              {ACTION_LABEL[action]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PriorityRuleRow
export type { NotificationEventId }
