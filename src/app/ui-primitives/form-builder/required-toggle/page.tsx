import type { Metadata } from "next"

import { RequiredToggleChip } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Required toggle chip | Form builder",
  description:
    "Primitive 12 — compact required toggle chip with asterisk indicator and aria-pressed state.",
}

export default function RequiredToggleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Required toggle chip"
        title="Required toggle chip"
        description="A pressable chip rendering an asterisk indicator. Off state is muted; on state turns the indicator red with a glow ring and updates aria-pressed. Use it inline next to a field label or in the inspector."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Required toggle" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — off / on</span>
        <div className={styles.demoInline}>
          <RequiredToggleChip fieldName="Vehicle make" />
          <RequiredToggleChip initialRequired fieldName="Suburb" />
          <RequiredToggleChip initialRequired label="Required *" fieldName="Signature" />
        </div>
      </section>
    </main>
  )
}
