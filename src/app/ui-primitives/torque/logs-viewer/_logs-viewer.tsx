"use client"

import { ChevronRight, Search } from "lucide-react"
import { useCallback, useId, useMemo, useState } from "react"

import { Chip } from "../../components/primitives/chip"
import type { ChipTone } from "../../components/primitives/chip"
import { Kbd } from "../../components/primitives/kbd"
import { EmptyState } from "../../components/primitives/empty-state"
import {
  LOG_SEVERITY_LABEL,
  LOG_SEVERITY_TONE,
  type LogSeverity,
} from "../../components/observability/observability-types"
import type { StatusTone } from "../../components/status-page/status-types"

import {
  LEVEL_OPTIONS,
  LOG_STREAM,
  SOURCE_OPTIONS,
  STREAM_LABEL,
  type LogSource,
  type TorqueLogEntry,
} from "./_demo-data"
import styles from "./logs-viewer.module.css"

/** observability StatusTone → Chip's narrower tone palette. */
const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const ALL_LEVELS: ReadonlyArray<LogSeverity> = LEVEL_OPTIONS.map((o) => o.level)
const ALL_SOURCES: ReadonlyArray<LogSource> = SOURCE_OPTIONS.map((o) => o.source)

interface LogRowProps {
  entry: TorqueLogEntry
  expanded: boolean
  onToggle: (id: string) => void
}

