"use client"

import { useCallback, useMemo, useState } from "react"

import { Chip } from "../primitives/chip"
import { CodeBlock } from "../primitives/code-block"
import { DataTable, type DataTableColumn } from "../data-display/data-table"
import type { AuditEvent } from "./permission-types"
import styles from "./audit-trail.module.css"

export interface AuditFilterOption {
  readonly id: string
  readonly label: string
  readonly count?: number
}

export interface AuditDateRangeOption {
  readonly id: string
  readonly label: string
}

interface AuditTrailProps {
  events: ReadonlyArray<AuditEvent>
  eventTypes: ReadonlyArray<AuditFilterOption>
  actors: ReadonlyArray<AuditFilterOption>
  dateRanges: ReadonlyArray<AuditDateRangeOption>
  defaultDateRangeId?: string
  initialPageSize?: number
  className?: string
}

const TONE_LABEL: Record<AuditEvent["tone"], string> = {
  info: "Info",
  success: "OK",
  warn: "Warn",
  danger: "Critical",
}

const TONE_CHIP: Record<AuditEvent["tone"], "neutral" | "amber" | "teal" | "green" | "red"> = {
  info: "teal",
  success: "green",
  warn: "amber",
  danger: "red",
}

function formatTimestamp(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function AuditTrail({
  events,
  eventTypes,
  actors,
  dateRanges,
  defaultDateRangeId,
  initialPageSize = 8,
  className,
}: AuditTrailProps) {
  const [activeTypes, setActiveTypes] = useState<ReadonlySet<string>>(new Set())
  const [activeActors, setActiveActors] = useState<ReadonlySet<string>>(new Set())
  const [dateRange, setDateRange] = useState<string>(defaultDateRangeId ?? dateRanges[0]?.id ?? "")
  const [pageSize, setPageSize] = useState<number>(initialPageSize)
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set())

  const toggleType = useCallback((id: string) => {
    setActiveTypes((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const toggleActor = useCallback((id: string) => {
    setActiveActors((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const toggleExpand = useCallback((id: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const typeMatch = activeTypes.size === 0 || activeTypes.has(event.action.split(".")[0] ?? event.action)
      const actorMatch = activeActors.size === 0 || activeActors.has(event.actor)
      return typeMatch && actorMatch
    })
  }, [events, activeTypes, activeActors])

  const visible = filtered.slice(0, pageSize)
  const hasMore = filtered.length > visible.length

  const columns: DataTableColumn<AuditEvent>[] = [
    {
      id: "ts",
      header: "When",
      cell: (event) => (
        <time className={styles.mono} dateTime={event.timestamp}>
          {formatTimestamp(event.timestamp)}
        </time>
      ),
    },
    {
      id: "actor",
      header: "Actor",
      cell: (event) => (
        <span className={styles.actorCell}>
          <strong>{event.actor}</strong>
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: (event) => <code className={styles.action}>{event.action}</code>,
    },
    {
      id: "resource",
      header: "Resource",
      cell: (event) => (
        <span>
          <strong>{event.resource}</strong>
          {event.target && <small className={styles.targetHint}> · {event.target}</small>}
        </span>
      ),
    },
    {
      id: "tone",
      header: "Tone",
      align: "center",
      cell: (event) => <Chip label={TONE_LABEL[event.tone]} tone={TONE_CHIP[event.tone]} />,
    },
    {
      id: "expand",
      header: "",
      align: "right",
      width: "60px",
      cell: (event) => {
        const open = expanded.has(event.id)
        return (
          <button
            type="button"
            className={styles.expandBtn}
            aria-expanded={open}
            aria-controls={`audit-event-${event.id}`}
            onClick={() => toggleExpand(event.id)}
          >
            <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        )
      },
    },
  ]

  const wrapperClass = [styles.trail, className].filter(Boolean).join(" ")

  return (
    <section className={wrapperClass} aria-label="Audit trail">
      <header className={styles.head}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Event type</span>
          <div className={styles.chipRow}>
            {eventTypes.map((entry) => (
              <Chip
                key={entry.id}
                label={entry.count != null ? `${entry.label} · ${entry.count}` : entry.label}
                tone={activeTypes.has(entry.id) ? "red" : "neutral"}
                selected={activeTypes.has(entry.id)}
                onSelect={() => toggleType(entry.id)}
              />
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Actor</span>
          <div className={styles.chipRow}>
            {actors.map((entry) => (
              <Chip
                key={entry.id}
                label={entry.label}
                tone={activeActors.has(entry.id) ? "teal" : "neutral"}
                selected={activeActors.has(entry.id)}
                onSelect={() => toggleActor(entry.id)}
              />
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Date range</span>
          <div className={styles.chipRow} role="radiogroup">
            {dateRanges.map((entry) => (
              <button
                key={entry.id}
                type="button"
                role="radio"
                aria-checked={dateRange === entry.id}
                className={styles.rangeBtn}
                data-active={dateRange === entry.id}
                onClick={() => setDateRange(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <DataTable
        rows={visible}
        columns={columns}
        getRowId={(row) => row.id}
        density="comfortable"
        kicker={`${filtered.length} events`}
        caption="Most recent first"
      />

      {visible.some((event) => expanded.has(event.id)) && (
        <div className={styles.expansionStack} aria-live="polite">
          {visible
            .filter((event) => expanded.has(event.id))
            .map((event) => (
              <article
                key={event.id}
                id={`audit-event-${event.id}`}
                className={styles.expansion}
                aria-label={`Detail for ${event.action} by ${event.actor}`}
              >
                <header className={styles.expansionHead}>
                  <span className={styles.expansionTitle}>
                    {event.actor} · <code>{event.action}</code>
                  </span>
                  <span className={styles.expansionMeta}>
                    {event.ip && <code>{event.ip}</code>}
                    {event.location && <span>{event.location}</span>}
                  </span>
                </header>
                {event.payload && (
                  <CodeBlock
                    code={event.payload}
                    language="json"
                    fileName={`${event.action}.json`}
                    maxHeight={220}
                  />
                )}
              </article>
            ))}
        </div>
      )}

      {hasMore && (
        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => setPageSize((current) => current + 8)}
          >
            Load older events
          </button>
        </footer>
      )}
    </section>
  )
}

export default AuditTrail
