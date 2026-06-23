import type { Metadata } from "next"

import { AnonymousToggle } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Anonymous toggle | Surveys",
  description: "Primitive 10 — anonymous responses toggle with popover.",
}

export default function AnonymousToggleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Anonymous toggle"
        title="Anonymous toggle"
        description="Anonymous responses switch — when on, respondent identity is never recorded. An info button reveals an explanation popover. The subtitle and border tone update as the switch toggles."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Anonymous toggle" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — both states</span>
        <div className={styles.demoStack}>
          <AnonymousToggle defaultPressed />
          <AnonymousToggle
            defaultPressed={false}
            title="Identify respondents"
            description="Required for the technician quiz so we can record certification against the foreman's roster."
          />
        </div>
      </section>
    </main>
  )
}
