import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CsatScoreCard } from "../../components/support"

import { CSAT_BREAKDOWN } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "CSAT score card | Support",
  description:
    "Primitive 08 — customer satisfaction summary card with score, response count, breakdown bar chart and comment excerpt.",
}

export default function CsatScoreCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Summary"
        title="CSAT score card"
        description="Average rating in big display type plus a 1-5 star tally. Smiley + star histogram visualises the distribution so the average isn't hiding a fat tail of detractors. Comment excerpt grounds the number in something specific."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "CSAT score card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · last 30 days · 274 responses</span>
        <div className={styles.demoSplit}>
          <CsatScoreCard
            averageRating={4.6}
            responseCount={274}
            breakdown={CSAT_BREAKDOWN}
            period="Last 30 days"
            commentExcerpt="Sarah at Bay 2 walked me through the fitment over SMS. Felt like she actually gave a damn. Booked the install on the spot."
            commentAuthor="Mick Davis · 28 May"
          />
          <CsatScoreCard
            averageRating={3.2}
            responseCount={48}
            breakdown={[
              { rating: 5, count: 10 },
              { rating: 4, count: 14 },
              { rating: 3, count: 9 },
              { rating: 2, count: 8 },
              { rating: 1, count: 7 },
            ]}
            period="SMS booking flow · last 30 days"
            commentExcerpt="Confirmation SMS didn't arrive until I rang the workshop. Service in the bay was top-notch though."
            commentAuthor="Aisha Rahman · 24 May"
          />
        </div>
      </section>
    </main>
  )
}
