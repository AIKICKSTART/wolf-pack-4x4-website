import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ComparisonTable } from "../../components/data-display"
import type { ComparisonColumn, ComparisonRow } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Comparison table | UI Primitives — Data display",
}

const columns: ReadonlyArray<ComparisonColumn> = [
  { id: "stock", name: "Stock", caption: "OEM equivalent" },
  { id: "sport", name: "Sport", caption: "Performance bend", popular: true },
  { id: "track", name: "Track", caption: "Stainless / full custom" },
]

const rows: ReadonlyArray<ComparisonRow> = [
  {
    feature: "Pipe diameter",
    description: "Mandrel-bent main pipework",
    values: ["2.25\"", "2.5\"", "3.0\""],
  },
  {
    feature: "Material",
    description: "Primary fabrication",
    values: ["Aluminised", "T409 stainless", "T304 stainless"],
  },
  {
    feature: "Muffler type",
    description: "Acoustic / flow tradeoff",
    values: ["Hush-Power oval", "Magnaflow straight-through", "XForce twin-cone"],
  },
  {
    feature: "Dyno tune included",
    values: ["cross", "check", "check"],
  },
  {
    feature: "Track-day rated",
    values: ["cross", "dot", "check"],
  },
  {
    feature: "ADR compliance",
    description: "Australian Design Rule",
    values: ["check", "check", "check"],
  },
  {
    feature: "Warranty",
    values: ["12 months", "24 months", "Lifetime"],
  },
  {
    feature: "Fitment slot",
    values: ["Same week", "Within 3 days", "Priority dock"],
  },
]

export default function ComparisonTableShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.08 / Data display"
        title="Comparison table — Mufflermen build tiers"
        description="Plan-style comparison highlighting the popular Sport column. Indicator values accept check / cross / dot tokens or arbitrary text."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Comparison table" },
        ]}
      />
      <section className={styles.canvas}>
        <ComparisonTable
          caption="Mufflermen build tier comparison"
          columns={columns}
          rows={rows}
        />
        <div className={styles.note}>
          <span>Composition</span>
          <p>
            The popular column carries its own ribbon and stays emphasised across hover. Indicator
            tokens render specialised glyphs; free text falls back to standard typography.
          </p>
        </div>
      </section>
    </main>
  )
}
