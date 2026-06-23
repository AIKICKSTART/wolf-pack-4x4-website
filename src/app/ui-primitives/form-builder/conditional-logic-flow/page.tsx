import type { Metadata } from "next"

import { ConditionalLogicVisualizer } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { LOGIC_AVAILABLE_FIELDS, LOGIC_RULES } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Conditional logic flow | Form builder",
  description:
    "Primitive 14 — SVG dependency graph showing source fields, the conditions hub, and target visibility.",
}

export default function ConditionalLogicFlowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Conditional logic flow"
        title="Conditional logic visualiser"
        description="A two-column dependency graph — source fields on the left, target fields on the right, with a Conditions hub in the middle. Each rule renders a tone-coded SVG bezier — green show, red hide, amber skip, teal require — and the legend matches."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Conditional logic flow" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quote form dependencies</span>
        <ConditionalLogicVisualizer rules={LOGIC_RULES} fields={LOGIC_AVAILABLE_FIELDS} />
      </section>
    </main>
  )
}
