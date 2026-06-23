import type { Metadata } from "next"

import { ApiReferenceCard } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "API reference card | UI Primitives — Docs Suite",
}

export default function ApiReferenceCardPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 11"
        title="API reference card"
        description="Compact card showing method, path, request parameters, and a try-it CTA that opens the live sandbox console for the Mufflermen trade-account API."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "API reference card" },
        ]}
      />
      <section className={styles.canvas} aria-label="API reference card demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Rendered inline inside the trade-account API docs. The try-it link opens the
            sandbox console with the endpoint pre-filled.
          </p>
        </div>
        <div className={styles.stage}>
          <ApiReferenceCard
            method="POST"
            path="/v2/tokens"
            description="Issue a scoped trade-account API token for a single supplier portal. The raw token is returned exactly once."
            parameters={[
              {
                name: "supplier",
                type: "string",
                required: true,
                description: "Supplier slug. Must match a configured portal (magnaflow-anz, pacemaker, redback).",
              },
              {
                name: "scopes",
                type: "string[]",
                required: true,
                description: "Allowed scopes. Picks from stock.read, stock.write, orders.read, orders.write.",
              },
              {
                name: "expires_at",
                type: "ISO date",
                required: false,
                description: "Optional expiry override. Defaults to 90 days from issue.",
              },
            ]}
            tryIt={{ label: "Try in sandbox", href: "https://trade-sandbox.mufflermen.com.au/console" }}
          />
        </div>
        <div className={styles.stage}>
          <ApiReferenceCard
            method="GET"
            path="/v2/stock/stream"
            description="Server-Sent Events stream of stock deltas for the active warehouse. Heartbeats every 15 seconds."
            parameters={[
              {
                name: "warehouse",
                type: "string",
                required: true,
                description: "Warehouse slug (oak-flats, dapto, kiama).",
              },
              {
                name: "since",
                type: "ISO date",
                required: false,
                description: "Optional cursor — only emits deltas newer than this timestamp.",
              },
            ]}
            tryIt={{ label: "Try in sandbox", href: "https://trade-sandbox.mufflermen.com.au/console" }}
          />
        </div>
      </section>
    </main>
  )
}
