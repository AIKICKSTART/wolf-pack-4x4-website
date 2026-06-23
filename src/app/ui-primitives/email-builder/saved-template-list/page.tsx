import type { Metadata } from "next"

import { SavedTemplateList } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { SAVED_TEMPLATES } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Saved template list | Email builder",
  description:
    "Primitive 13 — sortable data table of saved templates with thumb, name, last-edited, sends, and open/duplicate/archive actions.",
}

export default function SavedTemplateListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Saved template list"
        title="Saved template list"
        description="A sortable register of every template draft the workshop has saved. Composed on top of the DataTable primitive — name, last-edited and send count columns sort independently while the row-actions cell exposes open, duplicate and archive affordances."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Saved template list" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — six saved drafts</span>
        <SavedTemplateList templates={SAVED_TEMPLATES} />
      </section>
    </main>
  )
}
