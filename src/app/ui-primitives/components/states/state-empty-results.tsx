"use client"

import type { ReactNode } from "react"

import styles from "./state-empty-results.module.css"

export interface StateEmptyResultsProps {
  headline?: string
  message?: string
  query?: string
  suggestions?: ReadonlyArray<string>
  onSuggestionSelect?: (suggestion: string) => void
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_SUGGESTIONS: ReadonlyArray<string> = [
  "3-inch midpipe",
  "Redback headers",
  "Catback BA Falcon",
  "Magnaflow muffler",
  "DPF delete kit",
  "ADR-compliant tip",
]

export function StateEmptyResults({
  headline = "No fitment matched that search",
  message = "We rolled through the supplier ledger and the workshop catalog. Nothing matched. Try a broader chassis match or one of the chips below.",
  query,
  suggestions = DEFAULT_SUGGESTIONS,
  onSuggestionSelect,
  primaryAction,
  secondaryAction,
}: StateEmptyResultsProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-empty-results-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 280 220"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="erPaper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c2030" />
              <stop offset="100%" stopColor="#051018" />
            </linearGradient>
            <linearGradient id="erChrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f4f8" />
              <stop offset="60%" stopColor="#6f7783" />
              <stop offset="100%" stopColor="#1d222b" />
            </linearGradient>
          </defs>

          {/* Blueprint paper */}
          <g>
            <rect x="20" y="20" width="240" height="184" rx="6" fill="url(#erPaper)" stroke="#0a0c10" strokeWidth="2" />
            {/* grid */}
            <g stroke="var(--primitive-teal)" strokeWidth="0.5" opacity="0.32">
              <line x1="20" y1="44" x2="260" y2="44" />
              <line x1="20" y1="68" x2="260" y2="68" />
              <line x1="20" y1="92" x2="260" y2="92" />
              <line x1="20" y1="116" x2="260" y2="116" />
              <line x1="20" y1="140" x2="260" y2="140" />
              <line x1="20" y1="164" x2="260" y2="164" />
              <line x1="20" y1="188" x2="260" y2="188" />
              <line x1="44" y1="20" x2="44" y2="204" />
              <line x1="68" y1="20" x2="68" y2="204" />
              <line x1="92" y1="20" x2="92" y2="204" />
              <line x1="116" y1="20" x2="116" y2="204" />
              <line x1="140" y1="20" x2="140" y2="204" />
              <line x1="164" y1="20" x2="164" y2="204" />
              <line x1="188" y1="20" x2="188" y2="204" />
              <line x1="212" y1="20" x2="212" y2="204" />
              <line x1="236" y1="20" x2="236" y2="204" />
            </g>
            {/* technical drawing — exhaust silhouette */}
            <g stroke="var(--primitive-teal)" strokeWidth="1.4" fill="none" opacity="0.65">
              <path d="M 56 156 L 92 156 L 100 148 L 100 130 L 92 122 L 56 122 Z" />
              <path d="M 100 130 L 152 130" />
              <path d="M 100 148 L 152 148" />
              <path d="M 152 122 L 218 122 L 226 130 L 226 148 L 218 156 L 152 156 Z" />
              <circle cx="200" cy="139" r="3" />
              <text x="56" y="184" fill="var(--primitive-teal)" fontFamily="monospace" fontSize="6" opacity="0.7">
                A-A · 2.5 in OD
              </text>
              <text x="56" y="36" fill="var(--primitive-teal)" fontFamily="monospace" fontSize="7" fontWeight="700" opacity="0.7">
                FITMENT BLUEPRINT
              </text>
            </g>
          </g>

          {/* Magnifying glass */}
          <g className={styles.lens}>
            {/* handle */}
            <rect x="180" y="166" width="44" height="11" rx="5" transform="rotate(38 200 172)" fill="url(#erChrome)" stroke="#0a0c10" strokeWidth="1.4" />
            {/* lens ring */}
            <circle cx="132" cy="112" r="46" fill="rgba(64, 188, 255, 0.14)" stroke="url(#erChrome)" strokeWidth="6" />
            <circle cx="132" cy="112" r="46" fill="none" stroke="var(--primitive-text-strong)" strokeWidth="1.2" opacity="0.42" />
            {/* highlight */}
            <path d="M 102 86 A 38 38 0 0 1 132 76" stroke="var(--primitive-text-strong)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* question / null mark inside */}
            <text
              x="132"
              y="124"
              textAnchor="middle"
              fill="var(--primitive-amber)"
              fontFamily="monospace"
              fontSize="38"
              fontWeight="800"
              opacity="0.9"
            >
              ?
            </text>
          </g>
        </svg>
        <figcaption className={styles.caption}>Catalogue search · 0 matches</figcaption>
      </figure>

      <div className={styles.body}>
        {query ? (
          <div className={styles.searchEcho}>
            <span aria-hidden="true">Query</span>
            <code>{query}</code>
          </div>
        ) : null}

        <h2 id="state-empty-results-heading" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.message}>{message}</p>

        {suggestions.length > 0 ? (
          <div>
            <span className={styles.chipLabel}>Try one of these</span>
            <ul className={styles.chips} style={{ marginTop: "var(--primitive-space-2-5)" }}>
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  {onSuggestionSelect ? (
                    <button
                      type="button"
                      className={styles.chip}
                      onClick={() => onSuggestionSelect(suggestion)}
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

        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </article>
  )
}

export default StateEmptyResults
