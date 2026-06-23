import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ToolCallCard } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Tool call card | UI Primitives — AI",
}

const PARTS_LOOKUP_INPUT = `{
  "make": "Toyota",
  "model": "Hilux",
  "engine": "2.8L 1GD-FTV",
  "year": 2018,
  "category": "cat-back exhaust"
}`

const PARTS_LOOKUP_OUTPUT = `{
  "results": [
    {
      "sku": "RB-HXL-30-304",
      "name": "Redback 3\\" 304 stainless cat-back",
      "noise_static_db": 89.1,
      "price_aud": 1184,
      "in_stock": 6
    },
    {
      "sku": "MF-HXL-MID-409",
      "name": "Magnaflow mid-pipe + factory tip",
      "noise_static_db": 85.4,
      "price_aud": 684,
      "in_stock": 12
    }
  ]
}`

const BOOKING_INPUT = `{
  "bay": 2,
  "duration_minutes": 120,
  "preferred_window": "Thursday morning"
}`

const FAILED_INPUT = `{
  "stock_id": "RB-HXL-30-304",
  "warehouse": "shellharbour"
}`

export default function ToolCallCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.07 / Conversation"
        title="Tool call card"
        description="Collapsible card showing tool name, status chip, duration, and input / output JSON. Uses the existing CodeBlock primitive inside the body."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Tool call card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <ToolCallCard
            toolName="parts_lookup"
            status="done"
            durationMs={412}
            defaultOpen
            inputJson={PARTS_LOOKUP_INPUT}
            outputJson={PARTS_LOOKUP_OUTPUT}
          />
          <ToolCallCard
            toolName="bay_availability"
            status="running"
            inputJson={BOOKING_INPUT}
          />
          <ToolCallCard
            toolName="warehouse_stock_query"
            status="failed"
            durationMs={1820}
            inputJson={FAILED_INPUT}
            outputJson={'{ "error": "Shellharbour mirror offline since 09:18" }'}
          />
        </div>

        <div className={styles.note}>
          <span>Status semantics</span>
          <p>
            Status chip is colour-coded (teal running, green done, red failed) and
            uses uppercase mono-typed labels for at-a-glance triage. Borders take
            on a subtle tonal hint so the card is recognisable even at small sizes
            in a transcript.
          </p>
        </div>
      </section>
    </main>
  )
}
