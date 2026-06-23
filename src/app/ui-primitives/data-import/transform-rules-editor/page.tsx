import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TransformRulesEditor } from "../../components/data-import"
import { AVAILABLE_TRANSFORMS, TRANSFORM_COLUMNS } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Transform rules editor | Data import",
  description:
    "Primitive 14 — Per-column transform chips with live preview row. Trim, lowercase, regex-replace, split, lookup, coalesce.",
}

export default function TransformRulesEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Transform rules editor"
        title="Transform rules editor"
        description="Per-column transform pipelines run left-to-right. Trim whitespace, lower/upper-case identifiers, regex-replace, split on whitespace, look up against a supplier map, coalesce empty cells. The preview row updates as chips change."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Transform rules editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Parts CSV transform pipelines</span>
        <TransformRulesEditor
          columns={TRANSFORM_COLUMNS}
          availableTransforms={AVAILABLE_TRANSFORMS}
        />
      </section>
    </main>
  )
}
