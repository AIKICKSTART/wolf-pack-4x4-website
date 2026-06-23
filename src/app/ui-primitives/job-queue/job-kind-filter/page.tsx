import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { JobKindFilter } from "../../components/job-queue"
import { KIND_COUNTS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Job kind filter | Job Queue",
  description:
    "Primitive 10 — filter chips by job kind with selected-count chip showing total covered jobs.",
}

export default function JobKindFilterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Kind filter"
        title="Job kind filter"
        description="Multi-select filter chips for narrowing the queue view by job kind. Each chip shows its active count, and a summary chip in the header shows the running total of jobs covered by the current selection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Job kind filter" },
        ]}
      />
      <JobKindFilter options={KIND_COUNTS} />
    </main>
  )
}
