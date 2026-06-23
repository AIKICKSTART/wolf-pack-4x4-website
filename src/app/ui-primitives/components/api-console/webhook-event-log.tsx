"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import { CodeBlock } from "../primitives/code-block"
import { HttpStatusChip } from "./http-status-chip"
import type { HttpStatusCode } from "./api-console-types"

import styles from "./webhook-event-log.module.css"

export interface WebhookLogEntry {
  id: string
  timestamp: string
  eventType: string
  endpointUrl: string
  status: HttpStatusCode | number
  durationMs: number
  retryCount: number
  /** Raw JSON payload preview (pretty-printed). */
  payloadJson: string
}

interface WebhookEventLogProps {
  entries: ReadonlyArray<WebhookLogEntry>
  className?: string
  /** When provided, called any time a row is expanded so a parent can fetch a richer payload. */
  onExpand?: (id: string) => void
  /** Header label override. */
  caption?: string
}

export function WebhookEventLog({
  entries,
  className,
  onExpand,
  caption = "Webhook event log",
}: WebhookEventLogProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const classes = [styles.log, className].filter(Boolean).join(" ")

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
    if (openId !== id) {
      onExpand?.(id)
    }
  }

  return (
    <section className={classes} aria-label={caption}>
      <header className={styles.head}>
        <span className={styles.kicker}>Event log</span>
        <h3 className={styles.title}>{caption}</h3>
        <span className={styles.count}>{entries.length} events</span>
      </header>

      <div role="table" className={styles.table} aria-label={caption}>
        <div role="row" className={[styles.row, styles.rowHead].join(" ")}>
          <span role="columnheader">Time</span>
          <span role="columnheader">Event</span>
          <span role="columnheader">Endpoint</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Duration</span>
          <span role="columnheader">Retries</span>
          <span role="columnheader" aria-label="Expand" />
        </div>

        {entries.map((entry) => {
          const isOpen = openId === entry.id
          return (
            <div key={entry.id} className={styles.entryGroup}>
              <button
                type="button"
                role="row"
                className={[styles.row, styles.rowBody, isOpen && styles.rowOpen].filter(Boolean).join(" ")}
                onClick={() => handleToggle(entry.id)}
                aria-expanded={isOpen}
                aria-controls={`event-payload-${entry.id}`}
              >
                <span role="cell" className={styles.timestamp}>
                  {entry.timestamp}
                </span>
                <span role="cell" className={styles.eventType}>
                  <Chip label={entry.eventType} tone="amber" />
                </span>
                <span role="cell" className={styles.endpoint}>
                  <code>{entry.endpointUrl}</code>
                </span>
                <span role="cell">
                  <HttpStatusChip code={entry.status} compact />
                </span>
                <span role="cell" className={styles.duration}>
                  {entry.durationMs}ms
                </span>
                <span role="cell" className={styles.retries}>
                  {entry.retryCount === 0 ? (
                    <span className={styles.retriesNone}>0</span>
                  ) : (
                    <Chip label={`×${entry.retryCount}`} tone="red" />
                  )}
                </span>
                <span role="cell" className={styles.chevron} aria-hidden="true">
                  <ChevronDown size={14} strokeWidth={2.4} />
                </span>
              </button>
              {isOpen && (
                <div
                  id={`event-payload-${entry.id}`}
                  className={styles.payload}
                  role="region"
                  aria-label={`Payload for ${entry.eventType}`}
                >
                  <CodeBlock
                    code={entry.payloadJson}
                    language="json"
                    fileName={`${entry.eventType}.json`}
                    showLineNumbers
                    maxHeight={280}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WebhookEventLog
