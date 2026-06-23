import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PricingTierChip } from "../../components/marketplace/pricing-tier-chip"
import type { PricingTier } from "../../components/marketplace/marketplace-types"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Pricing tier chip | Marketplace | UI Primitives",
  description: "Pricing tier chip — Free, Pro, Enterprise, Pay-per-use with tone shift and small icon.",
}

interface TierEntry {
  tier: PricingTier
  priceLabel?: string
}

const TIERS: ReadonlyArray<TierEntry> = [
  { tier: "free" },
  { tier: "pro", priceLabel: "$24 / month" },
  { tier: "enterprise", priceLabel: "Contact sales" },
  { tier: "pay-per-use", priceLabel: "$0.05 / SMS" },
]

export default function PricingTierChipShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.11 / Pricing tier"
        title="Pricing tier chip"
        description="Compact tier chip used inside plugin cards, detail headers, and trending strips. Tone shifts with the commercial commitment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Pricing tier chip" },
        ]}
      />

      <section className={styles.section} aria-labelledby="pricing-tier-chip-row">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Tiers</span>
          <h2 id="pricing-tier-chip-row" className={styles.sectionTitle}>
            All four tiers with optional price label
          </h2>
        </header>
        <div className={styles.chipRow}>
          {TIERS.map((entry) => (
            <PricingTierChip key={entry.tier} tier={entry.tier} priceLabel={entry.priceLabel} />
          ))}
        </div>
      </section>
    </main>
  )
}
