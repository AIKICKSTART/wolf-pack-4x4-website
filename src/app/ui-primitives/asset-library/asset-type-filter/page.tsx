import type { Metadata } from "next"

import { AssetTypeFilter } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_TYPE_COUNTS } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Asset-type filter | Asset Library",
  description:
    "Primitive 08 — chip row of asset types (image, video, audio, doc, 3D, animation, vector) with counts.",
}

export default function AssetTypeFilterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Filter"
        title="Asset-type filter"
        description="A tablist of asset types with their counts. The All chip is selected by default; selecting a single kind dispatches an onChange event for downstream lists to filter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Asset-type filter" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <AssetTypeFilter counts={DEMO_TYPE_COUNTS} />
      </section>
    </main>
  )
}
