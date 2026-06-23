import type { Metadata } from "next"

import { MultiPageNavigator } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Multi-page navigator | Surveys",
  description: "Primitive 09 — multi-page survey navigator footer.",
}

export default function MultiPageNavigatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Multi-page navigator"
        title="Multi-page navigator"
        description="Footer navigator for multi-page surveys — back, next, current page indicator, and a Save &amp; continue later affordance. On the final page the next button swaps to a Submit CTA in amber."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Navigator" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — first, mid, last page</span>
        <div className={styles.demoStack}>
          <MultiPageNavigator current={1} total={4} />
          <MultiPageNavigator current={2} total={4} />
          <MultiPageNavigator current={4} total={4} />
        </div>
      </section>
    </main>
  )
}
