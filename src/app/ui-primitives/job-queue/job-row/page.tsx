import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { JobRow } from "../../components/job-queue"
import { JOB_ROWS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Job row | Job Queue",
  description:
    "Primitive 01 — single job row in a semantic table. Id + queue, kind chip, status chip, duration chip, attempt count, view-payload + retry actions.",
}

export default function JobRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Job row"
        title="Job rows"
        description="A single async job rendered as a semantic table row — id with queue label, kind chip, status chip, duration chip, attempt count, and view-payload + retry actions. Tone shifts subtly when a row is running or failed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Job row" },
        ]}
      />
      <section className={styles.jobsTableWrap} aria-label="Job row showcase">
        <div className={styles.jobsCaption}>
          <span className={styles.jobsCaptionKicker}>Live jobs</span>
          <span className={styles.jobsCaptionText}>{JOB_ROWS.length} in flight</span>
        </div>
        <table className={styles.jobsTable}>
          <thead>
            <tr>
              <th scope="col">Job</th>
              <th scope="col">Kind</th>
              <th scope="col">Status</th>
              <th scope="col">Duration</th>
              <th scope="col">Attempts</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {JOB_ROWS.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
