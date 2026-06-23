import type { Metadata } from "next"

import { StoredProcedureCard } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { STORED_PROCEDURES } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Stored procedure card | DB Admin",
  description:
    "Primitive 10 — stored procedure card with name, arguments, return type, language chip, and body excerpt rendered through the code-block primitive.",
}

export default function StoredProcedureCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Stored procedure card"
        title="Stored procedure card"
        description="A stored procedure surface. The signature line shows the name, argument list, and return type with each element coloured (name amber, types teal, return type green). A row of meta chips carries the language, arg count, and line count. The body is rendered through the existing code-block primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Stored procedure card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Mufflermen procedures</span>
        <div className={styles.demoStack}>
          {STORED_PROCEDURES.map((procedure) => (
            <StoredProcedureCard key={procedure.name} procedure={procedure} />
          ))}
        </div>
      </section>
    </main>
  )
}
