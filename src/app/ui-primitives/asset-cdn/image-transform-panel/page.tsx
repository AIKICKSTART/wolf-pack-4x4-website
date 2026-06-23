import type { Metadata } from "next"

import { ImageTransformPanel } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_IMAGE_TRANSFORM } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Image transform panel | Asset CDN",
  description:
    "Primitive 01 — Cloudflare image transform with resize, format, quality, fit, and focal-point picker.",
}

export default function ImageTransformPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Image transform panel"
        title="Image transform panel"
        description="A live transform sheet shaped around Cloudflare's image API. Width, height, format, fit, and quality sit on the right. The left pane is a clickable focal-point picker — arrow keys nudge, shift jumps by 10. Sample asset is the launch-frame for the 2026 Manta build."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Image transform panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · interactive</span>
        <ImageTransformPanel defaultTransform={DEMO_IMAGE_TRANSFORM} />
      </section>
    </main>
  )
}
