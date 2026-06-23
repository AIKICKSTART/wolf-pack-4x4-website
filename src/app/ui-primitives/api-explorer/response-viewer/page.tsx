import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ResponseViewer } from "../../components/api-explorer"
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Response viewer | API Explorer",
  description:
    "Primitive 04 — response viewer with status, duration, size, JSON tree, and headers. Three states: 200 success, 422 validation error, empty.",
}

export default function ResponseViewerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Response viewer"
        title="Response viewer"
        description="Renders the HTTP response with a status chip, duration, and size header. Tabs flip between raw JSON, collapsible tree, and headers. Pre-parses JSON safely — falls back to raw view when the body is non-JSON."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Response viewer" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Successful response">
        <span className={styles.sectionLabel}>State 01 / 200 OK</span>
        <ResponseViewer response={RESPONSE_SUCCESS} />
      </section>

      <section className={styles.routeSection} aria-label="Validation error">
        <span className={styles.sectionLabel}>State 02 / 422 Validation</span>
        <ResponseViewer response={RESPONSE_ERROR} />
      </section>

      <section className={styles.routeSection} aria-label="Empty response">
        <span className={styles.sectionLabel}>State 03 / Empty</span>
        <ResponseViewer />
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          The HTTP status chip and CodeBlock are imported from the existing api-console +
          primitives families. The JSON tree is a small custom renderer with{" "}
          <code>aria-expanded</code> on every collapsible branch.
        </p>
      </aside>
    </main>
  )
}
