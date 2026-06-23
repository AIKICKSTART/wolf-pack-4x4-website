import type { Metadata } from "next"

import { LoyaltyStampCard } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import { LOYALTY_BEC, LOYALTY_KAREN, LOYALTY_MICK } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Loyalty stamp card | Workshop ops",
  description:
    "Primitive 13 — visual loyalty stamp card with the reward-unlocked badge — three states.",
}

export default function LoyaltyStampCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Loyalty stamp card"
        title="Mufflermen loyalty stamp card"
        description="Visual stamp grid — one Mufflermen muffler stamp per qualifying visit. Reward unlocks at 8 of 8 and pings as a celebratory badge. Three states — Mick almost there (7 of 8), Karen redeem-ready (8 of 8, reward unlocked), and Bec just started (2 of 8)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Loyalty stamp card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <LoyaltyStampCard card={LOYALTY_MICK} />
          <LoyaltyStampCard card={LOYALTY_KAREN} />
          <LoyaltyStampCard card={LOYALTY_BEC} />
        </div>
      </section>
    </main>
  )
}
