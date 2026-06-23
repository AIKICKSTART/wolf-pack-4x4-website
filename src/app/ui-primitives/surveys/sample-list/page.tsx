import type { Metadata } from "next"

import { ResponseSampleList } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { RESPONSE_SAMPLES } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Response sample list | Surveys",
  description: "Primitive 11 — recent survey response sample list.",
}

export default function ResponseSampleListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Response sample list"
        title="Response sample list"
        description="Recent submissions list — respondent name (or Anonymous + ANON pill), relative timestamp, completion bar, and an Open CTA. The avatar tone changes when the response was anonymous."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Sample list" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — last 5 responses</span>
        <ResponseSampleList samples={RESPONSE_SAMPLES} />
      </section>
    </main>
  )
}
