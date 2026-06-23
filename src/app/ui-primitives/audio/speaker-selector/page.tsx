import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { SpeakerSelectorDemo } from "./speaker-selector-demo"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Speaker selector | Audio Primitives",
  description:
    "Primitive 06 — popover dropdown of available output devices with type icons, subtitles, and active indicator.",
}

export default function SpeakerSelectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Speaker selector"
        title="Speaker selector"
        description="Popover-driven output device picker. Renders each device with its kind icon, subtitle, and an active dot. Used by the audio-player header to swap between speakers, AirPods, AV receiver, and Bluetooth."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Speaker selector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <SpeakerSelectorDemo />
      </section>
    </main>
  )
}
