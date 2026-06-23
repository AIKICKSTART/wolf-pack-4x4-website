import type { Metadata } from "next"

import { BirthdayRewardCard } from "../../components/loyalty/birthday-reward-card"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_MEMBER } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Birthday reward | Loyalty | UI Primitives",
  description:
    "Birthday reward card — confetti on claim, cake icon, bonus-points chip, and claim CTA.",
}

export default function BirthdayRewardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 14"
        title="Birthday reward"
        description="Birthday bay reward card — fires confetti when the member claims, credits +1,000 bonus points overnight. Stuart approves."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Birthday reward" },
        ]}
      />
      <section className={[styles.sceneShell, styles.sceneRow].join(" ")}>
        <BirthdayRewardCard
          memberName={SAMPLE_MEMBER.name}
          bonusPoints={1000}
        />
        <BirthdayRewardCard
          memberName="Brodie Tasker"
          bonusPoints={2500}
        />
      </section>
    </main>
  )
}
