"use client"

import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import { ReadStateToggle } from "./read-state-toggle"
import styles from "./notification-card.module.css"

export type NotificationCardTone = "info" | "success" | "warn" | "error" | "system"

export interface NotificationCardAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

interface NotificationCardProps {
  id: string
  title: string
  excerpt?: string
  timestamp: string
  source?: string
  kicker?: string
  tone?: NotificationCardTone
  icon?: ReactNode
  actor?: { name: string; avatarSrc?: string }
  unread?: boolean
  actions?: ReadonlyArray<NotificationCardAction>
  onToggleRead?: (id: string, nextUnread: boolean) => void
  className?: string
}

export function NotificationCard({
  id,
  title,
  excerpt,
  timestamp,
  source,
  kicker,
  tone = "info",
  icon,
  actor,
  unread = false,
  actions,
  onToggleRead,
  className,
}: NotificationCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-unread={unread ? "true" : "false"}
      aria-label={`Notification: ${title}`}
    >
      {actor ? (
        <Avatar name={actor.name} src={actor.avatarSrc} size="md" tone="obsidian" />
      ) : (
        <span className={styles.glyph} data-tone={tone} aria-hidden="true">
          {icon}
        </span>
      )}

      <div className={styles.body}>
        <div className={styles.titleRow}>
          {kicker && <span className={styles.kicker}>{kicker}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
        {excerpt && <p className={styles.sub}>{excerpt}</p>}
        <div className={styles.metaRow}>
          <time>{timestamp}</time>
          {source && (
            <>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{source}</span>
            </>
          )}
          {actor && (
            <>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{actor.name}</span>
            </>
          )}
        </div>
        {actions && actions.length > 0 && (
          <div className={styles.actionsRow}>
            {actions.map((action) => {
              const cls =
                action.variant === "secondary"
                  ? styles.actionSecondary
                  : styles.actionPrimary
              if (action.href) {
                return (
                  <a key={action.label} href={action.href} className={cls}>
                    {action.label}
                  </a>
                )
              }
              return (
                <button
                  key={action.label}
                  type="button"
                  className={cls}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className={styles.rightCol}>
        <ReadStateToggle
          unread={unread}
          onChange={(next) => onToggleRead?.(id, next)}
        />
        <button
          type="button"
          className={styles.markRead}
          onClick={() => onToggleRead?.(id, !unread)}
        >
          {unread ? "Mark read" : "Mark unread"}
        </button>
      </div>
    </article>
  )
}

export default NotificationCard
