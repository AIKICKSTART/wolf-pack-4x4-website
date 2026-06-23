"use client"

import { useMemo, useState } from "react"

import styles from "./thread-side-panel.module.css"
import type { CommentThreadRecord } from "./comment-types"

export type ThreadFilter = "open" | "resolved" | "me"

interface ThreadSidePanelProps {
  threads: ReadonlyArray<CommentThreadRecord>
  /** Initial filter selection. Defaults to "open". */
  defaultFilter?: ThreadFilter
  /** Initial selected thread id. */
  defaultSelectedId?: string
  /** Kicker label rendered above the panel title. */
  kicker?: string
  /** Panel title. */
  title?: string
  onSelect?: (thread: CommentThreadRecord) => void
  onFilterChange?: (filter: ThreadFilter) => void
  className?: string
}

const FILTER_LABELS: Record<ThreadFilter, string> = {
  open: "Open",
  resolved: "Resolved",
  me: "@me",
}

const FILTERS: ReadonlyArray<ThreadFilter> = ["open", "resolved", "me"]

export function ThreadSidePanel({
  threads,
  defaultFilter = "open",
  defaultSelectedId,
  kicker = "Threads",
  title = "Workshop comments",
  onSelect,
  onFilterChange,
  className,
}: ThreadSidePanelProps) {
  const [filter, setFilter] = useState<ThreadFilter>(defaultFilter)
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultSelectedId,
  )

  const filtered = useMemo<ReadonlyArray<CommentThreadRecord>>(() => {
    if (filter === "open") {
      return threads.filter((thread) => thread.status !== "resolved")
    }
    if (filter === "resolved") {
      return threads.filter((thread) => thread.status === "resolved")
    }
    return threads.filter((thread) => Boolean(thread.hasMention))
  }, [filter, threads])

  const handleFilter = (next: ThreadFilter) => {
    setFilter(next)
    onFilterChange?.(next)
  }

  const handleSelect = (thread: CommentThreadRecord) => {
    setSelectedId(thread.id)
    onSelect?.(thread)
  }

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      role="region"
      aria-label="Thread side panel"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title}>{title}</h2>
      </header>

      <div className={styles.filters} role="tablist" aria-label="Thread filter">
        {FILTERS.map((value) => {
          const isActive = filter === value
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                styles.filter,
                isActive ? styles.filterActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleFilter(value)}
            >
              {FILTER_LABELS[value]}
            </button>
          )
        })}
      </div>

      <ul className={styles.list}>
        {filtered.map((thread) => {
          const selected = selectedId === thread.id
          return (
            <li key={thread.id}>
              <button
                type="button"
                className={[
                  styles.thread,
                  selected ? styles.threadSelected : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSelect(thread)}
                {...(selected ? { "aria-current": "true" as const } : {})}
              >
                <div className={styles.threadHead}>
                  {typeof thread.pinNumber === "number" ? (
                    <span
                      className={[
                        styles.threadPin,
                        thread.status === "resolved"
                          ? styles.threadPinResolved
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden="true"
                    >
                      {thread.pinNumber}
                    </span>
                  ) : null}
                  <span className={styles.threadTitle}>{thread.title}</span>
                  {thread.hasMention ? (
                    <span className={styles.threadMention}>@you</span>
                  ) : null}
                </div>
                <p className={styles.threadExcerpt}>{thread.excerpt}</p>
                <div className={styles.threadMeta}>
                  <span>
                    {thread.author.name} · {thread.timestamp}
                  </span>
                  <span>
                    {thread.replyCount}{" "}
                    {thread.replyCount === 1 ? "reply" : "replies"}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default ThreadSidePanel
