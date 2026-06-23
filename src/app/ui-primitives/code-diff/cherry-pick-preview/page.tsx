import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CherryPickPreview } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Cherry-pick preview | UI Primitives — Code diff",
}

export default function CherryPickPreviewPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 14"
        title="Cherry-pick preview"
        description="Cherry-pick preview card — commit summary, target branch chip, predicted-conflict chip, apply + cancel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Cherry-pick preview" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Clean target</span>
          <CherryPickPreview
            commit={{
              sha: "8e5d2210ab",
              author: "Sophie Tan",
              message: "Fix bay-availability realtime sync — merge slot patches",
              timestamp: "2026-05-25 18:20 AEST",
            }}
            targetBranch="release/2026.05"
            conflictPrediction="clean"
          />
          <span className={styles.demoLabel}>Conflict predicted</span>
          <CherryPickPreview
            commit={{
              sha: "d6e0b88a4f",
              author: "Marcus Halverson",
              message: "Wire up quote-instant-pricing flag end-to-end",
              timestamp: "2026-05-26 09:42 AEST",
            }}
            targetBranch="hotfix/quote-instant-pricing-2026-05-stable"
            conflictPrediction="predicted"
          />
          <span className={styles.demoLabel}>Unknown</span>
          <CherryPickPreview
            commit={{
              sha: "a92f4c10df",
              author: "Jordan Pace",
              message: "Rebuild parts catalogue with 3D viewer",
              timestamp: "2026-05-24 16:08 AEST",
            }}
            targetBranch="experiment/cohort-weighting"
            conflictPrediction="unknown"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The conflict-prediction chip is the single most important glance — green if the cherry
            applies cleanly, red if a conflict is likely, muted if we couldn&apos;t reason about it
            (e.g. the target hasn&apos;t been fetched). Apply is the primary action, cancel
            secondary.
          </p>
        </div>
      </section>
    </main>
  )
}
