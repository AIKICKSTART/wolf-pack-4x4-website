import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { JobRetryButtonDemo } from "../_interactive-demos"
import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Job retry button | Job Queue",
  description:
    "Primitive 06 — retry button with confirmation modal and retry-from-step picker for multi-step pipelines.",
}

export default function JobRetryButtonPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Retry button"
        title="Job retry button"
        description="Retry control for a single job. Opens a confirmation dialog before re-enqueueing, and exposes an optional retry-from-step picker so multi-step pipelines can resume mid-flow without redoing completed work."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Job retry button" },
        ]}
      />
      <div className={styles.stack}>
        <JobRetryButtonDemo />
      </div>
    </main>
  )
}