/** A single expandable, accessible disclosure row in the stream. */
function LogRow({ entry, expanded, onToggle }: LogRowProps) {
  const detailId = `${entry.id}-detail`
  const tone = LOG_SEVERITY_TONE[entry.level]

  return (
    <li className={styles.row} data-level={entry.level}>
      <button
        type="button"
        className={styles.rowButton}
        aria-expanded={expanded}
        aria-controls={detailId}
        onClick={() => onToggle(entry.id)}
      >
        <span className={styles.time}>{entry.time}</span>
        <span className={styles.sevCell}>
          <span className={styles.severityPill} data-tone={TONE_CHIP[tone]}>
            {LOG_SEVERITY_LABEL[entry.level]}
          </span>
        </span>
        <span className={styles.source}>{entry.source}</span>
        <span className={styles.msgCell}>
          <span className={styles.chevron} aria-hidden="true">
            <ChevronRight size={14} strokeWidth={2.4} />
          </span>
          <span className={styles.message}>{entry.message}</span>
          <span className={styles.corr}>{entry.correlationId}</span>
        </span>
      </button>
      {expanded ? (
        <div className={styles.detail} id={detailId}>
          <p className={styles.detailMeta}>
            <span>
              <strong>Timestamp</strong> {entry.timestamp}
            </span>
            <span>
              <strong>Correlation</strong> {entry.correlationId}
            </span>
            <span>
              <strong>Source</strong> {entry.source}
            </span>
          </p>
          <dl className={styles.fields}>
            {entry.fields.map(([key, value]) => (
              <div key={key} className={styles.field}>
                <dt className={styles.fieldKey}>{key}</dt>
                <dd className={styles.fieldValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </li>
  )
}

export function LogsViewer() {
  const searchId = useId()
  const [query, setQuery] = useState("")
  const [levels, setLevels] = useState<ReadonlySet<LogSeverity>>(
    () => new Set(ALL_LEVELS),
  )
  const [sources, setSources] = useState<ReadonlySet<LogSource>>(
    () => new Set(ALL_SOURCES),
  )
  const [liveTail, setLiveTail] = useState(true)
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set())

  const toggleLevel = useCallback((level: LogSeverity) => {
    setLevels((current) => {
      const next = new Set(current)
      if (next.has(level)) {
        next.delete(level)
      } else {
        next.add(level)
      }
      return next
    })
  }, [])

  const toggleSource = useCallback((source: LogSource) => {
    setSources((current) => {
      const next = new Set(current)
      if (next.has(source)) {
        next.delete(source)
      } else {
        next.add(source)
      }
      return next
    })
  }, [])

  const toggleRow = useCallback((id: string) => {
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

  const resetFilters = useCallback(() => {
    setQuery("")
    setLevels(new Set(ALL_LEVELS))
    setSources(new Set(ALL_SOURCES))
  }, [])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return LOG_STREAM.filter((entry) => {
      if (!levels.has(entry.level)) {
        return false
      }
      if (!sources.has(entry.source)) {
        return false
      }
      if (needle.length === 0) {
        return true
      }
      const haystack = [
        entry.message,
        entry.source,
        entry.correlationId,
        ...entry.fields.flatMap(([k, v]) => [k, v]),
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [query, levels, sources])

  const filtersDirty =
    query.trim().length > 0 ||
    levels.size !== ALL_LEVELS.length ||
    sources.size !== ALL_SOURCES.length

  return (
    <section className={styles.toolbarWrap} aria-label="Torque log stream">
      <div className={styles.toolbar}>
        <div className={styles.toolbarTop}>
          <div className={styles.search}>
            <span className={styles.searchIcon} aria-hidden="true">
              <Search size={15} strokeWidth={2.2} />
            </span>
            <label htmlFor={searchId} style={srOnly}>
              Search log messages, sources, and correlation ids
            </label>
            <input
              id={searchId}
              type="search"
              className={styles.searchInput}
              placeholder="Search messages, fields, correlation ids…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <span className={styles.searchHint} aria-hidden="true">
              <Kbd size="sm">/</Kbd>
            </span>
          </div>

          <button
            type="button"
            className={styles.liveToggle}
            aria-pressed={liveTail}
            onClick={() => setLiveTail((on) => !on)}
          >
            <span className={styles.switch} aria-hidden="true" />
            <span>{liveTail ? "Live tail on" : "Tail paused"}</span>
          </button>
        </div>

        <div className={styles.filterRow} role="group" aria-label="Filter by level">
          <span className={styles.filterLabel}>Level</span>
          {LEVEL_OPTIONS.map((option) => (
            <Chip
              key={option.level}
              label={option.label}
              tone={TONE_CHIP[LOG_SEVERITY_TONE[option.level]]}
              selected={levels.has(option.level)}
              onSelect={() => toggleLevel(option.level)}
            />
          ))}
        </div>

        <div className={styles.filterRow} role="group" aria-label="Filter by source">
          <span className={styles.filterLabel}>Source</span>
          {SOURCE_OPTIONS.map((option) => (
            <Chip
              key={option.source}
              label={option.label}
              tone="neutral"
              selected={sources.has(option.source)}
              onSelect={() => toggleSource(option.source)}
            />
          ))}
          {filtersDirty ? (
            <button type="button" className={styles.reset} onClick={resetFilters}>
              Reset filters
            </button>
          ) : null}
          <span className={styles.filterCount} aria-live="polite">
            {filtered.length} / {LOG_STREAM.length} lines
          </span>
        </div>
      </div>

      <div className={styles.streamFrame}>
        <div className={styles.streamHead} aria-hidden="true">
          <span>Time · {STREAM_LABEL}</span>
          <span>Level</span>
          <span>Source</span>
          <span>Message</span>
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            title="No lines match your filters"
            description="Loosen the level or source filters, or clear the search to see the full Torque stream again."
            action={
              <button type="button" className={styles.reset} onClick={resetFilters}>
                Reset filters
              </button>
            }
          />
        ) : (
          <ul
            className={styles.streamList}
            aria-label="Structured log lines, newest first"
          >
            {filtered.map((entry) => (
              <LogRow
                key={entry.id}
                entry={entry}
                expanded={expanded.has(entry.id)}
                onToggle={toggleRow}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

const srOnly = {
  position: "absolute" as const,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap" as const,
  border: 0,
}

export default LogsViewer
