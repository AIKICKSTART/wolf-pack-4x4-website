import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  CellSelectionOverlay,
  ColumnHeader,
  ConditionalFormattingRule,
  DataValidationCard,
  FindReplaceBar,
  FormulaBar,
  FrozenRowColDivider,
  RowHeader,
  SheetTabRail,
  SpreadsheetCell,
} from "../../components/spreadsheet"
import type { CellTone, CellValueType } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"
import shellStyles from "./full-grid.module.css"

export const metadata: Metadata = {
  title: "Full grid composition | UI Primitives — Spreadsheet",
}

interface CellSpec {
  value: string
  type?: CellValueType
  formula?: string
  tone?: CellTone
  focused?: boolean
  selected?: boolean
}

const COLS: ReadonlyArray<{ letter: string; label: string; sort: "asc" | "desc" | "none"; frozen?: boolean }> = [
  { letter: "A", label: "SKU", sort: "asc", frozen: true },
  { letter: "B", label: "Title", sort: "none" },
  { letter: "C", label: "Supplier", sort: "none" },
  { letter: "D", label: "RRP", sort: "desc" },
  { letter: "E", label: "Margin", sort: "none" },
  { letter: "F", label: "Stock", sort: "none" },
  { letter: "G", label: "Last sold", sort: "none" },
]

const DATA: ReadonlyArray<ReadonlyArray<CellSpec>> = [
  [
    { value: "OF-1042" },
    { value: "Magnaflow 14816 muffler" },
    { value: "Magnaflow ANZ" },
    { value: "A$284.50", type: "currency" },
    { value: "32%", type: "number", tone: "green" },
    { value: "14", type: "number" },
    { value: "2026-05-22", type: "date" },
  ],
  [
    { value: "OF-1058" },
    { value: "XForce twin-tip exhaust tip" },
    { value: "XForce Performance" },
    { value: "A$118.00", type: "currency" },
    { value: "28%", type: "number" },
    { value: "5", type: "number", tone: "red" },
    { value: "2026-05-24", type: "date" },
  ],
  [
    { value: "OF-1083" },
    { value: "Redback header gasket", selected: true },
    { value: "Redback Extractors", selected: true },
    { value: "A$42.10", type: "currency", selected: true },
    { value: "44%", type: "number", tone: "green", selected: true },
    { value: "62", type: "number", selected: true },
    { value: "2026-05-26", type: "date", selected: true },
  ],
  [
    { value: "OF-1104" },
    { value: "Genie cat-back 3in" },
    { value: "Genie Exhaust" },
    { value: "A$842.00", type: "currency" },
    { value: "37%", type: "number", tone: "green" },
    { value: "3", type: "number", tone: "red" },
    { value: "2026-05-26", type: "date" },
  ],
  [
    { value: "OF-1112", focused: true },
    { value: "HushPower silencer 2.5", focused: true },
    { value: "Hush Power Mufflers", focused: true },
    { value: "A$314.90", type: "currency", focused: true },
    { value: "22%", type: "number", tone: "amber", focused: true },
    { value: "11", type: "number", focused: true },
    { value: "2026-05-21", type: "date", focused: true },
  ],
  [
    { value: "OF-1128" },
    { value: "Pacemaker 4-1 long extractors" },
    { value: "Pacemaker Headers" },
    { value: "A$1,180.00", type: "currency" },
    { value: "31%", type: "number", tone: "green" },
    { value: "8", type: "number" },
    { value: "2026-05-19", type: "date" },
  ],
  [
    { value: "OF-1144" },
    { value: "Stainless tip 4in chrome" },
    { value: "Stainless Lab AU" },
    { value: "A$72.00", type: "currency" },
    { value: "41%", type: "number", tone: "green" },
    { value: "27", type: "number" },
    { value: "2026-05-25", type: "date" },
  ],
  [
    { value: "OF-1158" },
    { value: "Beaudesert mid-pipe twin" },
    { value: "Beaudesert Exhaust" },
    { value: "A$612.00", type: "currency" },
    { value: "18%", type: "number", tone: "amber" },
    { value: "2", type: "number", tone: "red" },
    { value: "2026-04-30", type: "date" },
  ],
  [
    { value: "OF-1175" },
    { value: "Resonator 3in stainless" },
    { value: "Magnaflow ANZ" },
    { value: "A$198.00", type: "currency" },
    { value: "36%", type: "number", tone: "green" },
    { value: "21", type: "number" },
    { value: "2026-05-23", type: "date" },
  ],
  [
    { value: "SUM" },
    { value: "9 SKUs" },
    { value: "" },
    {
      value: "A$3,663.50",
      type: "formula",
      formula: "=SUM(D2:D10)",
    },
    {
      value: "32%",
      type: "formula",
      formula: "=AVERAGE(E2:E10)",
      tone: "green",
    },
    {
      value: "153",
      type: "formula",
      formula: "=SUM(F2:F10)",
    },
    { value: "" },
  ],
]

