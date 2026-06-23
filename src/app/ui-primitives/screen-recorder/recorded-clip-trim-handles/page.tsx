import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecordedClipTrimHandles } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Recorded clip trim handles | Screen recorder",
  description:
    "Primitive 12 — post-record trim handles distinct from the video-editor clip-trim-handles: full clip width, left/right grips, duration delta chip and a scrubber playhead.",
}

export default function RecordedClipTrimHandlesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Recorded clip trim handles"
        title="Recorded clip trim handles"
        description="The post-record trimming UI — distinct from the timeline-level clip-trim-handles in the video-editor pack. Full clip width, left/right grips with a delta chip showing how much was kept versus removed, and a playhead scrubber so the operator can preview the in/out before committing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Recorded clip trim handles" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop tour — trim 6s intro, 14s outro</span>
        <RecordedClipTrimHandles
          durationSec={482}
          startSec={6}
          endSec={468}
          playheadSec={184}
          activeSide="none"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>ADR refresher — actively trimming end</span>
        <RecordedClipTrimHandles
          durationSec={240}
          startSec={0}
          endSec={196}
          playheadSec={132}
          activeSide="end"
          thumbnails={["Intro", "Compliance", "Sign-off", "Outro"]}
        />
      </section>
    </main>
  )
}
