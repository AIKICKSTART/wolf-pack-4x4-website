"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Repeat, Trash2 } from "lucide-react"

import { DataTable, type DataTableColumn } from "../data-display/data-table"
import { Chip } from "../primitives/chip"
import { CodeBlock } from "../primitives/code-block"

import { JOB_KIND_LABEL, type JobKind } from "./job-queue-types"
import styles from "./failed-jobs-panel.module.css"

export interface FailedJob {
  id: string
  kind: JobKind
  /** Error class name (e.g. "Net::OpenTimeout"). */
  errorClass: string
  /** Short error message. */
  errorMessage: string
  /** Full stack trace (revealed when row is expanded). */
  stackTrace: string
  failedAt: string
  attempt: number
  maxAttempts: number
}

interface FailedJobsPanelProps {
  jobs: ReadonlyArray<FailedJob>
  onRetry?: (id: string) => void
  onDiscard?: (id: string) => void
  className?: string
}

export function FailedJobsPanel({
  jobs,
  onRetry,
  onDiscard,
  className,
}: FailedJobsPanelProps) {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set())

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const columns: ReadonlyArray<DataTableColumn<FailedJob>> = [
    {
      id: "id",
      header: "Job",
      cell: (row) => (
        <button
          type="button"
          className={styles.expandBtn}
          onClick={() => toggle(row.id)}
          aria-expanded={expanded.has(row.id)}
          aria-controls={`failed-trace-${row.id}`}
        >
          {expanded.has(row.id) ? (
            <ChevronDown size={12} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
          )}
          <code>{row.id}</code>
        </button>
      ),
    },
    {
      id: "kind",
      header: "Kind",
      cell: (row) => <Chip label={JOB_KIND_LABEL[row.kind]} tone="neutral" />,
    },
    {
      id: "error",
      header: "Error",
      cell: (row) => <Chip label={row.errorClass} tone="red" />,
    },
    {
      id: "attempt",
      header: "Attempt",
      cell: (row) => (
        <span className={styles.attempt}>
          {row.attempt}/{row.maxAttempts}
        </span>
      ),
      align: "right",
    },
    {
      id: "failedAt",
      header: "Failed at",
      cell: (row) => <time className={styles.time}>{row.failedAt}</time>,
      align: "right",
    },
    {
      id: "actions",
      header: "",
      cell: (row) => (
        <div className={styles.rowActions}>
          <button
            type="button"
            className={styles.actionRetry}
            onClick={() => onRetry?.(row.id)}
            aria-label={`Retry ${row.id}`}
          >
            <Repeat size={11} strokeWidth={2.4} aria-hidden="true" />
            <span>Retry</span>
          </button>
          <button
            type="button"
            className={styles.actionDiscard}
            onClick={() => onDiscard?.(row.id)}
            aria-label={`Discard ${row.id}`}
          >
            <Trash2 size={11} strokeWidth={2.4} aria-hidden="true" />
            <span>Discard</span>
          </button>
        </div>
      ),
      align: "right",
    },
  ]

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section className={classes} role="alert" aria-label="Failed jobs">
      <DataTable
        rows={[...jobs]}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        kicker="Failed jobs"
        caption={`${jobs.length} recent failures`}
        empty="No failed jobs — every worker landed clean."
      />
      <ul className={styles.traces}>
        {jobs.map((job) =>
          expanded.has(job.id) ? (
            <li key={job.id} id={`failed-trace-${job.id}`} className={styles.traceItem}>
              <p className={styles.traceMessage}>{job.errorMessage}</p>
              <CodeBlock
                code={job.stackTrace}
                language="ruby"
                fileName={`${job.id}.trace`}
                maxHeight={220}
              />
            </li>
          ) : null,
        )}
      </ul>
    </section>
  )
}

export default FailedJobsPanel
