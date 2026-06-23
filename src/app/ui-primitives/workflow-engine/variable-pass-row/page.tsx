import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VariablePassRow } from "../../components/workflow-engine"

import { REFUND_VAR_ROWS } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Variable pass-through row | Workflow engine",
  description:
    "Primitive 09 — variable pass-through row with type, source kind and target mapping.",
}

export default function VariablePassRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Data plane"
        title="Variable pass-through row"
        description="A single line in the inspector that tells you where data flows. Source path on the left, runtime type chip in the middle, target path on the right. Trigger payloads, upstream step outputs, constants, secrets and context globals all carry the same vocabulary."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Variable pass-through row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Refund flow · 7 variables in scope at the Stripe step
        </span>
        <div className={styles.demoStack}>
          {REFUND_VAR_ROWS.map((row, idx) => (
            <VariablePassRow
              key={`${row.source}-${idx}`}
              source={row.source}
              sourceKind={row.sourceKind}
              type={row.type}
              target={row.target}
              sample={row.sample}
              required={row.required}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
