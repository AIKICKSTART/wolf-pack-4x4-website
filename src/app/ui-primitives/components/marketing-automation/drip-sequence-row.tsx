import { Bell, Mail, MessageSquare, PhoneCall, Webhook, Wrench } from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"

import styles from "./drip-sequence-row.module.css"
import {
  CHANNEL_LABEL,
  CHANNEL_TONE,
  STEP_STATUS_LABEL,
  STEP_STATUS_TONE,
  type AutomationChannel,
  type AutomationTone,
  type DripStepStatus,
} from "./marketing-automation-types"

export interface DripSequenceRowProps {
  index: number
  channel: AutomationChannel
  title: string
  preview?: string
  /** e.g. "+2 hr after trigger". */
  delayLabel: string
  /** e.g. 28.4 (percent). */
  openRate?: number
  /** e.g. 4.2 (percent). */
  clickRate?: number
  status: DripStepStatus
  /** Optional gating predicate, e.g. "if quote_viewed" */
  predicate?: string
  className?: string
}

const STATUS_CLASS: Record<AutomationTone, string> = {
  red: styles.statusRed,
  amber: styles.statusAmber,
  teal: styles.statusTeal,
  green: styles.statusGreen,
  neutral: styles.statusNeutral,
}

function ChannelGlyph({ channel }: { channel: AutomationChannel }): ReactNode {
  const props = { size: 12, strokeWidth: 2.4, "aria-hidden": true } as const
  switch (channel) {
    case "email":
      return <Mail {...props} />
    case "sms":
      return <MessageSquare {...props} />
    case "push":
      return <Bell {...props} />
    case "voice":
      return <PhoneCall {...props} />
    case "task":
      return <Wrench {...props} />
    case "webhook":
      return <Webhook {...props} />
  }
}

function formatRate(value: number): string {
  return `${value.toFixed(1)}%`
}

export function DripSequenceRow({
  index,
  channel,
  title,
  preview,
  delayLabel,
  openRate,
  clickRate,
  status,
  predicate,
  className,
}: DripSequenceRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const statusTone = STEP_STATUS_TONE[status]
  return (
    <article
      className={classes}
      aria-label={`Step ${index} · ${CHANNEL_LABEL[channel]} · ${title}`}
    >
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <div className={styles.body}>
        <span className={styles.kicker}>
          <ChannelGlyph channel={channel} />
          {CHANNEL_LABEL[channel]} · {delayLabel}
        </span>
        <span className={styles.title}>{title}</span>
        {preview ? <span className={styles.preview}>{preview}</span> : null}
        <span className={styles.chipRow}>
          <Chip label={delayLabel} tone={CHANNEL_TONE[channel]} />
          {predicate ? <Chip label={`If · ${predicate}`} tone="teal" /> : null}
        </span>
      </div>
      <div className={styles.metrics}>
        <span className={styles.metricsHead}>Open</span>
        <span className={styles.metricsValue}>
          {openRate !== undefined ? formatRate(openRate) : "—"}
        </span>
        <span className={styles.metricsHead}>Click</span>
        <span className={styles.metricsValueSub}>
          {clickRate !== undefined ? formatRate(clickRate) : "—"}
        </span>
      </div>
      <span
        className={[styles.statusChip, STATUS_CLASS[statusTone]].join(" ")}
        aria-label={`Status ${STEP_STATUS_LABEL[status]}`}
      >
        {STEP_STATUS_LABEL[status]}
      </span>
    </article>
  )
}

export default DripSequenceRow
