import type { Metadata } from "next"

import { ShareSurveyModal } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Share survey modal | Surveys",
  description: "Primitive 12 — modal for sharing a survey.",
}

export default function ShareSurveyModalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Share survey modal"
        title="Share survey modal"
        description="Distribution dialog — public URL chip with copy action, embed snippet rendered via the CodeBlock primitive, email distribution row, and an optional QR primitive. Implemented as an aria-modal dialog with a scrim."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Share modal" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — in-place dialog</span>
        <ShareSurveyModal
          surveyTitle="Post-job CX survey"
          publicUrl="https://surveys.mufflermen.com.au/r/cx-post-job"
          qrCaption="Print this QR on the loaner key tag — respondents scan once the keys are returned."
        />
      </section>
    </main>
  )
}
