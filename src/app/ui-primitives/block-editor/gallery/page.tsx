import type { Metadata } from "next"

import { GalleryBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"

import { GALLERY_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Gallery block | Block editor",
  description:
    "Primitive 01 — image gallery block with grid / carousel / masonry layout picker. Render, edit, and error states.",
}

export default function GalleryBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Gallery"
        title="Gallery block"
        description="Workshop time-lapse, before/after exhaust, and dyno-room photos arranged as a 3-up grid, a horizontal carousel, or a masonry pack. Edit-mode toolbar picks the layout and caption."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Gallery" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · preview</span>
          <GalleryBlock data={GALLERY_BLOCK} mode="preview" />
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · layout picker
          </span>
          <GalleryBlock data={GALLERY_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <GalleryBlock data={GALLERY_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
