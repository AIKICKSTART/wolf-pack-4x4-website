"use client"

import { useState } from "react"

import type { ExportFormat } from "./reports-types"
import styles from "./export-format-picker.module.css"

interface FormatEntry {
  id: ExportFormat
  label: string
  glyph: string
  description: string
  estimatedSize: string
}

const FORMATS: ReadonlyArray<FormatEntry> = [
  {
    id: "pdf",
    label: "PDF",
    glyph: "P",
    description: "Print-ready with charts.",
    estimatedSize: "~2.4 MB",
  },
  {
    id: "csv",
    label: "CSV",
    glyph: "C",
    description: "Flat, spreadsheet-safe.",
    estimatedSize: "~480 KB",
  },
  {
    id: "excel",
    label: "Excel",
    glyph: "X",
    description: "Multi-sheet workbook.",
    estimatedSize: "~1.1 MB",
  },
  {
    id: "json",
    label: "JSON",
    glyph: "J",
    description: "Machine-readable feed.",
    estimatedSize: "~720 KB",
  },
  {
    id: "parquet",
    label: "Parquet",
    glyph: "Q",
    description: "Columnar, compressed.",
    estimatedSize: "~210 KB",
  },
]

interface ExportFormatPickerProps {
  initialFormat?: ExportFormat
  initialTrimColumns?: boolean
  className?: string
}

export function ExportFormatPicker({
  initialFormat = "csv",
  initialTrimColumns = false,
  className,
}: ExportFormatPickerProps) {
  const [selected, setSelected] = useState<ExportFormat>(initialFormat)
  const [trimColumns, setTrimColumns] = useState<boolean>(initialTrimColumns)

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Export format picker">
      <span className={styles.title}>Choose export format</span>
      <div className={styles.grid} role="radiogroup" aria-label="Export format options">
        {FORMATS.map((option) => {
          const active = option.id === selected
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              className={`${styles.option} ${active ? styles.optionActive : ""}`}
              onClick={() => setSelected(option.id)}
            >
              <span className={styles.optionGlyph} aria-hidden="true">
                {option.glyph}
              </span>
              <span className={styles.optionLabel}>{option.label}</span>
              <span className={styles.optionMeta}>{option.description}</span>
              <span className={styles.sizeChip}>{option.estimatedSize}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.toggleRow}>
        <span className={styles.toggleCopy}>
          <strong>Trim non-essential columns</strong> — drop ids and audit fields.
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={trimColumns}
          aria-label="Trim non-essential columns"
          className={styles.toggleSwitch}
          onClick={() => setTrimColumns((current) => !current)}
        />
      </div>
    </section>
  )
}

export default ExportFormatPicker
