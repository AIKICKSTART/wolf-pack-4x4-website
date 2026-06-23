import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConditionalFormattingRule } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Conditional formatting rule | UI Primitives — Spreadsheet",
}

export default function ConditionalFormattingPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 08"
        title="Conditional formatting rule"
        description="Rule editor: condition operator, value, format kind (background tone / text color / icon set / data bar) and scope chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Conditional formatting" },
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
          <ConditionalFormattingRule
            title="Stock below safety level"
            scopeLabel="D2:D484"
            operator="less-than"
            value="6"
            format="background-tone"
            swatch="color-mix(in oklab, var(--primitive-red) 70%, transparent)"
          />
          <ConditionalFormattingRule
            title="Margin over 35%"
            scopeLabel="F2:F484"
            operator="greater-than"
            value="0.35"
            format="data-bar"
            swatch="color-mix(in oklab, var(--primitive-green) 75%, transparent)"
          />
          <ConditionalFormattingRule
            title="Last sold over 90 days ago"
            scopeLabel="G2:G484"
            operator="less-than"
            value="2026-02-27"
            format="icon-set"
            swatch="color-mix(in oklab, var(--primitive-amber) 75%, transparent)"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Rule operator + format type drive the appearance applied to matching cells. Scope chip
            shows the A1 range. The card is fully self-contained; commits are emitted via{" "}
            <code>onApply</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
