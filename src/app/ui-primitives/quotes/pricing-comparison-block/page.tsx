import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PricingComparisonBlock } from "../../components/quotes"

import { PRICING_FEATURES, PRICING_PLANS } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Pricing comparison block | Quotes | UI Primitives",
  description:
    "In-quote pricing comparison — 3 plan columns with feature rows, recommended badge, and per-plan select CTA.",
}

export default function PricingComparisonBlockPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 13"
        title="Pricing comparison block"
        description="Three-plan comparison embedded inside a quote — gives the customer a clear good / better / best choice and a one-click select per column. Recommended plan gets a badge and a lifted card treatment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Pricing comparison" },
        ]}
      />
      <PricingComparisonBlock
        title="Choose your build level"
        description="Same Hilux N80 chassis — three levels of system, labour, and after-care depending on how the truck is used. Touring is recommended for fleet operators."
        features={PRICING_FEATURES}
        plans={PRICING_PLANS}
      />
    </main>
  )
}
