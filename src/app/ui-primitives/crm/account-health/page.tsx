import type { Metadata } from "next"

import { AccountHealthMeter } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Account health | CRM",
  description:
    "Primitive 10 — circular account health meter (0-100) with tone shift across critical, watch, healthy, elite, plus RFM + Engagement factor tiles.",
}

export default function AccountHealthScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Account health"
        title="Account health meter"
        description="Circular health score that shifts hue across critical (red), watch (amber), healthy (green), and elite (teal), surrounded by the four contributing factor tiles — Recency, Frequency, Monetary, Engagement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Account health" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · Performance</span>
          <AccountHealthMeter
            score={94}
            factors={[
              { label: "Recency", score: 96 },
              { label: "Frequency", score: 92 },
              { label: "Monetary", score: 98 },
              { label: "Engagement", score: 91 },
            ]}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Sarah Pope · Trade</span>
          <AccountHealthMeter
            score={78}
            factors={[
              { label: "Recency", score: 72 },
              { label: "Frequency", score: 88 },
              { label: "Monetary", score: 80 },
              { label: "Engagement", score: 74 },
            ]}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Trent Williams · Retail</span>
          <AccountHealthMeter
            score={42}
            factors={[
              { label: "Recency", score: 28 },
              { label: "Frequency", score: 48 },
              { label: "Monetary", score: 38 },
              { label: "Engagement", score: 56 },
            ]}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Lapsed account · K. Yuen</span>
          <AccountHealthMeter
            score={18}
            factors={[
              { label: "Recency", score: 8 },
              { label: "Frequency", score: 24 },
              { label: "Monetary", score: 22 },
              { label: "Engagement", score: 14 },
            ]}
          />
        </section>
      </div>
    </main>
  )
}
