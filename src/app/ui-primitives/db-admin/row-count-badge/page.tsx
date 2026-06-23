import type { Metadata } from "next"

import { RowCountBadge } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Row count badge | DB Admin",
  description:
    "Primitive 11 — tiny row-count badge with K / M / B suffix and a tone shift for larger tables.",
}

const SAMPLES: ReadonlyArray<{ label: string; count: number }> = [
  { label: "users", count: 142 },
  { label: "parts", count: 3_104 },
  { label: "customers", count: 8_926 },
  { label: "quotes", count: 12_482 },
  { label: "bookings", count: 24_510 },
  { label: "invoices", count: 16_882 },
  { label: "audit_log", count: 1_204_891 },
  { label: "audit.events", count: 4_482_001 },
  { label: "telemetry.frames", count: 12_400_000_000 },
]

export default function RowCountBadgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Row count badge"
        title="Row count badge"
        description="A small inline badge that summarises a row count. Values format with K / M / B suffixes once they cross the corresponding threshold. The chip tone shifts from neutral up to amber and red so larger tables read as more dangerous at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Row count badge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — every tone band</span>
        <div className={styles.demoInline}>
          {SAMPLES.map((sample) => (
            <div
              key={sample.label}
              style={{
                display: "grid",
                gap: "var(--primitive-space-1-5)",
                alignItems: "start",
                fontFamily: "var(--primitive-font-mono)",
                fontSize: "var(--primitive-text-xs)",
                color: "var(--primitive-muted)",
                letterSpacing: "0.04em",
              }}
            >
              <span>{sample.label}</span>
              <RowCountBadge count={sample.count} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
