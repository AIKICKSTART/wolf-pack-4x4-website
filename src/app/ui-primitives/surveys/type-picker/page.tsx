import type { Metadata } from "next"

import { QuestionTypePicker } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { QUESTION_TYPE_OPTIONS } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Question type picker | Surveys",
  description: "Primitive 02 — palette of 11 question response types.",
}

export default function QuestionTypePickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Question type picker"
        title="Question type picker"
        description="Left-rail palette of every supported question response type — single choice, multi choice, short / long answer, rating, scale, ranking, matrix, date, file upload, and NPS. Each row carries a tone-coded glyph and hint. Highlighted state shows the active selection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Type picker" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — full palette</span>
        <div className={styles.demoInline}>
          <QuestionTypePicker options={QUESTION_TYPE_OPTIONS} activeType="nps" />
        </div>
      </section>
    </main>
  )
}
