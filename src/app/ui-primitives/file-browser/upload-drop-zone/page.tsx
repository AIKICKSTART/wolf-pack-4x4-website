import type { Metadata } from "next"

import { UploadDropZone } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_UPLOADS } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Upload drop zone | File Browser",
  description:
    "Primitive 08 — deeper drag-drop upload zone with progress, speed, ETA, segmenter, and cancel.",
}

export default function UploadDropZoneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Upload"
        title="Upload drop zone"
        description="A richer alternative to the gallery upload form. Aggregates a total speed and ETA chip, segments uploads by queued / uploading / done with counts, and offers per-row cancel + completion checkmark."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Upload drop zone" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <UploadDropZone entries={DEMO_UPLOADS} />
      </section>
    </main>
  )
}
