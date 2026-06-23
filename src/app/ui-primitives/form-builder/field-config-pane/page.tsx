import type { Metadata } from "next"

import { FieldConfigPane } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { QUOTE_FORM_FIELDS, VALIDATION_RULES } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Field config pane | Form builder",
  description:
    "Primitive 03 — the right inspector pane for editing the currently selected field.",
}

export default function FieldConfigPaneScenePage() {
  const selected = QUOTE_FORM_FIELDS[3]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Field config pane"
        title="Field config pane"
        description="The 320-wide right-hand inspector pane that edits the currently selected field — label, placeholder, required toggle, default value, validation chips, plus a collapsible Advanced section."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Field config pane" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — editing &ldquo;Sound preference&rdquo;
        </span>
        <div className={styles.demoInline}>
          <FieldConfigPane field={selected} validationRules={VALIDATION_RULES.slice(0, 6)} />
        </div>
      </section>
    </main>
  )
}
