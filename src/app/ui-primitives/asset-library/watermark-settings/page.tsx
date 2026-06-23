import type { Metadata } from "next"

import { WatermarkSettings } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Watermark settings | Asset Library",
  description:
    "Primitive 13 — watermark editor with text, opacity slider, 9-cell position grid, scale slider, and live preview.",
}

export default function WatermarkSettingsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Watermark"
        title="Watermark settings"
        description="An interactive watermark editor. Adjust the text, opacity, scale, and the 9-cell position grid — the right-hand preview pane reflects every change in real time."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Watermark settings" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <WatermarkSettings />
      </section>
    </main>
  )
}
