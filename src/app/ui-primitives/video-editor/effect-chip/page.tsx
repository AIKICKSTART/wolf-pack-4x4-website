import type { Metadata } from "next"

import { EffectChip } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Effect chip | Video editor",
  description:
    "Primitive 08 — applied-effect chip with name, on/off toggle, and a parameters popover containing sliders.",
}

export default function EffectChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Effect chip"
        title="Effect chip"
        description="An effect chip applied to a clip. Includes effect name, on/off toggle and a parameters popover containing sliders. Variants by kind: color / blur / stabilize / denoise / LUT / audio-eq / audio-gate."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Effect chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mixed effects · enabled / disabled</span>
        <div className={styles.miniRow}>
          <EffectChip kind="lut" name="Cinematic LUT · Workshop Steel" enabled />
          <EffectChip kind="color" name="Color · Warm-bay" enabled />
          <EffectChip kind="stabilize" name="Stabilize · gimbal" enabled />
          <EffectChip kind="denoise" name="Denoise · low" enabled={false} />
          <EffectChip kind="blur" name="Blur · plate cover" enabled={false} />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Audio effects · compact</span>
        <div className={styles.miniRow}>
          <EffectChip kind="audio-eq" name="EQ · 80Hz roll" enabled compact />
          <EffectChip kind="audio-gate" name="Gate · noise floor" enabled compact />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Popover open · Cinematic LUT parameters</span>
        <div className={styles.demoStage} style={{ minHeight: "260px", alignItems: "flex-end" }}>
          <EffectChip
            kind="lut"
            name="Cinematic LUT · Workshop Steel"
            enabled
            popoverOpen
            parameters={[
              { label: "Intensity", value: 0.78, display: "78%" },
              { label: "Highlights", value: 0.42, display: "+0.42" },
              { label: "Shadows", value: 0.26, display: "-0.26" },
              { label: "Tint", value: 0.6, display: "Warm" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
