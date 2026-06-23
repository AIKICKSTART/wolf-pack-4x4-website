import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CsvFilePreview } from "../../components/data-import"
import {
  CUSTOMER_CSV_HEADERS,
  CUSTOMER_CSV_ROWS,
  PARTS_CSV_HEADERS,
  PARTS_CSV_ROWS,
} from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "CSV file preview | Data import",
  description:
    "Primitive 02 — Preview pane with first 10 rows, auto-detected header, delimiter chip and encoding chip.",
}

export default function CsvFilePreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / CSV file preview"
        title="CSV file preview"
        description="Read-only preview of the first 10 rows of an uploaded file. Header row is auto-detected; delimiter and encoding chips surface the assumptions the parser made."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "CSV file preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Parts catalog CSV</span>
        <CsvFilePreview
          filename="manta-parts-2026-05-28.csv"
          headers={PARTS_CSV_HEADERS}
          rows={PARTS_CSV_ROWS}
          delimiter="comma"
          encoding="UTF-8"
          rowCountLabel="721 rows"
          byteSizeLabel="58.4 kB"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Customer book CSV (legacy Windows export)</span>
        <CsvFilePreview
          filename="loyalty-customers-Q2-2026.csv"
          headers={CUSTOMER_CSV_HEADERS}
          rows={CUSTOMER_CSV_ROWS}
          delimiter="semicolon"
          encoding="Windows-1252"
          rowCountLabel="1,412 rows"
          byteSizeLabel="146 kB"
        />
      </section>
    </main>
  )
}
