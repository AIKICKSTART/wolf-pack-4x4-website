import type { Metadata } from "next"

import { TeamPresenceRail } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { TEAM } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Team presence rail | Unified inbox primitives",
  description:
    "Primitive 09 — team presence list with online / away / busy + current conversation count per teammate.",
}

export default function TeamPresenceRailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Presence"
        title="Team presence rail"
        description="Slack-style presence panel for the front desk. Tim and Mia online and ready, Daniel away (out grabbing parts), Ash busy on a wheel alignment, Bec offline. Workload chips show how many threads each teammate is juggling against their soft cap."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Team presence rail" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>5 teammates · 3 online</span>
        <TeamPresenceRail teammates={TEAM} />
      </section>
    </main>
  )
}
