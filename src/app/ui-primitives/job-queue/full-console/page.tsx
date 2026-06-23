import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ConcurrencyLimitsCard,
  DeadLetterQueueCard,
  FailedJobsPanel,
  JobKindFilter,
  JobRow,
  JobTimingDistribution,
  PriorityQueueIndicator,
  QueueDepthChart,
  RetryPolicyEditor,
  ScheduledJobsUpcoming,
  TaskPipelineVisualization,
  WorkerAutoscaleMeter,
  WorkerStatusGrid,
} from "../../components/job-queue"
import { FailedJobRetryButtonDemo } from "../_interactive-demos"
import {
  CONCURRENCY_LIMITS,
  DEAD_LETTERS,
  FAILED_JOBS,
  JOB_ROWS,
  KIND_COUNTS,
  PIPELINE_NAME,
  PIPELINE_NODES,
  PRIORITY_BACKLOG,
  QUEUE_DEPTH_SERIES,
  QUEUE_DEPTH_TOTAL,
  QUEUE_DEPTH_X_LABELS,
  SCHEDULED,
  TIMING_BUCKETS,
  TIMING_CAPTION,
  TIMING_OUTLIERS,
  TIMING_PERCENTILES,
  WORKERS,
} from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Full queue console | Job Queue",
  description:
    "Bonus composition — every job queue primitive assembled into a single operational console.",
}

export default function FullQueueConsolePage() {
  return (
    <main className={styles.consoleMain}>
      <PageHeader
        kicker="Bonus / Full console"
        title="Mufflermen queue console"
        description="Every primitive in this lab assembled into a single operational console — live queue depth at the top, kind filter and priority lanes on the side, worker fleet and concurrency caps beneath, then in-flight jobs, failures, the DLQ, scheduled work, timing distribution, autoscale meter, and the pipeline canvas for the focal job kind."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Full console" },
        ]}
      />

      <section className={styles.consoleSection} aria-label="Live queue depth">
        <span className={styles.consoleSectionLabel}>Live queue depth</span>
        <div className={styles.splitMain}>
          <QueueDepthChart
            series={QUEUE_DEPTH_SERIES}
            xLabels={QUEUE_DEPTH_X_LABELS}
            currentTotal={QUEUE_DEPTH_TOTAL}
          />
          <div className={styles.stack}>
            <JobKindFilter
              options={KIND_COUNTS}
              initial={["quote-send-sms", "invoice-generate-pdf"]}
            />
            <PriorityQueueIndicator lanes={PRIORITY_BACKLOG} />
          </div>
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Workers and limits">
        <span className={styles.consoleSectionLabel}>Workers and limits</span>
        <div className={styles.gridTwo}>
          <WorkerStatusGrid workers={WORKERS} />
          <ConcurrencyLimitsCard limits={CONCURRENCY_LIMITS} />
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="In-flight jobs">
        <span className={styles.consoleSectionLabel}>In-flight jobs</span>
        <div className={styles.jobsTableWrap}>
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
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Failures and dead letters">
        <span className={styles.consoleSectionLabel}>Failures and dead letters</span>
        <div className={styles.gridTwo}>
          <FailedJobsPanel jobs={FAILED_JOBS} />
          <DeadLetterQueueCard
            count={47}
            oldestAge="9d 4h"
            samples={DEAD_LETTERS}
          />
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Scheduled and timing">
        <span className={styles.consoleSectionLabel}>Scheduled and timing</span>
        <div className={styles.gridTwo}>
          <ScheduledJobsUpcoming jobs={SCHEDULED} />
          <JobTimingDistribution
            buckets={TIMING_BUCKETS}
            percentiles={TIMING_PERCENTILES}
            outliers={TIMING_OUTLIERS}
            caption={TIMING_CAPTION}
          />
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Autoscale and pipeline">
        <span className={styles.consoleSectionLabel}>Autoscale and pipeline</span>
        <div className={styles.gridTwo}>
          <WorkerAutoscaleMeter
            current={4}
            target={6}
            ceiling={12}
            scaleOutCooldown="30s"
            scaleInCooldown="5m"
          />
          <TaskPipelineVisualization pipeline={PIPELINE_NAME} nodes={PIPELINE_NODES} />
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Retry policy and retry action">
        <span className={styles.consoleSectionLabel}>Retry policy and recovery</span>
        <div className={styles.gridTwo}>
          <RetryPolicyEditor
            initial={{
              maxAttempts: 5,
              backoff: "exponential",
              baseDelayMs: 500,
              maxDelayMs: 60_000,
              onError: "dead-letter",
            }}
          />
          <div className={styles.note}>
            <span>Recover failures</span>
            <p>
              Retry button paired with the failed-jobs context — opens a confirmation
              dialog and offers a retry-from-step picker so multi-step pipelines can
              resume mid-flow without redoing completed work.
            </p>
            <FailedJobRetryButtonDemo />
          </div>
        </div>
      </section>
    </main>
  )
}
