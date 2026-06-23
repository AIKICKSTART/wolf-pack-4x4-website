import type { Metadata } from "next"

import { SurveyProgressDots } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Survey progress dots | Surveys",
  description: "Primitive 04 — respondent progress indicator.",
}

export default function SurveyProgressDotsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Progress dots"
        title="Survey progress dots"
        description="Dot progress indicator shown at the top of the respondent view. Completed questions are filled amber, the active question stretches into a tone-red pill, remaining questions sit empty. Counter and percentage live-region announce the position."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Progress dots" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — three positions</span>
        <div className={styles.demoStack}>
          <SurveyProgressDots total={5} current={1} />
          <SurveyProgressDots total={8} current={4} />
          <SurveyProgressDots total={12} current={11} />
        </div>
      </section>
    </main>
  )
}
