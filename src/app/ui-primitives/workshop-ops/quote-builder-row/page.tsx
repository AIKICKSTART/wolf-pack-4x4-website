import type { Metadata } from "next"

import { QuoteBuilderRow } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"
import type { QuoteRow } from "../../components/workshop-ops"

import { QUOTE_ROWS } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Quote builder row | Workshop ops",
  description:
    "Primitive 07 — quote line items with parts, labour, markup, GST, and the grand total — three states.",
}

const FALCON_GT_QUOTE: ReadonlyArray<QuoteRow> = [
  {
    id: "gt-1",
    kind: "part",
    label: "Pacemaker tri-Y headers (hand-fit)",
    quantity: 1,
    unitAud: 1480,
    markupPct: 22,
  },
  {
    id: "gt-2",
    kind: "part",
    label: "2.5\" twin stainless system with X-pipe",
    quantity: 1,
    unitAud: 1860,
    markupPct: 18,
  },
  {
    id: "gt-3",
    kind: "part",
    label: "Reverse-flow muffler + glasspacks (×2)",
    quantity: 1,
    unitAud: 620,
    markupPct: 20,
  },
  {
    id: "gt-4",
    kind: "labour",
    label: "Header fab, system fit, sound calibration",
    quantity: 1,
    unitAud: 0,
    hours: 10,
    ratePerHourAud: 165,
    notes: "Includes weld-cool down, leak test, QC walk-around.",
  },
  {
    id: "gt-5",
    kind: "fee",
    label: "Eco metals disposal",
    quantity: 1,
    unitAud: 35,
  },
]

const SMALL_QUOTE: ReadonlyArray<QuoteRow> = [
  {
    id: "sm-1",
    kind: "part",
    label: "Walker centre muffler (universal 2.25\")",
    quantity: 1,
    unitAud: 184,
    markupPct: 16,
  },
  {
    id: "sm-2",
    kind: "labour",
    label: "Patch weld + replace + sound test",
    quantity: 1,
    unitAud: 0,
    hours: 1.5,
    ratePerHourAud: 145,
  },
]

export default function QuoteBuilderRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Quote builder row"
        title="Quote line builder"
        description="Compose a quote line-by-line — parts with markup, labour with hours × rate, fees flat. Auto-totals subtotal ex GST, the 10% AU GST line, and the grand total inc GST. Three states — Hilux N80 medium quote, Falcon GT XB premium quote, and a small same-day patch job."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Quote builder row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <QuoteBuilderRow
            rows={QUOTE_ROWS}
            invoiceNumber="QTE-2847 · DRAFT"
            customerLabel="Mick Davis · Hilux N80 SR5"
          />
          <QuoteBuilderRow
            rows={FALCON_GT_QUOTE}
            invoiceNumber="QTE-2851 · SENT"
            customerLabel="Karen Wallis · Falcon GT XB '76"
          />
          <QuoteBuilderRow
            rows={SMALL_QUOTE}
            invoiceNumber="QTE-2855"
            customerLabel="Walk-in · Camry centre muffler"
          />
        </div>
      </section>
    </main>
  )
}
