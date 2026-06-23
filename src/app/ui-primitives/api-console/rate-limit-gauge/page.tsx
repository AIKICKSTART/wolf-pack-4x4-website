import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RateLimitGauge } from "../../components/api-console"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Rate limit gauge | API Console",
  description:
    "Primitive 07 — live requests-per-minute gauge with burst capacity chip and throttle warning.",
}

export default function RateLimitGaugePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Rate limit"
        title="Rate limit gauge"
        description="A live meter showing current requests per minute against the sustained limit, with the burst capacity called out and a throttle warning that crosses in at 85 percent by default."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Rate limit gauge" },
        ]}
      />
      <section className={styles.stack} aria-label="Rate limit examples">
        <RateLimitGauge currentRpm={420} limitRpm={1200} burstCapacity={300} />
        <RateLimitGauge currentRpm={910} limitRpm={1200} burstCapacity={300} />
        <RateLimitGauge currentRpm={1180} limitRpm={1200} burstCapacity={300} />
      </section>
    </main>
  )
}
