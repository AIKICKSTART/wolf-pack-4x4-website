import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SheetTabRail } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Sheet tab rail | UI Primitives — Spreadsheet",
}

export default function SheetTabRailPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 11"
        title="Sheet tab rail"
        description="Bottom rail of sheet tabs with reorder arrows, options popover, badge count, and add-sheet chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Sheet tab rail" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Workbook · Parts ledger · 6 sheets</span>
          <SheetTabRail
            tabs={[
              { id: "parts", label: "Parts ledger", active: true, tone: "red", badge: 3 },
              { id: "quotes", label: "Quotes", tone: "amber" },
              { id: "labour", label: "Labour rates", tone: "teal" },
              { id: "suppliers", label: "Suppliers" },
              { id: "freight", label: "Freight", badge: 1 },
              { id: "archive", label: "Archive", tone: "green" },
            ]}
          />
          <span className={styles.demoLabel}>Workbook · Quote totals worksheet · 3 sheets</span>
          <SheetTabRail
            tabs={[
              { id: "summary", label: "Summary", active: true },
              { id: "lines", label: "Line items", tone: "amber", badge: 12 },
              { id: "scratch", label: "Scratch" },
            ]}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each tab carries an optional tone dot, an unread badge, reorder arrows, and an options
            popover (Rename / Duplicate / Protect / Delete). Active tab gets a red underline +
            bright label.
          </p>
        </div>
      </section>
    </main>
  )
}
