import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SampleRowPreview } from "../../components/data-import"
import { PARTS_SAMPLE_ROW } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Sample row preview | Data import",
  description:
    "Primitive 09 — Single-row preview showing how a source row maps to target fields after transforms.",
}

export default function SampleRowPreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Sample row preview"
        title="Sample row preview"
        description="Pick a row and see exactly what it will look like after the mapping, type-coercion and transform pipeline runs. Flagged fields highlight values that will land empty or unusual."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Sample row preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Row 1 — VE Commodore cat-back</span>
        <SampleRowPreview
          rowNumberLabel="row 01 of 721"
          fields={PARTS_SAMPLE_ROW}
        />
      </section>
    </main>
  )
}
