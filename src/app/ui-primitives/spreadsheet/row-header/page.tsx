import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RowHeader } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Row header | UI Primitives — Spreadsheet",
}

export default function RowHeaderPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 03"
        title="Row header"
        description="Numeric row gutter with click-to-select, freeze toggle, and bottom height-resize handle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Row header" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Quote totals worksheet · gutter column</span>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "repeat(7, 30px)",
              width: 76,
              border: "1px solid var(--primitive-line-strong)",
              borderRadius: "var(--primitive-radius-md)",
              overflow: "hidden",
            }}
          >
            <RowHeader number={1} ariaRowIndex={1} frozen />
            <RowHeader number={2} ariaRowIndex={2} />
            <RowHeader number={3} ariaRowIndex={3} selected />
            <RowHeader number={4} ariaRowIndex={4} selected />
            <RowHeader number={5} ariaRowIndex={5} />
            <RowHeader number={6} ariaRowIndex={6} />
            <RowHeader number={7} ariaRowIndex={7} />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Click the number to select the whole row. Freeze toggle pins the row to the top of the
            viewport. Bottom edge exposes a row-resize handle that fires{" "}
            <code>onResizeStart</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
