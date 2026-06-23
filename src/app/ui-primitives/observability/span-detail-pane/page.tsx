import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SpanDetailPane } from "../../components/observability"

import { TRACE_LINKED_LOGS } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Span detail pane | Observability cockpit",
  description:
    "Primitive 07 — span detail with trace + span IDs, operation, kind, duration, error chip, tags and linked logs.",
}

export default function SpanDetailPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Traces"
        title="Span detail pane"
        description="Detail pane for a single span — trace and span IDs, the operation, kind, duration, an error chip when it failed, the tag set as key/value pills and linked log lines that correlate to this span."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Span detail pane" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 1 erroring span · 4 tags · 3 linked logs</span>
        <SpanDetailPane
          traceId="7a3c4d2e9f81b1e2"
          spanId="b6e08f2c"
          operation="quote-pdf.render"
          service="quote-pdf"
          kind="internal"
          durationMs={110}
          errorMessage="renderer worker OOM at 1.4 GB resident, restarting"
          tags={{
            "quote.id": "Q-198342",
            "render.pages": "14",
            "render.attempts": "1",
            "worker.pool": "renderers-prod",
          }}
          linkedLogs={TRACE_LINKED_LOGS}
        />
      </section>
    </main>
  )
}
