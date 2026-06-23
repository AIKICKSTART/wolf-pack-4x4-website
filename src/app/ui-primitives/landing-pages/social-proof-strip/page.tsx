import type { Metadata } from "next"

import { SocialProofStrip } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { SOCIAL_PROOF_LOGOS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Social proof strip | Landing Pages",
  description:
    "Primitive 03 — partner logo strip with star rating, review count, and customer-since line.",
}

export default function SocialProofStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Social proof"
        title="Social proof strip"
        description="A heading + aggregate rating header sat over a row of partner / supplier logo cards. Three states: Google + FB aggregate, single-source Productreview, and an awards-only treatment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Social proof strip" },
        ]}
      />

      <span className={styles.stageCaption}>State · Aggregate rating (Google + Facebook)</span>
      <SocialProofStrip
        kicker="Trust"
        heading="Welded in. Signed off. Backed by partners."
        rating={{ stars: 4.9, reviewCount: 612, source: "Google & Facebook" }}
        customerSinceLabel="Serving Illawarra customers since 1972"
        logos={SOCIAL_PROOF_LOGOS}
      />

      <span className={styles.stageCaption}>State · Single-source Productreview</span>
      <SocialProofStrip
        heading="Stainless that lasts longer than the ute."
        rating={{ stars: 4.8, reviewCount: 184, source: "Productreview.com.au" }}
        customerSinceLabel="3 generations of South Coast families"
        logos={SOCIAL_PROOF_LOGOS.slice(0, 4)}
      />

      <span className={styles.stageCaption}>State · Awards + smaller logo row</span>
      <SocialProofStrip
        kicker="Industry recognition"
        heading="MTA NSW Workshop of the Year shortlist · 2024 + 2025"
        rating={{ stars: 5.0, reviewCount: 53, source: "Trade press" }}
        logos={SOCIAL_PROOF_LOGOS.slice(0, 3)}
      />
    </main>
  )
}
