import type { Metadata } from "next"

import { PipelineKanban } from "../../components/crm"
import { PageHeader } from "../../components/page-header"
import { MUFFLERMEN_DEALS } from "../demo-data"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Pipeline kanban | CRM",
  description:
    "Primitive 04 — five-column pipeline kanban with per-stage counts, total deal value, and selectable column headers.",
}

export default function PipelineKanbanScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Pipeline kanban"
        title="Pipeline kanban"
        description="Five-column deal pipeline — New, Qualified, Quoted, Verbal yes, Closed-won. Each column header shows the deal count and the total value across that stage, and is selectable to drill in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Pipeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <PipelineKanban deals={MUFFLERMEN_DEALS} />
      </section>
    </main>
  )
}
