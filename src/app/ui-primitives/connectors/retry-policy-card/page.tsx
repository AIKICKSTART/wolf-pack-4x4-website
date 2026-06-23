import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RetryPolicyCard } from "../../components/connectors"

import { RETRY_REPLICATE, RETRY_STRIPE, RETRY_TWILIO } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Retry policy card | Connectors",
  description:
    "Primitive 05 — exponential backoff card with max attempts, multiplier and jitter toggle.",
}

export default function RetryPolicyCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Card"
        title="Retry policy card"
        description="Initial backoff, multiplier and max-attempts knobs with a jitter switch that fans the per-attempt timeline into a min/max range. Three live policies — Stripe webhook delivery (jittered), Replicate prediction polling (jittered) and Twilio SMS forward (non-jittered)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Retry policy card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three retry profiles · short / long / fixed</span>
        <div className={styles.demoTriple}>
          <RetryPolicyCard {...RETRY_STRIPE} />
          <RetryPolicyCard {...RETRY_REPLICATE} />
          <RetryPolicyCard {...RETRY_TWILIO} />
        </div>
      </section>
    </main>
  )
}
