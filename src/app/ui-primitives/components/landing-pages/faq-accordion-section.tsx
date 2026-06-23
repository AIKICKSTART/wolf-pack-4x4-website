"use client"

import { Plus, Search } from "lucide-react"
import { useId, useMemo, useState } from "react"

import type { LandingFaqEntry } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface FaqAccordionSectionProps {
  kicker?: string
  heading: string
  body?: string
  entries: ReadonlyArray<LandingFaqEntry>
  /** Show the search filter input. Defaults to true. */
  searchable?: boolean
  className?: string
}

function normalise(value: string): string {
  return value.toLowerCase().trim()
}

function matches(entry: LandingFaqEntry, query: string): boolean {
  if (!query) return true
  const haystack = [entry.question, entry.answer, ...(entry.tags ?? [])]
    .join(" ")
    .toLowerCase()
  return haystack.includes(query)
}

/**
 * Primitive 08 — FAQ accordion with optional search filter. Single-open
 * behaviour so the panel never feels noisy. Filter input narrows entries by
 * question + answer + tag membership.
 */
export function FaqAccordionSection({
  kicker,
  heading,
  body,
  entries,
  searchable = true,
  className,
}: FaqAccordionSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const searchId = useId()

  const filtered = useMemo(() => {
    const needle = normalise(query)
    if (!needle) return entries
    return entries.filter((entry) => matches(entry, needle))
  }, [entries, query])

  const sectionClasses = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={sectionClasses} aria-labelledby="faq-heading">
      <header className={styles.sectionHeader}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 id="faq-heading" className={styles.heading}>
          {heading}
        </h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </header>

      <div className={styles.faq}>
        {searchable ? (
          <label className={styles.faqSearch} htmlFor={searchId}>
            <Search size={16} aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              className={styles.faqSearchInput}
              placeholder="Search the workshop FAQ"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              aria-label="Search frequently asked questions"
            />
            <span className={styles.faqSearchHint} aria-hidden="true">
              {filtered.length} of {entries.length}
            </span>
          </label>
        ) : null}

        {filtered.length === 0 ? (
          <p className={styles.faqEmpty} role="status">
            No questions match — try a shorter keyword.
          </p>
        ) : (
          <ul className={styles.faqList}>
            {filtered.map((entry) => {
              const open = openId === entry.id
              const panelId = `faq-panel-${entry.id}`
              const buttonId = `faq-trigger-${entry.id}`
              return (
                <li key={entry.id} className={styles.faqItem}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.faqQuestion}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : entry.id)}
                  >
                    <span>{entry.question}</span>
                    <span className={styles.faqQuestionIcon} aria-hidden="true">
                      <Plus size={14} strokeWidth={2.2} />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className={styles.faqPanel}
                  >
                    <p>{entry.answer}</p>
                    {entry.tags && entry.tags.length > 0 ? (
                      <div className={styles.faqTags} aria-label="Tags">
                        {entry.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export default FaqAccordionSection
