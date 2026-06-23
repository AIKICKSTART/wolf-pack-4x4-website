"use client"

import { useCallback, useMemo, useState } from "react"

import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { StatusTone } from "../status-page/status-types"

import {
  LOG_SEVERITY_LABEL,
  LOG_SEVERITY_TONE,
  type LogSeverity,
} from "./observability-types"
import styles from "./log-stream-table.module.css"

export interface LogEntry {
  id: string
  /** Pre-formatted ISO timestamp or display string. */
  timestamp: string
  severity: LogSeverity
  service: string
  message: string
  /** Optional structured key/value fields, e.g. { traceId: "abc", quoteId: "Q-12" }. */
  fields?: Readonly<Record<string, string>>
}

export interface LogStreamTableProps {
  rows: ReadonlyArray<LogEntry>
  caption?: string
  /** Allow severity filtering chips at the top. */
  enableFilter?: boolean
  className?: string
}

const SEVERITY_ORDER: ReadonlyArray<LogSeverity> = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
]

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

export function LogStreamTable({
  rows,
  caption = "Live log stream",
  enableFilter = true,
  className,
}: LogStreamTableProps) {
  const [active, setActive] = useState<ReadonlySet<LogSeverity>>(
    () => new Set<LogSeverity>(SEVERITY_ORDER),
  )

  const toggle = useCallback((sev: LogSeverity) => {
    setActive((current) => {
      const next = new Set(current)
      if (next.has(sev)) {
        next.delete(sev)
      } else {
        next.add(sev)
      }
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    return rows.filter((row) => active.has(row.severity))
  }, [rows, active])

  const columns: ReadonlyArray<DataTableColumn<LogEntry>> = [
    {
      id: "time",
      header: "Time",
      width: "160px",
      cell: (row) => <span className={styles.timeCell}>{row.timestamp}</span>,
    },
    {
      id: "sev",
      header: "Sev",
      width: "92px",
      cell: (row) => (
        <Chip
          label={LOG_SEVERITY_LABEL[row.severity]}
          tone={TONE_CHIP[LOG_SEVERITY_TONE[row.severity]]}
          selected
        />
      ),
    },
    {
      id: "service",
      header: "Service",
      width: "170px",
      cell: (row) => <span className={styles.serviceCell}>{row.service}</span>,
    },
    {
      id: "message",
      header: "Message",
      cell: (row) => (
        <div className={styles.messageCell}>
          <span className={styles.message}>{row.message}</span>
          {row.fields ? (
            <ul className={styles.fields}>
              {Object.entries(row.fields).map(([k, v]) => (
                <li key={k} className={styles.field}>
                  <span className={styles.fieldKey}>{k}</span>
                  <span className={styles.fieldEq} aria-hidden="true">=</span>
                  <span className={styles.fieldValue}>{v}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ),
    },
  ]

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={caption}>
      {enableFilter ? (
        <div className={styles.filterRow} role="group" aria-label="Filter by severity">
          <span className={styles.filterLabel}>Filter</span>
          {SEVERITY_ORDER.map((sev) => {
            const tone: StatusTone = LOG_SEVERITY_TONE[sev]
            return (
              <Chip
                key={sev}
                label={LOG_SEVERITY_LABEL[sev]}
                tone={TONE_CHIP[tone]}
                selected={active.has(sev)}
                onSelect={() => toggle(sev)}
              />
            )
          })}
          <span className={styles.filterCount}>
            {filtered.length} / {rows.length}
          </span>
        </div>
      ) : null}
      <DataTable
        rows={[...filtered]}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        zebra
        caption={caption}
      />
    </section>
  )
}

export default LogStreamTable
