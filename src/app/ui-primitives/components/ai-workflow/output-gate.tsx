import { AlertCircle, CheckCircle2, ShieldCheck, XCircle } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import {
  GATE_OUTCOME_LABEL,
  GATE_OUTCOME_TONE,
  GATE_STRATEGY_LABEL,
  type WorkflowGateOutcome,
  type WorkflowGateStrategy,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./output-gate.module.css"

export interface OutputGateLogEntry {
  id: string
  /** Wall-clock or relative label. */
  timestamp: string
  /** Short summary of the input checked. */
  sample: string
  outcome: WorkflowGateOutcome
  /** Optional reason for the outcome. */
  reason?: string
}

interface OutputGateProps {
  title: string
  strategy: WorkflowGateStrategy
  /** Code or regex preview. */
  rulePreview: string
  /** Pass rate over the last N runs (0..1). */
  passRate: number
  /** Total samples evaluated. */
  evaluated: number
  /** Recent decisions log. */
  log: ReadonlyArray<OutputGateLogEntry>
  /** Optional kicker (e.g. "Gate · v2"). */
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

function OutcomeIcon({ outcome }: { outcome: WorkflowGateOutcome }) {
  if (outcome === "pass") {
    return <CheckCircle2 size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  if (outcome === "warn") {
    return <AlertCircle size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  return <XCircle size={12} strokeWidth={2.4} aria-hidden="true" />
}

export function OutputGate({
  title,
  strategy,
  rulePreview,
  passRate,
  evaluated,
  log,
  kicker = "Output gate",
  className,
}: OutputGateProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const passes = log.filter((entry) => entry.outcome === "pass").length
  const fails = log.filter((entry) => entry.outcome === "fail").length
  const warns = log.filter((entry) => entry.outcome === "warn").length

  return (
    <section className={classes} aria-label={`Output gate · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <ShieldCheck size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.strategyChip}>
          {GATE_STRATEGY_LABEL[strategy]}
        </span>
      </header>

      <div className={styles.summary}>
        <div className={styles.summaryStat}>
          <span className={styles.summaryLabel}>Pass rate</span>
          <span className={styles.summaryValue}>
            {(passRate * 100).toFixed(1)}%
          </span>
        </div>
        <div className={styles.summaryStat}>
          <span className={styles.summaryLabel}>Evaluated</span>
          <span className={styles.summaryValue}>{evaluated.toLocaleString()}</span>
        </div>
        <div className={styles.summaryStat}>
          <span className={styles.summaryLabel}>Pass · warn · fail</span>
          <span className={styles.summaryValue} aria-label="Pass warn fail counts">
            <span style={{ color: TONE_VAR.green }}>{passes}</span>
            <span className={styles.divider}>·</span>
            <span style={{ color: TONE_VAR.amber }}>{warns}</span>
            <span className={styles.divider}>·</span>
            <span style={{ color: TONE_VAR.red }}>{fails}</span>
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Rule preview</span>
        <CodeBlock
          code={rulePreview}
          language={strategy === "regex" ? "text" : "json"}
          showLineNumbers={false}
          maxHeight={160}
        />
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Recent decisions</span>
        <ul className={styles.log} aria-label="Recent gate decisions">
          {log.map((entry) => (
            <li
              key={entry.id}
              className={styles.logRow}
              data-outcome={entry.outcome}
              style={{ "--row-tone": TONE_VAR[GATE_OUTCOME_TONE[entry.outcome]] } as Record<string, string>}
            >
              <span className={styles.logIcon} aria-hidden="true">
                <OutcomeIcon outcome={entry.outcome} />
              </span>
              <span className={styles.logTime}>{entry.timestamp}</span>
              <span className={styles.logSample}>{entry.sample}</span>
              <span className={styles.logOutcome}>
                {GATE_OUTCOME_LABEL[entry.outcome]}
                {entry.reason ? ` · ${entry.reason}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default OutputGate
