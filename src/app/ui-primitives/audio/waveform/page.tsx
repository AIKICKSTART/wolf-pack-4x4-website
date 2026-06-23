import type { Metadata } from "next"

import { AudioWaveform } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_EXHAUST_WAVEFORM, DEMO_TRACK } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Audio waveform | Audio Primitives",
  description:
    "Primitive 04 — pure SVG waveform display from a samples prop. Compact and detailed variants with progress-aware fill driven by CSS variables.",
}

export default function WaveformScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Waveform"
        title="Audio waveform"
        description="Pure SVG waveform driven by a samples array. Two variants — compact (60px) and detailed (96px). Played bars highlight with the active tone. Renders a placeholder shape when no samples are supplied."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Waveform" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Compact variant (progress 35%)</span>
        <AudioWaveform
          samples={DEMO_TRACK.waveform}
          progress={0.35}
          variant="compact"
          tone="red"
          ariaLabel="Track waveform — compact"
        />
        <span className={styles.demoLabel}>Detailed variant (progress 72%)</span>
        <AudioWaveform
          samples={DEMO_EXHAUST_WAVEFORM}
          progress={0.72}
          variant="detailed"
          tone="teal"
          ariaLabel="Track waveform — detailed"
        />
        <span className={styles.demoLabel}>Placeholder (no samples)</span>
        <AudioWaveform variant="compact" tone="amber" />
      </section>
    </main>
  )
}
