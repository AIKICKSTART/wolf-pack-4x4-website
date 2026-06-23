import type { Metadata } from "next"

import { CueMarkerPin, TimelineRuler } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Cue marker | Video editor",
  description:
    "Primitive 13 — numbered marker pin on the timeline with label chip, stem and optional note popover.",
}

export default function CueMarkerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Cue marker"
        title="Cue marker"
        description="A marker pin sits on the timeline at a specific point: numbered chip with label, vertical stem and triangle tip, plus an optional note popover that opens on focus."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Cue marker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Markers along the workshop edit timeline</span>
        <TimelineRuler durationSec={36} pxPerSec={28} fps={24} zoomLabel="1.0×" />
        <div className={styles.demoStage} style={{ minHeight: "160px", padding: "32px 24px" }}>
          <div style={{ position: "relative", width: 36 * 28, height: 100 }}>
            <CueMarkerPin
              marker={{ index: 1, atSec: 4.5, label: "ADR check", tone: "amber" }}
              pxPerSec={28}
            />
            <CueMarkerPin
              marker={{ index: 2, atSec: 13.2, label: "Sound demo · cat-back fit", tone: "teal" }}
              pxPerSec={28}
            />
            <CueMarkerPin
              marker={{ index: 3, atSec: 22.8, label: "Dyno revs", tone: "red" }}
              pxPerSec={28}
            />
            <CueMarkerPin
              marker={{ index: 4, atSec: 31.4, label: "Hero outro", tone: "green" }}
              pxPerSec={28}
            />
          </div>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Popover open · ADR check note</span>
        <div className={styles.demoStage} style={{ minHeight: "180px", padding: "32px 12px" }}>
          <div style={{ position: "relative", width: 200, height: 100 }}>
            <CueMarkerPin
              marker={{
                index: 1,
                atSec: 1.5,
                label: "ADR check",
                tone: "amber",
                note: "Re-record Brodie line over Manta fit — wind noise hit the boom at 00:08.",
              }}
              pxPerSec={40}
              popoverOpen
            />
          </div>
        </div>
      </section>
    </main>
  )
}
