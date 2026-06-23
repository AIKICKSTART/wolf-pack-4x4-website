import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecordingTimerPill } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Recording timer pill | Screen recorder",
  description:
    "Primitive 04 — floating pill timer with pulsing red dot, elapsed HH:MM:SS and a bandwidth chip.",
}

export default function RecordingTimerPillScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Recording timer pill"
        title="Recording timer pill"
        description="Compact corner pill that confirms a session is live. role=status with aria-live so screen readers pick up the elapsed value without jumping focus. Optional bandwidth chip surfaces the upstream rate when the upload pipe is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Recording timer pill" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Floating with bandwidth chip — Quote process walkthrough</span>
        <div className={styles.demoStage}>
          <RecordingTimerPill elapsedSec={184} bandwidthLabel="4.2 Mbps" />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Inline — long session</span>
        <div className={styles.demoStage}>
          <RecordingTimerPill elapsedSec={4_321} bandwidthLabel="6.8 Mbps" variant="inline" />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Without bandwidth — offline capture</span>
        <div className={styles.demoStage}>
          <RecordingTimerPill elapsedSec={42} />
        </div>
      </section>
    </main>
  )
}
