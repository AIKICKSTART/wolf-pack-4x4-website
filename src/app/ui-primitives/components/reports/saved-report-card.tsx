"use client"

import type { ReactNode } from "react"

import styles from "./saved-report-card.module.css"

export type SavedReportAction = "open" | "edit" | "duplicate" | "share"

export interface SavedReportCardProps {
  title: string
  owner: string
  lastRun: string
  scheduleLabel?: string
  thumbnail: ReactNode
  onAction?: (action: SavedReportAction) => void
  className?: string
}

const ACTIONS: ReadonlyArray<{ id: SavedReportAction; label: string; variant?: "primary" }> = [
  { id: "open", label: "Open", variant: "primary" },
  { id: "edit", label: "Edit" },
  { id: "duplicate", label: "Duplicate" },
  { id: "share", label: "Share" },
]

export function SavedReportCard({
  title,
  owner,
  lastRun,
  scheduleLabel,
  thumbnail,
  onAction,
  className,
}: SavedReportCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Saved report: ${title}`}>
      <div className={styles.thumb} aria-hidden="true">
        {thumbnail}
      </div>
      <div className={styles.body}>
        <span className={styles.kicker}>Saved report</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.metaRow}>
          <span>
            Owner <strong>{owner}</strong>
          </span>
          <span>
            Last run <strong>{lastRun}</strong>
          </span>
        </div>
        {scheduleLabel && (
          <span className={styles.schedule} aria-label={`Schedule: ${scheduleLabel}`}>
            {scheduleLabel}
          </span>
        )}
        <div className={styles.actions}>
          {ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              className={styles.action}
              data-variant={action.variant}
              onClick={() => onAction?.(action.id)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default SavedReportCard
