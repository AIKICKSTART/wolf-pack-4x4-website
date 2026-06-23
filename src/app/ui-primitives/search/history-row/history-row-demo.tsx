"use client"

import { useState } from "react"

import { SearchHistoryRow } from "../../components/search"
import styles from "../search.module.css"

interface HistoryEntry {
  id: string
  query: string
  timestamp: string
  occurredAt: string
  resultCount: number
}

const INITIAL: ReadonlyArray<HistoryEntry> = [
  {
    id: "h1",
    query: "Magnaflow 14416",
    timestamp: "Yesterday · 16:08",
    occurredAt: "2026-05-27T16:08:00+10:00",
    resultCount: 12,
  },
  {
    id: "h2",
    query: "BA Falcon catback 2.5 inch",
    timestamp: "Yesterday · 14:32",
    occurredAt: "2026-05-27T14:32:00+10:00",
    resultCount: 3,
  },
  {
    id: "h3",
    query: "ADR-compliant exhaust tip",
    timestamp: "Tue · 09:48",
    occurredAt: "2026-05-25T09:48:00+10:00",
    resultCount: 27,
  },
  {
    id: "h4",
    query: "Redback headers 4-into-1",
    timestamp: "Mon · 11:14",
    occurredAt: "2026-05-24T11:14:00+10:00",
    resultCount: 1,
  },
]

export function HistoryRowDemo() {
  const [entries, setEntries] = useState<ReadonlyArray<HistoryEntry>>(INITIAL)
  const [recalled, setRecalled] = useState<string>("")

  const handleRemove = (query: string) => {
    setEntries((prev) => prev.filter((e) => e.query !== query))
  }

  const handleRecall = (query: string) => {
    setRecalled(`Recalled · ${query}`)
  }

  return (
    <div className={styles.stage}>
      <div style={{ display: "grid", gap: "var(--primitive-space-2)" }}>
        {entries.map((entry) => (
          <SearchHistoryRow
            key={entry.id}
            query={entry.query}
            timestamp={entry.timestamp}
            occurredAt={entry.occurredAt}
            resultCount={entry.resultCount}
            onRecall={handleRecall}
            onRemove={handleRemove}
          />
        ))}
        {entries.length === 0 ? (
          <p
            style={{
              margin: 0,
              padding: "var(--primitive-space-4) 18px",
              border: "1px dashed var(--primitive-line)",
              borderRadius: "var(--primitive-radius-md)",
              color: "var(--primitive-muted)",
              fontSize: "var(--primitive-text-xs)",
              textAlign: "center",
            }}
          >
            History is empty.
          </p>
        ) : null}
      </div>
      {recalled.length > 0 ? (
        <p
          aria-live="polite"
          style={{
            margin: 0,
            color: "var(--primitive-amber)",
            fontFamily: "var(--primitive-font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {recalled}
        </p>
      ) : null}
    </div>
  )
}
