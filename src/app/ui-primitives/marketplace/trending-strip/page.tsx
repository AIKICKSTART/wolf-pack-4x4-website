import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TrendingStrip } from "../../components/marketplace/trending-strip"
import { TRENDING } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Trending strip | Marketplace | UI Primitives",
  description:
    "Horizontal scrollable strip of trending plugins this week with rank chips and momentum arrows.",
}

export default function TrendingStripShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.12 / Trending strip"
        title="Trending strip"
        description="Horizontal scroller of trending plugins this week. Rank chips, momentum arrows, and scroll-snap controls keyboard-driven."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Trending strip" },
        ]}
      />

      <section className={styles.section} aria-labelledby="trending-strip-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Trending</span>
          <h2 id="trending-strip-demo" className={styles.sectionTitle}>
            Top eight trending plugins this week
          </h2>
        </header>
        <TrendingStrip items={TRENDING} />
      </section>
    </main>
  )
}
