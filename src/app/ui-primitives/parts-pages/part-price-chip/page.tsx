import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartPriceChip } from "../../components/parts-pages"

import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Part price chip | Parts pages",
  description: "Primitive 13 — Price chip composing commerce/PriceTag with installment hint and stacked variant.",
}

export default function PartPriceChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Price chip"
        title="Part price chip"
        description="Wraps commerce/PriceTag with a parts-specific glow surface, optional label and an instalment-plan hint. Two variants — inline for grids and stacked for detail pages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Price chip" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Inline variants — flat RRP, discounted, and discounted with instalment hint</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <PartPriceChip price={{ rrpCents: 89900 }} />
          <PartPriceChip price={{ rrpCents: 184900, currentCents: 169900 }} />
          <PartPriceChip
            price={{ rrpCents: 184900, currentCents: 169900, installmentHint: "or 4 x $42.49 fortnightly" }}
          />
        </div>
      </div>

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Stacked variant — detail-page surface</span>
        <div style={{ maxWidth: 360 }}>
          <PartPriceChip
            variant="stacked"
            label="Pricing"
            price={{ rrpCents: 184900, currentCents: 169900, installmentHint: "or 4 x $42.49 fortnightly" }}
          />
        </div>
      </div>
    </main>
  )
}
