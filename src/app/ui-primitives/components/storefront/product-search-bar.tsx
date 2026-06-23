"use client"

import { ArrowUpRight, Clock, Flame, Search, X } from "lucide-react"
import { useMemo, useRef, useState, type KeyboardEvent } from "react"

import type { SearchSuggestion } from "./storefront-types"
import styles from "./product-search-bar.module.css"

interface ProductSearchBarProps {
  suggestions?: ReadonlyArray<SearchSuggestion>
  trending?: ReadonlyArray<SearchSuggestion>
  recent?: ReadonlyArray<string>
  placeholder?: string
  onSelect?: (suggestion: SearchSuggestion) => void
  onSubmit?: (query: string) => void
  onClearRecent?: () => void
  ariaLabel?: string
}

const KIND_LABEL: Record<SearchSuggestion["kind"], string> = {
  product: "Part",
  category: "Category",
  fitment: "Vehicle",
  rego: "Rego",
}

export function ProductSearchBar({
  suggestions,
  trending,
  recent,
  placeholder = "Search parts, brands, or fitment — VF SS, Hilux N80, Falcon GT",
  onSelect,
  onSubmit,
  onClearRecent,
  ariaLabel = "Search parts",
}: ProductSearchBarProps) {
  const [query, setQuery] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo<ReadonlyArray<SearchSuggestion>>(() => {
    if (!suggestions) {
      return []
    }
    const q = query.trim().toLowerCase()
    if (q.length === 0) {
      return []
    }
    return suggestions
      .filter((entry) =>
        entry.label.toLowerCase().includes(q) ||
        (entry.meta?.toLowerCase().includes(q) ?? false),
      )
      .slice(0, 8)
  }, [suggestions, query])

  const showTrending = query.trim().length === 0 && (trending?.length ?? 0) > 0
  const showRecent = query.trim().length === 0 && (recent?.length ?? 0) > 0

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setActiveIndex(-1)
  }

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false)
      inputRef.current?.blur()
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % Math.max(filtered.length, 1))
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1))
      return
    }
    if (event.key === "Enter") {
      event.preventDefault()
      if (activeIndex >= 0 && filtered[activeIndex]) {
        onSelect?.(filtered[activeIndex])
        return
      }
      const trimmed = query.trim()
      if (trimmed.length > 0) {
        onSubmit?.(trimmed)
      }
    }
  }

  return (
    <div className={styles.bar} role="search" aria-label={ariaLabel}>
      <div
        className={styles.field}
        data-open={open ? "true" : "false"}
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="psb-results"
        aria-expanded={open}
      >
        <Search size={16} aria-hidden="true" className={styles.fieldIcon} />
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 140)}
          onKeyDown={handleKey}
          aria-autocomplete="list"
          aria-controls="psb-results"
          aria-activedescendant={
            activeIndex >= 0 && filtered[activeIndex]
              ? `psb-opt-${filtered[activeIndex].id}`
              : undefined
          }
        />
        {query.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              handleQueryChange("")
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
        <kbd className={styles.kbd}>⌘K</kbd>
      </div>

      {open && (
        <div id="psb-results" className={styles.results} role="listbox">
          {filtered.length > 0 && (
            <section>
              <header className={styles.resultsHead}>Suggestions</header>
              <ul className={styles.optList}>
                {filtered.map((suggestion, idx) => (
                  <li
                    key={suggestion.id}
                    id={`psb-opt-${suggestion.id}`}
                    role="option"
                    aria-selected={idx === activeIndex}
                  >
                    <button
                      type="button"
                      className={`${styles.optBtn} ${idx === activeIndex ? styles.optActive : ""}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => onSelect?.(suggestion)}
                    >
                      <span className={styles.optKind}>{KIND_LABEL[suggestion.kind]}</span>
                      <span className={styles.optLabel}>{suggestion.label}</span>
                      {suggestion.meta && (
                        <span className={styles.optMeta}>{suggestion.meta}</span>
                      )}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {showTrending && (
            <section>
              <header className={styles.resultsHead}>
                <Flame size={12} aria-hidden="true" /> Trending now
              </header>
              <ul className={styles.optList}>
                {trending?.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      className={styles.optBtn}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => onSelect?.(suggestion)}
                    >
                      <span className={styles.optKind}>{KIND_LABEL[suggestion.kind]}</span>
                      <span className={styles.optLabel}>{suggestion.label}</span>
                      {suggestion.meta && (
                        <span className={styles.optMeta}>{suggestion.meta}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {showRecent && (
            <section>
              <header className={styles.resultsHead}>
                <span>
                  <Clock size={12} aria-hidden="true" /> Recent
                </span>
                {onClearRecent && (
                  <button
                    type="button"
                    className={styles.clearLink}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={onClearRecent}
                  >
                    Clear
                  </button>
                )}
              </header>
              <ul className={styles.recentList}>
                {recent?.map((entry) => (
                  <li key={entry}>
                    <button
                      type="button"
                      className={styles.recentBtn}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setQuery(entry)
                        onSubmit?.(entry)
                      }}
                    >
                      {entry}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {filtered.length === 0 && !showTrending && !showRecent && query.length > 0 && (
            <p className={styles.emptyResults}>No matches yet — try a SKU, fitment or rego.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductSearchBar
