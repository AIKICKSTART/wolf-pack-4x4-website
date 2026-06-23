"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"

import styles from "./notification-inbox.module.css"

export type NotificationTone = "info" | "success" | "warn" | "error"
export type NotificationFilter = "unread" | "all" | "mentions"

export interface NotificationItem {
  id: string
  title: string
  sub?: string
  timestamp: string
  source?: string
  tone?: NotificationTone
  icon?: ReactNode
  unread?: boolean
  mention?: boolean
}

interface NotificationInboxProps {
  items: ReadonlyArray<NotificationItem>
  defaultFilter?: NotificationFilter
  onMarkAllRead?: () => void
  className?: string
}

const TAB_LABEL: Record<NotificationFilter, string> = {
  unread: "Unread",
  all: "All",
  mentions: "Mentions",
}

const TAB_ORDER: ReadonlyArray<NotificationFilter> = ["unread", "all", "mentions"]

export function NotificationInbox({
  items,
  defaultFilter = "unread",
  onMarkAllRead,
  className,
}: NotificationInboxProps) {
  const [filter, setFilter] = useState<NotificationFilter>(defaultFilter)

  const counts = useMemo(
    () => ({
      unread: items.filter((item) => item.unread).length,
      all: items.length,
      mentions: items.filter((item) => item.mention).length,
    }),
    [items],
  )

  const filtered = useMemo(() => {
    if (filter === "unread") {
      return items.filter((item) => item.unread)
    }
    if (filter === "mentions") {
      return items.filter((item) => item.mention)
    }
    return items
  }, [items, filter])

  const classes = [styles.inbox, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Notification inbox">
      <div className={styles.tabs} role="tablist">
        {TAB_ORDER.map((tab) => {
          const count = counts[tab]
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={filter === tab}
              className={styles.tab}
              onClick={() => setFilter(tab)}
            >
              {TAB_LABEL[tab]}
              {count > 0 && <span className={styles.tabBadge}>{count}</span>}
            </button>
          )
        })}
      </div>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <li
            key={item.id}
            className={styles.item}
            role="status"
            aria-live="polite"
          >
            <span
              className={styles.iconCell}
              data-tone={item.tone ?? "info"}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <div className={styles.body}>
              <p className={styles.title}>{item.title}</p>
              {item.sub && <p className={styles.sub}>{item.sub}</p>}
              <div className={styles.metaRow}>
                <time>{item.timestamp}</time>
                {item.source && <span>{item.source}</span>}
                {item.unread && (
                  <span className={styles.unreadFlag} aria-label="Unread" />
                )}
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" aria-label={`Mark ${item.title} as read`}>
                Mark read
              </button>
              <button type="button" aria-label={`Dismiss ${item.title}`}>
                Dismiss
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span>
          {filtered.length} of {items.length} shown
        </span>
        <button type="button" onClick={onMarkAllRead}>
          Mark all read
        </button>
      </div>
    </section>
  )
}

export default NotificationInbox
