import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FieldMappingSuggestion } from "../../components/data-import"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Field mapping suggestion | Data import",
  description:
    "Primitive 13 — AI suggestion banner with confidence chip and accept/reject CTAs.",
}

export default function FieldMappingSuggestionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Field mapping suggestion"
        title="Field mapping suggestion"
        description="When the heuristic matcher and the LLM agree, the banner offers a suggestion with a confidence chip. Operators stay in the loop — every suggestion has an explicit accept or reject CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Field mapping suggestion" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>High-confidence parts mapping</span>
        <FieldMappingSuggestion
          sourceColumn="Manta SKU"
          targetField="Part Number"
          confidencePercent={97}
          confidenceTone="high"
          reasoning="Both fields are unique short strings and shared 612 of 721 values with an existing catalog."
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Medium-confidence customer mapping</span>
        <FieldMappingSuggestion
          sourceColumn="Mobile"
          targetField="Primary phone"
          confidencePercent={74}
          confidenceTone="medium"
          reasoning="Sample values match Australian mobile patterns but the column header is ambiguous."
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Low-confidence suburb mapping</span>
        <FieldMappingSuggestion
          sourceColumn="Loc"
          targetField="Suburb"
          confidencePercent={48}
          confidenceTone="low"
          reasoning="Only 31% of sample values match a known suburb in our catalog."
        />
      </section>
    </main>
  )
}
