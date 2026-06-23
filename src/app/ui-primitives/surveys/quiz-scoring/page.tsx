import type { Metadata } from "next"

import { QuizScoringRules } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { ADR_QUIZ_QUESTIONS, QUIZ_BANDS } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Quiz scoring rules | Surveys",
  description: "Primitive 13 — quiz scoring + tone-band editor.",
}

export default function QuizScoringRulesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Quiz scoring rules"
        title="Quiz scoring rules"
        description="Per-question points editor for quizzes — share-of-total bars, pass threshold gauge sitting on a red → amber → green track, and Fail / Pass / Distinction tone bands with descriptive copy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Quiz scoring" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — ADR sound limits quiz</span>
        <QuizScoringRules
          questions={ADR_QUIZ_QUESTIONS}
          bands={QUIZ_BANDS}
          passThreshold={60}
        />
      </section>
    </main>
  )
}
