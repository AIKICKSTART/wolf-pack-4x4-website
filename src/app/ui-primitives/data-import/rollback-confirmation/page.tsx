import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RollbackConfirmation } from "../../components/data-import"
import { ROLLBACK_CANDIDATES } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Rollback confirmation | Data import",
  description:
    "Primitive 08 — Rollback surface with undo windows and a confirmation phrase typed input.",
}

export default function RollbackConfirmationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Rollback confirmation"
        title="Rollback confirmation"
        description="Rollback is a one-way trip — the surface forces operators to pick the import explicitly and type the confirmation phrase. The CTA only arms when the phrase matches exactly."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Rollback confirmation" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Recent imports inside undo window</span>
        <RollbackConfirmation
          candidates={ROLLBACK_CANDIDATES}
          confirmationPhrase="rollback parts catalog"
        />
      </section>
    </main>
  )
}
