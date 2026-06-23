import type { Metadata } from "next"

import { DigestScheduler } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { MOCK_DIGEST_DAILY, MOCK_DIGEST_WEEKLY } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Digest scheduler | Notifications system",
  description:
    "Primitive 07 — daily / weekly digest scheduler with weekday picker, send time, and timezone.",
}

const PERTH_DAILY = { ...MOCK_DIGEST_DAILY, hour: 6, minute: 45, timezone: "Australia/Perth" }

export default function DigestSchedulerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Digest scheduler"
        title="Digest scheduler"
        description="Pick when the workshop-wide digest goes out. Cadence and send day live in aria-radiogroups so keyboard navigation matches sighted layout."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Digest scheduler" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Daily workshop digest · 07:30 AEST</span>
        <DigestScheduler initialValue={MOCK_DIGEST_DAILY} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Weekly customer digest · Sat 09:00</span>
        <DigestScheduler initialValue={MOCK_DIGEST_WEEKLY} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Perth daily · 06:45 AWST</span>
        <DigestScheduler initialValue={PERTH_DAILY} />
      </section>
    </main>
  )
}
