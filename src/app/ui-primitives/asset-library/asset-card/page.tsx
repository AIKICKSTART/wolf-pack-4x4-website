import type { Metadata } from "next"

import { AssetCard } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_ASSETS } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Asset card | Asset Library",
  description:
    "Primitive 01 — selectable asset card with kind badge overlay, dimension chip, and license chip.",
}

export default function AssetCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Asset Card"
        title="Asset card"
        description="A selectable card built for the digital-asset library. Each asset gets a thumbnail with kind-coloured badge overlay, a dimension or duration chip, and its license chip. The middle item is shown in its selected state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Asset card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.cardsGrid} role="listbox" aria-label="Sample assets">
          {DEMO_ASSETS.slice(0, 8).map((asset, index) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              selected={index === 2}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
