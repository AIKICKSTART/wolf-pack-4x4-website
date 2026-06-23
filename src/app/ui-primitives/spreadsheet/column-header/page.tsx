import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ColumnHeader } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Column header | UI Primitives — Spreadsheet",
}

export default function ColumnHeaderPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 02"
        title="Column header"
        description="A1 letter header with sort, filter chip popover, freeze toggle, and right-edge resize handle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Column header" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Parts ledger column row · live</span>
          <div
            role="row"
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 110px 110px 130px",
              border: "1px solid var(--primitive-line-strong)",
              borderRadius: "var(--primitive-radius-md)",
              overflow: "hidden",
            }}
          >
            <ColumnHeader letter="A" label="SKU" sort="asc" ariaColIndex={1} />
            <ColumnHeader letter="B" label="Title" sort="none" filterCount={2} ariaColIndex={2} />
            <ColumnHeader letter="C" label="RRP" sort="desc" ariaColIndex={3} />
            <ColumnHeader letter="D" label="Stock" sort="none" frozen ariaColIndex={4} />
            <ColumnHeader letter="E" label="Last sold" sort="none" filterCount={1} ariaColIndex={5} />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Sort glyph cycles asc → desc → none. Filter chip opens a popover for filter quick-picks
            (Contains / Top 10 / Blanks). Freeze toggle pins the column; resize handle on the right
            edge fires a callback so the host grid can update column width.
          </p>
        </div>
      </section>
    </main>
  )
}
