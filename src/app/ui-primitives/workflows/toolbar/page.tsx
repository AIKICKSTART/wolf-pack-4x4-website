import type { Metadata } from "next"

import { WorkflowToolbar } from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Workflow toolbar | Workflows",
  description:
    "Primitive 14 — Top toolbar above the canvas: workflow name, status chip cycle, version chip, undo/redo, share, test-run, save.",
}

export default function WorkflowToolbarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Toolbar"
        title="Workflow toolbar"
        description="The top toolbar above the canvas. Shows the workflow name, a status chip that cycles Draft → Active → Paused → Archived on click, a version chip and last-saved meta, undo / redo buttons, plus Share, Test-run, and Save actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Toolbar" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — variants</span>
        <div className={styles.demoStack}>
          <WorkflowToolbar
            name="New booking · confirm + remind"
            initialStatus="active"
            version="v7"
            savedMeta="Saved · 2 minutes ago"
            canUndo
            canRedo
          />
          <WorkflowToolbar
            name="Weekly Hilux report"
            initialStatus="draft"
            version="v1"
            savedMeta="Draft · not yet saved"
            canUndo={false}
          />
          <WorkflowToolbar
            name="After-hours customer reply"
            initialStatus="paused"
            version="v3"
            savedMeta="Paused · 12 hours ago"
            canUndo
          />
        </div>
      </section>
    </main>
  )
}