export default function FullGridPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · Full grid"
        title="Parts ledger workbook"
        description="Every spreadsheet primitive assembled into a single working sheet — formula bar on top, column + row headers, a frozen-column divider, cells with selection overlay, sheet tab rail at the bottom, conditional-formatting + data-validation cards in the side rail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Full grid" },
        ]}
      />
      <section className={shellStyles.layout}>
        <div className={shellStyles.center}>
          <FormulaBar cellRef="A5" value="=VLOOKUP(A5,supplier_map!A:B,2,FALSE)" />
          <FindReplaceBar
            open
            initialFind="HushPower"
            initialReplace="Hush Power"
            initialScope="sheet"
            resultsCount={12}
          />
          <div className={shellStyles.gridWrap}>
            <div className={shellStyles.gridCorner} aria-hidden="true">
              <span>OF</span>
            </div>
            <div
              role="row"
              className={shellStyles.headRow}
              aria-rowindex={1}
              style={{
                gridTemplateColumns: `repeat(${COLS.length}, minmax(0, 1fr))`,
              }}
            >
              {COLS.map((col, index) => (
                <ColumnHeader
                  key={col.letter}
                  letter={col.letter}
                  label={col.label}
                  sort={col.sort}
                  frozen={col.frozen}
                  ariaColIndex={index + 1}
                />
              ))}
            </div>
            <div
              role="grid"
              className={shellStyles.grid}
              aria-rowcount={DATA.length + 1}
              aria-colcount={COLS.length + 1}
              style={{
                gridTemplateColumns: `36px repeat(${COLS.length}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${DATA.length}, 30px)`,
              }}
            >
              {DATA.map((row, rowIndex) => (
                <div key={rowIndex} className={shellStyles.row} role="row" aria-rowindex={rowIndex + 2}>
                  <RowHeader
                    number={rowIndex + 1}
                    ariaRowIndex={rowIndex + 2}
                    selected={row.some((c) => c.selected)}
                    frozen={rowIndex === 0}
                  />
                  {row.map((cell, colIndex) => (
                    <SpreadsheetCell
                      key={colIndex}
                      value={cell.value}
                      type={cell.type ?? "text"}
                      formula={cell.formula}
                      tone={cell.tone ?? "neutral"}
                      selected={cell.selected}
                      focused={cell.focused}
                      cellRef={`${COLS[colIndex].letter}${rowIndex + 1}`}
                      ariaRowIndex={rowIndex + 2}
                      ariaColIndex={colIndex + 2}
                    />
                  ))}
                </div>
              ))}
              <CellSelectionOverlay
                range={{ start: { col: 1, row: 2 }, end: { col: 6, row: 2 } }}
                rect={{ top: 60, left: 36, width: 720, height: 30 }}
              />
              <div className={shellStyles.frozenDivider} aria-hidden="true">
                <FrozenRowColDivider orientation="column" tone="amber" />
              </div>
            </div>
          </div>
          <SheetTabRail
            tabs={[
              { id: "parts", label: "Parts ledger", active: true, tone: "red", badge: 3 },
              { id: "quotes", label: "Quote totals", tone: "amber" },
              { id: "labour", label: "Labour rates", tone: "teal" },
              { id: "suppliers", label: "Suppliers" },
              { id: "archive", label: "Archive", tone: "green" },
            ]}
          />
        </div>
        <aside className={shellStyles.rail}>
          <ConditionalFormattingRule
            title="Stock below safety level"
            scopeLabel="F2:F485"
            operator="less-than"
            value="6"
            format="background-tone"
            swatch="color-mix(in oklab, var(--primitive-red) 80%, transparent)"
          />
          <DataValidationCard
            columnLabel="Supplier"
            columnLetter="C"
            rule="list"
            expression="Magnaflow, Genie, XForce, Redback, HushPower, Pacemaker, Beaudesert, Stainless Lab"
            errorMessage="Pick from approved supplier list"
            rejectInvalid
          />
          <DataValidationCard
            columnLabel="SKU"
            columnLetter="A"
            rule="regex"
            expression="^OF-\d{4}$"
            errorMessage="SKU must be in OF-#### format"
            rejectInvalid
          />
        </aside>
      </section>
    </main>
  )
}
