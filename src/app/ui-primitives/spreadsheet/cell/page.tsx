import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SpreadsheetCell } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Spreadsheet cell | UI Primitives — Spreadsheet",
}

export default function SpreadsheetCellPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 01"
        title="Spreadsheet cell"
        description="Single typed cell with display + edit modes. Double-click to edit; Enter commits, Escape cancels."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Cell" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Parts ledger row — Oak Flats SKUs</span>
          <div
            role="grid"
            aria-rowcount={4}
            aria-colcount={5}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 100px 110px 120px",
              border: "1px solid var(--primitive-line-strong)",
              borderRadius: "var(--primitive-radius-md)",
              overflow: "hidden",
            }}
          >
            <SpreadsheetCell value="OF-1042" type="text" cellRef="A1" ariaRowIndex={1} ariaColIndex={1} />
            <SpreadsheetCell value="Magnaflow 14816 muffler" type="text" cellRef="B1" ariaRowIndex={1} ariaColIndex={2} />
            <SpreadsheetCell value="A$284.50" type="currency" cellRef="C1" ariaRowIndex={1} ariaColIndex={3} />
            <SpreadsheetCell value="2026-05-22" type="date" cellRef="D1" ariaRowIndex={1} ariaColIndex={4} />
            <SpreadsheetCell value="=C1*1.32" formula="=C1*1.32" type="formula" cellRef="E1" ariaRowIndex={1} ariaColIndex={5} />

            <SpreadsheetCell value="OF-1058" type="text" cellRef="A2" ariaRowIndex={2} ariaColIndex={1} />
            <SpreadsheetCell value="XForce twin-tip exhaust tip" type="text" focused cellRef="B2" ariaRowIndex={2} ariaColIndex={2} />
            <SpreadsheetCell value="A$118.00" type="currency" cellRef="C2" ariaRowIndex={2} ariaColIndex={3} />
            <SpreadsheetCell value="2026-05-24" type="date" cellRef="D2" ariaRowIndex={2} ariaColIndex={4} />
            <SpreadsheetCell value="A$155.76" type="currency" tone="green" cellRef="E2" ariaRowIndex={2} ariaColIndex={5} />

            <SpreadsheetCell value="OF-1083" type="text" cellRef="A3" ariaRowIndex={3} ariaColIndex={1} />
            <SpreadsheetCell value="Redback header gasket" type="text" selected cellRef="B3" ariaRowIndex={3} ariaColIndex={2} />
            <SpreadsheetCell value="A$42.10" type="currency" selected cellRef="C3" ariaRowIndex={3} ariaColIndex={3} />
            <SpreadsheetCell value="LOW" type="text" tone="red" cellRef="D3" ariaRowIndex={3} ariaColIndex={4} />
            <SpreadsheetCell value="A$55.57" type="currency" cellRef="E3" ariaRowIndex={3} ariaColIndex={5} />

            <SpreadsheetCell value="OF-1104" type="text" cellRef="A4" ariaRowIndex={4} ariaColIndex={1} />
            <SpreadsheetCell value="Genie cat-back system 3in" type="text" editing cellRef="B4" ariaRowIndex={4} ariaColIndex={2} />
            <SpreadsheetCell value="A$842.00" type="currency" cellRef="C4" ariaRowIndex={4} ariaColIndex={3} />
            <SpreadsheetCell value="2026-05-26" type="date" cellRef="D4" ariaRowIndex={4} ariaColIndex={4} />
            <SpreadsheetCell value="A$1,111.44" type="currency" tone="amber" cellRef="E4" ariaRowIndex={4} ariaColIndex={5} />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Cell type drives default alignment + colour treatment. Tone overlays (amber / green /
            red / teal) are how conditional-formatting rules paint cells. Currently-focused cell
            gets <code>aria-current=&quot;true&quot;</code>; selected cells get{" "}
            <code>aria-selected</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
