"use client"

import { Plus, X } from "lucide-react"
import { useId, type MouseEvent } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./multi-chat-tabs.module.css"

export interface MultiChatTab {
  id: string
  /** Visitor display name. */
  name: string
  /** Short context, e.g. "Hilux fitment". */
  context?: string
  /** Unread message count for this tab. */
  unread?: number
  /** Avatar src (optional). */
  avatarSrc?: string
}

interface MultiChatTabsProps {
  tabs: ReadonlyArray<MultiChatTab>
  /** Currently active tab id. */
  activeId: string
  /** Tab change callback. */
  onSelect?: (id: string) => void
  /** Close-tab callback. */
  onClose?: (id: string) => void
  /** Open-new callback. Hides the affordance when omitted. */
  onNew?: () => void
  className?: string
}

export function MultiChatTabs({
  tabs,
  activeId,
  onSelect,
  onClose,
  onNew,
  className,
}: MultiChatTabsProps) {
  const listId = useId()
  const classes = [styles.tabsRow, className].filter(Boolean).join(" ")

  const handleClose = (event: MouseEvent<HTMLSpanElement>, id: string) => {
    event.stopPropagation()
    onClose?.(id)
  }

  return (
    <div
      className={classes}
      role="tablist"
      aria-label="Active chats"
      id={listId}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${listId}-panel-${tab.id}`}
            className={[
              styles.tab,
              isActive ? styles.tabActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect?.(tab.id)}
          >
            <Avatar
              name={tab.name}
              src={tab.avatarSrc}
              size="sm"
              tone={isActive ? "red" : "teal"}
              status="online"
            />
            <span className={styles.body}>
              <span className={styles.name}>{tab.name}</span>
              {tab.context ? (
                <span className={styles.meta}>{tab.context}</span>
              ) : null}
            </span>
            <span className={styles.right}>
              {tab.unread && tab.unread > 0 ? (
                <span
                  className={styles.unreadBadge}
                  aria-label={`${tab.unread} unread`}
                >
                  {tab.unread > 9 ? "9+" : tab.unread}
                </span>
              ) : null}
              {onClose ? (
                <span
                  className={styles.closeBtn}
                  role="button"
                  tabIndex={-1}
                  aria-label={`Close chat with ${tab.name}`}
                  onClick={(e) => handleClose(e, tab.id)}
                >
                  <X size={11} strokeWidth={2.4} aria-hidden="true" />
                </span>
              ) : null}
            </span>
          </button>
        )
      })}
      {onNew ? (
        <button
          type="button"
          className={styles.newBtn}
          onClick={onNew}
          aria-label="Open new chat slot"
        >
          <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}

export default MultiChatTabs
