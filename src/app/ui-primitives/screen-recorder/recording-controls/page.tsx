import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecordingControls } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Recording controls | Screen recorder",
  description:
    "Primitive 03 — floating control toolbar shown during a recording with pause / resume / stop / cancel, an elapsed timer and a remaining-storage chip.",
}

export default function RecordingControlsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Recording controls"
        title="Recording controls"
        description="Floating control bar shown during a recording session — pause, resume, stop and cancel actions with an elapsed timer and a remaining-storage chip. role=toolbar with explicit aria-labels per action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Recording controls" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live — Workshop tour, Bay 2 install walkthrough</span>
        <div className={styles.demoStage}>
          <RecordingControls
            state="recording"
            elapsedSec={342}
            storageLabel="1.4 GB left"
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Paused</span>
        <div className={styles.demoStage}>
          <RecordingControls
            state="paused"
            elapsedSec={621}
            storageLabel="1.1 GB left"
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Stopping — ADR refresher voiceover</span>
        <div className={styles.demoStage}>
          <RecordingControls
            state="stopping"
            elapsedSec={1247}
            storageLabel="612 MB left"
          />
        </div>
      </section>
    </main>
  )
}
