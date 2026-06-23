import type { Metadata } from "next"

import { QueryEditor } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Query editor | DB Admin",
  description:
    "Primitive 04 — SQL query editor surface with mono font, line-number gutter, connection chip, row-limit chip, and a run button.",
}

const DEFAULT_QUERY = `SELECT
  q.id,
  q.vehicle_rego,
  q.customer_id,
  q.subtotal_cents,
  q.status,
  q.is_locked,
  q.created_at,
  q.tags
FROM public.quotes q
WHERE q.status IN ('draft', 'sent', 'accepted')
  AND q.created_at >= now() - interval '14 days'
ORDER BY q.created_at DESC
LIMIT 500;`

export default function QueryEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Query editor"
        title="Query editor"
        description="An SQL editor surface. A toolbar carries the connection label, a row-limit chip that cycles through 100 / 500 / 1k / 5k, and a primary run button. The editor body pairs a line-number gutter with a mono-styled textarea. A small status bar shows length and line counts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Query editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — recent quotes query</span>
        <QueryEditor
          defaultQuery={DEFAULT_QUERY}
          connection="local · postgres"
          defaultLimit={500}
        />
      </section>
    </main>
  )
}
