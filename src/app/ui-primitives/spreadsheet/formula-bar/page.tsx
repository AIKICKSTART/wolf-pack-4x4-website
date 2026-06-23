import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FormulaBar } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Formula bar | UI Primitives — Spreadsheet",
}

export default function FormulaBarPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 04"
        title="Formula bar"
        description="A1 cell-ref chip + monospace textarea + commit / cancel actions + quick-function helper rail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Formula bar" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Cell E12 of quote totals worksheet</span>
          <FormulaBar
            cellRef="E12"
            value="=SUM(E2:E11)*1.10"
          />
          <FormulaBar
            cellRef="C4"
            value='="OF-"&TEXT(ROW()-1,"0000")'
          />
          <FormulaBar
            cellRef="F2"
            value=""
            functions={["SUM", "VLOOKUP", "IFERROR", "ROUND", "AVERAGEIFS", "TEXT", "CONCAT", "TODAY"]}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Enter commits, Escape reverts to the original value, and Shift+Enter inserts a newline.
            Clicking a function chip injects <code>=FN(</code> at the caret and keeps focus inside
            the textarea.
          </p>
        </div>
      </section>
    </main>
  )
}
