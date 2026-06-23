import type { Metadata } from "next"

import { CreditBalanceCard } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { DEMO_AMOUNTS, DEMO_CREDIT_LEDGER } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Credit balance | Billing | UI Primitives",
  description:
    "Credit balance card primitive — available credit hero, recent credit ledger, apply-to-invoice CTA.",
}

export default function CreditBalancePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08"
        title="Credit balance"
        description="Customer account credit. Hero shows the available balance, followed by a ledger of recent credits with reason and apply-to-next-invoice CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Credit balance" },
        ]}
      />
      <CreditBalanceCard
        available={DEMO_AMOUNTS.availableCredit}
        ledger={DEMO_CREDIT_LEDGER}
      />
    </main>
  )
}
