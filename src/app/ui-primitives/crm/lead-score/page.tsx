import type { Metadata } from "next"

import { LeadScoreChip } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Lead score chip | CRM",
  description:
    "Primitive 06 — lead score chip with 0-100 value, gradient tone shift, and breakdown popover (engagement, fit, intent, recency).",
}

export default function LeadScoreScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Lead score"
        title="Lead score chip"
        description="Compact lead score with a four-tone gradient based on the value. Click any chip to reveal the contributing factor breakdown — engagement, fit, intent, recency."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Lead score" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Cold → Blazing</span>
        <div className={styles.demoInline}>
          <LeadScoreChip
            score={18}
            breakdown={[
              { factor: "engagement", score: 10 },
              { factor: "fit", score: 22 },
              { factor: "intent", score: 8 },
              { factor: "recency", score: 30 },
            ]}
          />
          <LeadScoreChip
            score={48}
            breakdown={[
              { factor: "engagement", score: 55 },
              { factor: "fit", score: 60 },
              { factor: "intent", score: 35 },
              { factor: "recency", score: 40 },
            ]}
          />
          <LeadScoreChip
            score={72}
            breakdown={[
              { factor: "engagement", score: 78 },
              { factor: "fit", score: 85 },
              { factor: "intent", score: 60 },
              { factor: "recency", score: 65 },
            ]}
          />
          <LeadScoreChip
            score={94}
            breakdown={[
              { factor: "engagement", score: 96 },
              { factor: "fit", score: 92 },
              { factor: "intent", score: 95 },
              { factor: "recency", score: 92 },
            ]}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen leads</span>
        <div className={styles.demoStack}>
          <div className={styles.demoInline}>
            <span>Mick Davis · Hilux turbo-back</span>
            <LeadScoreChip
              score={88}
              breakdown={[
                { factor: "engagement", score: 92 },
                { factor: "fit", score: 95 },
                { factor: "intent", score: 86 },
                { factor: "recency", score: 80 },
              ]}
            />
          </div>
          <div className={styles.demoInline}>
            <span>Sarah Pope · Ranger DPF + Hiace fleet</span>
            <LeadScoreChip
              score={74}
              breakdown={[
                { factor: "engagement", score: 80 },
                { factor: "fit", score: 88 },
                { factor: "intent", score: 65 },
                { factor: "recency", score: 62 },
              ]}
            />
          </div>
          <div className={styles.demoInline}>
            <span>Trent Williams · Patrol cat-back</span>
            <LeadScoreChip
              score={42}
              breakdown={[
                { factor: "engagement", score: 48 },
                { factor: "fit", score: 55 },
                { factor: "intent", score: 38 },
                { factor: "recency", score: 28 },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
