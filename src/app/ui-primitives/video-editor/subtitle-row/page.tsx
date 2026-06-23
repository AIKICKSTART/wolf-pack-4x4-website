import type { Metadata } from "next"

import { SubtitleRow, TimelineRuler } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Subtitle row | Video editor",
  description:
    "Primitive 14 — subtitle track with numbered cue blocks rendered across the timeline width with text preview.",
}

const CUES = [
  { index: 1, startSec: 1.2, endSec: 4.2, text: "Right-o, Hilux just rolled in." },
  { index: 2, startSec: 5.4, endSec: 9.4, text: "Old muffler's cooked — pulling it now." },
  { index: 3, startSec: 11.0, endSec: 15.2, text: "Manta cat-back, three-inch bore." },
  { index: 4, startSec: 16.0, endSec: 20.6, text: "Bolt-on fit, no flares needed." },
  { index: 5, startSec: 22.2, endSec: 27.0, text: "On the dyno — listen to her sing." },
  { index: 6, startSec: 28.6, endSec: 33.0, text: "Owner's grinning. That's the brief." },
] as const

export default function SubtitleRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Subtitle row"
        title="Subtitle row"
        description="A subtitle track row showing numbered cue blocks overlaid on the timeline, each with the cue index chip and a single-line text preview."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Subtitle row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>SUB · EN-AU · Brodie workshop talk</span>
        <TimelineRuler durationSec={36} pxPerSec={28} fps={24} zoomLabel="1.0×" />
        <div style={{ height: 56, position: "relative", width: 36 * 28 }}>
          <SubtitleRow cues={CUES} durationSec={36} pxPerSec={28} />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Percentage layout · no pixel anchor</span>
        <div style={{ height: 56, position: "relative", width: "100%" }}>
          <SubtitleRow cues={CUES} durationSec={36} />
        </div>
      </section>
    </main>
  )
}
