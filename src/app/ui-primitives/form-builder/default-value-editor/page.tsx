import type { Metadata } from "next"

import { DefaultValueEditor } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Default value editor | Form builder",
  description:
    "Primitive 13 — default value editor whose UI shape adapts to the active field type.",
}

export default function DefaultValueEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Default value editor"
        title="Default value editor"
        description="Adapts by field type — a text input for text, a stepped numeric for number, currency with prefix + suffix, a date picker, dropdown, multi-select chips, star rating, yes / no, and a file row. Signature + payment fields surface a hint instead of pre-fill."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Default value editor" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — across field types</span>
        <div className={styles.previewRow}>
          <DefaultValueEditor type="short-text" value="Hilux SR5" />
          <DefaultValueEditor type="number" value="2.8" />
          <DefaultValueEditor type="currency" value="450.00" />
          <DefaultValueEditor type="date" value="Today" />
          <DefaultValueEditor
            type="dropdown"
            value="Toyota"
            options={["Toyota", "Holden", "Ford"]}
          />
          <DefaultValueEditor
            type="multi-select"
            value="Quiet, Throaty"
            options={["Quiet", "Throaty", "Performance"]}
          />
          <DefaultValueEditor type="rating" value="4" />
          <DefaultValueEditor type="yes-no" value="yes" />
          <DefaultValueEditor type="file-upload" />
          <DefaultValueEditor type="signature" />
          <DefaultValueEditor type="payment" />
        </div>
      </section>
    </main>
  )
}
