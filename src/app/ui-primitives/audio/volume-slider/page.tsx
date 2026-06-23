import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { VolumeSliderDemo } from "./volume-slider-demo"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Volume slider | Audio Primitives",
  description:
    "Primitive 05 — horizontal or vertical volume slider in 0–1 range with optional mute toggle.",
}

export default function VolumeSliderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Volume"
        title="Volume slider"
        description="A strict-typed slider primitive in 0–1 range. Renders horizontal or vertical, with optional embedded mute toggle. Drives the audio player and now-playing card."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Volume slider" },
        ]}
      />
      <section className={styles.demoSurface}>
        <VolumeSliderDemo />
      </section>
    </main>
  )
}
