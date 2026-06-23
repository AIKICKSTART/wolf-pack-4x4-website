import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecordingRegionSelector } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Recording region selector | Screen recorder",
  description:
    "Primitive 06 — visual region selector with eight resize handles, a resolution chip and an fps chip. role=region with descriptive aria-label.",
}

export default function RecordingRegionSelectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Recording region selector"
        title="Recording region selector"
        description="Dashed-outline rectangle with eight resize handles, marching-ants outline, a crosshair, plus resolution and fps chips floating above the selection. Outer scrim dims the unselected area."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Recording region selector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>1080p · 30fps — Workshop tour Bay 2 install</span>
        <RecordingRegionSelector resolution="1080p" fps={30} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>4K · 60fps — wider region</span>
        <RecordingRegionSelector
          resolution="4K"
          fps={60}
          regionPct={{ top: 8, left: 6, width: 86, height: 78 }}
          stageLabel="Capturing entire display"
        />
      </section>
    </main>
  )
}
