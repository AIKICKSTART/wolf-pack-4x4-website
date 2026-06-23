import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PullRequestCard } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Pull request card | UI Primitives — Code diff",
}

export default function PullRequestCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 06"
        title="Pull request card"
        description="PR card — number, title, author, status chip, check rows, and reviewer avatars. Shown here in three states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Pull request card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Three PR states</span>
          <PullRequestCard
            number={482}
            title="Wire up quote-instant-pricing flag"
            author="Marcus Halverson"
            status="changes-requested"
            fromBranch="feature/quote-instant-pricing"
            toBranch="main"
            checks={[
              { name: "ci · unit", status: "passing", durationLabel: "1m 42s" },
              { name: "ci · e2e (Playwright)", status: "failing", durationLabel: "3m 18s" },
              { name: "ci · typecheck", status: "passing", durationLabel: "42s" },
              { name: "ci · lighthouse", status: "pending", durationLabel: "—" },
            ]}
            reviewers={[
              { name: "Sophie Tan", tone: "teal" },
              { name: "Jordan Pace", tone: "amber" },
              { name: "Ari Castellano", tone: "green" },
            ]}
          />
          <PullRequestCard
            number={476}
            title="Rebuild parts catalogue with 3D viewer"
            author="Jordan Pace"
            status="approved"
            fromBranch="feature/parts-3d-viewer"
            toBranch="main"
            checks={[
              { name: "ci · unit", status: "passing", durationLabel: "58s" },
              { name: "ci · visual regression", status: "passing", durationLabel: "1m 04s" },
              { name: "ci · bundle budget", status: "passing", durationLabel: "12s" },
            ]}
            reviewers={[
              { name: "Marcus Halverson", tone: "red" },
              { name: "Sophie Tan", tone: "teal" },
            ]}
          />
          <PullRequestCard
            number={488}
            title="Fix bay-availability realtime sync"
            author="Sophie Tan"
            status="draft"
            fromBranch="hotfix/bay-availability-sync"
            toBranch="main"
            checks={[
              { name: "ci · unit", status: "passing", durationLabel: "34s" },
              { name: "ci · integration", status: "skipped" },
            ]}
            reviewers={[{ name: "Marcus Halverson", tone: "red" }]}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each status chip has both a tone and an explicit label so it never carries meaning
            through colour alone. Check rows use icon roles for passing / failing / pending /
            skipped — pending pulses unless the user opts into reduced motion.
          </p>
        </div>
      </section>
    </main>
  )
}
