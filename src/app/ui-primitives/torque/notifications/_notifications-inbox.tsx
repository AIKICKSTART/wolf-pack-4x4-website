"use client"

import { useCallback, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  AlertTriangle,
  CheckCheck,
  CheckCircle2,
  Info,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react"

import { NotificationCard } from "@/app/ui-primitives/components/notifications/notification-card"
import type { NotificationCardTone } from "@/app/ui-primitives/components/notifications/notification-card"
import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import { FadeIn } from "@/app/ui-primitives/components/motion/fade-in"

import {
  NOTIFICATIONS,
  NOTIFICATION_GROUPS,
  type InboxNotification,
  type NotificationGroupId,
} from "./_demo-data"
import styles from "./notifications.module.css"

type InboxFilter = "all" | "unread"

interface NotificationState {
  unread: boolean
  dismissed: boolean
}

/** A small tone → icon map so each row carries a meaningful status glyph. */
const TONE_ICON: Record<NotificationCardTone, ReactNode> = {
  info: <Info size={18} strokeWidth={2.2} aria-hidden="true" />,
  success: <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />,
  warn: <AlertTriangle size={18} strokeWidth={2.2} aria-hidden="true" />,
  error: <XCircle size={18} strokeWidth={2.2} aria-hidden="true" />,
  system: <ShieldCheck size={18} strokeWidth={2.2} aria-hidden="true" />,
}

/** A group → lane icon, used in the section heading. */
const GROUP_ICON: Record<NotificationGroupId, ReactNode> = {
  "approval-pending": <ShieldCheck size={15} strokeWidth={2.2} aria-hidden="true" />,
  system: <Info size={15} strokeWidth={2.2} aria-hidden="true" />,
  agent: <Sparkles size={15} strokeWidth={2.2} aria-hidden="true" />,
  social: <Megaphone size={15} strokeWidth={2.2} aria-hidden="true" />,
  seo: <Search size={15} strokeWidth={2.2} aria-hidden="true" />,
}

function buildInitialState(): Record<string, NotificationState> {
  const next: Record<string, NotificationState> = {}
  for (const item of NOTIFICATIONS) {
    next[item.id] = { unread: item.unread, dismissed: false }
  }
  return next
}

export function NotificationsInbox() {
  const [state, setState] = useState<Record<string, NotificationState>>(buildInitialState)
  const [filter, setFilter] = useState<InboxFilter>("all")

  const setUnread = useCallback((id: string, nextUnread: boolean) => {
    setState((prev) => ({
      ...prev,
      [id]: { ...prev[id], unread: nextUnread },
    }))
  }, [])

  const dismiss = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      [id]: { ...prev[id], dismissed: true, unread: false },
    }))
  }, [])

  const markAllRead = useCallback(() => {
    setState((prev) => {
      const next: Record<string, NotificationState> = {}
      for (const id of Object.keys(prev)) {
        next[id] = { ...prev[id], unread: false }
      }
      return next
    })
  }, [])

  const markGroupRead = useCallback((group: NotificationGroupId) => {
    setState((prev) => {
      const next = { ...prev }
      for (const item of NOTIFICATIONS) {
        if (item.group === group && !next[item.id].dismissed) {
          next[item.id] = { ...next[item.id], unread: false }
        }
      }
      return next
    })
  }, [])

  const visible = useMemo(
    () =>
      NOTIFICATIONS.filter((item) => {
        const s = state[item.id]
        if (s.dismissed) return false
        if (filter === "unread") return s.unread
        return true
      }),
    [state, filter],
  )

  const totalUnread = useMemo(
    () =>
      NOTIFICATIONS.reduce(
        (acc, item) => (state[item.id].unread && !state[item.id].dismissed ? acc + 1 : acc),
        0,
      ),
    [state],
  )

  const grouped = useMemo(
    () =>
      NOTIFICATION_GROUPS.map((meta) => {
        const items = visible.filter((item) => item.group === meta.id)
        const unread = items.reduce(
          (acc, item) => (state[item.id].unread ? acc + 1 : acc),
          0,
        )
        return { meta, items, unread }
      }).filter((g) => g.items.length > 0),
    [visible, state],
  )

  const allClear = grouped.length === 0

  return (
    <FadeIn className={styles.inbox}>
      <div className={styles.toolbar} role="toolbar" aria-label="Inbox controls">
        <div className={styles.filterGroup} role="group" aria-label="Filter notifications">
          {(["all", "unread"] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={styles.filterButton}
              data-active={filter === value ? "true" : "false"}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {value === "all" ? "All" : "Unread"}
              {value === "unread" && totalUnread > 0 && (
                <span className={styles.filterBadge}>{totalUnread}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.toolbarMeta} aria-live="polite">
          <span className={styles.toolbarCount}>{totalUnread}</span>
          <span className={styles.toolbarLabel}>unread across {NOTIFICATION_GROUPS.length} lanes</span>
        </div>

        <button
          type="button"
          className={styles.markAll}
          onClick={markAllRead}
          disabled={totalUnread === 0}
        >
          <CheckCheck size={15} strokeWidth={2.2} aria-hidden="true" />
          Mark all read
        </button>
      </div>

      {allClear ? (
        <div className={styles.empty} role="status">
          <span className={styles.emptyGlyph} aria-hidden="true">
            <CheckCheck size={26} strokeWidth={2} />
          </span>
          <p className={styles.emptyTitle}>Inbox clear</p>
          <p className={styles.emptyBody}>
            {filter === "unread"
              ? "Nothing unread — Torque has the front desk covered."
              : "You've cleared every alert. Torque will surface the next one here."}
          </p>
        </div>
      ) : (
        <div className={styles.groups}>
          {grouped.map(({ meta, items, unread }) => (
            <section
              key={meta.id}
              className={styles.group}
              aria-labelledby={`group-${meta.id}`}
            >
              <header className={styles.groupHead}>
                <div className={styles.groupHeadMain}>
                  <span className={styles.groupIcon} data-group={meta.id}>
                    {GROUP_ICON[meta.id]}
                  </span>
                  <div className={styles.groupHeadCopy}>
                    <h3 id={`group-${meta.id}`} className={styles.groupTitle}>
                      {meta.label}
                    </h3>
                    <p className={styles.groupBlurb}>{meta.blurb}</p>
                  </div>
                </div>
                <div className={styles.groupHeadAside}>
                  <StatusBadge
                    tone={meta.tone}
                    size="sm"
                    shape="pill"
                    label={unread > 0 ? `${unread} unread` : "All read"}
                  />
                  <button
                    type="button"
                    className={styles.groupMark}
                    onClick={() => markGroupRead(meta.id)}
                    disabled={unread === 0}
                  >
                    Mark lane read
                  </button>
                </div>
              </header>

              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item.id} className={styles.row}>
                    <NotificationCard
                      id={item.id}
                      tone={item.tone}
                      icon={TONE_ICON[item.tone]}
                      kicker={item.kicker}
                      title={item.title}
                      excerpt={item.excerpt}
                      timestamp={item.timestamp}
                      source={item.source}
                      unread={state[item.id].unread}
                      onToggleRead={setUnread}
                      actions={buildActions(item, dismiss)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </FadeIn>
  )
}

/**
 * Compose each row's actions: any demo CTAs from the fixture plus an always-on
 * "Dismiss" secondary action wired to local state.
 */
function buildActions(
  item: InboxNotification,
  dismiss: (id: string) => void,
): ReadonlyArray<{
  label: string
  variant?: "primary" | "secondary"
  onClick?: () => void
}> {
  const fixtureActions = (item.actions ?? []).map((action) => ({
    label: action.label,
    variant: action.variant,
  }))
  return [
    ...fixtureActions,
    { label: "Dismiss", variant: "secondary" as const, onClick: () => dismiss(item.id) },
  ]
}

export default NotificationsInbox
