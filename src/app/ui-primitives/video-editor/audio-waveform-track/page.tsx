import type { Metadata } from "next"

import { AudioWaveformTrack } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Audio waveform track | Video editor",
  description:
    "Primitive 12 — audio track variant showing a long-form waveform across the clip with a selection range overlay and stereo level meter.",
}

function buildWaveform(seed: number, length: number): ReadonlyArray<number> {
  return Array.from({ length }, (_, index) => {
    const phase = (index + seed) / length
    const envelope = Math.sin(phase * Math.PI * 2) * 0.5 + 0.5
    const detail = Math.sin(phase * Math.PI * 18 + seed) * 0.18
    const grit = Math.sin(phase * Math.PI * 51 + seed * 0.5) * 0.08
    return Math.max(0.08, envelope * 0.72 + detail + grit)
  })
}

export default function AudioWaveformTrackScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Audio waveform track"
        title="Audio waveform track"
        description="A track-row variant showing a long-form waveform across the entire clip with an optional selection range overlay and a stereo (L/R) level meter aside."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Audio waveform track" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>A1 · Boom mic · selection over the dyno run</span>
        <div style={{ height: 72 }}>
          <AudioWaveformTrack
            name="A1 · Boom · Sennheiser 416"
            samples={buildWaveform(0.4, 96)}
            durationSec={36}
            selection={{ startSec: 18, endSec: 26 }}
            level={{ left: 0.78, right: 0.72 }}
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>A2 · Wireless lav · no selection</span>
        <div style={{ height: 72 }}>
          <AudioWaveformTrack
            name="A2 · Brodie · DPA 6060"
            samples={buildWaveform(1.6, 96)}
            durationSec={36}
            level={{ left: 0.42, right: 0.46 }}
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>A3 · Workshop ambient · trimming selection</span>
        <div style={{ height: 56 }}>
          <AudioWaveformTrack
            name="A3 · Workshop ambient"
            samples={buildWaveform(2.8, 84)}
            durationSec={36}
            selection={{ startSec: 4, endSec: 14 }}
            level={{ left: 0.32, right: 0.34 }}
          />
        </div>
      </section>
    </main>
  )
}
