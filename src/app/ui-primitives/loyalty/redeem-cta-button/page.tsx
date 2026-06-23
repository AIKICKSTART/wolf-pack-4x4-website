import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { RedeemCtaButtonDemos } from "../_interactive-demos"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Redeem CTA | Loyalty | UI Primitives",
  description:
    "Reward redeem button with a four-state machine — idle → confirming → redeemed (confetti) → fail. Async-friendly handler with built-in confetti trigger.",
}

export default function RedeemCtaButtonScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 06"
        title="Redeem CTA"
        description="State machine button — idle, confirming (spinner), redeemed (success, confetti), fail (red, retry). Drives reward redemption from the catalogue."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Redeem CTA" },
        ]}
      />
      <section className={[styles.sceneShell, styles.sceneRow].join(" ")}>
        <RedeemCtaButtonDemos />
      </section>
    </main>
  )
}
