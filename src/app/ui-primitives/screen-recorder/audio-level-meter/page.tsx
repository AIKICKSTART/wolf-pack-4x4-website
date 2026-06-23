import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AudioLevelMeter } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Audio level meter | Screen recorder",
  description:
    "Primitive 07 — vertical stereo audio meter with peak indicator, clipping warning chip and a quick-mute toggle. Recording-specific, distinct from audio/volume-slider.",
}

export default function AudioLevelMeterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Audio level meter"
        title="Audio level meter"
        description="Vertical stereo meter with dB ticks, a hold-peak indicator and a clipping alert when the input pegs. The recording-specific cousin of audio/volume-slider — surfaces the mic input as you record."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Audio level meter" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Healthy input — Brodie on the lav</span>
        <div className={styles.demoInline}>
          <AudioLevelMeter left={0.62} right={0.58} peak={0.72} />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Clipping — dyno run is too hot</span>
        <div className={styles.demoInline}>
          <AudioLevelMeter left={0.97} right={0.94} peak={0.99} clipping />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quick-muted between takes</span>
        <div className={styles.demoInline}>
          <AudioLevelMeter left={0} right={0} peak={0.46} muted />
        </div>
      </section>
    </main>
  )
}
