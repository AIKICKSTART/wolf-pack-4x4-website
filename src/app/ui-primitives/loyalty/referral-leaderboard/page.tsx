import type { Metadata } from "next"

import { ReferralLeaderboard } from "../../components/loyalty/referral-leaderboard"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_LEADERBOARD } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Referral leaderboard | Loyalty | UI Primitives",
  description:
    "Top referrers table — rank chip, avatar, name, referral count, AUD earned. Drives the Mufflermen monthly mate-of-the-month award.",
}

export default function ReferralLeaderboardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 08"
        title="Referral leaderboard"
        description="Top eight referrers across the May 2026 period — Brodie Tasker holding the top spot, Stuart's son Mick still second, Ange chasing him hard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Referral leaderboard" },
        ]}
      />
      <section className={styles.sceneShell}>
        <ReferralLeaderboard
          rows={SAMPLE_LEADERBOARD}
          caption="Top referrers — May 2026"
          period="May 2026 · Oak Flats"
        />
      </section>
    </main>
  )
}
