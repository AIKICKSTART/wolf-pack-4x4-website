"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  CHANNEL_LABEL,
  CHANNEL_TONE,
  CONVERSATION_STATE_LABEL,
  CONVERSATION_STATE_TONE,
  formatQueueTime,
  type HermesChannel,
  type HermesConversationState,
} from "./hermes-agent-types"
import styles from "./live-conversation-row.module.css"

interface LiveConversationRowProps {
  id: string
  customerName: string
  /** Avatar src override. */
  customerAvatar?: string
  channel: HermesChannel
  state: HermesConversationState
  /** Last message preview. */
  lastMessage: string
  /** Queue or wait time in seconds. */
  queueTimeSeconds: number
  /** Active selection. */
  active?: boolean
  /** Optional Hermes confidence 0..100. */
  confidence?: number
  onSelect?: (id: string) => void
  className?: string
}

export function LiveConversationRow({
  id,
  customerName,
  customerAvatar,
  channel,
  state,
  lastMessage,
  queueTimeSeconds,
  active = false,
  confidence,
  onSelect,
  className,
}: LiveConversationRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <button
      type="button"
      className={classes}
      data-state={state}
      aria-current={active ? "true" : undefined}
      aria-label={`Open conversation with ${customerName} on ${CHANNEL_LABEL[channel]}`}
      onClick={() => onSelect?.(id)}
    >
      <Avatar
        name={customerName}
        src={customerAvatar}
        size="md"
        tone="teal"
        status={state === "active" ? "online" : "offline"}
      />
      <div className={styles.body}>
        <div className={styles.topline}>
          <span className={styles.name}>{customerName}</span>
          <span className={styles.subtitle}>
            {state === "active" ? (
              <span className={styles.dotBlink} aria-hidden="true" />
            ) : null}
            <Chip
              label={CHANNEL_LABEL[channel]}
              tone={CHANNEL_TONE[channel]}
            />
            <Chip
              label={CONVERSATION_STATE_LABEL[state]}
              tone={CONVERSATION_STATE_TONE[state]}
            />
          </span>
        </div>
        <span className={styles.preview}>{lastMessage}</span>
      </div>
      <div className={styles.tail}>
        <span className={styles.queueTime}>
          {formatQueueTime(queueTimeSeconds)}
        </span>
        {confidence !== undefined ? (
          <Chip
            label={`${Math.round(confidence)}% conf.`}
            tone={confidence >= 80 ? "green" : confidence >= 50 ? "amber" : "red"}
          />
        ) : null}
      </div>
    </button>
  )
}

export default LiveConversationRow
