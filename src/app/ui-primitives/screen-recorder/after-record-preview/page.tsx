import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AfterRecordPreview } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "After-record preview | Screen recorder",
  description:
    "Primitive 08 — post-record preview pane with a video player, duration + size + format meta and Retake / Trim / Save & Share actions.",
}

export default function AfterRecordPreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / After-record preview"
        title="After-record preview"
        description="The first screen after the operator taps Stop. A video player, meta block — duration, file size, format — and three actions: Retake (back to capture), Trim (open the trim handles), or Save & Share (push to the share modal)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "After-record preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop tour — Bay 2 install walkthrough</span>
        <AfterRecordPreview
          title="Workshop tour — Bay 2 install walkthrough"
          durationSec={482}
          sizeLabel="184 MB"
          resolutionLabel="1080p · 30fps · WebM"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote process walkthrough for new staff</span>
        <AfterRecordPreview
          title="Quote process walkthrough for new staff"
          durationSec={1147}
          sizeLabel="412 MB"
          resolutionLabel="1080p · 30fps · MP4"
        />
      </section>
    </main>
  )
}
