import type { Metadata } from "next"

import { KycSuccessState } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "KYC success state | KYC",
  description:
    "Primitive 13 — final success card after KYC completes: large check, all-set headline, follow-up CTAs (Connect Stripe, Start first quote) and a confetti burst on appear.",
}

export default function SuccessStateScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Success"
        title="KYC success state"
        description="Final card shown after every KYC step clears. A large gradient check mark, kicker, headline, supporting body, and a stack of follow-up CTAs (Connect Stripe payouts, Start your first quote). Confetti fires on mount and is suppressed under reduced-motion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Success state" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — fired on appear</span>
        <KycSuccessState
          kicker="KYC complete"
          headline="All set — your workshop is verified"
          body="Identity, address, business and beneficial-owner checks all came back clear. The Oak Flats Mufflermen workspace is now activated."
          ctas={[
            {
              label: "Connect Stripe payouts",
              description: "Accept card + Apple Pay at the front desk.",
              glyph: "$",
              href: "/ui-primitives/onboarding/connect-integration",
            },
            {
              label: "Start your first quote",
              description: "Capture a rego and quote a muffler swap.",
              glyph: "▸",
              href: "/ui-primitives/onboarding/first-actions",
            },
            {
              label: "Invite the crew",
              description: "Bay leads, parts receivers, front desk.",
              glyph: "✦",
              href: "/ui-primitives/onboarding/empty-team-prompt",
            },
          ]}
        />
      </section>
    </main>
  )
}
