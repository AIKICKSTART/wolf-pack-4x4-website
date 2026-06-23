import type { Metadata } from "next"

import { SoundPresetRow } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { MOCK_SOUND_PRESETS } from "../_mock-data"
import styles from "../notifications-system.module.css"
import { SoundPresetPickerDemo } from "./sound-preset-picker-demo"

export const metadata: Metadata = {
  title: "Sound preset row | Notifications system",
  description:
    "Primitive 08 — sound choice row with a click-only preview button. Never auto-plays audio.",
}

export default function SoundPresetRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Sound preset row"
        title="Sound preset row"
        description="A single sound choice row with a click-only preview button. We never auto-play audio; the preview only fires from a real user gesture so the page stays compliant with autoplay policies and good manners."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Sound preset row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Full picker (interactive)</span>
        <SoundPresetPickerDemo />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Selected preset, no preview</span>
        <SoundPresetRow preset={MOCK_SOUND_PRESETS[0]} selected />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Silent option (preview disabled)</span>
        <SoundPresetRow preset={MOCK_SOUND_PRESETS[4]} selected={false} />
      </section>
    </main>
  )
}
