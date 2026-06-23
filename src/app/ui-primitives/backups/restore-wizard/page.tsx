import type { Metadata } from "next"

import { RestoreWizard } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { RESTORE_IMPACT, RESTORE_TARGETS, SNAPSHOTS } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Restore wizard | Backups",
  description:
    "Primitive 03 — 4-step restore wizard with stepper, snapshot picker, target picker, impact review, and confirmation gate.",
}

export default function RestoreWizardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Restore wizard"
        title="Restore wizard"
        description="Four-step wizard with a progress stepper at the top. Step 1 picks a snapshot, step 2 picks a restore target, step 3 reviews impact, and step 4 confirms. Back navigation works at each step."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Restore wizard" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote DB restore</span>
        <RestoreWizard
          snapshots={SNAPSHOTS.filter((s) => s.status === "successful")}
          targets={RESTORE_TARGETS}
          impactSummary={RESTORE_IMPACT}
        />
      </section>
    </main>
  )
}
