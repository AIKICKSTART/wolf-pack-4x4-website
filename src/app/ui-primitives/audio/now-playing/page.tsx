import type { Metadata } from "next"

import { NowPlayingCard } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_NOW_PLAYING } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Now playing card | Audio Primitives",
  description:
    "Primitive 08 — hero now-playing card with cover-art placeholder, title, artist, progress, and transport controls.",
}

export default function NowPlayingScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Now playing"
        title="Now playing card"
        description="A hero card primitive for the active track — cover-art surface (gradient + glyph placeholder when missing), title, artist, album, progress timeline, and transport controls including a like toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Now playing" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <NowPlayingCard track={DEMO_NOW_PLAYING} />
      </section>
    </main>
  )
}
