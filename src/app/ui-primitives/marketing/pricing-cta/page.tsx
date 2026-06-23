import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PricingCtaSection } from "../../components/marketing/pricing-cta-section"
import type { ComparisonColumn, ComparisonRow } from "../../components/data-display/comparison-table"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Pricing & CTA section | Marketing Blocks",
  description:
    "Primitive 05 — wraps the ComparisonTable with a section header and a final CTA row.",
}

const COLUMNS: ReadonlyArray<ComparisonColumn> = [
  { id: "essentials", name: "Bay Visit", caption: "Drop-in muffler swap" },
  { id: "stage1", name: "Stage 1 Catback", caption: "Manta 3-inch stainless", popular: true },
  { id: "stage2", name: "Stage 2 Twin Tip", caption: "Catback + dyno tune" },
]

const ROWS: ReadonlyArray<ComparisonRow> = [
  { feature: "MIG mounting weld", description: "Bracket and hanger fixings", values: ["check", "check", "check"] },
  { feature: "Argon-purged TIG catback", description: "304-grade stainless joints", values: ["cross", "check", "check"] },
  { feature: "Manta tip + heat shield", description: "Polished or blued finish", values: ["dot", "check", "check"] },
  { feature: "Pre/post dyno sheet", description: "Albion Park dyno cell", values: ["cross", "dot", "check"] },
  { feature: "ADR 83/00 stamped", description: "Compliance docket included", values: ["check", "check", "check"] },
  { feature: "Workshop hire", description: "Per bay-hour bracket", values: ["1 hr", "3 hr", "5 hr"] },
  { feature: "Lifetime crack warranty", description: "Covers our welds, not factory joints", values: ["check", "check", "check"] },
]

export default function PricingCtaPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Pricing & CTA section"
        title="Pricing CTA section"
        description="Section header plus the ComparisonTable plus a final CTA row. Single-responsibility section block."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Pricing & CTA" },
        ]}
      />

      <PricingCtaSection
        kicker="Workshop pricing"
        heading="Three packages. One bay. One torque-tested signature."
        body="Pricing is per ute, per bay, fitted on-site at Oak Flats. Caravan rigs and 4x4 dual-cab variations adjust on quote."
        columns={COLUMNS}
        rows={ROWS}
        footnote={
          <>
            All prices are GST-inclusive. Drive-away quotes confirmed at the front desk before any weld starts.
          </>
        }
        actions={[
          { label: "Book a Stage 1 fit", href: "#book", variant: "primary" },
          { label: "Compare full spec sheet", href: "#spec", variant: "secondary" },
        ]}
      />
    </main>
  )
}
