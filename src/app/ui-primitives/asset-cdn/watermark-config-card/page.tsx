import type { Metadata } from "next"

import { WatermarkConfigCard } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Watermark config card | Asset CDN",
  description: "Primitive 06 — logo / text watermark with opacity, scale, and 5-anchor position grid.",
}

export default function WatermarkConfigCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Watermark config"
        title="Watermark config card"
        description="Pick logo or text, tune opacity and scale, then anchor to one of five positions on the canvas. The preview reflects every change live with a real CSS opacity / size transition. Default settings match the OFM workshop catalogue stamp."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Watermark config" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · interactive</span>
        <WatermarkConfigCard />
      </section>
    </main>
  )
}
