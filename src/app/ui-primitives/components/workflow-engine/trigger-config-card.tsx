import { CalendarClock, Hand, Radio, Webhook, Zap } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import {
  TRIGGER_KIND_LABEL,
  TRIGGER_KIND_TONE,
  type EngineTone,
  type EngineTriggerKind,
} from "./workflow-engine-types"
import styles from "./trigger-config-card.module.css"

/**
 * Trigger config card — surfaces the trigger that kicks off a workflow.
 * Mirrors the AI workflow flow-trigger-card vocabulary but tailored for
 * deterministic business automations — Shopify webhooks, daily 8am crons,
 * "refund requested" event bus messages, manual run-now invocations.
 */
interface TriggerConfigCardProps {
  title: string
  kind: EngineTriggerKind
  /** Short, human-friendly trigger config — e.g. cron expression or URL. */
  config: string
  /** Last fired timestamp. */
  lastFiredLabel?: string
  /** Total invocations in last 7 days. */
  invocations7d?: number
  /** Sample payload (pretty-printed JSON or similar). */
  samplePayload: string
  /** Whether the trigger is currently armed. */
  armed?: boolean
  kicker?: string
  className?: string
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
}

const KIND_ICON: Record<EngineTriggerKind, typeof CalendarClock> = {
  webhook: Webhook,
  cron: CalendarClock,
  event: Radio,
  manual: Hand,
}

export function TriggerConfigCard({
  title,
  kind,
  config,
  lastFiredLabel,
  invocations7d,
  samplePayload,
  armed = true,
  kicker = "Trigger",
  className,
}: TriggerConfigCardProps) {
  const tone = TRIGGER_KIND_TONE[kind]
  const Icon = KIND_ICON[kind]
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      style={{ "--card-tone": TONE_VAR[tone] } as Record<string, string>}
      aria-label={`Trigger config · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.kindChip} data-armed={armed ? "true" : "false"}>
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
          <span className={styles.metaChip}>Last fired · {lastFiredLabel}</span>
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

export default TriggerConfigCard
