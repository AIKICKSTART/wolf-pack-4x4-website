import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QueueDepthChart } from "../../components/job-queue"
import { QUEUE_DEPTH_SERIES, QUEUE_DEPTH_TOTAL, QUEUE_DEPTH_X_LABELS } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Queue depth chart | Job Queue",
  description: "Primitive 02 — live queue depth area chart with multiple priority lanes overlaid.",
}

export default function QueueDepthChartPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Queue depth"
        title="Queue depth chart"
        description="Live area chart of queue depth across the high / normal / low priority lanes. Total in-flight count headlines the card, with a stacked area chart showing the last 55 minutes of samples."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Queue depth chart" },
        ]}
      />
      <QueueDepthChart
        series={QUEUE_DEPTH_SERIES}
        xLabels={QUEUE_DEPTH_X_LABELS}
        currentTotal={QUEUE_DEPTH_TOTAL}
      />
    </main>
  )
}
