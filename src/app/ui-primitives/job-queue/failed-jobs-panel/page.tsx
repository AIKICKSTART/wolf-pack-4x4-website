import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FailedJobsPanel } from "../../components/job-queue"
import { FAILED_JOBS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Failed jobs panel | Job Queue",
  description:
    "Primitive 05 — recent failures with error class chip, stack-trace expand, retry/discard.",
}

export default function FailedJobsPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Failed jobs"
        title="Failed jobs panel"
        description="Recent failures across all queues — expand a row to see the stack trace, retry one cleanly, or discard it permanently. Wraps the shared DataTable + CodeBlock primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Failed jobs panel" },
        ]}
      />
      <FailedJobsPanel jobs={FAILED_JOBS} />
    </main>
  )
}
