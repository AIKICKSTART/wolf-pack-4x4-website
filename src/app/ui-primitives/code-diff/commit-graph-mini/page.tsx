import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CommitGraphMini } from "../../components/code-diff"
import type { CommitGraphNode } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Commit graph mini | UI Primitives — Code diff",
}

const NODES: ReadonlyArray<CommitGraphNode> = [
  { sha: "f01a2c30", lane: "main", branchLabel: "release/2026.05" },
  { sha: "e22b1a40", lane: "main" },
  { sha: "d8a09b55", lane: "feature", branchLabel: "feature/quote-instant-pricing" },
  { sha: "c61f2240", lane: "feature" },
  { sha: "b419a087", lane: "main", isMerge: true, branchLabel: "merge #476" },
  { sha: "a92f4c10", lane: "feature", branchLabel: "feature/parts-3d-viewer" },
  { sha: "8e5d2210", lane: "hotfix", branchLabel: "hotfix/bay-availability-sync" },
  { sha: "7a334cd2", lane: "main", isMerge: true, branchLabel: "merge hotfix" },
  { sha: "55ec01ab", lane: "main", branchLabel: "main" },
]

export default function CommitGraphMiniPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 13"
        title="Commit graph mini"
        description="Mini commit graph in SVG — colored lanes for main / feature / hotfix, dots per commit, merge chevrons, short-sha labels."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Commit graph mini" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Recent activity · oldest → newest</span>
          <CommitGraphMini nodes={NODES} title="Recent merges" />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The SVG is the source of truth — width grows with lane count, height grows per node.
            The viewBox is set so it scales cleanly into narrow side rails. Merge chevrons use the
            green tone so they stand out as resolution points, and labels include the short sha
            plus an optional branch label.
          </p>
        </div>
      </section>
    </main>
  )
}
