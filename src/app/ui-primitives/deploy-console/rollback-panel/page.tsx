import type { Metadata } from "next"

import { RollbackPanel } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { REVISIONS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Rollback panel | Deploy console",
  description:
    "Primitive 04 — revision picker with diff preview and a one-click rollback action.",
}

export default function RollbackPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Rollback"
        title="Rollback panel"
        description="Revision radiogroup, sha + author + diff for each row. The current live revision is locked, the default selection is the most recent stable revision. Footer renders a synthetic unified-diff preview and the rollback CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Rollback panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · default · stable v3.42.6 pre-selected</span>
        <RollbackPanel revisions={REVISIONS} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · forced selection · target the hotfix predecessor</span>
        <RollbackPanel revisions={REVISIONS} initialTargetId="rev-003" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · target a failed revision (still selectable, gate would reject)</span>
        <RollbackPanel revisions={REVISIONS} initialTargetId="rev-006" />
      </section>
    </main>
  )
}
