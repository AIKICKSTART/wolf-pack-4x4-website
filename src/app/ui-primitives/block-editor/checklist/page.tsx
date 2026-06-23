import type { Metadata } from "next"

import { ChecklistBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { CHECKLIST_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Checklist block | Block editor",
  description:
    "Primitive 12 — interactive todo block with checkbox + completion meter. Render, edit, and error states.",
}

export default function ChecklistBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Checklist"
        title="Checklist block"
        description="Pre-service walk-around — oil, coolant, tyres, exhaust, brakes, battery, handover sheet — with a live completion meter wired into the shared ProgressLinear primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Checklist" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <ChecklistBlock data={CHECKLIST_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · add + toggle
          </span>
          <ChecklistBlock data={CHECKLIST_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <ChecklistBlock data={CHECKLIST_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
