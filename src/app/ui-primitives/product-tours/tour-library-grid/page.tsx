import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TourLibraryGrid } from "../../components/product-tours"
import { SAMPLE_TOUR_LIBRARY } from "../fixtures"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Tour library grid | Product tours",
  description:
    "Primitive 11 — tour library grid with status, last-run, engagement chip and completion-trend sparkline per tour.",
}

export default function TourLibraryGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Library"
        title="Tour library grid"
        description="The library of every tour in the workspace. Status dot + label, last-run relative time, engagement chip, and a 10-point sparkline of recent completion rate."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Tour library grid" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen tour library · 6 entries</span>
        <TourLibraryGrid
          tours={SAMPLE_TOUR_LIBRARY}
          nowIso="2026-05-29T09:00:00+10:00"
        />
      </section>
    </main>
  )
}
