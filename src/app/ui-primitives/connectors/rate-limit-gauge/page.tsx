import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RateLimitGauge } from "../../components/connectors"

import {
  RATE_GOOGLE_CALENDAR_HEALTHY,
  RATE_OPENAI_NEAR,
  RATE_REPLICATE_OVER,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Rate limit gauge | Connectors",
  description:
    "Primitive 04 — radial gauge with quota used/remaining and reset countdown.",
}

export default function RateLimitGaugeScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Gauge"
        title="Rate limit gauge"
        description="Radial usage gauge — quota used, remaining and reset countdown. Three live states — healthy (Google Calendar API), near-limit (OpenAI Tier-4) and at-cap (Replicate predictions)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Rate limit gauge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three load levels · healthy / near / at-cap</span>
        <div className={styles.demoTriple}>
          <RateLimitGauge {...RATE_GOOGLE_CALENDAR_HEALTHY} />
          <RateLimitGauge {...RATE_OPENAI_NEAR} />
          <RateLimitGauge {...RATE_REPLICATE_OVER} />
        </div>
      </section>
    </main>
  )
}
