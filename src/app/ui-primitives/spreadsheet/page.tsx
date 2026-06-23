import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Spreadsheet | UI Primitives",
  description:
    "Spreadsheet / Excel-style data grid primitives — cells, headers, formula bar, freeze, selection overlay, merge, conditional formatting, data validation, find/replace, sheet tabs, context menu, autofill, pivot builder — plus a full-grid composition.",
}

interface Scene {
  index: string
  title: string
  href: string
  description: string
  accent: "teal" | "amber" | "red" | "green" | "neutral"
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    index: "01",
    title: "Spreadsheet cell",
    href: "/ui-primitives/spreadsheet/cell",
    description:
      "Single grid cell, type-aware (text / number / currency / date / formula) with double-click edit mode, selected, and focused states.",
    accent: "neutral",
    state: "Stateful · edit + commit",
  },
  {
    index: "02",
    title: "Column header",
    href: "/ui-primitives/spreadsheet/column-header",
    description:
      "A1 letter header with sort indicator (asc / desc / none), filter chip popover, resize handle, and freeze toggle.",
    accent: "teal",
    state: "Stateful · filter popover",
  },
  {
    index: "03",
    title: "Row header",
    href: "/ui-primitives/spreadsheet/row-header",
    description:
      "Row-number header with selected highlight, freeze toggle, and bottom height-resize handle.",
    accent: "amber",
    state: "Stateless · selection-driven",
  },
  {
    index: "04",
    title: "Formula bar",
    href: "/ui-primitives/spreadsheet/formula-bar",
    description:
      "Top formula bar — A1 cell-ref chip, fx mono textarea, commit / cancel actions, and a six-function quick helper rail.",
    accent: "red",
    state: "Stateful · text + helper",
  },
  {
    index: "05",
    title: "Frozen divider",
    href: "/ui-primitives/spreadsheet/frozen-divider",
    description:
      "Visual divider showing the freeze boundary — sticky shadow line + tone-coded plate (amber / teal / red).",
    accent: "amber",
    state: "Stateless · visual only",
  },
  {
    index: "06",
    title: "Cell selection overlay",
    href: "/ui-primitives/spreadsheet/cell-selection-overlay",
    description:
      "Marching-ant rectangle over a range with a labeled plate (A1:C6 · 18 cells) and a corner autofill drag handle.",
    accent: "red",
    state: "Stateless · animated",
  },
  {
    index: "07",
    title: "Cell merge indicator",
    href: "/ui-primitives/spreadsheet/cell-merge",
    description:
      "Merge / unmerge action card shown when a range is selected — shows kind (horizontal / vertical / block) and cell count.",
    accent: "teal",
    state: "Stateless · merged toggle",
  },
  {
    index: "08",
    title: "Conditional formatting rule",
    href: "/ui-primitives/spreadsheet/conditional-formatting",
    description:
      "Rule editor — condition operator, value, format kind (background tone / text color / icon set / data bar), and scope chip.",
    accent: "green",
    state: "Stateful · per-field",
  },
  {
    index: "09",
    title: "Data validation card",
    href: "/ui-primitives/spreadsheet/data-validation",
    description:
      "Per-column validation rule — type (List / Range / Regex / Date / Custom formula), expression, error message, reject-invalid toggle.",
    accent: "amber",
    state: "Stateful · per-field",
  },
  {
    index: "10",
    title: "Find / replace bar",
    href: "/ui-primitives/spreadsheet/find-replace",
    description:
      "Slide-out find / replace — find input, replace input, case toggle, scope chip (Sheet / Workbook / Selection), Replace + Replace all.",
    accent: "teal",
    state: "Stateful · open + scope",
  },
  {
    index: "11",
    title: "Sheet tab rail",
    href: "/ui-primitives/spreadsheet/sheet-tab-rail",
    description:
      "Bottom rail of sheet tabs with active highlight, reorder arrows, options popover, badge count, and add-sheet chip.",
    accent: "red",
    state: "Stateful · per-tab popover",
  },
  {
    index: "12",
    title: "Cell context menu",
    href: "/ui-primitives/spreadsheet/cell-context-menu",
    description:
      "Right-click menu — Cut / Copy / Paste / Paste special / Insert row + column / Delete row + column / Format / Comment.",
    accent: "neutral",
    state: "Stateless · keyed by action",
  },
  {
    index: "13",
    title: "Autofill drag handle",
    href: "/ui-primitives/spreadsheet/autofill-handle",
    description:
      "Small corner handle used by selection overlay — three sizes, optional pulse, drag-start callback for series fill.",
    accent: "red",
    state: "Stateless · sm / md / lg",
  },
  {
    index: "14",
    title: "Pivot quick builder",
    href: "/ui-primitives/spreadsheet/pivot-builder",
    description:
      "Quick pivot — source range chip, available fields, four drop zones (Rows / Columns / Values / Filters), chips per zone.",
    accent: "teal",
    state: "Stateless · chips visual",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function SpreadsheetPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 14 primitives + 1 composition"
        title="Tables that calculate"
        description="Excel-style data grid primitives — cells that know their type, headers that sort and freeze, a formula bar that suggests functions, selection overlays with autofill, conditional formatting, data validation, find/replace, sheet tabs, right-click menu, and a pivot builder. Tuned for the Mufflermen parts ledger and quote totals worksheet."
      />
      <section className={styles.section} aria-label="Spreadsheet primitives index">
        <header>
          <span className={styles.kicker}>Index · 14 primitives + Full grid</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Every primitive renders at full scale in its own sub-route with realistic Oak Flats
            data — parts price ledger, quote totals, supplier validation rules. Composition lives
            under <code style={{ color: "var(--primitive-amber)" }}>/full-grid</code>.
          </p>
        </header>
        <div className={styles.grid}>
          {SCENES.map((scene) => (
            <Link
              key={scene.href}
              className={`${styles.thumb} ${ACCENT_CLASS[scene.accent]}`}
              href={scene.href}
            >
              <div className={styles.thumbHead}>
                <span className={styles.thumbIndex}>{scene.index}</span>
                <span className={styles.thumbState}>{scene.state}</span>
              </div>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            className={`${styles.thumb} ${styles.accentRed}`}
            href="/ui-primitives/spreadsheet/full-grid"
          >
            <div className={styles.thumbHead}>
              <span className={styles.thumbIndex}>15</span>
              <span className={styles.thumbState}>Composition · bonus</span>
            </div>
            <h3 className={styles.thumbTitle}>Full grid composition</h3>
            <p className={styles.thumbCopy}>
              Every primitive assembled into a single working sheet — formula bar on top, header
              row, row headers, cells with selection overlay, sheet tab rail bottom, conditional
              formatting rule + data validation rule on the side rail.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
