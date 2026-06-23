"use client"

import autoAnimate from "@formkit/auto-animate"
import { Ban, CheckCircle2, Clock, SkipForward, XCircle } from "lucide-react"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

import type { WorkflowLogEntry, WorkflowRunStatus } from "./workflow-types"
import styles from "./execution-log.module.css"

interface ExecutionLogProps {
  /** Newest entries first. */
  entries: ReadonlyArray<WorkflowLogEntry>
  /** Header summary chip e.g. "12 events". */
  summary?: string
  className?: string
}

const STATUS_ICON: Record<WorkflowRunStatus, ReactNode> = {
  success: <CheckCircle2 strokeWidth={2.4} />,
  failed: <XCircle strokeWidth={2.4} />,
  running: <span className={styles.runningSpinner} aria-hidden="true" />,
  queued: <Clock strokeWidth={2.4} />,
  skipped: <SkipForward strokeWidth={2.4} />,
  cancelled: <Ban strokeWidth={2.4} />,
}

const STATUS_CLASS: Record<WorkflowRunStatus, string> = {
  success: styles.success,
  failed: styles.failed,
  running: styles.running,
  queued: styles.queued,
  skipped: styles.skipped,
  cancelled: styles.cancelled,
}

const STATUS_LABEL: Record<WorkflowRunStatus, string> = {
  success: "Succeeded",
  failed: "Failed",
  running: "Running",
  queued: "Queued",
  skipped: "Skipped",
  cancelled: "Cancelled",
}

export function ExecutionLog({ entries, summary, className }: ExecutionLogProps) {
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced || !listRef.current) {
      return
    }
    autoAnimate(listRef.current, { duration: 220, easing: "ease-out" })
  }, [])

  const classes = [styles.log, className].filter(Boolean).join(" ")
  const fallback = summary ?? `${entries.length} events`
  const lastRun = entries.length > 0 ? entries[0]?.timestamp : null

  return (
    <section className={classes} aria-label="Workflow execution log">
      <header className={styles.header}>
        <span className={styles.kicker}>Execution log</span>
        <span className={styles.summary}>
          {fallback}
          {lastRun ? ` · last ${lastRun}` : null}
        </span>
      </header>
      <ul
        ref={listRef}
        className={styles.list}
        aria-live="polite"
        aria-relevant="additions text"
      >
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={styles.row}
            aria-label={`${STATUS_LABEL[entry.status]} · ${entry.node}`}
          >
            <span className={styles.timestamp}>{entry.timestamp}</span>
            <span
              className={[styles.iconBadge, STATUS_CLASS[entry.status]].join(" ")}
              aria-hidden="true"
            >
              {STATUS_ICON[entry.status]}
            </span>
            <span className={styles.node}>{entry.node}</span>
            <span className={styles.message}>{entry.message}</span>
            {entry.duration ? (
              <span className={styles.duration}>{entry.duration}</span>
            ) : (
              <span className={styles.duration}>{STATUS_LABEL[entry.status]}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
