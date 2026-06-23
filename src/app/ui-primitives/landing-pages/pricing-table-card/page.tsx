import type { Metadata } from "next"

import { PricingTableCard } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { PRICING_TIERS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Pricing table card | Landing Pages",
  description:
    "Primitive 06 — 3-column pricing table with feature checks and a recommended-tier badge.",
}

const SINGLE_TIER = [PRICING_TIERS[1]!] as const
const TWO_TIERS = [PRICING_TIERS[0]!, PRICING_TIERS[2]!] as const

export default function PricingTableCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Pricing table"
        title="Pricing table card"
        description="Three-column pricing table — feature checks, recommended badge on the middle tier, single CTA each. Three states: full 3-tier, focused single-tier, and a two-tier comparison."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Pricing table card" },
        ]}
      />

      <span className={styles.stageCaption}>State · Full 3-tier</span>
      <PricingTableCard
        kicker="Plans"
        heading="Workshop Pass · Trade Pack · Fleet Plus"
        body="Pick a plan that fits your workload. Cancel anytime — no contracts beyond the current calendar month."
        tiers={PRICING_TIERS}
      />

      <span className={styles.stageCaption}>State · Focused single tier (Trade Pack)</span>
      <PricingTableCard
        heading="Trade Pack — built for 3-vehicle tradies"
        tiers={SINGLE_TIER}
      />

      <span className={styles.stageCaption}>State · Two-tier comparison</span>
      <PricingTableCard
        kicker="Compare side by side"
        heading="Workshop Pass vs Fleet Plus"
        tiers={TWO_TIERS}
      />
    </main>
  )
}
