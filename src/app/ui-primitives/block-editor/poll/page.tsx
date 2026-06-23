import type { Metadata } from "next"

import { PollBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { POLL_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Poll block | Block editor",
  description:
    "Primitive 06 — multi-choice poll with live results bars. Render, edit, and error states.",
}

export default function PollBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Poll"
        title="Poll block"
        description="“Which exhaust brand should we stock next?” — Manta, Pacemaker, XForce, Genie. Live results bars use the shared ProgressLinear primitive. Edit mode toggles multi-select and adds new options."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Poll" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <PollBlock data={POLL_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · options + multi-select
          </span>
          <PollBlock data={POLL_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <PollBlock data={POLL_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
