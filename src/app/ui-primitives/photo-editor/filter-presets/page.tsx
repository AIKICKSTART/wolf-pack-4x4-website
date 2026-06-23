import type { Metadata } from "next"

import { FilterPresetsGrid } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Filter presets | Photo editor",
  description:
    "Primitive 07 — filter preset thumbnail grid for Workshop, Vintage, B&W, High contrast and Sepia treatments, with a strength slider for the active preset.",
}

export default function FilterPresetsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Filter presets"
        title="Filter presets grid"
        description="Each preset preview applies a real CSS filter (saturate / contrast / hue-rotate / sepia / grayscale) to a generated source thumb so the panel scans as five comparative grades. Active preset is outlined, the strength slider drives the bottom row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Filter presets" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · workshop active · 78% strength</span>
        <FilterPresetsGrid activeId="workshop" sourceLabel="Hilux dyno" strength={0.78} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta exhaust closeup · high contrast · 62%</span>
        <FilterPresetsGrid activeId="high-contrast" sourceLabel="Manta closeup" strength={0.62} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · B&W · 100%</span>
        <FilterPresetsGrid activeId="bw" sourceLabel="Bay 2 hero" strength={1} />
      </section>
    </main>
  )
}
