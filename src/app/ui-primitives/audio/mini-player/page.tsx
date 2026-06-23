import type { Metadata } from "next"

import { MiniAudioPlayer } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_MINI_TRACK, DEMO_NOW_PLAYING } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Mini audio player | Audio Primitives",
  description:
    "Primitive 02 — compact mini player suitable for inline or floating use with play/pause, 60px waveform, and total duration chip.",
}

export default function MiniAudioPlayerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Mini player"
        title="Mini audio player"
        description="A compact inline player. Pill-shaped chrome, 60px waveform, total duration chip, and a single play / pause control. Built for in-row playback like comment threads or notification feeds."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Mini player" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <MiniAudioPlayer track={DEMO_MINI_TRACK} />
          <MiniAudioPlayer track={DEMO_NOW_PLAYING} />
        </div>
      </section>
    </main>
  )
}
