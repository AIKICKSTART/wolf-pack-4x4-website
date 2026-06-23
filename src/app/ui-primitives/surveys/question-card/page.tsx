import type { Metadata } from "next"

import { SurveyQuestionCard } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { CX_SURVEY_QUESTIONS } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Survey question card | Surveys",
  description: "Primitive 01 — single question card on the survey builder canvas.",
}

export default function SurveyQuestionCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Survey question card"
        title="Survey question card"
        description="Single question card rendered on the builder canvas. Shows the 1-based question number, prompt input, type chip with tone-coded ink, optional required flag, and a duplicate / delete / more kebab. Selected state ringed in tone-matching glow. Visual only — no real drag-and-drop wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Question card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — full post-job CX survey</span>
        <div className={styles.demoStack}>
          {CX_SURVEY_QUESTIONS.map((q, idx) => (
            <SurveyQuestionCard
              key={q.id}
              index={q.index}
              prompt={q.prompt}
              type={q.type}
              required={q.required}
              helper={q.helper}
              selected={idx === 1}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
