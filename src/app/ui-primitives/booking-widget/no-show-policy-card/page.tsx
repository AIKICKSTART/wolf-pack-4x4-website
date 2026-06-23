import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NoShowPolicyCard } from "../../components/booking-widget"
import styles from "../booking-widget.module.css"
import { POLICY_RULES } from "../sample-data"

export const metadata: Metadata = {
  title: "No-show policy card | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.14 / Booking widget"
        title="No-show policy card"
        description="Lays out the workshop's no-show policy in plain language with the cancellation deadline chip and a one-tap call button to the bay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "No-show policy card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <NoShowPolicyCard
            rules={POLICY_RULES}
            cancellationDeadline="24h before"
            rescheduleAllowance="1 free reschedule"
            contactPhone="(02) 4232 9988"
          />
          <NoShowPolicyCard
            rules={POLICY_RULES}
            cancellationDeadline="2h before"
            rescheduleAllowance="No reschedule remaining"
            contactPhone="(02) 4232 9988"
            warning
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            When the warning flag is set the card flips to role=&quot;alert&quot;
            with a red border, red kicker, and a red contact CTA tone so the
            customer reads it before tapping continue.
          </p>
        </div>
      </section>
    </main>
  )
}
