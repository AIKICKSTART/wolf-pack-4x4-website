"use client"

import {
  Archive,
  BellOff,
  Phone,
  Pin,
  Video,
} from "lucide-react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./conversation-header.module.css"
import type { InboxPerson, PresenceState } from "./inbox-types"

interface ConversationHeaderAction {
  id: string
  label: string
  icon: ReactNode
  /** When true, the action button is shown in a danger / pressed tone. */
  active?: boolean
  onSelect?: () => void
}

interface ConversationHeaderProps {
  participant: InboxPerson
  /** Optional sub-text shown beneath the name. */
  subtitle?: string
  /** Optional action buttons; defaults to call/video/pin/mute/archive. */
  actions?: ReadonlyArray<ConversationHeaderAction>
  className?: string
}

const PRESENCE_COPY: Record<PresenceState, string> = {
  online: "Online now",
  away: "Away",
  busy: "Do not disturb",
  offline: "Offline",
}

const DEFAULT_ACTIONS: ReadonlyArray<ConversationHeaderAction> = [
  {
    id: "call",
    label: "Start voice call",
    icon: <Phone size={15} strokeWidth={2.2} aria-hidden="true" />,
  },
  {
    id: "video",
    label: "Start video call",
    icon: <Video size={15} strokeWidth={2.2} aria-hidden="true" />,
  },
  {
    id: "pin",
    label: "Pin conversation",
    icon: <Pin size={15} strokeWidth={2.2} aria-hidden="true" />,
  },
  {
    id: "mute",
    label: "Mute conversation",
    icon: <BellOff size={15} strokeWidth={2.2} aria-hidden="true" />,
  },
  {
    id: "archive",
    label: "Archive conversation",
    icon: <Archive size={15} strokeWidth={2.2} aria-hidden="true" />,
  },
]

export function ConversationHeader({
  participant,
  subtitle,
  actions = DEFAULT_ACTIONS,
  className,
}: ConversationHeaderProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")
  const presence = participant.presence ?? "offline"
  const presenceLabel = PRESENCE_COPY[presence]

  return (
    <header className={classes} aria-label={`Conversation with ${participant.name}`}>
      <Avatar
        name={participant.name}
        src={participant.avatar}
        size="lg"
        tone={participant.kind === "customer" ? "amber" : "red"}
        status={participant.presence}
      />

      <div className={styles.identity}>
        <strong className={styles.name}>{participant.name}</strong>
        <div className={styles.meta}>
          <span
            className={[styles.presence, styles[`presence-${presence}`]]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.presenceDot} aria-hidden="true" />
            {presenceLabel}
          </span>
          {participant.role ? (
            <span className={styles.roleChip}>{participant.role}</span>
          ) : null}
          {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </div>
      </div>

      <nav aria-label="Conversation actions" className={styles.actions}>
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={[
              styles.actionBtn,
              action.active ? styles.actionBtnActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={action.label}
            aria-pressed={action.active}
            onClick={action.onSelect}
          >
            {action.icon}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default ConversationHeader
