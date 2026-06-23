"use client"

import { Bell, CheckCheck, Inbox, Search, X } from "lucide-react"
import { useMemo, useState } from "react"

import type {
  NotificationCentreItem,
  NotificationTone,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface NotificationCenterPanelProps {
  items: ReadonlyArray<NotificationCentreItem>
  open?: boolean
  onClose?: () => void
  onMarkAll?: () => void
  onItemClick?: (id: string) => void
  className?: string
}

type FilterTab = "all" | "unread" | "alerts"

const TONE_TAG_CLASS: Record<NotificationTone, string> = {
  info: styles.centreTagInfo,
  success: styles.centreTagSuccess,
  warning: styles.centreTagWarning,
  danger: styles.centreTagDanger,
}

const TONE_LABEL: Record<NotificationTone, string> = {
  info: "Info",
  success: "OK",
  warning: "Watch",
  danger: "Alert",
}

function groupByDay(items: ReadonlyArray<NotificationCentreItem>): ReadonlyArray<{
  label: string
  items: ReadonlyArray<NotificationCentreItem>
}> {
  const groups = new Map<string, NotificationCentreItem[]>()
  for (const item of items) {
    const date = item.receivedAtISO.slice(0, 10)
    const arr = groups.get(date) ?? []
    arr.push(item)
    groups.set(date, arr)
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([label, list]) => ({ label, items: list }))
}

export function NotificationCenterPanel({
  items,
  open = true,
  onClose,
  onMarkAll,
  onItemClick,
  className,
}: NotificationCenterPanelProps) {
  const [tab, setTab] = useState<FilterTab>("all")
  const [query, setQuery] = useState<string>("")

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (tab === "unread" && item.read) return false
      if (tab === "alerts" && item.tone !== "danger" && item.tone !== "warning") {
        return false
      }
      if (query) {
        const haystack = `${item.title} ${item.body}`.toLowerCase()
        if (!haystack.includes(query.toLowerCase())) return false
      }
      return true
    })
  }, [items, tab, query])

  const grouped = useMemo(() => groupByDay(filtered), [filtered])
  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items])

  if (!open) {
    return null
  }

  const classes = [styles.centrePanel, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      role="dialog"
      aria-modal="false"
      aria-label="Notification center"
    >
      <header className={styles.centreHead}>
        <div className={styles.centreTitleRow}>
          <span className={styles.centreTitleIcon} aria-hidden="true">
            <Bell size={16} strokeWidth={2.2} />
          </span>
          <div>
            <p className={styles.centreKicker}>Workshop signal</p>
            <h2 className={styles.centreTitle}>
              Notifications{" "}
              <span className={styles.centreCount}>
                {unreadCount} unread
              </span>
            </h2>
          </div>
          {onClose && (
            <button
              type="button"
              className={styles.centreClose}
              onClick={onClose}
              aria-label="Close notifications"
            >
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className={styles.centreSearchRow}>
          <span className={styles.centreSearchIcon} aria-hidden="true">
            <Search size={14} strokeWidth={2.2} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a notification…"
            className={styles.centreSearch}
            aria-label="Search notifications"
          />
          {onMarkAll && (
            <button
              type="button"
              className={styles.centreMarkAll}
              onClick={onMarkAll}
            >
              <CheckCheck size={14} strokeWidth={2.4} aria-hidden="true" />
              Mark all read
            </button>
          )}
        </div>

        <div className={styles.centreTabs} role="tablist" aria-label="Filter notifications">
          {(["all", "unread", "alerts"] as const).map((id) => {
            const active = tab === id
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                className={[styles.centreTab, active ? styles.centreTabOn : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setTab(id)}
              >
                {id === "all" ? "All" : id === "unread" ? "Unread" : "Alerts"}
              </button>
            )
          })}
        </div>
      </header>

      <div className={styles.centreList} role="tabpanel">
        {grouped.length === 0 ? (
          <div className={styles.centreEmpty}>
            <Inbox size={28} strokeWidth={1.8} aria-hidden="true" />
            <strong>No notifications match</strong>
            <p>Try clearing the search or switching tabs.</p>
          </div>
        ) : (
          grouped.map((group) => (
            <section key={group.label} className={styles.centreGroup}>
              <h3 className={styles.centreGroupLabel}>{group.label}</h3>
              <ul className={styles.centreItems}>
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className={[
                      styles.centreItem,
                      item.read ? styles.centreItemRead : styles.centreItemUnread,
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      className={styles.centreItemBtn}
                      onClick={() => onItemClick?.(item.id)}
                    >
                      <span
                        className={[styles.centreTag, TONE_TAG_CLASS[item.tone]].join(" ")}
                        aria-label={`${TONE_LABEL[item.tone]} priority`}
                      >
                        {TONE_LABEL[item.tone]}
                      </span>
                      <span className={styles.centreItemBody}>
                        <span className={styles.centreItemTitle}>{item.title}</span>
                        <span className={styles.centreItemText}>{item.body}</span>
                        <span className={styles.centreItemMeta}>
                          <time dateTime={item.receivedAtISO}>
                            {item.receivedAtISO.slice(11, 16)}
                          </time>
                          <span>·</span>
                          <span>{item.channel}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </aside>
  )
}

export default NotificationCenterPanel
