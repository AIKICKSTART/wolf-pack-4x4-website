import type { Metadata } from "next"

import { FieldConfigPanel } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { FIELD_CONFIG_DRAFT } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Field config panel | Forms platform",
  description:
    "Primitive 02 — the property editor for the selected field. Label, placeholder, required, help, default, and option list.",
}

export default function FieldConfigPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Field config panel"
        title="Field config panel"
        description="Right-hand inspector editing the &ldquo;Service required&rdquo; multi-select. Switch surfaces the respondent-required state, the option list reflects the workshop&rsquo;s real service catalogue, and the duplicate / delete footer enables the typical content-ops actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Field config panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — editing &ldquo;Service required&rdquo;
        </span>
        <div className={styles.demoInline}>
          <FieldConfigPanel draft={FIELD_CONFIG_DRAFT} />
        </div>
      </section>
    </main>
  )
}
