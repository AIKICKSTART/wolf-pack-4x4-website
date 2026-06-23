import type { Metadata } from "next"

import { NumberFormatDemo } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { NUMBER_LOCALES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Number format demo | Localization",
  description:
    "Primitive 05 — same number rendered with locale-aware separators, plus distance, weight, and temperature with Intl.NumberFormat unit style.",
}

export default function NumberFormatScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Intl"
        title="Number format demo"
        description="A single quote — 1,234,567.89 — and three workshop measurements (348 km, 24.5 kg, 32 °C) rendered with each locale's grouping separator, decimal mark, and unit display."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Number format demo" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Intl.NumberFormat unit style</span>
        <NumberFormatDemo
          amount={1234567.89}
          distanceKm={348}
          weightKg={24.5}
          temperatureC={32}
          locales={NUMBER_LOCALES}
        />
      </section>
    </main>
  )
}
