import type { Metadata } from "next"

import { LocaleCoverageMatrix } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { COVERAGE_FEATURES, COVERAGE_LOCALES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Locale coverage matrix | Localization",
  description:
    "Primitive 13 — feature × locale coverage matrix with cells for translated / partial / missing / N/A. Reads as a small dashboard for a programme manager.",
}

export default function LocaleCoverageScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Programme view"
        title="Locale coverage matrix"
        description="A compact matrix of workshop features against supported locales. Each cell shows translated, partial, missing, or N/A for that intersection. Useful for programme managers triaging which feature blocks which market launch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Locale coverage matrix" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — workshop programme snapshot</span>
        <LocaleCoverageMatrix
          locales={COVERAGE_LOCALES}
          features={COVERAGE_FEATURES}
        />
      </section>
    </main>
  )
}
