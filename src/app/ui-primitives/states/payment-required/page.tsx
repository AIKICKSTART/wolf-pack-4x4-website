import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StatePaymentRequired } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Payment required · 402 | UI Primitives — System States",
}

export default function PaymentRequiredShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.05 / System states"
        title="Settle up · 402"
        description="Receipt + chrome-ribbon plan upgrade surface. Plan card with workshop-priced inclusions, primary upgrade CTA, and a secondary 'continue on free' escape hatch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Payment required" },
        ]}
      />
      <section className={styles.canvas}>
        <StatePaymentRequired
          plan={{
            name: "Workshop Plus",
            priceLabel: "A$48",
            cadence: "per bay / month",
            inclusions: [
              "Unlimited quotes with ADR-aligned invoicing",
              "Telemetry on five sensor lanes per bay (EGT, lambda, knock)",
              "Customer SMS reminders + automated waitlist sweep",
              "Daily ledger reconciliation against the supplier mesh",
            ],
          }}
          primaryAction={
            <Link href="/ui-primitives/forms-gallery" className={styles.btnRed}>
              Upgrade plan
            </Link>
          }
          secondaryAction={
            <Link href="/ui-primitives" className={styles.btnGhost}>
              Stay on free tier
            </Link>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;status&quot; — non-blocking soft prompt. The plan card uses a real section
            with an aria-labelledby pointing at the plan name so it is an addressable group.
          </p>
        </aside>
      </section>
    </main>
  )
}
