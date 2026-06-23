import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BranchIndicator } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Branch indicator | UI Primitives — Code diff",
}

export default function BranchIndicatorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 05"
        title="Branch indicator"
        description="Compact branch chip with fork icon + ahead/behind counts + branch-protection badge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Branch indicator" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>All variants</span>
          <div className={styles.demoInline}>
            <BranchIndicator name="main" protection="admins-only" />
            <BranchIndicator name="develop" protection="review-required" ahead={0} behind={4} />
            <BranchIndicator
              name="feature/quote-instant-pricing"
              ahead={12}
              behind={2}
              protection="review-required"
            />
            <BranchIndicator name="feature/parts-3d-viewer" ahead={28} behind={1} />
            <BranchIndicator name="hotfix/bay-availability-sync" ahead={3} behind={0} />
            <BranchIndicator name="experiment/cohort-weighting" />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Protection tones map to intent: teal for review-required, red for admins-only, hidden
            for none. Ahead and behind chips only render when at least one is supplied — same chip
            also doubles as a visual hint that the branch needs a rebase.
          </p>
        </div>
      </section>
    </main>
  )
}
