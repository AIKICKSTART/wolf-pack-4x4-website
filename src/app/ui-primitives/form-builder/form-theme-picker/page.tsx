import type { Metadata } from "next"

import { FormThemePicker } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { THEME_PRESETS } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Form theme picker | Form builder",
  description:
    "Primitive 07 — radio-group theme picker for the published form's visual style.",
}

export default function FormThemePickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Form theme picker"
        title="Form theme picker"
        description="Four mini preview tiles — Minimal, Workshop dark, Editorial light, Brutalist — each showing typography and accent swatches. Click any tile to select; the active tile gets an amber ring and a filled radio dot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Form theme picker" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — four presets</span>
        <FormThemePicker presets={THEME_PRESETS} initialTheme="workshop-dark" />
      </section>
    </main>
  )
}
