import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PivotQuickBuilder } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Pivot quick builder | UI Primitives — Spreadsheet",
}

export default function PivotBuilderPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 14"
        title="Pivot quick builder"
        description="Source range chip, available fields, four drop zones (Rows / Columns / Values / Filters)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Pivot builder" },
        ]}
      />
      <section className={styles.canvas}>
        <PivotQuickBuilder
          sourceRange="parts_ledger!A1:H485"
          availableFields={[
            { id: "sku", label: "SKU" },
            { id: "title", label: "Title" },
            { id: "supplier", label: "Supplier" },
            { id: "rrp", label: "RRP" },
            { id: "margin", label: "Margin" },
            { id: "stock", label: "Stock" },
            { id: "lastSold", label: "Last sold" },
            { id: "region", label: "Region" },
          ]}
          rows={[
            { id: "supplier", label: "Supplier" },
            { id: "region", label: "Region" },
          ]}
          columns={[{ id: "lastSold", label: "Last sold (M)" }]}
          values={[
            { id: "rrp", label: "RRP", agg: "sum" },
            { id: "margin", label: "Margin", agg: "avg" },
            { id: "stock", label: "Stock", agg: "min" },
          ]}
          filters={[{ id: "status", label: "Status = Active" }]}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Visual-only primitive — chips show the configured pivot at a glance. Each zone is a
            drop target; chips render an aggregation glyph (Σ / x̄ / # / ↑ / ↓) when an aggregation
            is set.
          </p>
        </div>
      </section>
    </main>
  )
}
