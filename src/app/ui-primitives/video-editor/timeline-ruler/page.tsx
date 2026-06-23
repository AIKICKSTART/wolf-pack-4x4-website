import type { Metadata } from "next"

import { TimelineRuler } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Timeline ruler | Video editor",
  description:
    "Primitive 04 — top time ruler with tick marks for seconds, minutes and frames, label every 10s and a zoom level chip.",
}

export default function TimelineRulerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Timeline ruler"
        title="Timeline ruler"
        description="Top time ruler — tick marks for seconds + minutes + frames, label every 10s, with a zoom-level chip showing the current scale."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Timeline ruler" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>0:00 → 0:36 · 28px/sec</span>
        <TimelineRuler durationSec={36} pxPerSec={28} fps={24} zoomLabel="1.0×" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Tight zoom · 56px/sec, label every 5s</span>
        <TimelineRuler
          durationSec={36}
          pxPerSec={56}
          fps={24}
          labelEverySec={5}
          zoomLabel="2.0×"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Loose zoom · 14px/sec</span>
        <TimelineRuler
          durationSec={120}
          pxPerSec={14}
          fps={24}
          zoomLabel="0.5×"
        />
      </section>
    </main>
  )
}
