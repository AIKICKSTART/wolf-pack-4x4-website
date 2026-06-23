import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CommitCard } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Commit card | UI Primitives — Code diff",
}

export default function CommitCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 04"
        title="Commit card"
        description="Single commit summary — short sha, author avatar, message, body, branch chip, signed-status chip, and trailing action group."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Commit card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Recent commits · feature/quote-instant-pricing</span>
          <CommitCard
            authorTone="red"
            commit={{
              sha: "d6e0b88a4f12c3e2",
              author: "Marcus Halverson",
              authorEmail: "marcus.halverson@mufflermen.com.au",
              message: "Wire up quote-instant-pricing flag end-to-end",
              body: "Reads the cohort from resolveCohort() and threads it through to instantQuote(). Falls back to legacyQuote() when the flag is off. Removed the now-dead pricing-v1 branch.",
              branch: "feature/quote-instant-pricing",
              signed: true,
              timestamp: "2026-05-26 09:42 AEST",
            }}
            actions={[
              { label: "Revert" },
              { label: "Cherry-pick" },
              { label: "View" },
            ]}
          />
          <CommitCard
            authorTone="amber"
            commit={{
              sha: "a09bf421df",
              author: "Jordan Pace",
              authorEmail: "jordan.pace@mufflermen.com.au",
              message: "Rebuild parts catalogue with 3D viewer",
              body: "Introduces PartsViewer3D as the default surface, with PartsList as the reduced-motion fallback. Removes the legacy ThumbnailGrid.",
              branch: "feature/parts-3d-viewer",
              signed: false,
              timestamp: "2026-05-24 16:08 AEST",
            }}
            actions={[
              { label: "Revert" },
              { label: "View" },
            ]}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The short sha is computed from the supplied full sha so callers can pass either form.
            Signed status is a hard chip rather than a tooltip so screen readers announce it. Each
            commit card is wrapped in its own region with an aria-label combining sha + author.
          </p>
        </div>
      </section>
    </main>
  )
}
