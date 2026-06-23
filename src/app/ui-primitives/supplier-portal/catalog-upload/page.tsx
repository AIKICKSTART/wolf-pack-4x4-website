import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import type { ColumnMapping } from "../../components/data-import/column-mapper"
import type {
  CsvRowPreview,
  SourceColumnDescriptor,
  TargetFieldDescriptor,
} from "../../components/data-import/import-types"
import {
  CatalogUploadWizard,
  type CatalogUploadOutcomeEntry,
} from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Catalog upload wizard | UI Primitives — Supplier Portal",
}

const headers: ReadonlyArray<string> = [
  "supplier_sku",
  "title",
  "rrp_ex_gst",
  "lead_days",
]

const rows: ReadonlyArray<CsvRowPreview> = [
  {
    rowNumber: 1,
    cells: [
      { value: "MAN-RAM1500" },
      { value: "Manta RAM 1500 DT cat-back" },
      { value: "2490.00" },
      { value: "9" },
    ],
  },
  {
    rowNumber: 2,
    cells: [
      { value: "MAN-RANGER-RA" },
      { value: "Manta Ranger Next-Gen cat-back" },
      { value: "1799.00" },
      { value: "7" },
    ],
  },
  {
    rowNumber: 3,
    cells: [
      { value: "MAN-AMAROK-V6" },
      { value: "Manta Amarok V6 DPF-back" },
      { value: "1685.00" },
      { value: "12" },
    ],
  },
]

const sources: ReadonlyArray<SourceColumnDescriptor> = [
  { id: "supplier_sku", label: "supplier_sku", detected: "text", sample: "MAN-RAM1500" },
  { id: "title", label: "title", detected: "text", sample: "Manta RAM 1500 DT cat-back" },
  { id: "rrp_ex_gst", label: "rrp_ex_gst", detected: "currency", sample: "2490.00" },
  { id: "lead_days", label: "lead_days", detected: "number", sample: "9" },
]

const targets: ReadonlyArray<TargetFieldDescriptor> = [
  { id: "sku", label: "Catalog SKU", required: true },
  { id: "name", label: "Display name", required: true },
  { id: "rrp", label: "Suggested RRP", required: true },
  { id: "lead_time_days", label: "Lead time (days)" },
]

const initialMappings: ReadonlyArray<ColumnMapping> = [
  { sourceId: "supplier_sku", targetId: "sku", skip: false, confidence: 96, confidenceTone: "high" },
  { sourceId: "title", targetId: "name", skip: false, confidence: 92, confidenceTone: "high" },
  { sourceId: "rrp_ex_gst", targetId: "rrp", skip: false, confidence: 84, confidenceTone: "medium" },
  { sourceId: "lead_days", targetId: "lead_time_days", skip: false, confidence: 88, confidenceTone: "high" },
]

const outcomes: ReadonlyArray<CatalogUploadOutcomeEntry> = [
  { label: "New SKUs", count: 3, tone: "create" },
  { label: "Updates", count: 0, tone: "update" },
  { label: "Skipped", count: 0, tone: "skip" },
  { label: "Failed", count: 0, tone: "fail" },
]

export default function CatalogUploadPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.08 / Supplier portal"
        title="Catalog upload wizard"
        description="Three-step wizard a supplier uses to drop in a CSV, map columns onto Oak Flats catalog fields and review the dry run."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Catalog upload" },
        ]}
      />
      <section className={styles.canvas}>
        <CatalogUploadWizard
          filename="manta-may-2026.csv"
          headers={headers}
          rows={rows}
          sources={sources}
          targets={targets}
          initialMappings={initialMappings}
          outcomes={outcomes}
        />
      </section>
    </main>
  )
}
