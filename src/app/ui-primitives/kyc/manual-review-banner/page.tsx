import type { Metadata } from "next"

import { ManualReviewBanner } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Manual review banner | KYC",
  description:
    "Primitive 12 — top banner indicating an application is under manual review by the compliance team, with an ETA chip, case reference and contact CTA.",
}

export default function ManualReviewBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Manual review"
        title="Manual review banner"
        description="Top-level banner signalling that the application has been escalated to the compliance team. Includes case reference, ETA chip, contact-compliance CTA and an amber alert icon. Marked role=alert so screen readers announce the change immediately."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Manual review banner" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — banner state</span>
        <ManualReviewBanner
          title="Under manual review by the compliance team"
          body="One sanctions match needs a human reviewer. We’ll email when the review is complete — no further action required from you right now."
          eta="~ 2 business days"
          reference="CASE-2026-104-77"
          contactHref="mailto:compliance@verridian.ai"
          contactLabel="Contact compliance"
        />
      </section>
    </main>
  )
}
