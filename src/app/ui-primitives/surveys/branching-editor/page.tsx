import type { Metadata } from "next"

import { BranchingLogicEditor } from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import { BRANCH_RULES } from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Branching logic editor | Surveys",
  description: "Primitive 03 — per-question branching rule editor.",
}

export default function BranchingLogicEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Branching logic editor"
        title="Branching logic editor"
        description="Per-question rule editor — If answer [operator] [value], then skip / show / end survey [target]. Each rule is composed of token chips, the action chip is tone-coded by intent, and rules can be added or removed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Branching editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — NPS branching</span>
        <BranchingLogicEditor
          sourceLabel="Q01 — How likely are you to recommend us?"
          rules={BRANCH_RULES}
        />
      </section>
    </main>
  )
}
