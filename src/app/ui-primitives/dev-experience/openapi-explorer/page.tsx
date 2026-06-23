import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CodeBlock } from "../../components/primitives/code-block"
import { OpenApiExplorer } from "../../components/dev-experience"
import type { OpenApiTab } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "OpenAPI explorer | UI Primitives — Dev experience",
}

const REQUEST_BODY = `{
  "vehicle_id": "veh_2026_ford_ranger_xl",
  "part_ids": ["part_extractor_xforce_4cyl"],
  "bay_id": "bay_oak_flats_03",
  "customer_tier": "trade"
}`

const RESPONSE_BODY = `{
  "id": "qte_2026_xforce_extractor_001",
  "status": "draft",
  "total_aud": 1842.50,
  "valid_until": "2026-05-23T08:42:11Z"
}`

const CODE_SAMPLE = `const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
  customerTier: "trade",
})`

const QUOTE_TABS: ReadonlyArray<OpenApiTab> = [
  {
    key: "parameters",
    label: "Parameters",
    content: (
      <ul style={{ margin: 0, paddingLeft: "var(--primitive-space-4)", display: "grid", gap: "var(--primitive-space-2)" }}>
        <li>
          <code style={{ color: "var(--primitive-amber)" }}>X-Mufflermen-Workshop</code>{" "}
          — workshop ID, e.g. <code>wsh_oak_flats</code>.
        </li>
        <li>
          <code style={{ color: "var(--primitive-amber)" }}>Idempotency-Key</code> —
          UUIDv7 generated client-side. Replays of the same body are de-duplicated for
          24 hours.
        </li>
      </ul>
    ),
  },
  {
    key: "request-body",
    label: "Request body",
    content: <CodeBlock code={REQUEST_BODY} language="json" showLineNumbers />,
  },
  {
    key: "responses",
    label: "Responses",
    content: (
      <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
        <span
          style={{
            color: "var(--primitive-green)",
            fontFamily: "var(--primitive-font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          201 Created
        </span>
        <CodeBlock code={RESPONSE_BODY} language="json" showLineNumbers />
      </div>
    ),
  },
  {
    key: "code",
    label: "Code samples",
    content: (
      <CodeBlock
        code={CODE_SAMPLE}
        language="typescript"
        fileName="quote.ts"
        showLineNumbers
      />
    ),
  },
]

export default function OpenApiExplorerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 08"
        title="OpenAPI explorer"
        description="Method chip + path + tabs (Parameters / Request body / Responses / Code samples) with a try-it CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "OpenAPI explorer" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>quotes.create — POST /v1/quotes</span>
          <OpenApiExplorer
            method="POST"
            path="/v1/quotes"
            summary="Create an instant quote for a vehicle, parts, and bay slot. Returns 201 Created with the quote ID and total."
            tabs={QUOTE_TABS}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The try-it CTA only renders when an <code>onTryIt</code> handler is supplied,
            keeping the read-only documentation rendering distinct from interactive
            sandbox sessions. The method chip background tone shifts per HTTP verb so a
            verb is recognisable at a glance.
          </p>
        </div>
      </section>
    </main>
  )
}
