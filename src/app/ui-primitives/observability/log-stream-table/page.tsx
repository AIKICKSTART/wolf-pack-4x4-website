import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LogStreamTable } from "../../components/observability"

import { LOG_ROWS } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Log stream table | Observability cockpit",
  description:
    "Primitive 05 — streaming log table with severity chips, severity filter row and structured key/value fields.",
}

export default function LogStreamTableScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Logs"
        title="Log stream table"
        description="A streaming log table — each row carries a high-resolution timestamp, severity chip, originating service and the log message itself with structured key/value fields underneath. Severity chips above act as toggleable filters. Stateful client component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Log stream table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 8 log lines · 5 severities</span>
        <LogStreamTable rows={LOG_ROWS} caption="quotes-api · live stream · 28 May 19:42 AEST" />
      </section>
    </main>
  )
}
