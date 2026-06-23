import type { Metadata } from "next"

import { LapsedMemberRescueCard } from "../../components/loyalty/lapsed-member-rescue-card"
import { PageHeader } from "../../components/page-header"

import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Lapsed member rescue | Loyalty | UI Primitives",
  description:
    "Win-back card for lapsed Mufflermen members — friendly headline, reactivation offer, last-service hook, CTA into the renewal flow.",
}

export default function LapsedMemberRescuePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 12"
        title="Lapsed-member rescue"
        description="Two rescue surfaces — one for an 8-month lapsed Gold member with $50 credit offer, one for a 14-month lapsed Silver with a free dyno session as bait."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Lapsed-member rescue" },
        ]}
      />
      <section className={styles.sceneStack}>
        <LapsedMemberRescueCard
          memberName="Reece Beattie"
          lapsedSince="8 months"
          offerLabel="$50 workshop credit"
          offerDetail="We've held your Bay 2 slot open. Come back this month and grab $50 toward your next job — no questions asked, no re-activation fee."
          reactivateHref="/ui-primitives/loyalty/full-member-portal"
          lastService="Last visit · cat-back swap on the Falcon, May 2025"
        />
        <LapsedMemberRescueCard
          memberName="Phoebe O'Hara"
          lapsedSince="14 months"
          offerLabel="Free dyno session"
          offerDetail="Long time no see. Roll the Commodore back in and we'll throw it on Bay 2's dyno for free — just to say thanks."
          reactivateHref="/ui-primitives/loyalty/full-member-portal"
          lastService="Last visit · LSA dyno + tune, March 2025"
        />
      </section>
    </main>
  )
}
