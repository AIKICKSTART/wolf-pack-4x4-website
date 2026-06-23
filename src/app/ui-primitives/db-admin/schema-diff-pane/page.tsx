import type { Metadata } from "next"

import { SchemaDiffPane } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { DIFF_ENTRIES } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Schema diff pane | DB Admin",
  description:
    "Primitive 13 — side-by-side schema diff with added / removed / changed rows and a summary chip row at the top.",
}

export default function SchemaDiffPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Schema diff pane"
        title="Schema diff pane"
        description="A side-by-side schema diff. The header carries the two schema labels and a row of summary chips (added / removed / changed / unchanged). Each row appears on both sides so eye-tracking stays aligned. Rows tint to green / red / amber for added / removed / changed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Schema diff pane" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — production ↔ staging</span>
        <SchemaDiffPane
          leftLabel="production"
          rightLabel="staging"
          entries={DIFF_ENTRIES}
        />
      </section>
    </main>
  )
}
