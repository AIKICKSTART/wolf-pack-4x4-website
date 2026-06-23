import type { Metadata } from "next"

import { DropOffChart } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { DROP_OFF_POINTS } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Drop-off chart | Surveys",
  description: "Primitive 06 — completion drop-off line + area chart.",
}

export default function DropOffChartScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Drop-off chart"
        title="Drop-off chart"
        description="SVG line + area chart plotting the percentage of respondents who complete each question. Biggest single drop is auto-marked with a red ring and an annotation callout. Gridlines and percentage ticks read as labels for accessibility."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Drop-off chart" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — post-job CX survey</span>
        <DropOffChart
          points={DROP_OFF_POINTS}
          title="Post-job survey drop-off"
          caption="Long-answer question Q04 is bleeding 29 percentage points — consider making it optional or moving it later."
        />
      </section>
    </main>
  )
}
