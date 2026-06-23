import type { Metadata } from "next"

import { AudioPlayer } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_DEVICES, DEMO_TRACK } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Audio player | Audio Primitives",
  description:
    "Primitive 01 — full audio player with play/pause, skip, scrubber over waveform, time display, volume, and speaker selector.",
}

export default function AudioPlayerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Audio player"
        title="Audio player"
        description="A typed audio player primitive composing a waveform behind the scrubber, transport controls, volume, time output, and speaker selector. Tolerates missing audio sources by disabling controls and rendering a placeholder waveform."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Audio player" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoColumn}>
          <AudioPlayer
            track={DEMO_TRACK}
            devices={DEMO_DEVICES}
            activeDeviceId="dev-macbook"
            onPrevious={undefined}
            onNext={undefined}
          />
        </div>
      </section>
    </main>
  )
}
