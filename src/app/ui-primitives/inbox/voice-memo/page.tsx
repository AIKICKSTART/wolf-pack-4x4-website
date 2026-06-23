import type { Metadata } from "next"

import { VoiceMemoBubble } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { DEMO_MEMO_WAVEFORM } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Voice memo bubble | Inbox primitives",
  description:
    "Primitive 07 — inline voice memo bubble with play button, waveform, and duration label. Tone-coordinated to sender.",
}

export default function VoiceMemoPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Voice memo"
        title="Voice memo bubble"
        description="A voice memo presented as a bubble inside a thread. Plays the existing audio-waveform primitive with a tone synced to the sender's side."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Voice memo" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>From other (customer)</span>
        <VoiceMemoBubble
          sender="other"
          samples={DEMO_MEMO_WAVEFORM}
          progress={0.34}
          duration="0:38"
          caption="Walkaround of the Hilux underbody"
          authorName="Mick Davis"
        />

        <span className={styles.demoLabel}>From me (foreman)</span>
        <VoiceMemoBubble
          sender="me"
          samples={DEMO_MEMO_WAVEFORM}
          progress={0.62}
          duration="0:21"
          caption="Quote walkthrough"
          authorName="You"
        />

        <span className={styles.demoLabel}>Placeholder (no samples)</span>
        <VoiceMemoBubble sender="me" duration="0:14" />
      </section>
    </main>
  )
}
