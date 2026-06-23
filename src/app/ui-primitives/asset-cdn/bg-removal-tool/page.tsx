import type { Metadata } from "next"

import { BgRemovalTool } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Background removal tool | Asset CDN",
  description: "Primitive 05 — before / after slider with backdrop swatches and edge feather control.",
}

export default function BgRemovalToolScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Background removal"
        title="Background removal tool"
        description="A before / after reveal slider tuned for the catalogue beauty shot — drag the amber handle to reveal the cut-out, then pick the after-canvas backdrop. Edge feather softens the matte. The transparent swatch shows the alpha channel as a checker pattern."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Background removal" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · scrub & swatches</span>
        <BgRemovalTool />
      </section>
    </main>
  )
}
