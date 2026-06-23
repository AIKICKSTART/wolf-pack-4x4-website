import type { Metadata } from "next"

import { PlayheadCursor } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Playhead cursor | Video editor",
  description:
    "Primitive 03 — vertical playhead line spanning all tracks with a current-time chip pill and frame indicator.",
}

export default function PlayheadCursorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Playhead cursor"
        title="Playhead cursor"
        description="A vertical playhead line spanning all timeline tracks with a top time-chip showing the current display + frame indicator. Implements role=slider with aria-valuenow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Playhead cursor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Full-height playhead at 14.6s</span>
        <div className={styles.demoStage} style={{ minHeight: "220px", padding: 0 }}>
          <div style={{ position: "relative", width: "100%", height: "220px" }}>
            <PlayheadCursor
              atSec={14.6}
              durationSec={36}
              pxPerSec={28}
            />
          </div>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Compact playhead variants</span>
        <div className={styles.demoStage} style={{ minHeight: "120px", padding: 0 }}>
          <div style={{ position: "relative", width: "100%", height: "120px" }}>
            <PlayheadCursor
              atSec={2.4}
              durationSec={36}
              pxPerSec={20}
              variant="compact"
            />
            <PlayheadCursor
              atSec={18.0}
              durationSec={36}
              pxPerSec={20}
              variant="compact"
              fps={24}
            />
            <PlayheadCursor
              atSec={29.2}
              durationSec={36}
              pxPerSec={20}
              variant="compact"
              fps={24}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
