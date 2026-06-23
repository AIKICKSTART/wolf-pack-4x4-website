import type { Metadata } from "next"

import { FieldPreview } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { QUOTE_FORM_FIELDS } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Field preview | Form builder",
  description:
    "Primitive 06 — respondent-side preview of any field type as it will appear in the live form.",
}

export default function FieldPreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Field preview"
        title="Field preview"
        description="Live preview of each field as the respondent will see it — text input with caret, currency prefix, date with picker glyph, multi-select chips, star rating, drag-to-upload area, signature pad, payment row, and a yes / no segmented control."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Field preview" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quote form fields (workshop dark)</span>
        <div className={styles.previewRow}>
          {QUOTE_FORM_FIELDS.map((field) => (
            <FieldPreview key={field.id} field={field} theme="workshop-dark" />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Same fields — minimal light theme</span>
        <div className={styles.previewRow}>
          {QUOTE_FORM_FIELDS.slice(0, 3).map((field) => (
            <FieldPreview key={field.id} field={field} theme="minimal" />
          ))}
        </div>
      </section>
    </main>
  )
}
