import type { Metadata } from "next"

import { PodcastEpisodeCard } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_EPISODE } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Podcast episode card | Audio Primitives",
  description:
    "Primitive 10 — podcast-style episode card with thumbnail, show name, duration, published time, add-to-queue, and chapter accordion.",
}

export default function PodcastEpisodeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Podcast episode"
        title="Podcast episode card"
        description="A podcast-style episode card composing thumbnail (gradient placeholder when missing), show name, title, duration chip, published-time chip, add-to-queue action, and a collapsible chapter list."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Podcast episode" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <PodcastEpisodeCard episode={DEMO_EPISODE} />
      </section>
    </main>
  )
}
