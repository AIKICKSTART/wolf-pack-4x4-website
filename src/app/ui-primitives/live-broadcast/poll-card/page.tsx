import type { Metadata } from "next"

import { PollCard } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { POLL_CLOSED, POLL_OPEN } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Poll card | Live broadcast",
  description:
    "Primitive 09 — live poll card with vote bars, percentages, close button, countdown timer, and locked closed result.",
}

const POLL_HOST = {
  ...POLL_OPEN,
  id: "poll-host",
  selectedOptionId: undefined,
}

export default function PollCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Poll card"
        title="Poll card"
        description="Viewer-facing live poll with vote bars and percentages. Host mode exposes the close button; closed polls lock votes and display final results."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Poll card" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Open · viewer voted &ldquo;V8 snarl&rdquo;</span>
          <PollCard poll={POLL_OPEN} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Host controls · close button shown</span>
          <PollCard poll={POLL_HOST} showHostControls />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Closed · final result locked</span>
          <PollCard poll={POLL_CLOSED} />
        </div>
      </section>
    </main>
  )
}
