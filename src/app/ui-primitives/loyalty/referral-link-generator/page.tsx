import type { Metadata } from "next"

import { ReferralLinkGenerator } from "../../components/loyalty/referral-link-generator"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_MEMBER } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Referral link generator | Loyalty | UI Primitives",
  description:
    "Referral URL + code with copy buttons, email/SMS share, and an embedded QR code. Built around inline-copy-button and qr-block.",
}

export default function ReferralLinkGeneratorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 07"
        title="Referral link generator"
        description="Share-your-line panel. Member can copy the URL, copy the short code, fire a mailto:/sms: share, or have a mate scan the QR in-bay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Referral link generator" },
        ]}
      />
      <section className={styles.sceneShell}>
        <ReferralLinkGenerator
          referralUrl={SAMPLE_MEMBER.referralUrl}
          referralCode={SAMPLE_MEMBER.referralCode}
          rewardCopy="$25 workshop credit for both of you"
        />
      </section>
    </main>
  )
}
