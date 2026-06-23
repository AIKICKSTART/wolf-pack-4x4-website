import { ShieldCheck } from "lucide-react"

import {
  SAFETY_ACTION_LABEL,
  SAFETY_ACTION_TONE,
  SAFETY_KIND_LABEL,
  SAFETY_KIND_TONE,
  formatRate,
  type WorkflowSafetyAction,
  type WorkflowSafetyKind,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./safety-check-block.module.css"

export interface SafetyCheckRule {
  id: string
  kind: WorkflowSafetyKind
  /** Short rule description, e.g. "Block prompt injection patterns". */
  description: string
  action: WorkflowSafetyAction
  /** Inspections per 24h. */
  inspected24h: number
  /** Hits per 24h (rule matched). */
  hits24h: number
  /** Whether the rule is enabled. */
  enabled: boolean
}

interface SafetyCheckBlockProps {
  title: string
  rules: ReadonlyArray<SafetyCheckRule>
  /** Whether to log full payloads on hit. Stateless display flag. */
  payloadLogging?: boolean
  kicker?: string
  className?: string
}

const TONE_VAR: Record<WorkflowTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-teal)",
}

export function SafetyCheckBlock({
  title,
  rules,
  payloadLogging = false,
  kicker = "Safety checks",
  className,
}: SafetyCheckBlockProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const totalHits = rules.reduce((sum, rule) => sum + rule.hits24h, 0)
  const totalInspected = rules.reduce(
    (sum, rule) => sum + rule.inspected24h,
    0,
  )

  return (
    <section className={classes} aria-label={`Safety checks · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <ShieldCheck size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.summaryChip}>
          {totalHits} hit{totalHits === 1 ? "" : "s"} / {totalInspected.toLocaleString()} checked
        </span>
      </header>

      <ul className={styles.rules} aria-label="Safety rules">
        {rules.map((rule) => {
          const kindTone = SAFETY_KIND_TONE[rule.kind]
          const actionTone = SAFETY_ACTION_TONE[rule.action]
          const hitRate = rule.inspected24h > 0 ? rule.hits24h / rule.inspected24h : 0
          return (
            <li
              key={rule.id}
              className={styles.rule}
              data-enabled={rule.enabled ? "true" : "false"}
              style={
                {
                  "--rule-tone": TONE_VAR[kindTone],
                  "--action-tone": TONE_VAR[actionTone],
                } as Record<string, string>
              }
            >
              <div className={styles.ruleBody}>
                <header className={styles.ruleHead}>
                  <span className={styles.kindChip}>
                    {SAFETY_KIND_LABEL[rule.kind]}
                  </span>
                  <p className={styles.description}>{rule.description}</p>
                </header>
                <div className={styles.metricsRow}>
                  <span className={styles.metric}>
                    <span className={styles.metricLabel}>Inspected</span>
                    <span className={styles.metricValue}>
                      {rule.inspected24h.toLocaleString()}
                    </span>
                  </span>
                  <span className={styles.metric}>
                    <span className={styles.metricLabel}>Hits</span>
                    <span className={styles.metricValue}>{rule.hits24h}</span>
                  </span>
                  <span className={styles.metric}>
                    <span className={styles.metricLabel}>Hit rate</span>
                    <span className={styles.metricValue}>
                      {formatRate(hitRate)}
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.actionBlock}>
                <span className={styles.actionLabel}>On hit</span>
                <span className={styles.actionChip}>
                  {SAFETY_ACTION_LABEL[rule.action]}
                </span>
                <span
                  className={styles.toggleChip}
                  data-on={rule.enabled ? "true" : "false"}
                >
                  {rule.enabled ? "Enabled" : "Off"}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <footer className={styles.footer}>
        <span className={styles.footerChip} data-on={payloadLogging ? "true" : "false"}>
          {payloadLogging ? "Payload logging on" : "Payload logging off"}
        </span>
      </footer>
    </section>
  )
}

export default SafetyCheckBlock
