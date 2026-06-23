import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DateRangePresets } from "../../components/reports"
import { PRESETS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Date range presets | Reports",
  description:
    "Primitive 08 — quick chip row for Today, Yesterday, Last 7 days, This / Last month, Last quarter, YTD, Custom.",
}

export default function DateRangePresetsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Date range presets"
        title="Date range presets"
        description="A visual chip row sitting above the date-range picker — a single click jumps the active range to today, the rolling 7 days, the current month or fiscal year."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Date range presets" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <DateRangePresets presets={PRESETS} initialPresetId="last-7" />
      </section>
    </main>
  )
}
