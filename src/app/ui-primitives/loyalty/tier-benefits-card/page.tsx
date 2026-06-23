import type { Metadata } from "next"

import { TierBenefitsCard } from "../../components/loyalty/tier-benefits-card"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_BENEFITS } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Tier benefits card | Loyalty | UI Primitives",
  description:
    "Per-tier benefits panel — list of perks with check (unlocked) / lock (next-tier) icons and an upgrade CTA into the next tier.",
}

export default function TierBenefitsCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 04"
        title="Tier benefits card"
        description="Sample Platinum-tier benefits view showing five unlocked perks and three locked perks waiting for Brodie tier upgrade."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Tier benefits card" },
        ]}
      />
      <section className={styles.sceneShell}>
        <TierBenefitsCard
          tier="platinum"
          benefits={SAMPLE_BENEFITS}
          upgradeHref="/ui-primitives/loyalty/full-member-portal"
          upgradeLabel="Push to Brodie tier"
        />
      </section>
    </main>
  )
}
