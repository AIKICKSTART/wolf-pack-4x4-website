import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PriorityQueueIndicator } from "../../components/job-queue"
import { PRIORITY_BACKLOG } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Priority queue indicator | Job Queue",
  description:
    "Primitive 11 — high / normal / low chips with backlog count per priority lane.",
}

export default function PriorityQueueIndicatorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Priority lanes"
        title="Priority queue indicator"
        description="Compact card showing the backlog count in each priority lane — high (red), normal (amber), low (teal). Sits well as a side panel beside the queue depth chart."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Priority queue indicator" },
        ]}
      />
      <PriorityQueueIndicator lanes={PRIORITY_BACKLOG} />
    </main>
  )
}
