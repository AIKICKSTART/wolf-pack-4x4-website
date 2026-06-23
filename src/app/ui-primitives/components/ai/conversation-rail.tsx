"use client"

import { MessageSquarePlus, MessagesSquare } from "lucide-react"
import { useMemo, useState } from "react"

import styles from "./conversation-rail.module.css"

export type ConversationGroup = "today" | "yesterday" | "week" | "older"

export interface ConversationEntry {
  id: string
  title: string
  preview?: string
  timestamp: string
  group: ConversationGroup
}

interface ConversationRailProps {
  conversations: ReadonlyArray<ConversationEntry>
  activeId?: string
  onSelect?: (id: string) => void
  onNewChat?: () => void
  className?: string
}

const GROUP_TITLE: Record<ConversationGroup, string> = {
  today: "Today",
  yesterday: "Yesterday",
  week: "Last 7 days",
  older: "Older",
}

const GROUP_ORDER: ReadonlyArray<ConversationGroup> = ["today", "yesterday", "week", "older"]

export function ConversationRail({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  className,
}: ConversationRailProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const grouped = useMemo(() => {
    const map = new Map<ConversationGroup, ConversationEntry[]>()
    for (const group of GROUP_ORDER) {
      map.set(group, [])
    }
    for (const conv of conversations) {
      map.get(conv.group)?.push(conv)
    }
    return map
  }, [conversations])

  const classes = [styles.rail, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label="Past conversations">
      <header className={styles.head}>
        <span className={styles.heading}>
          <MessagesSquare size={14} strokeWidth={2.2} aria-hidden="true" />
          Conversations
        </span>
        <button type="button" className={styles.newBtn} onClick={onNewChat}>
          <MessageSquarePlus size={13} strokeWidth={2.4} aria-hidden="true" />
          <span>New chat</span>
        </button>
      </header>

      <nav className={styles.scroller} aria-label="Conversation list">
        {GROUP_ORDER.map((group) => {
          const items = grouped.get(group) ?? []
          if (items.length === 0) {
            return null
          }
          return (
            <section key={group} className={styles.group}>
              <h3 className={styles.groupTitle}>{GROUP_TITLE[group]}</h3>
              <ul className={styles.list}>
                {items.map((conv) => {
                  const isActive = conv.id === activeId
                  const showPreview = hoveredId === conv.id && conv.preview
                  return (
                    <li key={conv.id}>
                      <button
                        type="button"
                        className={styles.item}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onSelect?.(conv.id)}
                        onMouseEnter={() => setHoveredId(conv.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(conv.id)}
                        onBlur={() => setHoveredId(null)}
                      >
                        <span className={styles.title}>{conv.title}</span>
                        {showPreview && <span className={styles.preview}>{conv.preview}</span>}
                        <span className={styles.time}>{conv.timestamp}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </nav>
    </aside>
  )
}

export default ConversationRail
