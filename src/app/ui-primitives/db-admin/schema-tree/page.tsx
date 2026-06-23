import type { Metadata } from "next"

import { SchemaTree } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { SCHEMAS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Schema tree | DB Admin",
  description:
    "Primitive 01 — left-rail schema browser with schemas, tables, views, materialized views, functions, sequences, and a filter input.",
}

export default function SchemaTreeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Schema tree"
        title="Schema tree"
        description="A left-rail schema browser. Each node carries a kind glyph (T, V, MV, ƒn, SEQ), an optional row count chip, and an expanded / selected state. A filter input at the top narrows visible nodes by substring across the tree."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Schema tree" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — all schemas</span>
        <div style={{ maxWidth: 360 }}>
          <SchemaTree
            schemas={SCHEMAS}
            defaultExpandedIds={["public"]}
            defaultSelectedId="public.quotes"
          />
        </div>
      </section>
    </main>
  )
}
