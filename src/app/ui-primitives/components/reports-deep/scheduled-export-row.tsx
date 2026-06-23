"use client"

import { useCallback, useState } from "react"

import type { ExportFileKind, RecipientChannel, ScheduledExportConfig } from "./reports-deep-types"
import styles from "./scheduled-export-row.module.css"

interface ScheduledExportRowProps {
  readonly config: ScheduledExportConfig
  readonly className?: string
  readonly onToggle?: (id: string, next: boolean) => void
}

const FORMAT_LABEL: Record<ExportFileKind, string> = {
  pdf: "PDF",
  csv: "CSV",
  xlsx: "XLSX",
  json: "JSON",
  parquet: "Parquet",
}

const CHANNEL_GLYPH: Record<RecipientChannel, string> = {
  email: "@",
  slack: "#",
  teams: "T",
  webhook: "↗",
}

export function ScheduledExportRow({ config, className, onToggle }: ScheduledExportRowProps) {
  const [enabled, setEnabled] = useState<boolean>(config.enabled)

  const handleToggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current
      onToggle?.(config.id, next)
      return next
    })
  }, [config.id, onToggle])

  const classes = [styles.row, enabled ? styles.rowOn : styles.rowOff, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Scheduled export: ${config.reportName}`}
      data-cadence={config.cadence}
    >
      <div className={styles.identity}>
        <span className={styles.kicker}>Scheduled · {config.cadence}</span>
        <h3 className={styles.name}>{config.reportName}</h3>
        <code className={styles.cron} aria-label="Cron expression">
          {config.cronLabel}
        </code>
      </div>

      <div className={styles.column}>
        <span className={styles.colLabel}>Next run</span>
        <span className={styles.colValue}>{config.nextRun}</span>
      </div>

      <div className={styles.column}>
        <span className={styles.colLabel}>Format</span>
        <span className={`${styles.colValue} ${styles.formatChip}`}>
          {FORMAT_LABEL[config.format]}
        </span>
      </div>

      <div className={styles.column}>
        <span className={styles.colLabel}>Recipients</span>
        <ul className={styles.recipientList} aria-label="Recipients">
          {config.recipients.map((recipient) => (
            <li key={recipient.id} className={styles.recipientChip}>
              <span aria-hidden="true" className={styles.recipientGlyph}>
                {CHANNEL_GLYPH[recipient.channel]}
              </span>
              <span>{recipient.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.toggle}
          role="switch"
          aria-checked={enabled}
          aria-label={`${enabled ? "Pause" : "Resume"} ${config.reportName}`}
          onClick={handleToggle}
          data-state={enabled ? "on" : "off"}
        >
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>{enabled ? "Active" : "Paused"}</span>
        </button>
      </div>
    </article>
  )
}

export default ScheduledExportRow
