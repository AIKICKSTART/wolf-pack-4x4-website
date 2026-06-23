"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import type { BulkExportConfig, BulkExportFormat } from "./bulk-ops-types"
import styles from "./bulk-export-trigger.module.css"

interface BulkExportTriggerProps {
  /** Display label for the scope. */
  scopeLabel: string
  /** Estimated rows in the export. */
  estimatedRows: number
  /** Format options available. */
  formats?: ReadonlyArray<BulkExportFormat>
  defaultFormat?: BulkExportFormat
  defaultIncludeArchived?: boolean
  defaultEmailWhenReady?: boolean
  onExport?: (config: BulkExportConfig) => void
  className?: string
}

const FORMAT_LABEL: Record<BulkExportFormat, string> = {
  csv: "CSV",
  xlsx: "XLSX",
  json: "JSON",
  pdf: "PDF",
}

const DEFAULT_FORMATS: ReadonlyArray<BulkExportFormat> = [
  "csv",
  "xlsx",
  "json",
  "pdf",
]

export function BulkExportTrigger({
  scopeLabel,
  estimatedRows,
  formats = DEFAULT_FORMATS,
  defaultFormat = "csv",
  defaultIncludeArchived = false,
  defaultEmailWhenReady = true,
  onExport,
  className,
}: BulkExportTriggerProps) {
  const [format, setFormat] = useState<BulkExportFormat>(defaultFormat)
  const [includeArchived, setIncludeArchived] = useState<boolean>(
    defaultIncludeArchived,
  )
  const [emailWhenReady, setEmailWhenReady] = useState<boolean>(
    defaultEmailWhenReady,
  )
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Bulk export trigger">
      <header className={styles.head}>
        <span className={styles.kicker}>Export selection</span>
        <h2 className={styles.title}>Download selected records</h2>
      </header>

      <div className={styles.scopeRow}>
        <span className={styles.scopeChip}>Scope · {scopeLabel}</span>
        <span className={styles.rowsHint}>
          ~{estimatedRows.toLocaleString("en-US")} rows
        </span>
      </div>

      <div className={styles.formatRow}>
        <span className={styles.fieldLabel} id="bulk-export-format-label">
          Format
        </span>
        <div
          className={styles.formats}
          role="radiogroup"
          aria-labelledby="bulk-export-format-label"
        >
          {formats.map((entry) => {
            const isActive = entry === format
            return (
              <button
                key={entry}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={[
                  styles.formatBtn,
                  isActive ? styles.formatActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setFormat(entry)}
              >
                {FORMAT_LABEL[entry]}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.toggles}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Include archived records</span>
            <span className={styles.toggleHint}>
              Pulls archived rows alongside the active set
            </span>
          </div>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={includeArchived}
            aria-label="Toggle include archived"
            onClick={() => setIncludeArchived((current) => !current)}
          />
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Email when ready</span>
            <span className={styles.toggleHint}>
              We&apos;ll send a download link when the export finishes
            </span>
          </div>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={emailWhenReady}
            aria-label="Toggle email-when-ready"
            onClick={() => setEmailWhenReady((current) => !current)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() =>
            onExport?.({
              scopeLabel,
              format,
              includeArchived,
              emailWhenReady,
              estimatedRows,
            })
          }
        >
          <Download size={12} strokeWidth={2.4} aria-hidden="true" />
          Export
        </button>
      </div>
    </section>
  )
}

export default BulkExportTrigger
