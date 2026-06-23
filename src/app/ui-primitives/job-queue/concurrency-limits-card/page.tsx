import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConcurrencyLimitsCard } from "../../components/job-queue"
import { CONCURRENCY_LIMITS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Concurrency limits | Job Queue",
  description:
    "Primitive 07 — per-queue concurrency cap with current usage meter and adjust slider.",
}

export default function ConcurrencyLimitsCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Concurrency caps"
        title="Concurrency limits"
        description="Per-queue concurrency caps with a live usage meter and an adjust slider. The progress bar shifts tone as the queue saturates."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Concurrency limits" },
        ]}
      />
      <ConcurrencyLimitsCard limits={CONCURRENCY_LIMITS} />
    </main>
  )
}
