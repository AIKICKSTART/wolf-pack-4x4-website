import type { Metadata } from "next"

import { FormBuilderCanvas } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { BOOK_SERVICE_FIELDS, PALETTE_SECTIONS } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Form builder canvas | Forms platform",
  description:
    "Primitive 01 — the drag-drop form builder canvas with the field palette rail and selected-row highlight.",
}

export default function FormBuilderCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Form builder canvas"
        title="Form builder canvas"
        description="Drag-drop builder for the Mufflermen Book-a-Service form. The left rail palette is grouped by Text / Selection / Media & payments; the stage holds the 5 fields with the Service-required row selected; the active drop indicator sits between fields 2 and 3."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Form builder canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Book-a-Service intake
        </span>
        <FormBuilderCanvas
          palette={PALETTE_SECTIONS}
          formTitle="Book a Service"
          hint="Step 1 of 5 · Vehicle"
          fields={BOOK_SERVICE_FIELDS}
          selectedFieldId="f-service-type"
          activeDropIndex={2}
        />
      </section>
    </main>
  )
}
