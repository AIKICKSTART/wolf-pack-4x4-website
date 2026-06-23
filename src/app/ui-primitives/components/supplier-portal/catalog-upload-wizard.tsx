"use client"

import { useState, type ReactNode } from "react"
import { FileSpreadsheet, Layers, ListChecks } from "lucide-react"

import { ColumnMapper, type ColumnMapping } from "../data-import/column-mapper"
import { CsvFilePreview } from "../data-import/csv-file-preview"
import { DryRunSummary } from "../data-import/dry-run-summary"
import type {
  CsvRowPreview,
  SourceColumnDescriptor,
  TargetFieldDescriptor,
} from "../data-import/import-types"
import { ProcessSteps, type ProcessStep } from "../marketing/process-steps"

import styles from "./catalog-upload-wizard.module.css"

export type CatalogUploadStepId = "upload" | "map" | "review"

export interface CatalogUploadOutcomeEntry {
  label: string
  count: number
  tone: "create" | "update" | "skip" | "fail"
}

export interface CatalogUploadWizardProps {
  /** Step the wizard starts on. Defaults to "upload". */
  defaultStep?: CatalogUploadStepId
  /** Filename being uploaded — header decoration only. */
  filename: string
  headers: ReadonlyArray<string>
  rows: ReadonlyArray<CsvRowPreview>
  sources: ReadonlyArray<SourceColumnDescriptor>
  targets: ReadonlyArray<TargetFieldDescriptor>
  initialMappings: ReadonlyArray<ColumnMapping>
  outcomes: ReadonlyArray<CatalogUploadOutcomeEntry>
  onImport?: () => void
}

const STEP_ICONS: Record<CatalogUploadStepId, ReactNode> = {
  upload: <FileSpreadsheet size={18} aria-hidden="true" />,
  map: <Layers size={18} aria-hidden="true" />,
  review: <ListChecks size={18} aria-hidden="true" />,
}

const STEPS: ReadonlyArray<ProcessStep> = [
  {
    id: "upload",
    icon: STEP_ICONS.upload,
    title: "Upload CSV",
    body: "Drop a Manta- or Magnaflow-formatted CSV to seed the import preview.",
  },
  {
    id: "map",
    icon: STEP_ICONS.map,
    title: "Map columns",
    body: "Auto-match supplier columns onto Oak Flats catalog fields, then tweak.",
  },
  {
    id: "review",
    icon: STEP_ICONS.review,
    title: "Review + import",
    body: "Confirm the dry run, watch validation outcomes, then commit the catalog.",
  },
]

export function CatalogUploadWizard({
  defaultStep = "upload",
  filename,
  headers,
  rows,
  sources,
  targets,
  initialMappings,
  outcomes,
  onImport,
}: CatalogUploadWizardProps) {
  const [step, setStep] = useState<CatalogUploadStepId>(defaultStep)

  return (
    <section
      className={styles.wizard}
      role="region"
      aria-label="Catalog upload wizard"
    >
      <ProcessSteps
        kicker="Catalog upload"
        heading="3-step catalog import"
        body="One supplier CSV per import — Oak Flats reconciles SKUs nightly."
        steps={STEPS}
      />

      <nav className={styles.stepTabs} aria-label="Wizard steps">
        {STEPS.map((entry, index) => {
          const id = entry.id as CatalogUploadStepId
          const active = step === id
          return (
            <button
              key={entry.id}
              type="button"
              className={`${styles.stepTab} ${active ? styles.stepTabOn : ""}`}
              aria-current={active ? "step" : undefined}
              onClick={() => setStep(id)}
            >
              <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.stepTitle}>{entry.title}</span>
            </button>
          )
        })}
      </nav>

      <div className={styles.panel}>
        {step === "upload" ? (
          <CsvFilePreview
            filename={filename}
            headers={headers}
            rows={rows}
            encoding="UTF-8"
            delimiter="comma"
            rowCountLabel={`${rows.length} sample rows`}
            byteSizeLabel="2.1 MB · supplier CSV"
          />
        ) : null}

        {step === "map" ? (
          <ColumnMapper
            sources={sources}
            targets={targets}
            initialMappings={initialMappings}
          />
        ) : null}

        {step === "review" ? (
          <div className={styles.reviewPanel}>
            <DryRunSummary
              totalRows={rows.length}
              outcomes={outcomes}
              impactLabel="Net change · catalog ready"
              impactTone="positive"
              commitLabel="Import catalog"
              onCommit={() => onImport?.()}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default CatalogUploadWizard
