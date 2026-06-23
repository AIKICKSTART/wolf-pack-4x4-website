import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuditTrailRail } from "../../components/workflow-engine"

import { QUOTE_AUDIT_ENTRIES } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Audit trail rail | Workflow engine",
  description:
    "Primitive 13 — workflow audit trail rail with create / edit / publish / disable / approve / revert events.",
}

export default function AuditTrailRailScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Audit"
        title="Audit trail rail"
        description="The compliance backbone. Every change to a workflow — created, edited, published, disabled, approved, reverted — lands as a timestamped entry on the rail. Hermes drafts and reverts show up too, so there's never a mystery about who shipped what."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Audit trail rail" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Quote follow-up · 30-day audit trail
        </span>
        <AuditTrailRail
          kicker="Quote follow-up · v3.x"
          title="Audit trail"
          entries={QUOTE_AUDIT_ENTRIES}
        />
      </section>
    </main>
  )
}
