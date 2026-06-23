import type { Metadata } from "next"

import { VoiceMemoRecorder } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Voice memo recorder | Audio Primitives",
  description:
    "Primitive 03 — voice recorder UI with round red record button, live waveform spikes, elapsed counter, and stop / discard / save actions.",
}

export default function VoiceMemoScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Voice memo"
        title="Voice memo recorder"
        description="A visual-only voice-recorder primitive. Tap the round red button to enter a recording state — spikes animate, the elapsed counter ticks, and the stop / discard / save controls reveal themselves. No microphone access is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Voice memo" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoColumn} style={{ maxWidth: 420 }}>
          <VoiceMemoRecorder maxDuration={60} />
        </div>
      </section>
    </main>
  )
}
