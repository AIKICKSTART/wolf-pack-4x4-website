import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ImportExportCard } from "../../components/localization-deep"

import { IMPORT_EXPORT_CARDS } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Import / export card | Localization deep",
  description:
    "Primitive 13 — XLIFF / CSV / JSON / PO / TMX import & export card with progress, stats and direction indicator.",
}

export default function ImportExportCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Exchange"
        title="Import / export card"
        description="Handles the vendor handoff path. The export card preserves the glossary lock; the import card validates incoming XLIFFs against the QA ruleset. The TMX variant keeps the translation memory in sync with vendors."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Import / export card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Production exchange operations</span>
        <div className={styles.stack}>
          {IMPORT_EXPORT_CARDS.map((card, index) => (
            <ImportExportCard
              key={`${card.operation}-${card.format}-${index}`}
              {...card}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
