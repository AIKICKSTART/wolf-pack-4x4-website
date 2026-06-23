import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TranscriptGenerationStatus } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Transcript status | Screen recorder",
  description:
    "Primitive 09 — transcript generation status rendered as queued / processing / ready / failed, with a language chip and a word-count chip when ready.",
}

export default function TranscriptGenerationStatusScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Transcript status"
        title="Transcript generation status"
        description="Surface the captioning pipeline's state — queued, processing, ready or failed. role=status with aria-live so the screen reader announces the transition without stealing focus."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Transcript status" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Queued — Workshop tour</span>
        <TranscriptGenerationStatus status="queued" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Processing — ADR compliance refresher</span>
        <TranscriptGenerationStatus status="processing" etaSec={48} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Ready — Quote process walkthrough</span>
        <TranscriptGenerationStatus status="ready" wordCount={1842} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Failed — needs a retry</span>
        <TranscriptGenerationStatus
          status="failed"
          errorMessage="Audio gain too low — re-check the lav before retrying."
        />
      </section>
    </main>
  )
}
