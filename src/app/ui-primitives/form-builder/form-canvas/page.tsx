import type { Metadata } from "next"

import { FormCanvas } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { QUOTE_FORM_FIELDS } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Form canvas | Form builder",
  description:
    "Primitive 02 — the centre form builder canvas with vertical drop zones, selection ring, and empty state.",
}

export default function FormCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Form canvas"
        title="Form canvas"
        description="The vertical builder surface — drop zones between every row in idle, hover, and active states. The selected field gets an amber highlight ring and aria-current=true. Includes an empty state for fresh forms."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Form canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quote intake (selected row 4)</span>
        <FormCanvas
          formTitle="Quote intake form"
          formMeta="Page 1 of 4 · Your vehicle"
          fields={QUOTE_FORM_FIELDS}
          selectedFieldId="sound-preference"
          dropTargetState="hover"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty state</span>
        <FormCanvas
          formTitle="New form"
          formMeta="Untitled"
          fields={[]}
        />
      </section>
    </main>
  )
}
