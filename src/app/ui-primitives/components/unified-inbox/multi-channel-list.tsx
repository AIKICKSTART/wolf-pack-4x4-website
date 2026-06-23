"use client"

import { Search } from "lucide-react"
import {
  useId,
  useMemo,
  useState,
  type ChangeEvent,
} from "react"

import {
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  SENTIMENT_TONE,
  type UnifiedChannel,
  type UnifiedConversation,
} from "./unified-inbox-types"
import styles from "./multi-channel-list.module.css"

type ChannelFilter = UnifiedChannel | "all"

interface ChannelFilterDescriptor {
  id: ChannelFilter
  label: string
}

const FILTERS: ReadonlyArray<ChannelFilterDescriptor> = [
  { id: "all", label: "All channels" },
  { id: "sms", label: CHANNEL_LABEL.sms },
  { id: "facebook", label: CHANNEL_LABEL.facebook },
  { id: "instagram", label: CHANNEL_LABEL.instagram },
  { id: "email", label: CHANNEL_LABEL.email },
  { id: "web", label: CHANNEL_LABEL.web },
]

interface MultiChannelListProps {
  conversations: ReadonlyArray<UnifiedConversation>
  /** Currently selected conversation id. */
  activeId?: string
  /** Selection callback. */
  onSelect?: (id: string) => void
  /** Optional default filter when uncontrolled. */
  defaultFilter?: ChannelFilter
  /** Heading label. Defaults to "Unified inbox". */
  heading?: string
  className?: string
}

function applyChannelFilter(
  conversations: ReadonlyArray<UnifiedConversation>,
  filter: ChannelFilter,
  query: string,
): ReadonlyArray<UnifiedConversation> {
  const normalized = query.trim().toLowerCase()
  return conversations.filter((conversation) => {
    if (filter !== "all" && conversation.channel !== filter) {
      return false
    }
    if (normalized.length > 0) {
      const haystack =
        `${conversation.customerName} ${conversation.subject} ${conversation.preview}`.toLowerCase()
      if (!haystack.includes(normalized)) {
        return false
      }
    }
    return true
  })
}

export function MultiChannelList({
  conversations,
  activeId,
  onSelect,
  defaultFilter = "all",
  heading = "Unified inbox",
  className,
}: MultiChannelListProps) {
  const [filter, setFilter] = useState<ChannelFilter>(defaultFilter)
  const [query, setQuery] = useState<string>("")
  const searchId = useId()
  const listLabelId = useId()

  const visible = useMemo(
    () => applyChannelFilter(conversations, filter, query),
    [conversations, filter, query],
  )

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const classes = [styles.rail, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label={heading}>
      <header className={styles.head}>
        <span className={styles.kicker}>Unified</span>
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
          placeholder="Search across channels"
          autoComplete="off"
          value={query}
          onChange={handleQuery}
        />
      </div>

      <div
        role="tablist"
        aria-label="Filter by channel"
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
            const tone = CHANNEL_TONE[conversation.channel]
            const sentimentTone = conversation.sentiment
              ? SENTIMENT_TONE[conversation.sentiment]
              : null
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
                  onClick={() => onSelect?.(conversation.id)}
                >
                  <span
                    className={[styles.channelBadge, styles[`tone_${tone}`]]
                      .filter(Boolean)
                      .join(" ")}
                    aria-label={CHANNEL_LABEL[conversation.channel]}
                    title={CHANNEL_LABEL[conversation.channel]}
                  >
                    <span aria-hidden="true">
                      {CHANNEL_GLYPH[conversation.channel]}
                    </span>
                  </span>
                  <span className={styles.rowBody}>
                    <span className={styles.rowTopline}>
                      <strong className={styles.name}>
                        {conversation.customerName}
                      </strong>
                      <time className={styles.timestamp}>
                        {conversation.timestamp}
                      </time>
                    </span>
                    <span className={styles.subject}>
                      {conversation.subject}
                    </span>
                    <span className={styles.rowSubline}>
                      <span className={styles.preview}>
                        {conversation.preview}
                      </span>
                      <span className={styles.rowMeta}>
                        {sentimentTone ? (
                          <span
                            className={[
                              styles.sentimentDot,
                              styles[`tone_${sentimentTone}`],
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            aria-hidden="true"
                          />
                        ) : null}
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

export default MultiChannelList
