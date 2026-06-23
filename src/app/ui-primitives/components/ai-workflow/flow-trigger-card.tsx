import { CalendarClock, Hand, Radio, Webhook, Zap } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import {
  TRIGGER_KIND_LABEL,
  TRIGGER_KIND_TONE,
  type WorkflowTriggerKind,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./flow-trigger-card.module.css"

interface FlowTriggerCardProps {
  title: string
  /** Trigger discriminator. */
  kind: WorkflowTriggerKind
  /** Short, human-friendly trigger config — e.g. cron expression. */
  config: string
  /** Last fired timestamp. */
  lastFiredLabel?: string
  /** Total invocations in last 7 days. */
  invocations7d?: number
  /** Sample payload JSON (pretty-printed). */
  samplePayload: string
  /** Whether the trigger is currently armed. */
  armed?: boolean
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

const KIND_ICON: Record<
  WorkflowTriggerKind,
  typeof CalendarClock
> = {
  webhook: Webhook,
  cron: CalendarClock,
  event: Radio,
  manual: Hand,
}

export function FlowTriggerCard({
  title,
  kind,
  config,
  lastFiredLabel,
  invocations7d,
  samplePayload,
  armed = true,
  kicker = "Trigger",
  className,
}: FlowTriggerCardProps) {
  const tone = TRIGGER_KIND_TONE[kind]
  const Icon = KIND_ICON[kind]
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      style={{ "--card-tone": TONE_VAR[tone] } as Record<string, string>}
      aria-label={`Trigger card · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span
          className={styles.kindChip}
          data-armed={armed ? "true" : "false"}
        >
          <Zap size={10} strokeWidth={2.4} aria-hidden="true" />
          {TRIGGER_KIND_LABEL[kind]}
        </span>
      </header>

      <div className={styles.configRow}>
        <span className={styles.configLabel}>Config</span>
        <code className={styles.configValue}>{config}</code>
      </div>

      <div className={styles.metaRow}>
        {lastFiredLabel ? (
          <span className={styles.metaChip}>
            Last fired · {lastFiredLabel}
          </span>
        ) : (
          <span className={styles.metaChip}>Awaiting first fire</span>
        )}
        {invocations7d !== undefined ? (
          <span className={styles.metaChip}>
            {invocations7d.toLocaleString()} fires / 7d
          </span>
        ) : null}
        <span
          className={styles.statusChip}
          data-armed={armed ? "true" : "false"}
          aria-label={`Status ${armed ? "armed" : "disarmed"}`}
        >
          <span className={styles.statusDot} aria-hidden="true" />
          {armed ? "Armed" : "Disarmed"}
        </span>
      </div>

      <div className={styles.payloadBlock}>
        <span className={styles.payloadLabel}>Sample payload</span>
        <CodeBlock
          code={samplePayload}
          language="json"
          showLineNumbers={false}
          maxHeight={180}
        />
      </div>
    </section>
  )
}

export default FlowTriggerCard
