import type { Metadata } from "next"

import { BranchPreviewDeck } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { BRANCH_PREVIEWS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Branch preview deck | Deploy console",
  description:
    "Primitive 06 — preview-URL card per branch with thumbnail, head sha and share controls.",
}

const HOTFIX_ONLY = BRANCH_PREVIEWS.filter((preview) => preview.kind !== "main").slice(0, 3)
const TRUNK_AND_RELEASE = BRANCH_PREVIEWS.filter(
  (preview) => preview.kind === "main" || preview.kind === "release",
)

export default function BranchPreviewDeckScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Deck"
        title="Branch preview deck"
        description="Per-branch deploy preview. Each card includes a placeholder screenshot, branch + head sha + commits ahead + author/time, plus Open preview and Share link controls. Tone hints the branch kind (trunk / feature / hotfix / release)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Branch preview deck" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · all active previews · trunk + 4 branches</span>
        <BranchPreviewDeck previews={BRANCH_PREVIEWS} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · hotfix + feature work only</span>
        <BranchPreviewDeck
          previews={HOTFIX_ONLY}
          caption="In-flight branches"
          kicker="Awaiting review"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · trunk + release candidate</span>
        <BranchPreviewDeck
          previews={TRUNK_AND_RELEASE}
          caption="Promotable previews"
          kicker="Release candidates"
        />
      </section>
    </main>
  )
}
