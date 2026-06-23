import type { Metadata } from "next"

import { VideoBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_ERROR, VIDEO_BLOCK } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Video block | Block editor",
  description:
    "Primitive 10 — self-hosted video block with poster, chapters, and captions toggle. Render, edit, and error states.",
}

export default function VideoBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Video"
        title="Video block"
        description="Bay 3 dyno walk-through with 5 chapters — cold idle, stethoscope walk, hoist swap, dyno pull, road test — and a captions toggle. Add chapters and flip captions in edit mode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Video" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <VideoBlock data={VIDEO_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · captions + chapters
          </span>
          <VideoBlock data={VIDEO_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <VideoBlock data={VIDEO_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
