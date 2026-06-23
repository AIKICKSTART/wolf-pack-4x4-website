import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ColumnMapper,
  CsvFilePreview,
  DryRunSummary,
  FieldTypeDetectorRow,
  ImportProgressBar,
  ImportSourcePicker,
  TransformRulesEditor,
  ValidationErrorsPanel,
} from "../../components/data-import"

import {
  AVAILABLE_TRANSFORMS,
  DRY_RUN_OUTCOMES,
  IMPORT_SOURCES,
  PARTS_CSV_HEADERS,
  PARTS_CSV_ROWS,
  PARTS_INITIAL_MAPPINGS,
  PARTS_SOURCE_COLUMNS,
  PARTS_TARGET_FIELDS,
  TRANSFORM_COLUMNS,
  VALIDATION_ERROR_CLASSES,
} from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Full data-import wizard | Data import",
  description:
    "Composition — five-step migration wizard: source pick, preview + types, mapping + transforms + validation, dry-run, and import progress.",
}

export default function FullWizardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full data-import wizard"
        title="Full data-import wizard"
        description="Every data-import primitive composed into a five-step migration flow. Pick a source, preview the file, map columns and define transforms, dry-run against the live catalog, then commit and watch the progress bar finish."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Full wizard" },
        ]}
      />

      <div className={styles.wizardSteps}>
        <section className={styles.wizardStep} aria-labelledby="step-1">
          <span className={styles.stepBadge} id="step-1">
            Step 1 / Choose source
          </span>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Source picker</span>
            <ImportSourcePicker options={IMPORT_SOURCES} initialKind="csv" />
          </div>
        </section>

        <section className={styles.wizardStep} aria-labelledby="step-2">
          <span className={styles.stepBadge} id="step-2">
            Step 2 / Preview file + detect types
          </span>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>CSV preview</span>
            <CsvFilePreview
              filename="manta-parts-2026-05-28.csv"
              headers={PARTS_CSV_HEADERS}
              rows={PARTS_CSV_ROWS}
              delimiter="comma"
              encoding="UTF-8"
              rowCountLabel="721 rows"
              byteSizeLabel="58.4 kB"
            />
          </div>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Detected types per column</span>
            <div className={styles.demoStack}>
              <FieldTypeDetectorRow
                columnName="SKU"
                detectedType="text"
                sampleValue="MFM-EX-2010-COMM"
              />
              <FieldTypeDetectorRow
                columnName="Title"
                detectedType="text"
                sampleValue="VE Commodore cat-back exhaust"
              />
              <FieldTypeDetectorRow
                columnName="Supplier"
                detectedType="text"
                sampleValue="Manta Performance"
              />
              <FieldTypeDetectorRow
                columnName="RRP"
                detectedType="number"
                sampleValue="1,498.00"
                override="currency"
              />
              <FieldTypeDetectorRow
                columnName="Stock"
                detectedType="number"
                sampleValue="6"
              />
            </div>
          </div>
        </section>

        <section className={styles.wizardStep} aria-labelledby="step-3">
          <span className={styles.stepBadge} id="step-3">
            Step 3 / Map columns, define transforms, review validation
          </span>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Column mapping</span>
            <ColumnMapper
              sources={PARTS_SOURCE_COLUMNS}
              targets={PARTS_TARGET_FIELDS}
              initialMappings={PARTS_INITIAL_MAPPINGS}
            />
          </div>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Transform pipelines</span>
            <TransformRulesEditor
              columns={TRANSFORM_COLUMNS}
              availableTransforms={AVAILABLE_TRANSFORMS}
            />
          </div>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Validation results</span>
            <ValidationErrorsPanel
              errorClasses={VALIDATION_ERROR_CLASSES}
              totalRows={721}
            />
          </div>
        </section>

        <section className={styles.wizardStep} aria-labelledby="step-4">
          <span className={styles.stepBadge} id="step-4">
            Step 4 / Dry-run
          </span>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Dry-run outcome</span>
            <DryRunSummary
              totalRows={721}
              outcomes={DRY_RUN_OUTCOMES}
              impactLabel="Net +482 parts, +196 updated, 19 quarantined"
              impactTone="warning"
              commitLabel="Commit 678 rows"
            />
          </div>
        </section>

        <section className={styles.wizardStep} aria-labelledby="step-5">
          <span className={styles.stepBadge} id="step-5">
            Step 5 / Commit + finalise
          </span>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Import progress</span>
            <ImportProgressBar
              label="manta-parts-2026-05-28.csv"
              processedRows={478}
              totalRows={721}
              rowsPerSecond={36}
              etaLabel="~6.7s"
            />
          </div>
          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Final dry-run for the operator’s sign-off</span>
            <DryRunSummary
              title="Final commit outcome"
              totalRows={721}
              outcomes={DRY_RUN_OUTCOMES}
              impactLabel="Ready to commit"
              impactTone="positive"
              commitLabel="Confirm & commit"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
