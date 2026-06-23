"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"

import { Kbd } from "../primitives/kbd"

import styles from "./doc-search-bar.module.css"

export interface DocSearchSuggestion {
  label: string
  href: string
  category?: string
}

export interface DocSearchCategory {
  id: string
  label: string
}

interface DocSearchBarProps {
  placeholder?: string
  recent?: ReadonlyArray<DocSearchSuggestion>
  popular?: ReadonlyArray<DocSearchSuggestion>
  categories?: ReadonlyArray<DocSearchCategory>
  onSearch?: (query: string, categoryId: string | null) => void
}

export function DocSearchBar({
  placeholder = "Search docs… (press / to focus)",
  recent = [],
  popular = [],
  categories = [],
  onSearch,
}: DocSearchBarProps) {
  const [query, setQuery] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listId = useId()

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target?.getAttribute("contenteditable") === "true")
      if (event.key === "/" && !isTyping) {
        event.preventDefault()
        inputRef.current?.focus()
      }
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (onSearch) {
        onSearch(query.trim(), activeCategory)
      }
    },
    [query, activeCategory, onSearch],
  )

  return (
    <div className={styles.bar} role="search">
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 140)}
          aria-keyshortcuts="/"
          aria-controls={listId}
        />
        <span className={styles.shortcut} aria-hidden="true">
          <Kbd size="sm">/</Kbd>
        </span>
      </form>

      {categories.length > 0 && (
        <div className={styles.categoryRow} role="group" aria-label="Search categories">
          <button
            type="button"
            className={[styles.category, activeCategory === null ? styles.categoryActive : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={[
                styles.category,
                activeCategory === category.id ? styles.categoryActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {open && (recent.length > 0 || popular.length > 0) && (
        <div id={listId} className={styles.panel}>
          {recent.length > 0 && (
            <section className={styles.panelGroup}>
              <h4 className={styles.panelTitle}>Recent searches</h4>
              <ul className={styles.suggestionList}>
                {recent.map((suggestion) => (
                  <li key={`recent-${suggestion.label}`}>
                    <a className={styles.suggestion} href={suggestion.href}>
                      <span aria-hidden="true">◷</span>
                      <span>{suggestion.label}</span>
                      {suggestion.category && (
                        <span className={styles.suggestionCategory}>{suggestion.category}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {popular.length > 0 && (
            <section className={styles.panelGroup}>
              <h4 className={styles.panelTitle}>Popular</h4>
              <ul className={styles.suggestionList}>
                {popular.map((suggestion) => (
                  <li key={`popular-${suggestion.label}`}>
                    <a className={styles.suggestion} href={suggestion.href}>
                      <span aria-hidden="true">★</span>
                      <span>{suggestion.label}</span>
                      {suggestion.category && (
                        <span className={styles.suggestionCategory}>{suggestion.category}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default DocSearchBar
