import type { Metadata } from "next"

import { ImagePresetCard } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_PRESETS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Image preset card | Asset CDN",
  description: "Primitive 11 — preset transform card for thumbnail, hero, OG, card, avatar, and splash.",
}

export default function ImagePresetCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Image preset"
        title="Image preset card"
        description="Six presets covering every surface the OFM site uses — catalogue thumbnail, cinematic hero, OG card, service card, crew avatar, and splash screen. The frame in each card uses the preset's aspect ratio, with the dimension chip pinned to the bottom edge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Image preset" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · six presets</span>
        <div className={styles.demoPresetGrid}>
          {DEMO_PRESETS.map((preset, index) => (
            <ImagePresetCard
              key={preset.id}
              preset={preset}
              selected={index === 1}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
