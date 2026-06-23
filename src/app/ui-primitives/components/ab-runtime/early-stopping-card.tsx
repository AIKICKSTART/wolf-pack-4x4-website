import { Chip } from "../primitives/chip"

import {
  STOPPING_RULE_LABEL,
  STOPPING_RULE_TONE,
  type AbStoppingRule,
} from "./ab-runtime-types"

import styles from "./early-stopping-card.module.css"

export type EarlyStoppingState = "off" | "armed" | "triggered"

export interface EarlyStoppingRule {
  id: string
  kind: AbStoppingRule
  /** Human-friendly threshold description, e.g. "Posterior P(beat) ≥ 0.97". */
  threshold: string
  /** Current state. */
  state: EarlyStoppingState
  /** Optional extra detail, e.g. day or sample count. */
  detail?: string
}

export interface EarlyStoppingCardProps {
  /** Header title, e.g. "Early stopping rules". */
  title?: string
  rules: ReadonlyArray<EarlyStoppingRule>
  /** Minimum samples per arm before any rule can fire. */
  minSamplesPerArm?: number
  className?: string
}

const STATE_LABEL: Record<EarlyStoppingState, string> = {
  off: "Off",
  armed: "Armed",
  triggered: "Triggered",
}

const STATE_DOT_CLASS: Record<EarlyStoppingState, string> = {
  off: "",
  armed: "dotArmed",
  triggered: "dotTriggered",
}

const STATE_STATUS_CLASS: Record<EarlyStoppingState, string> = {
  off: "ruleStatusOff",
  armed: "ruleStatusArmed",
  triggered: "ruleStatusTriggered",
}

export function EarlyStoppingCard({
  title = "Early stopping rules",
  rules,
  minSamplesPerArm,
  className,
}: EarlyStoppingCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={title}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Stop rules · Futility & Superiority</span>
        <h2 className={styles.title}>{title}</h2>
      </header>

      <div className={styles.rules}>
        {rules.map((rule) => {
          const ruleClass = [
            styles.rule,
            rule.state === "armed" || rule.state === "triggered"
              ? styles.ruleArmed
              : null,
          ]
            .filter(Boolean)
            .join(" ")

          const dotClassName = [
            styles.dot,
            STATE_DOT_CLASS[rule.state]
              ? styles[STATE_DOT_CLASS[rule.state] as keyof typeof styles]
              : null,
          ]
            .filter(Boolean)
            .join(" ")

          const statusClassName = [
            styles.ruleStatus,
            styles[STATE_STATUS_CLASS[rule.state] as keyof typeof styles],
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <div
              key={rule.id}
              className={ruleClass}
              role="status"
              aria-label={`${STOPPING_RULE_LABEL[rule.kind]}: ${STATE_LABEL[rule.state]}`}
            >
              <span className={dotClassName} aria-hidden="true" />
              <div className={styles.ruleBody}>
                <span className={styles.ruleTitle}>
                  {STOPPING_RULE_LABEL[rule.kind]}
                  {" · "}
                  {rule.threshold}
                </span>
                {rule.detail ? (
                  <span className={styles.ruleDetail}>{rule.detail}</span>
                ) : null}
              </div>
              <span className={statusClassName}>
                {STATE_LABEL[rule.state]}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}>
        {minSamplesPerArm !== undefined ? (
          <Chip label={`Min N/arm ${minSamplesPerArm.toLocaleString()}`} tone="teal" />
        ) : null}
        {rules.map((rule) => (
          <Chip
            key={`chip-${rule.id}`}
            label={STOPPING_RULE_LABEL[rule.kind]}
            tone={STOPPING_RULE_TONE[rule.kind]}
            selected={rule.state !== "off"}
          />
        ))}
      </div>
    </section>
  )
}

export default EarlyStoppingCard
