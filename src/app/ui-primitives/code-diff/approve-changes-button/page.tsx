import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApproveChangesButton } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Approve changes button | UI Primitives — Code diff",
}

export default function ApproveChangesButtonPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 12"
        title="Approve changes button"
        description="Three-up verdict — Approve / Request changes / Comment. Tone changes on press; required-by-policy chip when branch protection demands review."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Approve changes button" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>PR #482 · default state, no verdict selected</span>
          <ApproveChangesButton
            policy="review-required"
            approvalsRequired={2}
          />
          <span className={styles.demoLabel}>PR #476 · pre-pressed Approve</span>
          <ApproveChangesButton
            policy="review-required"
            approvalsRequired={1}
            initialVerdict="approve"
          />
          <span className={styles.demoLabel}>PR #488 · pre-pressed Request changes</span>
          <ApproveChangesButton
            policy="admins-only"
            approvalsRequired={3}
            initialVerdict="request-changes"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each verdict button uses <code>aria-pressed</code> so the selected verdict announces
            unambiguously. The policy chip explains why a verdict is required — review-required for
            normal protected branches, admins-only for main.
          </p>
        </div>
      </section>
    </main>
  )
}
