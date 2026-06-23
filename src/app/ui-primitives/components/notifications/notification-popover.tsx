"use client"

import autoAnimate from "@formkit/auto-animate"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"

import styles from "./notification-popover.module.css"

export type NotificationPopoverTone = "info" | "success" | "warn" | "error" | "system"
export type NotificationPopoverFilter = "all" | "unread" | "mentions"

export interface NotificationPopoverItem {
  id: string
  title: string
  sub?: string
  timestamp: string
  source?: string
  tone?: NotificationPopoverTone
  icon?: ReactNode
  unread?: boolean
  mention?: boolean
  href?: string
}

interface NotificationPopoverProps {
  items: ReadonlyArray<NotificationPopoverItem>
  defaultFilter?: NotificationPopoverFilter
  onItemClick?: (id: string) => void
  onMarkAllRead?: () => void
  viewAllHref: string
  className?: string
}

const TAB_LABEL: Record<NotificationPopoverFilter, string> = {
  all: "All",
  unread: "Unread",
  mentions: "Mentions",
}

const TAB_ORDER: ReadonlyArray<NotificationPopoverFilter> = ["all", "unread", "mentions"]

function reducedMotionEnabled(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function NotificationPopover({
  items,
  defaultFilter = "all",
  onItemClick,
  onMarkAllRead,
  viewAllHref,
  className,
}: NotificationPopoverProps) {
  const [filter, setFilter] = useState<NotificationPopoverFilter>(defaultFilter)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const node = listRef.current
    if (!node || reducedMotionEnabled()) return
    autoAnimate(node, { duration: 200, easing: "ease-out" })
  }, [])

  const counts = useMemo(
    () => ({
      all: items.length,
      unread: items.filter((item) => item.unread).length,
      mentions: items.filter((item) => item.mention).length,
    }),
    [items],
  )

  const filtered = useMemo(() => {
    if (filter === "unread") return items.filter((item) => item.unread)
    if (filter === "mentions") return items.filter((item) => item.mention)
    return items
  }, [items, filter])

  const visible = filtered.slice(0, 6)
  const classes = [styles.popover, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="dialog"
      aria-label="Recent notifications"
    >
      <header className={styles.head}>
        <h2 className={styles.title}>Notifications</h2>
        <button
          type="button"
          className={styles.markAll}
          onClick={onMarkAllRead}
          disabled={counts.unread === 0}
        >
          Mark all read
        </button>
      </header>

      <div className={styles.tabs} role="tablist">
        {TAB_ORDER.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filter === tab}
            className={styles.tab}
            onClick={() => setFilter(tab)}
          >
            {TAB_LABEL[tab]}
            <span className={styles.tabCount}>{counts[tab]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>You&apos;re all caught up</p>
      ) : (
        <ul className={styles.list} ref={listRef}>
          {visible.map((item) => (
            <li key={item.id} className={styles.item}>
              <span
                className={styles.itemIcon}
                data-tone={item.tone ?? "info"}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <div className={styles.itemBody}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={styles.itemTitle}
                    onClick={() => onItemClick?.(item.id)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={styles.itemTitle}
                    onClick={() => onItemClick?.(item.id)}
                  >
                    {item.title}
                  </button>
                )}
                {item.sub && <p className={styles.itemSub}>{item.sub}</p>}
                <div className={styles.itemMeta}>
                  <time>{item.timestamp}</time>
                  {item.source && <span>{item.source}</span>}
                </div>
              </div>
              {item.unread && (
                <span className={styles.unreadDot} aria-label="Unread" />
              )}
            </li>
          ))}
        </ul>
      )}

      <footer className={styles.foot}>
        <span>
          {counts.unread} unread / {counts.all} total
        </span>
        <Link href={viewAllHref} className={styles.viewAll}>
          See all
        </Link>
      </footer>
    </section>
  )
}

export default NotificationPopover
