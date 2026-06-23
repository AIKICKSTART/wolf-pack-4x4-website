import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TaskPipelineVisualization } from "../../components/job-queue"
import { PIPELINE_NAME, PIPELINE_NODES } from "../_fixtures"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Task pipeline visualization | Job Queue",
  description:
    "Primitive 14 — multi-step async pipeline visualization with status and timing per step.",
}

export default function TaskPipelineVisualizationPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Pipeline canvas"
        title="Task pipeline visualization"
        description="Visualize a multi-step async pipeline on the shared WorkflowCanvas — each step renders as a numbered node with status chip and per-step timing. The currently running step takes aria-current so screen readers can announce progress."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Task pipeline visualization" },
        ]}
      />
      <TaskPipelineVisualization pipeline={PIPELINE_NAME} nodes={PIPELINE_NODES} />
    </main>
  )
}
