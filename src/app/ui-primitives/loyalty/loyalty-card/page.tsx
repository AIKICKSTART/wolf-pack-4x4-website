import type { Metadata } from "next"

import { LoyaltyCard } from "../../components/loyalty/loyalty-card"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_MEMBER } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Loyalty card | Loyalty | UI Primitives",
  description:
    "Member loyalty card scene — Brodie-tier holographic surface, points balance with count-up, member-since date, and obsidian / chrome / holographic variants.",
}

export default function LoyaltyCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 01"
        title="Loyalty card"
        description="Member loyalty card with tier badge, points balance, holder identity, member-since date. Three surface tones: obsidian (workshop default), chrome (Bay 2 mates), holographic (Brodie tier)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Loyalty card" },
        ]}
      />
      <section className={styles.sceneShell}>
        <div className={styles.sceneRow}>
          <LoyaltyCard
            memberName={SAMPLE_MEMBER.name}
            memberId={SAMPLE_MEMBER.id}
            tier={SAMPLE_MEMBER.tier}
            pointsBalance={SAMPLE_MEMBER.pointsBalance}
            memberSinceISO={SAMPLE_MEMBER.memberSinceISO}
            tone="obsidian"
          />
          <LoyaltyCard
            memberName="Brodie Tasker"
            memberId="OFM-A1001-BR"
            tier="brodie"
            pointsBalance={32480}
            memberSinceISO="2017-09-21"
            tone="holographic"
          />
        </div>
        <div className={styles.sceneRow}>
          <LoyaltyCard
            memberName="Mick Halloran"
            memberId="OFM-X0044-MH"
            tier="gold"
            pointsBalance={9820}
            memberSinceISO="2023-11-04"
            tone="chrome"
          />
          <LoyaltyCard
            memberName="Sam Kovacic"
            memberId="OFM-Q5512-SK"
            tier="silver"
            pointsBalance={4820}
            memberSinceISO="2024-08-15"
            tone="obsidian"
          />
        </div>
      </section>
    </main>
  )
}
