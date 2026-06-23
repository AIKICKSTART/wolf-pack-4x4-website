"use client"

import { AtSign } from "lucide-react"
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import styles from "./mention-picker.module.css"
import type {
  MentionTarget,
  MentionTargetKind,
  MentionToken,
} from "./comment-types"

interface MentionPickerProps {
  candidates: ReadonlyArray<MentionTarget>
  /** Label for the search input (aria + placeholder fallback). */
  searchPlaceholder?: string
  /** Called when the user selects a target. */
  onSelect?: (token: MentionToken) => void
  className?: string
}

const KIND_CLASS: Record<MentionTargetKind, string> = {
  user: styles.kindUser,
  team: styles.kindTeam,
  role: styles.kindRole,
}

const KIND_LABEL: Record<MentionTargetKind, string> = {
  user: "User",
  team: "Team",
  role: "Role",
}

export function MentionPicker({
  candidates,
  searchPlaceholder = "Mention a teammate, team, or role…",
  onSelect,
  className,
}: MentionPickerProps) {
  const [query, setQuery] = useState<string>("")
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const listRef = useRef<HTMLUListElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const titleId = useId()

  const filtered = useMemo<ReadonlyArray<MentionTarget>>(() => {
    const q = query.trim().toLowerCase()
    if (q.length === 0) {
      return candidates
    }
    return candidates.filter((target) => {
      const haystack = [target.name, target.qualifier ?? "", target.kind]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [candidates, query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSelect = (target: MentionTarget) => {
    onSelect?.({
      targetId: target.id,
      kind: target.kind,
      display: `@${target.name}`,
    })
  }

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) {
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % filtered.length)
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
      return
    }
    if (event.key === "Enter") {
      event.preventDefault()
      const target = filtered[activeIndex]
      if (target) {
        handleSelect(target)
      }
    }
  }

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="dialog"
      aria-labelledby={titleId}
    >
      <div className={styles.head}>
        <span className={styles.searchIcon} aria-hidden="true">
          <AtSign size={14} strokeWidth={2.4} />
        </span>
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setQuery(event.target.value)
            setActiveIndex(0)
          }}
          onKeyDown={handleKey}
        />
      </div>
      <span id={titleId} className={styles.empty} hidden>
        Mention picker
      </span>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No matches</p>
      ) : (
        <ul ref={listRef} className={styles.list} role="listbox">
          {filtered.map((target, index) => (
            <li key={target.id}>
              <button
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={[
                  styles.item,
                  index === activeIndex ? styles.itemActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSelect(target)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span
                  className={[styles.kindDot, KIND_CLASS[target.kind]].join(" ")}
                  aria-hidden="true"
                />
                <span className={styles.itemBody}>
                  <span className={styles.itemName}>{target.name}</span>
                  {target.qualifier ? (
                    <span className={styles.itemQualifier}>
                      {target.qualifier}
                    </span>
                  ) : null}
                </span>
                <span className={styles.kindBadge}>{KIND_LABEL[target.kind]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MentionPicker
