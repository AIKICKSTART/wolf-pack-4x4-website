import type { Metadata } from "next"

import { DonationTierCard } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { TIERS } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Donation tier card | Live broadcast",
  description:
    "Primitive 11 — supporter tier card (Workshop Crew / Inner Circle / Pit Boss / Platinum) with perks list and current tier marker.",
}

export default function DonationTierCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Donation tier card"
        title="Donation tier card"
        description="Single supporter tier — Workshop Crew, Inner Circle, Pit Boss, Platinum. Tier accents drive the gold-bronze-silver-teal palette; the current-tier chip lifts the active card."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Donation tier card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Four-tier ladder · viewer is on Inner Circle</span>
        <div className={styles.demoQuad}>
          {TIERS.map((descriptor) => (
            <DonationTierCard key={descriptor.tier} descriptor={descriptor} />
          ))}
        </div>

        <span className={styles.demoLabel}>Two-tier compare · solo</span>
        <div className={styles.demoDouble}>
          <DonationTierCard descriptor={TIERS[0]} />
          <DonationTierCard descriptor={TIERS[3]} />
        </div>
      </section>
    </main>
  )
}
