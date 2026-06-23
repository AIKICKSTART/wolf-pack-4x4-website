"use client"

import { useMemo, useState } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { SlaTimerChip } from "../support/sla-timer-chip"

import styles from "./chat-queue-inbox.module.css"
import {
  QUEUE_RISK_LABEL,
  QUEUE_RISK_TONE,
  riskForWaitMinutes,
  type QueueRisk,
} from "./live-chat-types"

export type QueueFilter = "mine" | "unassigned" | "at-risk"

export interface ChatQueueItem {
  id: string
  visitorName: string
  /** Short page title the visitor is on right now. */
  pageTitle: string
  /** Short preview of the visitor's first message. */
  preview: string
  /** Minutes waiting until SLA breach. Negative = breached. */
  waitMinutes: number
  /** Whether this chat is currently assigned to the viewing operator. */
  mine?: boolean
  /** Whether the chat is unassigned (in the open queue). */
  unassigned?: boolean
  /** Override the auto-computed risk bucket. */
  risk?: QueueRisk
}

export interface ChatQueueInboxProps {
  items: ReadonlyArray<ChatQueueItem>
  activeId?: string
  defaultFilter?: QueueFilter
  onSelect?: (id: string) => void
  className?: string
}

interface FilterOption {
  id: QueueFilter
  label: string
}

const FILTERS: ReadonlyArray<FilterOption> = [
  { id: "mine", label: "Mine" },
  { id: "unassigned", label: "Unassigned" },
  { id: "at-risk", label: "At risk" },
]

function applyFilter(
  items: ReadonlyArray<ChatQueueItem>,
  filter: QueueFilter,
): ReadonlyArray<ChatQueueItem> {
  return items.filter((item) => {
    switch (filter) {
      case "mine":
        return Boolean(item.mine)
      case "unassigned":
        return Boolean(item.unassigned)
      case "at-risk": {
        const risk = item.risk ?? riskForWaitMinutes(item.waitMinutes)
        return risk === "at-risk" || risk === "breached"
      }
      default:
        return true
    }
  })
}

function formatWait(minutes: number): string {
  if (minutes <= 0) {
    return `${Math.abs(minutes)}m over`
  }
  if (minutes < 1) {
    return "now"
  }
  return `${minutes}m`
}

export function ChatQueueInbox({
  items,
  activeId,
  defaultFilter = "mine",
  onSelect,
  className,
}: ChatQueueInboxProps) {
  const [filter, setFilter] = useState<QueueFilter>(defaultFilter)
  const visible = useMemo(() => applyFilter(items, filter), [items, filter])
  const totalDepth = items.length

  const classes = [styles.queue, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Live chat queue"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Queue</span>
        <h3 className={styles.heading}>
          Pending chats
          <span className={styles.depth}>
            <span aria-hidden="true">●</span>
            <span>{totalDepth} live</span>
          </span>
        </h3>
      </header>

      <div
        className={styles.filterRow}
        role="tablist"
        aria-label="Queue filter"
      >
        {FILTERS.map((option) => (
          <Chip
            key={option.id}
            label={option.label}
            selected={filter === option.id}
            onSelect={() => setFilter(option.id)}
            tone={option.id === "at-risk" ? "red" : "neutral"}
          />
        ))}
      </div>

      <ul className={styles.list} aria-label="Pending chats list">
        {visible.length === 0 ? (
          <li className={styles.empty}>Queue clear — nothing to pick up.</li>
        ) : (
          visible.map((item) => {
            const risk = item.risk ?? riskForWaitMinutes(item.waitMinutes)
            const tone = QUEUE_RISK_TONE[risk]
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={[
                    styles.row,
                    isActive ? styles.rowActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onSelect?.(item.id)}
                >
                  <Avatar
                    name={item.visitorName}
                    size="md"
                    tone={
                      tone === "red"
                        ? "red"
                        : tone === "amber"
                          ? "amber"
                          : "teal"
                    }
                  />
                  <span className={styles.body}>
                    <span className={styles.topline}>
                      <strong className={styles.name}>{item.visitorName}</strong>
                      <span className={styles.wait}>
                        {formatWait(item.waitMinutes)}
                      </span>
                    </span>
                    <span className={styles.subline}>
                      <span className={styles.page}>{item.pageTitle}</span>
                    </span>
                    <span className={styles.preview}>{item.preview}</span>
                  </span>
                  <SlaTimerChip
                    remainingMinutes={item.waitMinutes}
                    label={QUEUE_RISK_LABEL[risk]}
                  />
                </button>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}

export default ChatQueueInbox
