import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

import { PricingScene } from "./pricing-scene"

export const metadata: Metadata = {
  title: "Pricing | Commerce | UI Primitives",
  description:
    "Workshop subscription pricing — monthly / annual / lifetime toggle with three feature-matched tier cards.",
}

export default function PricingPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 05"
        title="Pricing"
        description="Workshop subscriptions for everyday drivers, enthusiasts, and small fleets. Toggle billing cycle to see live price updates across all three tiers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Pricing" },
        ]}
      />
      <PricingScene />
    </main>
  )
}
