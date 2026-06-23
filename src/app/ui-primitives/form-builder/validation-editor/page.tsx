import type { Metadata } from "next"

import { ValidationRulesEditor } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { VALIDATION_RULES } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Validation rules editor | Form builder",
  description:
    "Primitive 11 — validation rule editor with required / regex / length / value / file rules as chip toggles.",
}

export default function ValidationEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Validation editor"
        title="Validation rules editor"
        description="Each rule is an aria-pressed chip with a status dot and an optional hint constant — required, regex, min / max length, min / max value, file size, file type, email + AU phone formats. Composable with AND."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Validation editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — rules for &ldquo;Vehicle photos&rdquo;
        </span>
        <ValidationRulesEditor rules={VALIDATION_RULES} fieldType="file-upload" title="Validation" />
      </section>
    </main>
  )
}
