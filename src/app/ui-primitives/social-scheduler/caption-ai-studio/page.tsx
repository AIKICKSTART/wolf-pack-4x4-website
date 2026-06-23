import type { Metadata } from "next"

import { CaptionAiStudio } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { CAPTION_PRESETS, HASHTAG_POOL } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Caption AI studio | Muffler Pulse",
  description:
    "Primitive 04 — AI caption generator with tone / length / hook sliders, voice presets, hashtag suggestions.",
}

export default function CaptionAiStudioPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Caption AI"
        title="Caption AI studio"
        description="Pick a voice preset, drag the sliders to shape tone, length and hook, then tap suggested hashtags to add or drop. The output panel reflects the current state in real time."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Caption AI studio" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Workshop tape voice (default)</span>
        <CaptionAiStudio
          presets={CAPTION_PRESETS}
          hashtagPool={HASHTAG_POOL}
          initialPreset="workshop-tape"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Polished suburb spotlight</span>
        <CaptionAiStudio
          presets={CAPTION_PRESETS}
          hashtagPool={HASHTAG_POOL}
          initialPreset="suburb-spotlight"
          initialTone={75}
          initialLength={60}
          initialHook={40}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · High-hook dyno headline</span>
        <CaptionAiStudio
          presets={CAPTION_PRESETS}
          hashtagPool={HASHTAG_POOL}
          initialPreset="dyno-results"
          initialTone={50}
          initialLength={25}
          initialHook={95}
        />
      </section>
    </main>
  )
}
