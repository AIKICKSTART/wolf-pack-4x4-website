import type { Metadata } from "next"

import { EqualizerBars } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Equalizer bars | Audio Primitives",
  description:
    "Primitive 14 — decorative live equalizer with 4–16 bars animated via CSS keyframes. Reduced-motion safe.",
}

export default function EqualizerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Equalizer"
        title="Equalizer bars"
        description="Decorative live equalizer. 4 to 16 bars, animated via staggered CSS keyframes. Drives loading states, exhaust preview accents, and the audio scene composition decoration."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Equalizer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Active — 10 bars, red</span>
        <EqualizerBars bars={10} active tone="red" height={48} />
        <span className={styles.demoLabel}>Active — 12 bars, teal</span>
        <EqualizerBars bars={12} active tone="teal" height={64} />
        <span className={styles.demoLabel}>Idle — 8 bars, amber</span>
        <EqualizerBars bars={8} active={false} tone="amber" height={48} />
        <span className={styles.demoLabel}>Active — 16 bars, green</span>
        <EqualizerBars bars={16} active tone="green" height={56} />
      </section>
    </main>
  )
}
