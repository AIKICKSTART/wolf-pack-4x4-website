import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TranslationMemoryRow } from "../../components/localization-deep"

import { TRANSLATION_MEMORY_ROWS } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Translation memory row | Localization deep",
  description:
    "Primitive 11 — TM hit row with match score, fuzzy band, context note and reuse button.",
}

export default function TranslationMemoryRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Memory"
        title="Translation memory row"
        description="Surface fuzzy and exact translation memory hits next to the editor. Score is tone-coded (exact / high / fuzzy / low) and the segmented bar plus reuse CTA cut time-to-translate on repeat phrasing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Translation memory row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Translation memory hits · sorted by score</span>
        <div className={styles.stack}>
          {TRANSLATION_MEMORY_ROWS.map((row, index) => (
            <TranslationMemoryRow
              key={`${row.source}-${index}`}
              {...row}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
