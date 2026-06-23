"use client"

import { Clock, Moon, Sparkles } from "lucide-react"
import { useState, type ReactNode } from "react"

import {
  AUTO_REPLY_KIND_LABEL,
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  type AutoReplyKind,
  type UnifiedChannel,
} from "./unified-inbox-types"
import styles from "./auto-reply-rule-card.module.css"

interface AutoReplyRuleCardProps {
  kind: AutoReplyKind
  /** Human-readable title, e.g. "Out-of-hours reply". */
  title: string
  /** Body preview rendered as quoted block. */
  body: string
  /** Optional schedule summary, e.g. "Mon–Fri after 5:30pm + weekends". */
  schedule?: string
  /** Channels the rule applies to. */
  channels: ReadonlyArray<UnifiedChannel>
  /** Whether the rule is enabled by default. */
  defaultEnabled?: boolean
  /** Triggered when the operator toggles the rule. */
  onToggle?: (enabled: boolean) => void
  /** Triggered when the operator opens the rule editor. */
  onEdit?: () => void
  className?: string
}

function iconForKind(kind: AutoReplyKind): ReactNode {
  switch (kind) {
    case "out-of-hours":
      return <Moon size={13} strokeWidth={2.2} aria-hidden="true" />
    case "away-message":
      return <Clock size={13} strokeWidth={2.2} aria-hidden="true" />
    case "first-touch":
    default:
      return <Sparkles size={13} strokeWidth={2.2} aria-hidden="true" />
  }
}

export function AutoReplyRuleCard({
  kind,
  title,
  body,
  schedule,
  channels,
  defaultEnabled = true,
  onToggle,
  onEdit,
  className,
}: AutoReplyRuleCardProps) {
  const [enabled, setEnabled] = useState<boolean>(defaultEnabled)
  const classes = [
    styles.card,
    enabled ? styles.cardOn : styles.cardOff,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handleToggle = () => {
    const next = !enabled
    setEnabled(next)
    onToggle?.(next)
  }

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kindTag}>
          <span className={styles.kindGlyph}>{iconForKind(kind)}</span>
          <span>{AUTO_REPLY_KIND_LABEL[kind]}</span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={`${enabled ? "Disable" : "Enable"} ${title}`}
          className={[styles.toggle, enabled ? styles.toggleOn : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={handleToggle}
        />
      </header>

      <h3 className={styles.title}>{title}</h3>
      {schedule ? <span className={styles.schedule}>{schedule}</span> : null}

      <blockquote className={styles.body}>
        <p>{body}</p>
      </blockquote>

      <footer className={styles.foot}>
        <ul className={styles.channels} aria-label="Channels">
          {channels.map((channel) => (
            <li key={channel} className={styles.channelChip}>
              <span aria-hidden="true">{CHANNEL_GLYPH[channel]}</span>
              <span>{CHANNEL_LABEL[channel]}</span>
            </li>
          ))}
        </ul>
        {onEdit ? (
          <button
            type="button"
            className={styles.editBtn}
            onClick={onEdit}
          >
            Edit rule
          </button>
        ) : null}
      </footer>
    </section>
  )
}

export default AutoReplyRuleCard
