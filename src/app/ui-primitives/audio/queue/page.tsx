import type { Metadata } from "next"

import { AudioQueueList } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_QUEUE } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Audio queue list | Audio Primitives",
  description:
    "Primitive 09 — up-next queue list with track number, title, artist, duration, drag-handle visual, and remove action.",
}

export default function QueueScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Queue"
        title="Audio queue list"
        description="An up-next queue list. Each row carries an index, a draggable grip visual, the title and artist, the duration, and a remove action. The active track receives a glow treatment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Queue" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <AudioQueueList tracks={DEMO_QUEUE} activeTrackId="q-2" />
      </section>
    </main>
  )
}
