import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CounterOfferCard } from "../../components/quotes"

import { COUNTER_CHANGES } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Counter-offer card | Quotes | UI Primitives",
  description:
    "Counter-offer surface — changed line items, revised total, customer note, accept / counter / reject actions.",
}

export default function CounterOfferCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 09"
        title="Counter-offer card"
        description="Triggered when the customer counters the price instead of accepting outright. Shows changed lines, the revised total delta, the customer's note, and three actions — accept, counter back, or reject."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Counter-offer" },
        ]}
      />
      <CounterOfferCard
        customerName="Mikhail Petrov"
        submittedAt="Wed 28 May · 08:12 AEST"
        changes={COUNTER_CHANGES}
        revisedTotal={2733.5}
        originalTotal={2953.5}
        customerNote="Cheers Brad — happy with the cat-back at full price. Can you sharpen the mid-pipe a touch and trim the O2 retune labour? We've got three more N80s coming through the fleet workshop in Q3."
      />
    </main>
  )
}
