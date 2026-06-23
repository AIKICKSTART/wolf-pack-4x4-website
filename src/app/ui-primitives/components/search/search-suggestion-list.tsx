"use client"

import { ArrowUpRight, Clock, History, Sparkles, TrendingUp } from "lucide-react"
import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react"

import styles from "./search-suggestion-list.module.css"

export type SuggestionGroupKind = "recent" | "popular" | "links" | "custom"

export interface SuggestionItem {
  id: string
  label: string
  meta?: string
  href?: string
  icon?: ReactNode
}

export interface SuggestionGroup {
  id: string
  heading: string
  kind: SuggestionGroupKind
  items: ReadonlyArray<SuggestionItem>
}

interface SearchSuggestionListProps {
  groups: ReadonlyArray<SuggestionGroup>
  onSelect?: (item: SuggestionItem, group: SuggestionGroup) => void
  emptyMessage?: string
  ariaLabel?: string
  className?: string
}

const GROUP_ICON: Record<SuggestionGroupKind, ReactNode> = {
  recent: <History size={11} strokeWidth={2.4} aria-hidden="true" />,
  popular: <TrendingUp size={11} strokeWidth={2.4} aria-hidden="true" />,
  links: <Sparkles size={11} strokeWidth={2.4} aria-hidden="true" />,
  custom: <Clock size={11} strokeWidth={2.4} aria-hidden="true" />,
}

export function SearchSuggestionList({
  groups,
  onSelect,
  emptyMessage = "Start typing to see suggestions.",
  ariaLabel = "Search suggestions",
  className,
}: SearchSuggestionListProps) {
  const flat = groups.flatMap((g) => g.items.map((item) => ({ item, group: g })))
  const [rawActiveIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const listboxId = useId()
  const optionIdPrefix = useId()

  // Clamp the active index against the current flat list so it auto-corrects
  // when groups change without triggering an effect-driven setState loop.
  const activeIndex = flat.length === 0
    ? -1
    : Math.min(Math.max(0, rawActiveIndex), flat.length - 1)

  const handleSelect = useCallback(
    (index: number) => {
      const entry = flat[index]
      if (!entry) return
      onSelect?.(entry.item, entry.group)
    },
    [flat, onSelect],
  )

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (flat.length === 0) return
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % flat.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + flat.length) % flat.length)
    } else if (event.key === "Home") {
      event.preventDefault()
      setActiveIndex(0)
    } else if (event.key === "End") {
      event.preventDefault()
      setActiveIndex(flat.length - 1)
    } else if (event.key === "Enter") {
      event.preventDefault()
      handleSelect(activeIndex)
    }
  }

  const handleHover = (event: MouseEvent<HTMLLIElement>) => {
    const index = Number(event.currentTarget.dataset.index)
    if (Number.isFinite(index)) {
      setActiveIndex(index)
    }
  }

  const classes = [styles.surface, className].filter(Boolean).join(" ")
  const isEmpty = flat.length === 0
  const activeId =
    activeIndex >= 0 && activeIndex < flat.length
      ? `${optionIdPrefix}-${activeIndex}`
      : undefined

  return (
    <div
      ref={containerRef}
      className={classes}
      role="presentation"
      onKeyDown={handleKey}
      tabIndex={isEmpty ? undefined : 0}
    >
      {isEmpty ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          aria-activedescendant={activeId}
          className={styles.list}
        >
          {groups.map((group) => (
            <li key={group.id} className={styles.groupItem}>
              <header className={styles.groupHead}>
                <span className={styles.groupIcon} aria-hidden="true">
                  {GROUP_ICON[group.kind]}
                </span>
                <span className={styles.groupLabel}>{group.heading}</span>
              </header>
              <ul className={styles.groupList} role="group" aria-label={group.heading}>
                {group.items.map((item) => {
                  const indexInFlat = flat.findIndex(
                    (entry) => entry.item.id === item.id && entry.group.id === group.id,
                  )
                  const isActive = indexInFlat === activeIndex
                  return (
                    <li
                      key={item.id}
                      id={`${optionIdPrefix}-${indexInFlat}`}
                      role="option"
                      aria-selected={isActive}
                      data-index={indexInFlat}
                      data-active={isActive ? "true" : "false"}
                      className={styles.item}
                      onMouseMove={handleHover}
                      onClick={() => handleSelect(indexInFlat)}
                    >
                      {item.icon ? (
                        <span className={styles.itemIcon} aria-hidden="true">
                          {item.icon}
                        </span>
                      ) : (
                        <span className={styles.itemBullet} aria-hidden="true" />
                      )}
                      <span className={styles.itemBody}>
                        <span className={styles.itemLabel}>{item.label}</span>
                        {item.meta ? <span className={styles.itemMeta}>{item.meta}</span> : null}
                      </span>
                      {item.href ? (
                        <span className={styles.itemArrow} aria-hidden="true">
                          <ArrowUpRight size={14} strokeWidth={2.2} />
                        </span>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchSuggestionList
