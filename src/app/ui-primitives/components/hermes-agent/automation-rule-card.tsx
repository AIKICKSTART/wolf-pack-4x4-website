"use client"

import { Activity, ArrowRight, Bot, Zap } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import {
  RUN_STEP_STATUS_LABEL,
  RUN_STEP_STATUS_TONE,
  type HermesRunStepStatus,
} from "./hermes-agent-types"
import styles from "./automation-rule-card.module.css"

export interface RuleRunHistoryEntry {
  id: string
  status: HermesRunStepStatus
  /** Short label, e.g. "12:42". */
  label: string
}

export interface AutomationRuleCardProps {
  id: string
  name: string
  category: string
  trigger: string
  condition: string
  action: string
  /** Whether the rule is enabled. Controlled mode kicks in when `onToggle` is set. */
  enabled?: boolean
  defaultEnabled?: boolean
  /** Run count over the last 7 days. */
  runs7d: number
  /** Successful runs / total ratio, 0..1. */
  successRate: number
  /** Last run wall-clock. */
  lastRunLabel: string
  /** Recent run badges (most recent first). */
  history: ReadonlyArray<RuleRunHistoryEntry>
  onToggle?: (enabled: boolean) => void
  className?: string
}

export function AutomationRuleCard({
  id,
  name,
  category,
  trigger,
  condition,
  action,
  enabled: controlledEnabled,
  defaultEnabled = true,
  runs7d,
  successRate,
  lastRunLabel,
  history,
  onToggle,
  className,
}: AutomationRuleCardProps) {
  const isControlled = controlledEnabled !== undefined
  const [internal, setInternal] = useState<boolean>(defaultEnabled)
  const enabled = isControlled ? Boolean(controlledEnabled) : internal

  const handleToggle = () => {
    const next = !enabled
    if (!isControlled) {
      setInternal(next)
    }
    onToggle?.(next)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-on={enabled ? "true" : "false"}
      aria-label={`Automation rule ${name}`}
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>
            <Zap size={11} strokeWidth={2.4} aria-hidden="true" /> {category} · {id}
          </span>
          <h4 className={styles.name}>{name}</h4>
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={handleToggle}
          aria-pressed={enabled}
          aria-label={enabled ? "Disable rule" : "Enable rule"}
        >
          <span className={styles.switch} aria-hidden="true" />
          {enabled ? "On" : "Off"}
        </button>
      </header>

      <div className={styles.flow} aria-label="Rule flow">
        <div className={styles.bucket}>
          <span className={styles.bucketLabel}>Trigger</span>
          <p className={styles.bucketValue}>{trigger}</p>
        </div>
        <span className={styles.flowArrow} aria-hidden="true">
          <ArrowRight size={13} strokeWidth={2.4} />
        </span>
        <div className={styles.bucket}>
          <span className={styles.bucketLabel}>Condition</span>
          <p className={styles.bucketValue}>{condition}</p>
        </div>
        <span className={styles.flowArrow} aria-hidden="true">
          <ArrowRight size={13} strokeWidth={2.4} />
        </span>
        <div className={styles.bucket}>
          <span className={styles.bucketLabel}>Action</span>
          <p className={styles.bucketValue}>{action}</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>
            <Activity size={11} strokeWidth={2.4} aria-hidden="true" /> Runs / 7d
          </span>
          <span className={styles.statValue}>{runs7d.toLocaleString()}</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>Success</span>
          <span className={styles.statValue}>
            {(successRate * 100).toFixed(1)}%
          </span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>
            <Bot size={11} strokeWidth={2.4} aria-hidden="true" /> Last run
          </span>
          <span className={styles.statSub}>{lastRunLabel}</span>
        </div>
      </div>

      <div className={styles.history} aria-label="Recent run history">
        {history.map((entry) => (
          <Chip
            key={entry.id}
            label={`${entry.label} · ${RUN_STEP_STATUS_LABEL[entry.status]}`}
            tone={RUN_STEP_STATUS_TONE[entry.status]}
          />
        ))}
      </div>
    </article>
  )
}

export default AutomationRuleCard
