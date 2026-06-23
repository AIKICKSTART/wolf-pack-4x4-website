"use client"

import { Search } from "lucide-react"
import {
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./conversation-list-rail.module.css"
import type {
  Conversation,
  ConversationFilter,
} from "./inbox-types"

interface ConversationListRailProps {
  conversations: ReadonlyArray<Conversation>
  /** Currently selected conversation id. */
  activeId?: string
  /** Optional default filter when uncontrolled. */
  defaultFilter?: ConversationFilter
  /** Selection callback. */
  onSelect?: (id: string) => void
  /** Header label, defaults to "Inbox". */
  heading?: string
  className?: string
}

interface FilterDescriptor {
  id: ConversationFilter
  label: string
}

const FILTERS: ReadonlyArray<FilterDescriptor> = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "mentions", label: "Mentions" },
  { id: "customers", label: "Customers" },
  { id: "team", label: "Team" },
]

function applyFilter(
  conversations: ReadonlyArray<Conversation>,
  filter: ConversationFilter,
  query: string,
): ReadonlyArray<Conversation> {
  const normalized = query.trim().toLowerCase()
  return conversations.filter((conversation) => {
    if (normalized.length > 0) {
      const haystack = `${conversation.participant.name} ${conversation.lastMessagePreview}`
        .toLowerCase()
      if (!haystack.includes(normalized)) {
        return false
      }
    }
    switch (filter) {
      case "unread":
        return (conversation.unreadCount ?? 0) > 0
      case "mentions":
        return Boolean(conversation.hasMention)
      case "customers":
        return conversation.participant.kind === "customer"
      case "team":
        return conversation.participant.kind !== "customer"
      case "all":
      default:
        return true
    }
  })
}

export function ConversationListRail({
  conversations,
  activeId,
  defaultFilter = "all",
  onSelect,
  heading = "Inbox",
  className,
}: ConversationListRailProps) {
  const [filter, setFilter] = useState<ConversationFilter>(defaultFilter)
  const [query, setQuery] = useState<string>("")
  const searchId = useId()
  const listLabelId = useId()

  const visible = useMemo(
    () => applyFilter(conversations, filter, query),
    [conversations, filter, query],
  )

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSelect = (id: string) => {
    onSelect?.(id)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleSelect(id)
    }
  }

  const classes = [styles.rail, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label={heading}>
      <header className={styles.head}>
        <span className={styles.kicker}>Inbox</span>
        <h2 className={styles.heading}>{heading}</h2>
      </header>

      <div className={styles.searchRow}>
        <label htmlFor={searchId} className={styles.srOnly}>
          Search conversations
        </label>
        <Search size={14} strokeWidth={2.3} aria-hidden="true" />
        <input
          id={searchId}
          className={styles.searchInput}
          type="search"
          placeholder="Search conversations"
          autoComplete="off"
          value={query}
          onChange={handleQuery}
        />
      </div>

      <div
        role="tablist"
        aria-label="Filter conversations"
        className={styles.filterRow}
      >
        {FILTERS.map((option) => {
          const selected = filter === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={[
                styles.filterChip,
                selected ? styles.filterChipActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <span id={listLabelId} className={styles.srOnly}>
        {visible.length} conversations
      </span>

      <ul className={styles.list} aria-labelledby={listLabelId}>
        {visible.length === 0 ? (
          <li className={styles.empty}>No conversations match.</li>
        ) : (
          visible.map((conversation) => {
            const isActive =
              activeId === conversation.id || Boolean(conversation.active)
            return (
              <li key={conversation.id}>
                <button
                  type="button"
                  className={[
                    styles.row,
                    isActive ? styles.rowActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => handleSelect(conversation.id)}
                  onKeyDown={(event) => handleKeyDown(event, conversation.id)}
                >
                  <Avatar
                    name={conversation.participant.name}
                    src={conversation.participant.avatar}
                    size="md"
                    status={conversation.participant.presence}
                    tone={conversation.isCustomer ? "amber" : "red"}
                  />
                  <span className={styles.rowBody}>
                    <span className={styles.rowTopline}>
                      <strong className={styles.name}>
                        {conversation.participant.name}
                      </strong>
                      <time className={styles.timestamp}>
                        {conversation.lastMessageAt}
                      </time>
                    </span>
                    <span className={styles.rowSubline}>
                      <span className={styles.preview}>
                        {conversation.lastMessagePreview}
                      </span>
                      {conversation.unreadCount &&
                      conversation.unreadCount > 0 ? (
                        <span
                          className={styles.unreadBadge}
                          aria-label={`${conversation.unreadCount} unread`}
                        >
                          {conversation.unreadCount > 99
                            ? "99+"
                            : conversation.unreadCount}
                        </span>
                      ) : null}
                    </span>
                  </span>
                </button>
              </li>
            )
          })
        )}
      </ul>
    </aside>
  )
}

export default ConversationListRail
