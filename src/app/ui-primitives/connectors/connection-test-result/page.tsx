import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConnectionTestResult } from "../../components/connectors"

import {
  TEST_SHOPIFY_FAIL,
  TEST_STRIPE_OK,
  TEST_TWILIO_WARN,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Connection test result | Connectors",
  description:
    "Primitive 12 — test call result with status, latency, region and sample payload.",
}

export default function ConnectionTestResultScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Result"
        title="Connection test result"
        description="Inline test-call summary — endpoint, HTTP code, round-trip latency, resolved region, tested-at and a sample JSON payload. Three live outcomes — OK (Stripe 200 / 142ms), degraded (Twilio 200 / 612ms) and failed (Shopify 502 / 4823ms)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Connection test result" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three outcomes · ok / warn / fail</span>
        <div className={styles.demoStack}>
          <ConnectionTestResult {...TEST_STRIPE_OK} />
          <ConnectionTestResult {...TEST_TWILIO_WARN} />
          <ConnectionTestResult {...TEST_SHOPIFY_FAIL} />
        </div>
      </section>
    </main>
  )
}
