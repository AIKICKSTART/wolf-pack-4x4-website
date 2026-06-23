"use client"

import { ArrowRight, Check, FileSpreadsheet, Sparkles } from "lucide-react"
import { useCallback, useMemo, useState, type DragEvent } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { StaggerList } from "../motion/stagger-list"
import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import type { ImportStepKey } from "./sales-leads-types"

import styles from "./lead-import-wizard.module.css"

export interface ImportColumnMapping {
  sourceColumn: string
  targetField: string | null
  /** Heuristic confidence in the auto-mapping. */
  confidence: number
}

export interface ImportPreviewRow {
  id: string
  name: string
  email: string
  phone: string
  vehicle: string
  /** Marked true when we detected a duplicate of an existing CRM record. */
  duplicate: boolean
}

interface LeadImportWizardProps {
  fileName?: string
  fileSizeKb?: number
  mappings: ReadonlyArray<ImportColumnMapping>
  previewRows: ReadonlyArray<ImportPreviewRow>
  className?: string
}

const STEPS: ReadonlyArray<{ key: ImportStepKey; label: string }> = [
  { key: "upload", label: "Upload" },
  { key: "map", label: "Map columns" },
  { key: "dedupe", label: "Dedupe" },
  { key: "preview", label: "Preview" },
  { key: "done", label: "Import" },
]

export function LeadImportWizard({
  fileName = "leads-2026-05-29.csv",
  fileSizeKb = 184,
  mappings,
  previewRows,
  className,
}: LeadImportWizardProps) {
  const [stepIdx, setStepIdx] = useState<number>(0)
  const [dragActive, setDragActive] = useState<boolean>(false)

  const step = STEPS[stepIdx]
  const progress = ((stepIdx + 1) / STEPS.length) * 100

  const dupeCount = useMemo(
    () => previewRows.filter((r) => r.duplicate).length,
    [previewRows],
  )
  const newCount = previewRows.length - dupeCount

  const advance = useCallback(() => {
    setStepIdx((idx) => Math.min(idx + 1, STEPS.length - 1))
  }, [])

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => setDragActive(false)
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    advance()
  }

  const previewColumns: ReadonlyArray<DataTableColumn<ImportPreviewRow>> = [
    {
      id: "name",
      header: "Name",
      cell: (row) => (
        <span className={styles.previewName}>
          {row.name}
          {row.duplicate ? (
            <Chip label="Duplicate" tone="amber" />
          ) : (
            <Chip label="New" tone="green" />
          )}
        </span>
      ),
    },
    { id: "email", header: "Email", cell: (row) => row.email },
    { id: "phone", header: "Phone", cell: (row) => row.phone },
    { id: "vehicle", header: "Vehicle", cell: (row) => row.vehicle },
  ]

  const classes = [styles.wizard, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Lead import wizard"
      data-step={step.key}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Import wizard</span>
        <h3 className={styles.title}>Bring leads into Mufflermen CRM</h3>
        <ProgressLinear value={progress} max={100} tone="red" />
      </header>

      <ol className={styles.steps}>
        {STEPS.map((s, idx) => {
          const status =
            idx < stepIdx ? "complete" : idx === stepIdx ? "current" : "pending"
          return (
            <li key={s.key} className={styles.step} data-status={status}>
              <span className={styles.stepDot} aria-hidden="true">
                {status === "complete" ? (
                  <Check size={12} strokeWidth={2.6} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </span>
              <span className={styles.stepLabel}>{s.label}</span>
            </li>
          )
        })}
      </ol>

      <div className={styles.stage}>
        {step.key === "upload" ? (
          <div
            className={`${styles.dropZone} ${
              dragActive ? styles.dropZoneActive : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onClick={advance}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                advance()
              }
            }}
            aria-label="Drop CSV here or click to browse"
          >
            <FileSpreadsheet
              className={styles.dropIcon}
              size={32}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <strong className={styles.dropTitle}>Drop your CSV here</strong>
            <span className={styles.dropMeta}>
              {fileName} · {fileSizeKb} KB
            </span>
            <span className={styles.dropHint}>
              .csv, .tsv, .xlsx — first row treated as headers
            </span>
          </div>
        ) : null}

        {step.key === "map" ? (
          <StaggerList as="ul" className={styles.mappingList}>
            {mappings.map((mapping) => (
              <li key={mapping.sourceColumn} className={styles.mappingRow}>
                <span className={styles.mappingSource}>{mapping.sourceColumn}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className={styles.mapArrow}
                  aria-hidden="true"
                />
                <span
                  className={styles.mappingTarget}
                  data-missing={mapping.targetField ? undefined : "true"}
                >
                  {mapping.targetField ?? "— skip —"}
                </span>
                <span
                  className={styles.mappingConfidence}
                  data-tone={
                    mapping.confidence >= 0.85
                      ? "high"
                      : mapping.confidence >= 0.6
                      ? "med"
                      : "low"
                  }
                >
                  <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" />
                  {Math.round(mapping.confidence * 100)}%
                </span>
              </li>
            ))}
          </StaggerList>
        ) : null}

        {step.key === "dedupe" ? (
          <div className={styles.dedupePanel}>
            <div className={styles.dedupeStat} data-tone="green">
              <span className={styles.dedupeLabel}>New leads</span>
              <strong>{newCount}</strong>
            </div>
            <div className={styles.dedupeStat} data-tone="amber">
              <span className={styles.dedupeLabel}>Duplicates</span>
              <strong>{dupeCount}</strong>
            </div>
            <p className={styles.dedupeCopy}>
              Dedup keys: email (case-insensitive) → phone (digits-only) →
              ABN. Duplicates merge into existing CRM records by default.
            </p>
          </div>
        ) : null}

        {step.key === "preview" ? (
          <DataTable<ImportPreviewRow>
            rows={[...previewRows]}
            columns={previewColumns}
            getRowId={(row) => row.id}
            density="compact"
            zebra
            kicker="Preview"
            caption={`First ${previewRows.length} rows ready to import`}
          />
        ) : null}

        {step.key === "done" ? (
          <div className={styles.doneBlock}>
            <Check size={28} strokeWidth={1.8} aria-hidden="true" />
            <strong>{newCount} leads imported</strong>
            <span>{dupeCount} duplicates merged into existing records.</span>
          </div>
        ) : null}
      </div>

      <footer className={styles.actions}>
        <span className={styles.actionsHint}>
          Step {stepIdx + 1} of {STEPS.length}
        </span>
        <button
          type="button"
          className={styles.advance}
          onClick={advance}
          disabled={stepIdx === STEPS.length - 1}
        >
          {stepIdx === STEPS.length - 1 ? "Done" : "Next"}
          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </footer>
    </section>
  )
}

export default LeadImportWizard
