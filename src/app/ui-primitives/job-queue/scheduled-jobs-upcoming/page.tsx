import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScheduledJobsUpcoming } from "../../components/job-queue"
import { SCHEDULED } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Scheduled jobs | Job Queue",
  description:
    "Primitive 12 — upcoming scheduled jobs list with countdown timers and edit/cancel actions.",
}

export default function ScheduledJobsUpcomingPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Scheduled"
        title="Scheduled jobs upcoming"
        description="Upcoming scheduled jobs rendered as an ActivityFeed-style list, with a countdown next to the job title, the absolute fire time on the right, and per-row edit + cancel actions. Useful for cron-like and delayed workloads."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Scheduled jobs" },
        ]}
      />
      <ScheduledJobsUpcoming jobs={SCHEDULED} />
    </main>
  )
}
