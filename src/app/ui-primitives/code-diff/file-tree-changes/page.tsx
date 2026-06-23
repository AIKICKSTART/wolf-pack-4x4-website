import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FileTreeChanges } from "../../components/code-diff"
import type { FileChange } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "File tree changes | UI Primitives — Code diff",
}

const FILES: ReadonlyArray<FileChange> = [
  { path: "apps/web/quote-instant-pricing.ts", kind: "modified", insertions: 28, deletions: 12 },
  { path: "apps/web/cohorts.ts", kind: "added", insertions: 64, deletions: 0 },
  { path: "apps/web/instant-quote.ts", kind: "modified", insertions: 9, deletions: 4 },
  { path: "apps/web/legacy-quote-v1.ts", kind: "deleted", insertions: 0, deletions: 142 },
  { path: "apps/web/quotes/pricing-helper.ts", kind: "renamed", insertions: 6, deletions: 6 },
  { path: "packages/feature-flags/quote-instant-pricing.json", kind: "added", insertions: 18, deletions: 0 },
  { path: "tests/quote-flow.spec.ts", kind: "modified", insertions: 34, deletions: 8 },
  { path: "tests/legacy-quote.spec.ts", kind: "deleted", insertions: 0, deletions: 96 },
]

export default function FileTreeChangesPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 09"
        title="File tree changes"
        description="Tree of changed files with status icon per file, per-file +/- counts, distribution bar, and total chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "File tree changes" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>PR #482 · feature/quote-instant-pricing → main</span>
          <FileTreeChanges
            files={FILES}
            selectedPath="apps/web/quote-instant-pricing.ts"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            File rows are a semantic <code>&lt;ol&gt;</code>. The distribution bar shows the ratio
            of insertions to deletions per file at a glance — 8 cells, weighted by total. Deleted
            files render with a strikethrough on the path.
          </p>
        </div>
      </section>
    </main>
  )
}
