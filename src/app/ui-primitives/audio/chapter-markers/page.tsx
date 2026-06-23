import type { Metadata } from "next"

import { AudioChapterMarkers } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_CHAPTERS } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Chapter markers | Audio Primitives",
  description:
    "Primitive 11 — horizontal chapter timeline strip with positioned markers and hover-revealed chapter title.",
}

export default function ChapterMarkersScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Chapter markers"
        title="Audio chapter markers"
        description="Horizontal chapter timeline strip. Coloured segments mark each chapter and a playhead overlays current position. Each marker dot reveals a QuoteBubble with the chapter title and start time on hover or focus."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Chapter markers" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — playhead at 0:48</span>
        <AudioChapterMarkers
          chapters={DEMO_CHAPTERS}
          duration={210}
          currentTime={48}
        />
      </section>
    </main>
  )
}
