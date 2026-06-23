import type { Metadata } from "next"

import { MigrationImportCard } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import { MIGRATION_COUNTS } from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Migration import | System onboarding",
  description:
    "Primitive 08 — migration import card. Three states: idle source-picked, running mid-import, and failed with retry.",
}

export default function MigrationImportCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Optional / Migration"
        title="Migration import card"
        description="Lets the tenant bring their existing customers, vehicles, invoices and parts into Mufflermen — Illawarra TB is moving off MYOB AccountRight."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Migration import" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Idle — MYOB selected, ready to start</span>
        <MigrationImportCard
          kicker="Optional · Migration"
          title="Bring your MYOB history with you"
          description="We'll pull customers, vehicle records, invoice history and the parts catalogue into Mufflermen. The import keeps your audit trail intact."
          source="myob"
          counts={MIGRATION_COUNTS}
          status="idle"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Running — mid-import, ~72% through</span>
        <MigrationImportCard
          kicker="Optional · Migration"
          title="Importing 5,612 invoices from MYOB"
          description="Hermes is fanning out across customers, vehicles and invoices in parallel. You can keep using the rest of the workshop in the meantime."
          source="myob"
          counts={MIGRATION_COUNTS}
          status="running"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Failed — token expired mid-flight</span>
        <MigrationImportCard
          kicker="Optional · Migration"
          title="MYOB import failed"
          description="The MYOB API rejected the request at row 4,128. Looks like the API token expired mid-flight. Rotate it from MYOB and Hermes will resume from where it left off."
          source="myob"
          counts={MIGRATION_COUNTS}
          status="failed"
          progressPercent={64}
          errorMessage="MYOB · 401 Unauthorized — token expired at row 4,128 of 5,612. No data was lost — Hermes can resume after you rotate the token."
        />
      </section>
    </main>
  )
}
