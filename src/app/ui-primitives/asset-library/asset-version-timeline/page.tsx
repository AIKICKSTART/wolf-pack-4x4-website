import type { Metadata } from "next"

import { AssetVersionTimeline } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_VERSIONS } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Asset version timeline | Asset Library",
  description:
    "Primitive 06 — vertical version history with thumbnail, uploader avatar, timestamp, comment, and restore action.",
}

export default function AssetVersionTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Versions"
        title="Asset version timeline"
        description="A media-focused version timeline. Each entry shows a thumbnail of that revision, the uploader, a timestamp, a comment describing the change, and a restore CTA when the version is not currently live."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Version timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 560, marginInline: "auto" }}>
          <AssetVersionTimeline versions={DEMO_VERSIONS} />
        </div>
      </section>
    </main>
  )
}
