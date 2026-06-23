import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DeadLetterQueueCard } from "../../components/job-queue"
import { DEAD_LETTERS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Dead letter queue | Job Queue",
  description:
    "Primitive 09 — dead-letter queue card with count, oldest age, replay-all confirmation, per-message inspect.",
}

export default function DeadLetterQueueCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Dead letter"
        title="Dead letter queue card"
        description="Stranded jobs that exhausted every retry. Headlines the total stranded count and the age of the oldest message, then offers per-row inspect and a destructive replay-all CTA gated by a confirm dialog."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Dead letter queue" },
        ]}
      />
      <DeadLetterQueueCard
        count={47}
        oldestAge="9d 4h"
        samples={DEAD_LETTERS}
      />
    </main>
  )
}
