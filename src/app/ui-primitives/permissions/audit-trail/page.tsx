import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuditTrail } from "../../components/permissions"

import {
  DEMO_AUDIT_ACTORS,
  DEMO_AUDIT_DATE_RANGES,
  DEMO_AUDIT_EVENTS,
  DEMO_AUDIT_EVENT_TYPES,
} from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Audit trail | Permissions",
  description:
    "Primitive 13 — filterable audit trail with expandable JSON payload rows and load-older pagination.",
}

export default function AuditTrailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Audit trail"
        title="Audit trail"
        description="Filter chips for event type, actor and date range across the top. The events table reuses the data-table primitive — sortable, paginated, and every row expands to reveal the underlying JSON payload via the CodeBlock primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Audit trail" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>10 recent events · expand any row for payload</span>
        <AuditTrail
          events={DEMO_AUDIT_EVENTS}
          eventTypes={DEMO_AUDIT_EVENT_TYPES}
          actors={DEMO_AUDIT_ACTORS}
          dateRanges={DEMO_AUDIT_DATE_RANGES}
          defaultDateRangeId="7d"
        />
      </section>
    </main>
  )
}
