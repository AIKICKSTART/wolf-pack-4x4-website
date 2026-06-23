"use client"

import Link from "next/link"
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import type {
  DocsSearchGroup,
  DocsSearchGroupKind,
  DocsSearchHit,
} from "./docs-suite-types"

import styles from "./docs-search-modal.module.css"

interface DocsSearchModalProps {
  open: boolean
  groups: ReadonlyArray<DocsSearchGroup>
  onClose: () => void
  onSelect?: (hit: DocsSearchHit) => void
  initialQuery?: string
  placeholder?: string
}

interface FlatHit {
  group: DocsSearchGroup
  hit: DocsSearchHit
}

const GROUP_KIND_FILTERS: ReadonlyArray<{ id: DocsSearchGroupKind; label: string }> = [
  { id: "manual", label: "Manual" },
  { id: "api", label: "API" },
  { id: "playbook", label: "Playbook" },
  { id: "history", label: "History" },
]

export function DocsSearchModal({
  open,
  groups,
  onClose,
  onSelect,
  initialQuery = "",
  placeholder = "Search docs, APIs, playbooks…",
}: DocsSearchModalProps) {
  const [query, setQuery] = useState<string>(initialQuery)
  const [filter, setFilter] = useState<DocsSearchGroupKind | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dialogId = useId()
  const titleId = useId()

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  const filteredGroups: ReadonlyArray<DocsSearchGroup> = useMemo(() => {
    const term = query.trim().toLowerCase()
    return groups
      .filter((group) => filter === null || group.kind === filter)
      .map((group) => {
        if (!term) {
          return group
        }
        const items = group.items.filter(
          (hit) =>
            hit.title.toLowerCase().includes(term) ||
            hit.snippet.toLowerCase().includes(term),
        )
        return { ...group, items }
      })
      .filter((group) => group.items.length > 0)
  }, [groups, query, filter])

  const flat: ReadonlyArray<FlatHit> = useMemo(() => {
    const next: FlatHit[] = []
    for (const group of filteredGroups) {
      for (const hit of group.items) {
        next.push({ group, hit })
      }
    }
    return next
  }, [filteredGroups])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setActiveIndex(0)
  }

  const handleSelect = useCallback(
    (hit: DocsSearchHit) => {
      onSelect?.(hit)
      onClose()
    },
    [onSelect, onClose],
  )

  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) {
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % flat.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + flat.length) % flat.length)
    } else if (event.key === "Enter") {
      const active = flat[activeIndex]
      if (active) {
        event.preventDefault()
        handleSelect(active.hit)
      }
    }
  }

  if (!open) {
    return null
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        id={dialogId}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-label="Docs command palette"
      >
        <header className={styles.head} role="search" aria-label="Docs search">
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            ref={inputRef}
            id={titleId}
            type="search"
            className={styles.input}
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            onKeyDown={handleInputKey}
            aria-controls={`${dialogId}-results`}
            aria-activedescendant={
              flat[activeIndex] ? `${dialogId}-hit-${flat[activeIndex].hit.id}` : undefined
            }
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.escHint} aria-hidden="true">
            <span className={styles.escKey}>Esc</span>
            close
          </span>
        </header>

        <div className={styles.filters} role="group" aria-label="Filter by surface">
          <button
            type="button"
            className={[styles.filterChip, filter === null ? styles.filterChipActive : ""]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={filter === null}
            onClick={() => setFilter(null)}
          >
            All
          </button>
          {GROUP_KIND_FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={[
                styles.filterChip,
                filter === option.id ? styles.filterChipActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          id={`${dialogId}-results`}
          className={styles.results}
          role="listbox"
          aria-label="Search results"
        >
          {filteredGroups.length === 0 ? (
            <div className={styles.empty} role="status">
              No matches yet — try Quote, Margin, Pricing
            </div>
          ) : (
            filteredGroups.map((group) => (
              <section key={group.id} className={styles.group} aria-label={group.label}>
                <header className={styles.groupHead}>
                  <span>{group.label}</span>
                  <span className={styles.groupCount}>{group.items.length}</span>
                </header>
                {group.items.map((hit) => {
                  const flatIndex = flat.findIndex(
                    (entry) => entry.hit.id === hit.id && entry.group.id === group.id,
                  )
                  const isActive = flatIndex === activeIndex
                  return (
                    <Link
                      key={hit.id}
                      id={`${dialogId}-hit-${hit.id}`}
                      href={hit.href}
                      className={[styles.hit, isActive ? styles.hitActive : ""]
                        .filter(Boolean)
                        .join(" ")}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(flatIndex)}
                      onClick={() => handleSelect(hit)}
                    >
                      <span className={styles.hitMark} aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 5h11l3 3v11H5z" strokeLinejoin="round" />
                          <path d="M9 13h6" strokeLinecap="round" />
                          <path d="M9 17h4" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className={styles.hitBody}>
                        <span className={styles.hitTitle}>{hit.title}</span>
                        <span className={styles.hitSnippet}>{hit.snippet}</span>
                      </span>
                      <span className={styles.hitSurface}>{hit.surfaceLabel}</span>
                    </Link>
                  )
                })}
              </section>
            ))
          )}
        </div>

        <footer className={styles.foot}>
          <span className={styles.footHint} aria-hidden="true">
            <span className={styles.kbd}>↑</span>
            <span className={styles.kbd}>↓</span>
            navigate
          </span>
          <span className={styles.footHint} aria-hidden="true">
            <span className={styles.kbd}>↵</span>
            open
          </span>
          <span className={styles.footHint} aria-hidden="true">
            <span className={styles.kbd}>Esc</span>
            dismiss
          </span>
        </footer>
      </div>
    </div>
  )
}

export default DocsSearchModal
