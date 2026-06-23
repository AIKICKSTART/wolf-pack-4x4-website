import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkerStatusGrid } from "../../components/job-queue"
import { WORKERS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Worker status grid | Job Queue",
  description:
    "Primitive 03 — grid of worker pods showing uptime, current job, and capacity meter.",
}

export default function WorkerStatusGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Worker fleet"
        title="Worker status grid"
        description="Grid of the four oak-flats-worker pods — each card shows name, current state chip, uptime, current job, and a segmented concurrency meter so you can see how saturated each worker is."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Worker status grid" },
        ]}
      />
      <WorkerStatusGrid workers={WORKERS} />
    </main>
  )
}
