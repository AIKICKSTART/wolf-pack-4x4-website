import type { Metadata } from "next"

import { ExhaustSoundPreview } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_EXHAUST_WAVEFORM } from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Exhaust sound preview | Audio Primitives",
  description:
    "Primitive 13 — Mufflermen exhaust clip preview with small waveform animation, loudness (dB) chip, and pipe-diameter chip.",
}

export default function ExhaustSoundScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Exhaust preview"
        title="Exhaust sound preview"
        description="A Mufflermen-specific preview button. Plays an exhaust dyno clip with a small waveform animation that fills while playing, alongside loudness (dB) and pipe-diameter chips. Tolerates missing audio sources gracefully."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Exhaust preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitives</span>
        <div className={styles.demoStack}>
          <ExhaustSoundPreview
            label="GT350 Magnaflow bypass"
            src="/media/exhaust-bypass.mp3"
            waveform={DEMO_EXHAUST_WAVEFORM}
            loudnessDb={96}
            pipeDiameter={'2.5"'}
            tone="red"
          />
          <ExhaustSoundPreview
            label="VF SS Borla S-type"
            waveform={DEMO_EXHAUST_WAVEFORM}
            loudnessDb={92}
            pipeDiameter={'3.0"'}
            tone="amber"
          />
          <ExhaustSoundPreview
            label="Coyote 5.0 — straight pipe"
            waveform={DEMO_EXHAUST_WAVEFORM}
            loudnessDb={104}
            pipeDiameter={'3.5"'}
            tone="red"
          />
        </div>
      </section>
    </main>
  )
}
