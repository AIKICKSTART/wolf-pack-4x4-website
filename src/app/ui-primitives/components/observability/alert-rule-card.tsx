import { GlassSurface } from "../surfaces/glass-surface"
import { ProgressLinear } from "../primitives/progress-linear"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { ProgressLinearTone } from "../primitives/progress-linear"
import type { StatusTone } from "../status-page/status-types"

import {
  ALERT_RULE_STATE_LABEL,
  ALERT_RULE_STATE_TONE,
  type AlertRuleState,
} from "./observability-types"
import styles from "./alert-rule-card.module.css"

export type AlertOperator = ">" | ">=" | "<" | "<="

export interface AlertRuleCardProps {
  ruleName: string
  service: string
  metric: string
  operator: AlertOperator
  thresholdValue: number
  thresholdUnit?: string
  /** Current observed value of the metric. */
  currentValue: number
  state: AlertRuleState
  /** Human time of last trigger, e.g. "14m ago", or undefined if never. */
  lastTriggered?: string
  /** Optional notes such as evaluation window. */
  notes?: string
  className?: string
}

const TONE_PROGRESS: Record<StatusTone, ProgressLinearTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "teal",
  violet: "teal",
}

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function computePercent(current: number, threshold: number, operator: AlertOperator): number {
  if (threshold === 0) {
    return current > 0 ? 100 : 0
  }
  // For greater-than-style rules, show how close current is to threshold (0..100).
  // For less-than-style rules, invert.
  if (operator === ">" || operator === ">=") {
    return Math.max(0, Math.min(100, (current / threshold) * 100))
  }
  return Math.max(0, Math.min(100, ((threshold - current) / threshold) * 100))
}

export function AlertRuleCard({
  ruleName,
  service,
  metric,
  operator,
  thresholdValue,
  thresholdUnit,
  currentValue,
  state,
  lastTriggered,
  notes,
  className,
}: AlertRuleCardProps) {
  const tone: StatusTone = ALERT_RULE_STATE_TONE[state]
  const classes = [styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const percent = computePercent(currentValue, thresholdValue, operator)
  const unit = thresholdUnit ?? ""

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <article
        aria-label={`Alert rule ${ruleName} — ${ALERT_RULE_STATE_LABEL[state]}`}
        data-state={state}
      >
        <header className={styles.head}>
          <div className={styles.identity}>
            <h3 className={styles.title}>{ruleName}</h3>
            <span className={styles.service}>{service}</span>
          </div>
          <Chip
            label={ALERT_RULE_STATE_LABEL[state]}
            tone={TONE_CHIP[tone]}
            selected={state === "alerting"}
          />
        </header>

        <dl className={styles.thresholdRow}>
          <div className={styles.cell}>
            <dt className={styles.cellLabel}>Metric</dt>
            <dd className={styles.cellValue}>{metric}</dd>
          </div>
          <div className={styles.cell}>
            <dt className={styles.cellLabel}>Threshold</dt>
            <dd className={styles.cellValue}>
              <span className={styles.op}>{operator}</span>
              {thresholdValue}
              {unit ? <em className={styles.unit}>{unit}</em> : null}
            </dd>
          </div>
          <div className={styles.cell}>
            <dt className={styles.cellLabel}>Current</dt>
            <dd className={styles.cellValue}>
              {currentValue}
              {unit ? <em className={styles.unit}>{unit}</em> : null}
            </dd>
          </div>
        </dl>

        <div className={styles.progress}>
          <ProgressLinear
            label="Threshold proximity"
            value={percent}
            tone={TONE_PROGRESS[tone]}
            showLabel
          />
        </div>

        <footer className={styles.foot}>
          <span className={styles.metaLabel}>Last triggered</span>
          <span className={styles.metaValue}>{lastTriggered ?? "Never"}</span>
          {notes ? <span className={styles.notes}>{notes}</span> : null}
        </footer>
      </article>
    </GlassSurface>
  )
}

export default AlertRuleCard
