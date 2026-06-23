import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartResultCard } from "../../components/parts-pages"

import { RESULT_CARDS } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Part result card | Parts pages",
  description: "Primitive 04 — Single result card with supplier-watermark image, SKU, title, supplier badge, RRP, and fitment chips.",
}

export default function PartResultCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Result card"
        title="Part result card"
        description="Search-result card variant — supplier-watermark image overlay, supplier badge bottom-left, PriceTag composition for price, and Chip primitive for fitment chips."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Result card" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Grid of six results across category and supplier tones</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {RESULT_CARDS.map((card) => (
            <PartResultCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </main>
  )
}
