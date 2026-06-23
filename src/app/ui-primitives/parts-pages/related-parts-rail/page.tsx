import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RelatedPartsRail } from "../../components/parts-pages"

import { RESULT_CARDS } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Related parts rail | Parts pages",
  description: "Primitive 10 — Horizontal scrollable rail of PartResultCards composed with the Reveal motion primitive.",
}

export default function RelatedPartsRailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Related rail"
        title="Related parts rail"
        description="Horizontal scrollable rail with scroll-snap. Each card animates in on scroll via the motion/Reveal primitive with staggered delay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Related rail" },
        ]}
      />

      <RelatedPartsRail
        kicker="Customers also fit"
        heading="Parts often paired with the Manta 3in catback"
        description="Cross-sells filtered by category overlap and confirmed fitment. Scroll horizontally on touch."
        parts={RESULT_CARDS}
      />
    </main>
  )
}
