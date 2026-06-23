import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApiReferenceCard } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "API reference card | UI Primitives — Help & Docs",
}

const requestExample = `curl -X POST https://api.mufflermen.au/v1/quotes \\
  -H "Authorization: Bearer $OAK_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_id": "cust_3FK2",
    "vehicle_id": "veh_88AQ",
    "lines": [
      { "sku": "MF-14816", "qty": 1 },
      { "sku": "LAB-FAB", "qty": 1.5 }
    ]
  }'`

const responseExample = `{
  "id": "q_2415",
  "version": 1,
  "status": "draft",
  "total_aud_cents": 184400,
  "margin_pct": 0.31,
  "expires_at": "2026-06-11T05:00:00Z"
}`

export default function ApiReferencePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 11"
        title="API reference card"
        description="API endpoint reference: METHOD chip, path, description, parameter table, example request, and example response — all in one block."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "API reference card" },
        ]}
      />
      <section className={styles.canvas} aria-label="API reference card demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Every public endpoint gets one of these. Reuse the code-block primitive for the
            request / response samples — same copy button, same line numbering.
          </p>
        </div>
        <ApiReferenceCard
          method="POST"
          path="/v1/quotes"
          description="Creates a draft quote attached to a customer + vehicle. Returns the quote with computed totals and a 14-day expiry."
          parameters={[
            {
              name: "customer_id",
              type: "string",
              required: true,
              description: "ID of the customer the quote attaches to.",
            },
            {
              name: "vehicle_id",
              type: "string",
              required: true,
              description: "ID of the vehicle the quote applies to.",
            },
            {
              name: "lines",
              type: "QuoteLine[]",
              required: true,
              description: "Ordered list of part, labour, or fabrication line items.",
            },
            {
              name: "expires_at",
              type: "string",
              required: false,
              description: "Override default 14-day expiry. ISO-8601.",
            },
          ]}
          requestExample={requestExample}
          responseExample={responseExample}
        />
      </section>
    </main>
  )
}
