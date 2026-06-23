import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsSearchRail } from "../../components/parts-pages"

import { CATEGORIES, FITMENT_CHIPS, SUPPLIER_TAGS } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Parts search rail | Parts pages",
  description: "Primitive 02 — Vertical search rail with input, category nav, supplier chips, price range, in-stock toggle, fitment chips.",
}

export default function PartsSearchRailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Search rail"
        title="Parts search rail"
        description="Vertical search and refinement rail. Composes InlineSearchInput + FacetedFilterSidebar, layered with a parts-specific category nav block that threads category tone into the active link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Search rail" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Live filter behaviour — adjust to feel the debounce + facet toggles</span>
        <div style={{ maxWidth: 360 }}>
          <PartsSearchRail
            categories={CATEGORIES}
            suppliers={SUPPLIER_TAGS}
            fitment={FITMENT_CHIPS}
            priceMin={0}
            priceMax={4500}
            resultCount={184}
          />
        </div>
      </div>
    </main>
  )
}
