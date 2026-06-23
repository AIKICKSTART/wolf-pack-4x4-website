import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuoteValidityCountdown } from "../../components/quotes"

import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Validity countdown | Quotes | UI Primitives",
  description:
    "Live countdown until a quote expires — tone shift in the last 24 hours, extend-validity CTA.",
}

export default function QuoteValidityCountdownPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 10"
        title="Quote validity countdown"
        description="Live expiry countdown shown on every active quote. Tone is calm at issue, shifts to amber inside the last 24 hours, and switches to red once expired. Use the extend CTA to reset the validity window."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Validity countdown" },
        ]}
      />
      <section className={styles.stage} aria-label="Validity countdown demo">
        <div className={styles.stageHead}>
          <span className={styles.stageKicker}>Active quote</span>
          <h2 className={styles.stageTitle}>Standard 14-day validity</h2>
          <p className={styles.stageBody}>
            Quote OFM-2641 issued Tue 27 May 2026 with a 14-day validity window. Countdown updates
            every minute on the live primitive — pinned here at 4 days 2 hours remaining for the
            reference shot.
          </p>
        </div>
        <QuoteValidityCountdown
          expiresAt="2026-06-11T09:42:00+10:00"
          nowOverride="2026-06-07T07:42:00+10:00"
        />
        <div className={styles.stageHead}>
          <span className={styles.stageKicker}>Urgency state</span>
          <h2 className={styles.stageTitle}>Inside the last 24 hours</h2>
          <p className={styles.stageBody}>Amber tone telegraphs urgency to the workshop staff and the customer.</p>
        </div>
        <QuoteValidityCountdown
          expiresAt="2026-06-11T09:42:00+10:00"
          nowOverride="2026-06-10T20:42:00+10:00"
        />
        <div className={styles.stageHead}>
          <span className={styles.stageKicker}>Expired state</span>
          <h2 className={styles.stageTitle}>Past the deadline</h2>
          <p className={styles.stageBody}>Red tone — extend or re-issue.</p>
        </div>
        <QuoteValidityCountdown
          expiresAt="2026-06-11T09:42:00+10:00"
          nowOverride="2026-06-13T10:00:00+10:00"
        />
      </section>
    </main>
  )
}
