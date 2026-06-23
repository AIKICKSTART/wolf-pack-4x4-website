"use client"

import { DataTable, type DataTableColumn } from "../data-display/data-table"

import type { ReportStatus } from "./reports-types"
import styles from "./report-run-history-table.module.css"

export interface ReportRun {
  id: string
  timestamp: string
  durationMs: number
  rows: number
  size: string
  status: ReportStatus
  downloadHref?: string
}

interface ReportRunHistoryTableProps {
  runs: ReadonlyArray<ReportRun>
  caption?: string
  className?: string
}

const STATUS_CLASS: Record<ReportStatus, string> = {
  ok: styles.statusOk,
  running: styles.statusRunning,
  warn: styles.statusWarn,
  failed: styles.statusFailed,
  queued: styles.statusQueued,
}

const STATUS_LABEL: Record<ReportStatus, string> = {
  ok: "Delivered",
  running: "Running",
  warn: "Partial",
  failed: "Failed",
  queued: "Queued",
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  const seconds = ms / 1000
  if (seconds < 60) return `${seconds.toFixed(1)}s`
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.round(seconds % 60)
  return `${minutes}m ${remainder}s`
}

function formatRows(rows: number): string {
  if (rows >= 1000) {
    return `${(rows / 1000).toFixed(1)}k`
  }
  return rows.toString()
}

export function ReportRunHistoryTable({
  runs,
  caption = "Run history",
  className,
}: ReportRunHistoryTableProps) {
  const columns: ReadonlyArray<DataTableColumn<ReportRun>> = [
    {
      id: "timestamp",
      header: "Timestamp",
      cell: (row) => <span className={styles.mono}>{row.timestamp}</span>,
      sortable: true,
    },
    {
      id: "duration",
      header: "Duration",
      align: "right",
      cell: (row) => <span className={styles.mono}>{formatDuration(row.durationMs)}</span>,
    },
    {
      id: "rows",
      header: "Rows",
      align: "right",
      cell: (row) => <span className={styles.mono}>{formatRows(row.rows)}</span>,
    },
    {
      id: "size",
      header: "Size",
      align: "right",
      cell: (row) => <span className={styles.mono}>{row.size}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <span className={`${styles.status} ${STATUS_CLASS[row.status]}`}>
          {STATUS_LABEL[row.status]}
        </span>
      ),
    },
    {
      id: "download",
      header: "Download",
      align: "right",
      cell: (row) => (
        <button
          type="button"
          className={styles.download}
          disabled={row.status !== "ok" || !row.downloadHref}
          aria-label={`Download report for run ${row.id}`}
        >
          ↓ File
        </button>
      ),
    },
  ]

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <DataTable
        rows={[...runs]}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        caption={caption}
        kicker="Report runs"
      />
    </div>
  )
}

export default ReportRunHistoryTable
