import type { Metadata } from "next"

import { ConstraintChipRow } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { QUOTES_CONSTRAINTS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Constraint chip row | DB Admin",
  description:
    "Primitive 08 — row of PK / FK / UNIQUE / CHECK / NOT NULL chips with click-to-view details popover.",
}

export default function ConstraintChipRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Constraint chip row"
        title="Constraint chip row"
        description="A compact row that summarises the constraints attached to a table. Each chip carries a kind glyph (PK / FK / UQ / CK / NN) and the affected columns. Clicking a chip reveals a small inline details popover with the constraint name and, when relevant, the target reference or expression."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Constraint chip row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — public.quotes constraints</span>
        <ConstraintChipRow constraints={QUOTES_CONSTRAINTS} />
      </section>
    </main>
  )
}
