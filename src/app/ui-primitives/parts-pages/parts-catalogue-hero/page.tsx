import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsCatalogueHero } from "../../components/parts-pages"

import { HERO_SUPPLIERS } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Parts catalogue hero | Parts pages",
  description: "Primitive 01 — Parts catalogue hero with kicker, headline, supplier badges, part count and supplier coverage chips.",
}

export default function PartsCatalogueHeroPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Catalogue hero"
        title="Parts catalogue hero"
        description="Editorial hero for the parts catalogue. Pairs a display headline with two chips (part count, supplier coverage) and a supplier-coverage rail on the right."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Catalogue hero" },
        ]}
      />

      <PartsCatalogueHero
        kicker="Exhaust parts catalogue"
        headline="Sound, flow, fitment — sorted on the bench."
        description="Searchable parts catalogue with images, specs, and AUD RRP for every line item. Five supplier feeds normalised into one schema-rich product surface."
        tone="amber"
        partCountLabel="19,412 parts indexed"
        supplierCoverageLabel="5 supplier feeds connected"
        suppliers={HERO_SUPPLIERS}
      />
    </main>
  )
}
