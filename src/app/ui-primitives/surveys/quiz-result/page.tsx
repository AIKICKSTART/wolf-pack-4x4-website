import type { Metadata } from "next"

import { QuizResultReveal } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { QUIZ_ANSWERS } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Quiz result reveal | Surveys",
  description: "Primitive 14 — respondent-side quiz result surface.",
}

export default function QuizResultRevealScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Quiz result reveal"
        title="Quiz result reveal"
        description="Respondent-side score reveal — large earned / total figure, tone band chip, per-question feedback rows with correct / partial / incorrect chips and short notes, plus retry and share-certificate CTAs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Quiz result" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — ADR refresher pass</span>
        <QuizResultReveal
          quizTitle="ADR sound limits — Manta system"
          earned={11}
          total={15}
          band="pass"
          bandLabel="Pass"
          summary="Solid clearance — cleared for tail-pipe and resonator jobs under supervision until the next refresher."
          answers={QUIZ_ANSWERS}
        />
      </section>
    </main>
  )
}
