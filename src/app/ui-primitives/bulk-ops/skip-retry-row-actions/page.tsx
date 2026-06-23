import type { Metadata } from "next"

import { SkipRetryRowActions } from "../../components/bulk-ops"
import { PageHeader } from "../../components/page-header"

import styles from "../bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Skip / retry row actions | Bulk operations",
  description:
    "Primitive 06 — Skip · Retry · Edit-and-retry chip cluster for failed rows in a bulk operation table.",
}

export default function SkipRetryRowActionsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Bulk"
        title="Skip / retry row actions"
        description="A tone-coded chip cluster that sits inline beside a failed row. Designed for tight table cells so the operator can resolve failures without leaving the run."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations", href: "/ui-primitives/bulk-ops" },
          { label: "Skip / retry row actions" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — failed row</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 14,
            border: "1px solid var(--primitive-line)",
            borderRadius: 10,
            background:
              "color-mix(in oklab, var(--primitive-red) 6%, transparent)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--primitive-font-mono)",
              fontSize: 13,
              color: "var(--primitive-text-strong)",
            }}
          >
            Q-2421 · Patrol Y62 — VIN mismatch in source row
          </span>
          <SkipRetryRowActions rowLabel="Q-2421" />
        </div>
      </section>
    </main>
  )
}
