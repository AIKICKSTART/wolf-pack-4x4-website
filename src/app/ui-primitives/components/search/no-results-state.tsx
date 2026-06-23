"use client"

import { ArrowLeft, MessageSquarePlus, Search } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./no-results-state.module.css"

interface NoResultsStateProps {
  query: string
  message?: string
  suggestions?: ReadonlyArray<string>
  onSuggestion?: (suggestion: string) => void
  requestLabel?: string
  onRequest?: () => void
  backToAllHref?: string
  backToAllLabel?: string
  extra?: ReactNode
  className?: string
}

const DEFAULT_SUGGESTIONS: ReadonlyArray<string> = [
  "BA Falcon catback",
  "3-inch midpipe",
  "Magnaflow muffler",
  "Mandrel-bent J-pipe",
  "ADR compliant tip",
]

export function NoResultsState({
  query,
  message,
  suggestions = DEFAULT_SUGGESTIONS,
  onSuggestion,
  requestLabel = "Request what you searched for",
  onRequest,
  backToAllHref = "#",
  backToAllLabel = "Back to all results",
  extra,
  className,
}: NoResultsStateProps) {
  const classes = [styles.surface, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-labelledby="no-results-headline"
    >
      <span className={styles.lens} aria-hidden="true">
        <Search size={22} strokeWidth={1.6} />
      </span>
      <h2 id="no-results-headline" className={styles.headline}>
        Nothing matched <span className={styles.queryEcho}>&ldquo;{query}&rdquo;</span>
      </h2>
      <p className={styles.message}>
        {message ??
          "The workshop catalog, supplier ledger, and document store came back clean. Try a broader query, or use one of the alternative searches below."}
      </p>

      {suggestions.length > 0 ? (
        <div className={styles.suggestionBlock}>
          <span className={styles.suggestionKicker}>Try one of these</span>
          <ul className={styles.chipRow}>
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                {onSuggestion ? (
                  <button
                    type="button"
                    className={styles.chip}
                    onClick={() => onSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ) : (
                  <span className={styles.chip}>{suggestion}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <footer className={styles.footer}>
        {onRequest ? (
          <button type="button" className={styles.requestBtn} onClick={onRequest}>
            <MessageSquarePlus size={14} strokeWidth={2.4} aria-hidden="true" />
            {requestLabel}
          </button>
        ) : null}
        <a className={styles.backLink} href={backToAllHref}>
          <ArrowLeft size={12} strokeWidth={2.4} aria-hidden="true" />
          {backToAllLabel}
        </a>
      </footer>

      {extra ? <div className={styles.extra}>{extra}</div> : null}
    </section>
  )
}

export default NoResultsState
