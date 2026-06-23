import type { Metadata } from "next"

import { CustomerHealthScore } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_HEALTH_FACTORS, SAMPLE_LOW_HEALTH_FACTORS } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Customer health score | Customer success",
  description:
    "Primitive 01 — composite customer health score 0-100 with tone shift and Engagement / Adoption / Sentiment / Support / Value factor chips.",
}

export default function CustomerHealthScoreScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Health score"
        title="Customer health score"
        description="Composes the CRM AccountHealthMeter and adds the five customer-success factor chips. Elite at 90+, healthy at 60-89, watch at 30-59, critical under 30."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Health score" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · strategic</span>
          <CustomerHealthScore
            customerName="Wollongong Express Fleet"
            score={92}
            trendDelta={6}
            factors={SAMPLE_HEALTH_FACTORS}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · performance shop regular</span>
          <CustomerHealthScore
            customerName="Mick Davis"
            score={78}
            trendDelta={-3}
            factors={[
              { key: "engagement", score: 82 },
              { key: "adoption", score: 71 },
              { key: "sentiment", score: 88 },
              { key: "support", score: 65 },
              { key: "value", score: 80 },
            ]}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Trent Williams · retail enthusiast</span>
          <CustomerHealthScore
            customerName="Trent Williams"
            score={48}
            trendDelta={-12}
            factors={[
              { key: "engagement", score: 38 },
              { key: "adoption", score: 52 },
              { key: "sentiment", score: 44 },
              { key: "support", score: 36 },
              { key: "value", score: 68 },
            ]}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Kawanda Yuen · lapsed</span>
          <CustomerHealthScore
            customerName="Kawanda Yuen"
            score={22}
            trendDelta={-18}
            factors={SAMPLE_LOW_HEALTH_FACTORS}
          />
        </section>
      </div>
    </main>
  )
}
