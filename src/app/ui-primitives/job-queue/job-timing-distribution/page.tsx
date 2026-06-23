import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { JobTimingDistribution } from "../../components/job-queue"
import {
  TIMING_BUCKETS,
  TIMING_CAPTION,
  TIMING_OUTLIERS,
  TIMING_PERCENTILES,
} from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Timing distribution | Job Queue",
  description:
    "Primitive 08 — histogram of job durations with p50 / p90 / p99 percentile readouts and outlier chips.",
}

export default function JobTimingDistributionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Timing distribution"
        title="Job timing distribution"
        description="Histogram of execution times for a single job kind, with p50 / p90 / p99 percentile readouts and chips for the slowest outliers worth investigating."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Timing distribution" },
        ]}
      />
      <JobTimingDistribution
        buckets={TIMING_BUCKETS}
        percentiles={TIMING_PERCENTILES}
        outliers={TIMING_OUTLIERS}
        caption={TIMING_CAPTION}
      />
    </main>
  )
}
