import type { Metadata } from "next"

import { AssetVersioningRow } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_VERSIONS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Asset versioning row | Asset CDN",
  description: "Primitive 08 — version row with byline, size, note, and revert action.",
}

export default function AssetVersioningRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Versioning"
        title="Asset versioning row"
        description="One row per published version. The current row shows the Live badge with a green border; older rows expose a Revert button. Byline carries the author, timestamp, and bytes — all in tabular-nums so the rows line up at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Versioning row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · five versions</span>
        <div className={styles.demoStack}>
          {DEMO_VERSIONS.map((version) => (
            <AssetVersioningRow key={version.id} version={version} />
          ))}
        </div>
      </section>
    </main>
  )
}
