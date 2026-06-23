import type { Metadata } from "next"

import { MemberMilestoneCelebration } from "../../components/loyalty/member-milestone-celebration"
import { PageHeader } from "../../components/page-header"

import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Milestone celebration | Loyalty | UI Primitives",
  description:
    "Confetti-on-appear milestone surface — fires automatically when the member sees their first visit, tier-up, anniversary, hundredth visit, referral streak, or birthday.",
}

export default function MilestoneCelebrationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 10"
        title="Milestone celebration"
        description="Four milestone variants — tier-up, anniversary, hundredth visit, referral streak. Reveal-on-scroll plus confetti cannon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Milestone celebration" },
        ]}
      />
      <section className={styles.sceneStack}>
        <MemberMilestoneCelebration
          kind="tier-up"
          headline="You're now Brodie tier"
          detail="Bay 2 mates lounge unlocked. Stuart has your tea already on."
          earnedRewardLabel="+2,500 bonus pts"
        />
        <MemberMilestoneCelebration
          kind="anniversary"
          headline="Five years with the workshop"
          detail="Half a decade riding with the Mufflermen mob. Cheers, mate."
          earnedRewardLabel="Free quarterly dyno · 1 yr"
          autoFire={false}
        />
        <MemberMilestoneCelebration
          kind="100-visits"
          headline="Hundredth booking, locked in"
          detail="A hundred jobs through Bay 2 means you basically work here now."
          earnedRewardLabel="Custom-engraved coffee mug"
          autoFire={false}
        />
        <MemberMilestoneCelebration
          kind="referral-streak"
          headline="Five referrals in a row"
          detail="That's five mates we owe you a beer for at the Christmas BBQ."
          earnedRewardLabel="+1,800 pts streak bonus"
          autoFire={false}
        />
      </section>
    </main>
  )
}
