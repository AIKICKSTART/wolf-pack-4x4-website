"use client"

import { useMemo, useState } from "react"

import { InlineSearchInput } from "../../components/search"
import styles from "../search.module.css"

const ROSTER: ReadonlyArray<string> = [
  "Brent Holloway — Bay 01 · Senior tech",
  "Casey Maguire — Bay 02 · Diagnostics",
  "Tarn Wilkins — Bay 03 · Apprentice",
  "Dell Trembath — Bay 04 · Tuning",
  "Hugo Eastman — Front desk · Service",
  "Liv Bartolomeo — Workshop manager",
  "Pete Rasmussen — Mobile fitter",
  "Sandra Cook — Inventory · Parts",
]

export function InlineInputDemo() {
  const [query, setQuery] = useState<string>("")
  const [debouncedQuery, setDebouncedQuery] = useState<string>("")

  const filtered = useMemo<ReadonlyArray<string>>(() => {
    const term = debouncedQuery.trim().toLowerCase()
    if (term.length === 0) return ROSTER
    return ROSTER.filter((entry) => entry.toLowerCase().includes(term))
  }, [debouncedQuery])

  return (
    <div className={styles.stage}>
      <div className={styles.stageGrid}>
        <InlineSearchInput
          label="Filter roster"
          placeholder="Type a name or bay number…"
          value={query}
          onValueChange={setQuery}
          onDebouncedChange={setDebouncedQuery}
          resultCount={filtered.length}
          resultNoun="techs"
          helper="220ms debounce · case-insensitive substring match"
        />
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--primitive-space-2)" }}>
          {filtered.map((entry) => (
            <li
              key={entry}
              style={{
                padding: "var(--primitive-space-2-5) 14px",
                border: "1px solid var(--primitive-line)",
                borderRadius: "var(--primitive-radius-md)",
                background: "color-mix(in oklab, var(--primitive-text-strong) 3%, transparent)",
                color: "var(--primitive-body)",
                fontSize: "var(--primitive-text-sm)",
              }}
            >
              {entry}
            </li>
          ))}
          {filtered.length === 0 ? (
            <li
              style={{
                padding: "14px 18px",
                border: "1px dashed var(--primitive-line)",
                borderRadius: "var(--primitive-radius-md)",
                color: "var(--primitive-muted)",
                fontSize: "var(--primitive-text-xs)",
                textAlign: "center",
              }}
            >
              No matches
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}
