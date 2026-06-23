import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NpsSurveyCard } from "../../components/support"

import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "NPS survey card | Support",
  description:
    "Primitive 09 — NPS survey card with 0-10 picker, follow-up textarea and previous-response trend chip.",
}

export default function NpsSurveyCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Survey"
        title="NPS survey card"
        description="0-10 scale buttons colour-coded by promoter / passive / detractor band. Optional textarea captures the why. Trend chip in the top right shows how this customer scored last time."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "NPS survey card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three live states — promoter, passive, detractor</span>
        <div className={styles.demoTriple}>
          <NpsSurveyCard
            previousScore={9}
            previousTrend="up"
            initialScore={10}
            initialComment="Best fitment shop on the south coast. Sarah is a legend."
          />
          <NpsSurveyCard
            previousScore={8}
            previousTrend="flat"
            initialScore={7}
          />
          <NpsSurveyCard
            previousScore={6}
            previousTrend="down"
            initialScore={5}
            initialComment="Workshop was great but the SMS booking flow needs work."
          />
        </div>
      </section>
    </main>
  )
}
