import type { Metadata } from "next"

import { NpsInput } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "NPS input | Surveys"
,
  description: "Primitive 07 — 0–10 NPS input button row.",
}

export default function NpsInputScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / NPS input"
        title="NPS input"
        description="Net Promoter Score input — 0–10 button row with detractor (red), passive (amber), and promoter (green) tone bands. Implemented as an ARIA radiogroup with anchor labels. Distinct from the notification-style and support-style NPS cards."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "NPS input" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — default + preselected</span>
        <div className={styles.demoStack}>
          <NpsInput />
          <NpsInput
            prompt="Would you recommend our muffler workshop to a friend?"
            defaultValue={9}
          />
        </div>
      </section>
    </main>
  )
}
