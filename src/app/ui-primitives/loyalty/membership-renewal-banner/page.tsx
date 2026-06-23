import type { Metadata } from "next"

import { MembershipRenewalBanner } from "../../components/loyalty/membership-renewal-banner"
import { PageHeader } from "../../components/page-header"

import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Renewal banner | Loyalty | UI Primitives",
  description:
    "Membership renewal banner — days-remaining countdown, renew-now CTA, auto-renew toggle. Urgency tone shifts as the renewal window narrows.",
}

export default function MembershipRenewalBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 11"
        title="Renewal banner"
        description="Three urgency variants — plenty of time (28 days), renewal window (12 days), critical (2 days). Auto-renew toggle reflects member preference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Renewal banner" },
        ]}
      />
      <section className={styles.sceneStack}>
        <MembershipRenewalBanner
          daysRemaining={28}
          planLabel="Mufflermen Brodie"
          renewHref="/ui-primitives/loyalty/full-member-portal"
          autoRenewInitial
        />
        <MembershipRenewalBanner
          daysRemaining={12}
          planLabel="Mufflermen Gold"
          renewHref="/ui-primitives/loyalty/full-member-portal"
        />
        <MembershipRenewalBanner
          daysRemaining={2}
          planLabel="Mufflermen Silver"
          renewHref="/ui-primitives/loyalty/full-member-portal"
        />
      </section>
    </main>
  )
}
