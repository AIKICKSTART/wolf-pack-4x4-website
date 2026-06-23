"use client"

import { ArrowRightCircle, Bot, Check } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  CHANNEL_LABEL,
  CHANNEL_TONE,
  PRIORITY_LABEL,
  PRIORITY_TONE,
  type HermesChannel,
  type HermesPriority,
} from "./hermes-agent-types"
import styles from "./handoff-card.module.css"

interface HandoffCardProps {
  id: string
  customerName: string
  channel: HermesChannel
  priority: HermesPriority
  /** Why Hermes is handing off. */
  reason: string
  /** Assigned human + role. */
  assigneeName: string
  assigneeRole: string
  /** Optional avatar src for the assignee. */
  assigneeAvatar?: string
  /** SLA target remaining minutes. */
  slaRemainingMinutes: number
  /** Conversation summary one-liner. */
  summary?: string
  onAccept?: () => void
  className?: string
}

function formatSla(minutes: number): string {
  if (minutes < 0) return `${Math.abs(minutes)}m over`
  if (minutes < 1) return "now"
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export function HandoffCard({
  id,
  customerName,
  channel,
  priority,
  reason,
  assigneeName,
  assigneeRole,
  assigneeAvatar,
  slaRemainingMinutes,
  summary,
  onAccept,
  className,
}: HandoffCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      data-priority={priority}
      aria-label={`Hermes handoff for ${customerName}`}
    >
      <span className={styles.botIcon} aria-hidden="true">
        <Bot size={22} strokeWidth={2.2} />
      </span>
      <div className={styles.body}>
        <span className={styles.kicker}>
          <ArrowRightCircle size={11} strokeWidth={2.4} aria-hidden="true" />
          Handoff · {id}
        </span>
        <h4 className={styles.title}>{customerName} → human handler</h4>
        <p className={styles.reason}>{reason}</p>
        {summary ? (
          <p className={styles.reason} style={{ opacity: 0.75 }}>
            {summary}
          </p>
        ) : null}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
          <Chip
            label={CHANNEL_LABEL[channel]}
            tone={CHANNEL_TONE[channel]}
          />
          <Chip
            label={PRIORITY_LABEL[priority]}
            tone={PRIORITY_TONE[priority]}
          />
        </div>
        <div className={styles.assignee}>
          <Avatar
            name={assigneeName}
            src={assigneeAvatar}
            tone="teal"
            size="sm"
            status="online"
          />
          <div className={styles.assigneeText}>
            <span className={styles.assigneeName}>{assigneeName}</span>
            <span className={styles.assigneeMeta}>{assigneeRole}</span>
          </div>
        </div>
      </div>
      <div className={styles.tail}>
        <div className={styles.sla} role="timer" aria-live="off">
          <span className={styles.slaLabel}>SLA · accept by</span>
          <span className={styles.slaValue}>
            {formatSla(slaRemainingMinutes)}
          </span>
        </div>
        <button
          type="button"
          className={styles.acceptBtn}
          onClick={onAccept}
          aria-label={`Accept handoff for ${customerName}`}
        >
          <Check size={13} strokeWidth={2.4} aria-hidden="true" />
          Accept handoff
        </button>
      </div>
    </article>
  )
}

export default HandoffCard
