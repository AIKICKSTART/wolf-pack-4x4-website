import {
  FeatureGrid,
  PricingCtaSection,
  type FeatureGridItem,
  type PricingCtaAction,
} from "@/app/ui-primitives/components/marketing"
import type {
  ComparisonColumn,
  ComparisonRow,
} from "@/app/ui-primitives/components/data-display/comparison-table"

import styles from "./pricing-service-section.module.css"

export interface PricingServiceSectionProps {
  kicker?: string
  heading: string
  body?: string
  /** Service tiers — columns of the comparison table. */
  columns: ReadonlyArray<ComparisonColumn>
  /** Service line-items — rows of the comparison table. */
  rows: ReadonlyArray<ComparisonRow>
  /** Footnote beneath the pricing table. */
  footnote?: string
  /** Final pricing CTA actions. */
  actions: ReadonlyArray<PricingCtaAction>
  /** "What's always included" feature heading. */
  includedHeading?: string
  /** "What's always included" features — composes FeatureGrid. */
  included: ReadonlyArray<FeatureGridItem>
  className?: string
}

/**
 * Pricing / service section — the marketing PricingCtaSection (a comparison
 * table + CTA) above a FeatureGrid of always-included guarantees. Pure
 * composition of existing primitives; token-driven; light/dark via tokens.
 */
export function PricingServiceSection({
  kicker,
  heading,
  body,
  columns,
  rows,
  footnote,
  actions,
  includedHeading = "Every job includes",
  included,
  className,
}: PricingServiceSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <PricingCtaSection
        kicker={kicker}
        heading={heading}
        body={body}
        columns={columns}
        rows={rows}
        footnote={footnote}
        actions={actions}
      />

      <FeatureGrid
        heading={includedHeading}
        columns={3}
        features={included}
        className={styles.included}
      />
    </section>
  )
}

export default PricingServiceSection
