import type { Metadata } from "next"

import { StringExtractionRow } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { EXTRACTION_STRINGS } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "String extraction row | Localization",
  description:
    "Primitive 11 — source file row showing the strings detected for extraction, an extraction-status chip per string, and a suggested key for the translation catalogue.",
}

export default function StringExtractionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Tooling"
        title="String extraction row"
        description="What the i18n CLI surfaces for a single source file — the strings it detected, a status chip per string (detected, queued, extracted, ignored, needs-context), and a suggested key derived from the file path and component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "String extraction row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — src/app/workshop/booking/page.tsx</span>
        <StringExtractionRow
          filePath="src/app/workshop/booking/page.tsx"
          strings={EXTRACTION_STRINGS}
        />
      </section>
    </main>
  )
}
