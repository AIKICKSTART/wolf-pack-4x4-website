import type { Metadata } from "next"

import { LikertScaleRow } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Likert scale row | Surveys",
  description: "Primitive 08 — 5 / 7 / 9 point Likert scale rows.",
}

export default function LikertScaleRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Likert scale row"
        title="Likert scale row"
        description="Workshop pulse Likert rows — statement on the left, radio scale across — implemented as an ARIA radiogroup. Supports 5, 7, and 9 point variants with sensible default anchor labels."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Likert scale" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — workshop pulse</span>
        <div className={styles.demoStack}>
          <LikertScaleRow
            statement="The job board is reviewed daily by the foreman."
            scale={5}
            defaultValue={3}
          />
          <LikertScaleRow
            statement="I have the tools I need to run a Manta install solo."
            scale={7}
            defaultValue={5}
          />
          <LikertScaleRow
            statement="ADR refresher cadence is right for the team."
            scale={9}
          />
        </div>
      </section>
    </main>
  )
}
