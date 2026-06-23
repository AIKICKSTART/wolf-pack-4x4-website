import type { Metadata } from "next"

import { ApprovalStageTracker } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { APPROVAL_STAGES } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Approval stage tracker | Muffler Pulse",
  description:
    "Primitive 12 — multi-stage approval pipeline (draft → Daniel → Mia → scheduled).",
}

export default function ApprovalStageTrackerPage() {
  const allApproved = APPROVAL_STAGES.map((stage) => ({
    ...stage,
    state: "approved" as const,
    completedAt: "2026-05-29T09:00:00+10:00",
  }))

  const rejected = APPROVAL_STAGES.map((stage, idx) => {
    if (idx === 2)
      return {
        ...stage,
        state: "rejected" as const,
        note: "Brand voice issue — \"aviator\" sounds aspirational, not workshop. Rework tomorrow.",
      }
    if (idx === 3) return { ...stage, state: "pending" as const }
    return stage
  })

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Approval tracker"
        title="Approval stage tracker"
        description="The publish pipeline at a glance — draft, Daniel's admin review, Mia's brand pass, and Muffler Pulse's schedule fire. Current stage glows, completed stages are checked, rejected stages route back to the team."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Approval tracker" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Mid-flight (Mia reviewing)</span>
        <ApprovalStageTracker stages={APPROVAL_STAGES} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Cleared for queue</span>
        <ApprovalStageTracker title="Cleared" stages={allApproved} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Rejected at brand pass</span>
        <ApprovalStageTracker title="Rework required" stages={rejected} />
      </section>
    </main>
  )
}
