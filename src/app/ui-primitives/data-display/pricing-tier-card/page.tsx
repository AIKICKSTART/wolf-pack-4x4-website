import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PricingTierCard } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Pricing tier card | UI Primitives — Data display",
}

export default function PricingTierCardShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.09 / Data display"
        title="Pricing tier card — Mufflermen packages"
        description="A single tier as a card. Combine three or more to make a pricing grid. Highlight prop swaps in a red glow + primary CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Pricing tier card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <PricingTierCard
            kicker="Tier 01"
            name="Stock"
            tagline="OEM-equivalent replacement for legal daily-drive comfort."
            price="649"
            currency="A$"
            period="installed"
            features={[
              { label: "Aluminised mandrel-bent pipework" },
              { label: "Hush-Power oval muffler" },
              { label: "ADR-compliant exit angle" },
              { label: "12-month workshop warranty" },
              { label: "Dyno tune included", included: false },
              { label: "Track-day rated build", included: false },
            ]}
            cta={{ label: "Book a stock fitting", href: "/ui-primitives/data-display" }}
          />
          <PricingTierCard
            highlight
            ribbon="Most popular"
            kicker="Tier 02"
            name="Sport"
            tagline="The build most customers actually want — sound, flow, and durability balanced."
            price="1,184"
            currency="A$"
            period="installed"
            features={[
              { label: "2.5\" T409 stainless throughout" },
              { label: "Magnaflow straight-through muffler" },
              { label: "Dyno tune + AFR sweep included" },
              { label: "24-month parts + labour warranty" },
              { label: "Priority booking slot within 3 days" },
              { label: "Track-day rated build", included: false },
            ]}
            cta={{ label: "Book a sport build", href: "/ui-primitives/data-display" }}
          />
          <PricingTierCard
            kicker="Tier 03"
            name="Track"
            tagline="Full custom T304 stainless with weight reduction. Built per vehicle."
            price="2,684"
            currency="A$"
            period="from"
            features={[
              { label: "3.0\" T304 stainless full system" },
              { label: "XForce twin-cone resonator + muffler" },
              { label: "Dyno tune + tip-throttle calibration" },
              { label: "Lifetime weld + corrosion warranty" },
              { label: "Priority dock fitment" },
              { label: "Track-day insurance coverage" },
            ]}
            cta={{ label: "Spec a track build", href: "/ui-primitives/data-display" }}
          />
        </div>
      </section>
    </main>
  )
}
