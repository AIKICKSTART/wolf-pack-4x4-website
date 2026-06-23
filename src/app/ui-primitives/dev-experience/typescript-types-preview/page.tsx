import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TypescriptTypesPreview } from "../../components/dev-experience"
import type { TsTypeNode } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "TypeScript types preview | UI Primitives — Dev experience",
}

const NODES: ReadonlyArray<TsTypeNode> = [
  {
    key: "Quote",
    declaration: "interface Quote {",
    comment: "Output shape returned by quotes.create",
    children: [
      { key: "id", declaration: "id: string", comment: "qte_…" },
      { key: "status", declaration: "status: 'draft' | 'sent' | 'accepted' | 'expired'" },
      { key: "totalAud", declaration: "totalAud: number", comment: "Tax-inclusive total" },
      { key: "validUntil", declaration: "validUntil: string", comment: "ISO 8601" },
      {
        key: "lineItems",
        declaration: "lineItems: QuoteLineItem[]",
        children: [
          {
            key: "QuoteLineItem",
            declaration: "interface QuoteLineItem {",
            children: [
              { key: "partId", declaration: "partId?: string" },
              { key: "labourId", declaration: "labourId?: string" },
              { key: "qty", declaration: "qty: number" },
              { key: "subtotalAud", declaration: "subtotalAud: number" },
            ],
          },
          { key: "QuoteLineItemClose", declaration: "}" },
        ],
      },
      {
        key: "bay",
        declaration: "bay: BayReservation",
        children: [
          {
            key: "BayReservation",
            declaration: "interface BayReservation {",
            children: [
              { key: "bayId", declaration: "bayId: string" },
              { key: "reservedFrom", declaration: "reservedFrom: string" },
              { key: "reservedTo", declaration: "reservedTo: string" },
            ],
          },
          { key: "BayReservationClose", declaration: "}" },
        ],
        defaultOpen: false,
      },
    ],
  },
  { key: "QuoteClose", declaration: "}" },
]

export default function TypescriptTypesPreviewPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 14"
        title="TypeScript types preview"
        description="Syntax-styled interface/type definitions with collapsible nested types. Toggles use aria-expanded so a screen reader hears the state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "TypeScript types preview" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>@mufflermen/sdk/types · quote.d.ts</span>
          <TypescriptTypesPreview
            nodes={NODES}
            fileName="@mufflermen/sdk/quote.d.ts"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each row is a single node; rows with children get a caret button that toggles
            child visibility. <code>defaultOpen=false</code> on{" "}
            <code>BayReservation</code> shows how to start a deep type collapsed. Indent
            depth scales by 14px per level.
          </p>
        </div>
      </section>
    </main>
  )
}
