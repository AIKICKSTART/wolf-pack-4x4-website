import type { Metadata } from "next"

import { BackupSizeChart } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { SIZE_SAMPLES } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Backup size chart | Backups",
  description:
    "Primitive 04 — Stacked area chart showing daily backup size by kind, retention horizon marker, growth projection chip.",
}

export default function BackupSizeChartScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Backup size chart"
        title="Backup size chart"
        description="Stacked area chart layering full, differential, and incremental bytes per day, with a dashed retention-horizon marker and a projected size chip. Pure SVG, no chart library."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Backup size chart" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote DB · last 15 days</span>
        <BackupSizeChart
          samples={SIZE_SAMPLES}
          retentionHorizonIndex={7}
          growthProjectionBytes={22_500_000_000}
          title="Quote DB backup size"
        />
      </section>
    </main>
  )
}
