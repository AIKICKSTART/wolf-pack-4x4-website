import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ImportSourcePicker } from "../../components/data-import"
import { IMPORT_SOURCES } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Import source picker | Data import",
  description:
    "Primitive 01 — Source picker: CSV, Excel, JSON, Sheets, Airtable, direct DB, webhook. Card grid with icon, description and selection state.",
}

export default function ImportSourcePickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Import source picker"
        title="Import source picker"
        description="Pick where the import is coming from. Each card shows a glyph, a description, and a hint chip. The radio group is keyboard-driven and announces selection to assistive tech."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Import source picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ImportSourcePicker options={IMPORT_SOURCES} initialKind="csv" />
      </section>
    </main>
  )
}
