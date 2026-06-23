import type { Metadata } from "next"

import { TableBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_ERROR, TABLE_BLOCK } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Table block | Block editor",
  description:
    "Primitive 03 — editable table with column resize, sortable headers, and cell formatting. Render, edit, and error states.",
}

export default function TableBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Table"
        title="Table block"
        description="BF Falcon dyno comparison — stock vs Manta 2.5″ twin — across RPM bands. Sortable RPM and kW columns, AUD currency formatting, and a row-add affordance in edit mode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <TableBlock data={TABLE_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · sort + add row
          </span>
          <TableBlock data={TABLE_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <TableBlock data={TABLE_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
