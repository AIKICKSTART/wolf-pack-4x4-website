import type { Metadata } from "next"

import { MultiPageFormWizard } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { FORM_PAGES } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Multi-page wizard | Form builder",
  description:
    "Primitive 08 — page tab strip plus reorder / duplicate / preview controls for multi-page forms.",
}

export default function MultiPageWizardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Multi-page wizard"
        title="Multi-page form wizard"
        description="The top-of-canvas wizard surface — one tab per page with two-digit index and field count, plus an add-page action chip. Footer holds reorder, duplicate, and preview actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Multi-page wizard" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quote form (4 pages)</span>
        <MultiPageFormWizard pages={FORM_PAGES} initialPageId="vehicle" />
      </section>
    </main>
  )
}
