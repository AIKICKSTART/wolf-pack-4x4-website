import type { Metadata } from "next"

import { RenditionsList } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_RENDITIONS } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Renditions list | Asset Library",
  description:
    "Primitive 14 — list of generated renditions (Original / Web / Thumbnail / Square / 4K) with dimensions, size, format chips, and downloads.",
}

export default function RenditionsListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Renditions"
        title="Renditions list"
        description="Every generated rendition for the selected asset — original, 4K, web, square, thumbnail. Each row shows the rendition's dimensions, file size, format chip, and a per-row download action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Renditions list" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 520, marginInline: "auto" }}>
          <RenditionsList renditions={DEMO_RENDITIONS} />
        </div>
      </section>
    </main>
  )
}
