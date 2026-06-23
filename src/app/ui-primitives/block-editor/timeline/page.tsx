import type { Metadata } from "next"

import { TimelineBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_ERROR, TIMELINE_BLOCK } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Timeline block | Block editor",
  description:
    "Primitive 08 — vertical event timeline (year / month / event). Render, edit, and error states.",
}

export default function TimelineBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Timeline"
        title="Timeline block"
        description="Half a century on the Oak Flats workshop floor — Founded 1972, mandrel bender 1989, in-house dyno 2018, EV cert 2024, Mufflerpulse beta April 2026. Each event carries its own tone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <TimelineBlock data={TIMELINE_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · add event
          </span>
          <TimelineBlock data={TIMELINE_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <TimelineBlock data={TIMELINE_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
