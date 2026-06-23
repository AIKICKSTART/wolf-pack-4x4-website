import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DataValidationCard } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Data validation card | UI Primitives — Spreadsheet",
}

export default function DataValidationPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 09"
        title="Data validation card"
        description="Per-column validation rule — rule type, expression, error message, and reject-invalid toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Data validation" },
        ]}
      />
      <section className={styles.canvas}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          <DataValidationCard
            columnLabel="SKU"
            columnLetter="A"
            rule="regex"
            expression="^OF-\d{4}$"
            errorMessage="SKU must be in OF-#### format"
            rejectInvalid
          />
          <DataValidationCard
            columnLabel="Supplier"
            columnLetter="C"
            rule="list"
            expression="Magnaflow, Genie, XForce, Redback, HushPower"
            errorMessage="Pick from approved supplier list"
            rejectInvalid
          />
          <DataValidationCard
            columnLabel="Stock"
            columnLetter="D"
            rule="range"
            expression="0 to 999"
            errorMessage="Stock count must be 0 to 999"
            rejectInvalid={false}
          />
          <DataValidationCard
            columnLabel="Last sold"
            columnLetter="G"
            rule="date"
            expression="after 2024-01-01"
            errorMessage="Date must be after Jan 2024"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Picking a rule type changes the expression hint shown in the input placeholder. Reject
            toggle is a soft switch — when off, invalid values pass through with a warning chip on
            the host cell instead of being blocked.
          </p>
        </div>
      </section>
    </main>
  )
}
