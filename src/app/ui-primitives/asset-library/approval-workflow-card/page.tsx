import type { Metadata } from "next"

import { ApprovalWorkflowCard } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_APPROVAL } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Approval workflow card | Asset Library",
  description:
    "Primitive 12 — approval workflow card with Draft → Review → Approved → Published stepper, reviewer avatars, and a thread.",
}

export default function ApprovalWorkflowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Approval"
        title="Approval workflow card"
        description="A consolidated view of where an asset sits in its review cycle. The stepper highlights the current stage, reviewers list their assigned step, and the thread captures the conversation across that review."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Approval workflow" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 560, marginInline: "auto" }}>
          <ApprovalWorkflowCard
            currentStep="approved"
            reviewers={DEMO_APPROVAL.reviewers}
            thread={DEMO_APPROVAL.thread}
          />
        </div>
      </section>
    </main>
  )
}
