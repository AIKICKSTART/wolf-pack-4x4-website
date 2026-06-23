import type { Metadata } from "next"

import { VoteDot } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Vote dot | UI Primitives - Whiteboard",
}

export default function VoteDotPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 13"
        title="Vote dot"
        description="Numbered voting stamp for whiteboard prioritisation, with size, tone and pulse variants."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Vote dot" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Dot-voting variants</span>
          <div className={styles.demoRowJustified}>
            <VoteDot count={3} size="sm" tone="teal" />
            <VoteDot count={8} tone="red" pulse />
            <VoteDot count={12} size="lg" tone="amber" />
            <VoteDot count={5} size="lg" tone="purple" />
          </div>
        </div>
      </section>
    </main>
  )
}
