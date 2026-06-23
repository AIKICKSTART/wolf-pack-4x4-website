import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReportSubscriptionRow } from "../../components/reports"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Subscription row | Reports",
  description:
    "Primitive 10 — single-line subscription row with avatar, frequency chip, last-sent, and unsubscribe.",
}

export default function ReportSubscriptionRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Subscription row"
        title="Subscription row"
        description="One subscriber per row — avatar, full name, work address, the cadence they receive the report, and a quiet unsubscribe affordance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Subscription row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <ReportSubscriptionRow
            subscriberName="Daniel Fleuren"
            subscriberEmail="daniel@mufflermen.com.au"
            initials="DF"
            frequency="weekly"
            lastSent="21 May · 06:00"
          />
          <ReportSubscriptionRow
            subscriberName="Sienna Pereira"
            subscriberEmail="sienna@mufflermen.com.au"
            initials="SP"
            frequency="monthly"
            lastSent="01 May · 06:00"
          />
          <ReportSubscriptionRow
            subscriberName="Jordan Holt"
            subscriberEmail="jordan@mufflermen.com.au"
            initials="JH"
            frequency="quarterly"
            lastSent="01 Apr · 09:00"
          />
          <ReportSubscriptionRow
            subscriberName="Charlie Mahoney"
            subscriberEmail="charlie@mufflermen.com.au"
            initials="CM"
            frequency="daily"
            lastSent="Today · 06:00"
          />
        </div>
      </section>
    </main>
  )
}
