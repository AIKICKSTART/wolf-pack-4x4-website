import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DryRunSummary } from "../../components/data-import"
import { DRY_RUN_OUTCOMES } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Dry-run summary | Data import",
  description:
    "Primitive 06 — Dry-run outcome tiles, impact chip and commit CTA. No writes performed yet.",
}

export default function DryRunSummaryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Dry-run summary"
        title="Dry-run summary"
        description="Before any writes happen, the dry-run replays the import in shadow mode and reports what would land. Tiles split into create / update / skip / fail; the impact chip rolls up the net effect."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Dry-run summary" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Parts catalog dry-run</span>
        <DryRunSummary
          totalRows={721}
          outcomes={DRY_RUN_OUTCOMES}
          impactLabel="Net +482 parts, +196 updated, 19 quarantined"
          impactTone="warning"
          commitLabel="Commit 678 rows"
        />
      </section>
    </main>
  )
}
