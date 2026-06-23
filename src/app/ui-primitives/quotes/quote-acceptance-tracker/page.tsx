import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuoteAcceptanceTracker } from "../../components/quotes"

import { ACCEPTANCE_EVENTS } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Quote acceptance tracker | Quotes | UI Primitives",
  description:
    "Acceptance pipeline tracker — Sent → Opened → Viewed → Accepted with timestamps and reminder CTA.",
}

export default function QuoteAcceptanceTrackerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 08"
        title="Quote acceptance tracker"
        description="Status timeline of a quote from sent to accepted. Each stage shows when it happened, the channel detail, and offers a send-reminder CTA while the quote is still active."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Acceptance tracker" },
        ]}
      />
      <QuoteAcceptanceTracker
        events={ACCEPTANCE_EVENTS}
        current="viewed"
        reminderHint="Quote expires Wed 11 Jun · sending a reminder Mon 9 Jun is recommended."
      />
    </main>
  )
}
