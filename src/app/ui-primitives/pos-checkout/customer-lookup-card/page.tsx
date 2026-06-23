import type { Metadata } from "next"

import { CustomerLookupCard } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { CUSTOMER_TRADE, CUSTOMER_VIP } from "../_mock-data"
import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "Customer lookup | POS checkout",
  description:
    "Primitive 07 — POS customer lookup with phone / email / rego search modes, loyalty tier badge, lifetime spend and attach-to-sale CTA.",
}

export default function CustomerLookupCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Customer lookup"
        title="Customer lookup card"
        description="Look up a customer by phone, email or vehicle rego. Loyalty tier badge tone-codes by tier, lifetime spend and visit count anchor the card."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Customer lookup" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · VIP workshop crew match · phone</span>
        <CustomerLookupCard
          initialMode="phone"
          initialQuery="0432 188 207"
          match={CUSTOMER_VIP}
        />
        <span className={styles.stageCaption}>State 02 · trade account · email lookup</span>
        <CustomerLookupCard
          initialMode="email"
          initialQuery="trade@bayauto.com.au"
          match={CUSTOMER_TRADE}
        />
        <span className={styles.stageCaption}>State 03 · no match yet · rego search</span>
        <CustomerLookupCard
          initialMode="rego"
          initialQuery="BVA42K"
          match={null}
        />
      </section>
    </main>
  )
}
