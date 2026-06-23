import type { Metadata } from "next"

import { AssignToCard } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { TEAM } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Assign-to card | Unified inbox primitives",
  description:
    "Primitive 04 — assignee picker with avatar, presence dot and workload chip; single-select with unassign action.",
}

export default function AssignToCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Assign"
        title="Assign-to card"
        description="Pick the teammate that owns this conversation. Workload chip tracks open conversations against capacity — green when there's headroom, amber when nearly full, red when at the cap. Clicking the active row again unassigns; the explicit Unassign button is shown when an assignee is selected."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Assign-to card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Tim pre-selected · 5 teammates</span>
        <AssignToCard teammates={TEAM} assigneeId="tim" />
      </section>
    </main>
  )
}
