import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ImportProgressBar } from "../../components/data-import"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Import progress bar | Data import",
  description:
    "Primitive 07 — Long-running import progress with rows/sec chip, ETA and pause/resume CTA.",
}

export default function ImportProgressBarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Import progress bar"
        title="Import progress bar"
        description="Long-running imports stream rows through the pipeline. The bar reports throughput, ETA and lets operators pause or resume — useful when a downstream supplier API is rate-limiting."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Import progress bar" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Parts catalog — running</span>
        <ImportProgressBar
          label="manta-parts-2026-05-28.csv"
          processedRows={478}
          totalRows={721}
          rowsPerSecond={36}
          etaLabel="~6.7s"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote history — paused</span>
        <ImportProgressBar
          label="quote-history-fy26-h2.json"
          processedRows={126}
          totalRows={268}
          rowsPerSecond={0}
          etaLabel="paused"
          isPaused
        />
      </section>
    </main>
  )
}
