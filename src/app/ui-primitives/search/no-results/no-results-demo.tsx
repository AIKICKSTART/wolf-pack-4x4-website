"use client"

import { useState } from "react"

import { NoResultsState } from "../../components/search"
import styles from "../search.module.css"

const SUGGESTIONS: ReadonlyArray<string> = [
  "BA Falcon catback",
  "VE Commodore exhaust",
  "Magnaflow 14416",
  "3-inch mandrel midpipe",
  "ADR-compliant tip",
]

export function NoResultsDemo() {
  const [query, setQuery] = useState<string>("XR8 turbo-back zorst")
  const [requested, setRequested] = useState<boolean>(false)

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    setRequested(false)
  }

  return (
    <div className={styles.stage}>
      <div style={{ display: "grid", gap: 14 }}>
        <NoResultsState
          query={query}
          suggestions={SUGGESTIONS}
          onSuggestion={handleSuggestion}
          onRequest={() => setRequested(true)}
          backToAllHref="#"
        />
        {requested ? (
          <p
            aria-live="polite"
            style={{
              margin: 0,
              padding: "var(--primitive-space-3) 18px",
              border: "1px solid color-mix(in oklab, var(--primitive-green) 40%, transparent)",
              borderRadius: "var(--primitive-radius-md)",
              background: "color-mix(in oklab, var(--primitive-green) 10%, transparent)",
              color: "var(--primitive-green)",
              fontFamily: "var(--primitive-font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Request lodged · catalog team will follow up on &ldquo;{query}&rdquo;.
          </p>
        ) : null}
      </div>
    </div>
  )
}
